# Agent Note: 国庆主题

Status: implemented

[English](2026-08-29-national-day-theme.md) | 中文

## 问题

Web 客户端此前只有中性的 Light、Dark 和 System 偏好。季节性的国庆呈现需要复用现有 Web 外壳布局，经同一个 Host 支撑的外观偏好持久化，并在本地节日窗口开始或结束时更新，而不是为首页派生一套页面专用实现。

## 决策

`national-day` 是内置 `ThemePreference` 和已注册的 `ThemeDefinition`。它使用浅色基础配色，并用来自 Calicat 的红色、金色和暖白色覆盖现有别名 token。外观设置行把它呈现为第四个选项块，使用 `IconNationalDayOutline16`，因此该选项沿用设置界面其余部分的 SVG 图标组件约定。

`system` 会先通过 `calendarThemePreferenceAt()` 解析，再查询 `prefers-color-scheme`。今天唯一的日历事件是浏览器本地 10 月 1 日至 10 月 7 日的国庆窗口。显式 `light`、`dark` 和 `national-day` 选择仍优先于日历；system 偏好会安排本地日期定时器，并且只在解析出的主题 id 改变时重新发布 `theme/change`。

ThemeRuntime 会记录最新的待写入内置偏好。早于该写入的 Host 快照不能覆盖用户刚点击的偏好；写入落定后，运行时要么保留已接受的偏好，要么采用恢复出来的持久化值。这样在初始 settings 读取晚于用户点击选项块完成时，国庆主题不会先闪现再恢复。

插件前引导代码嵌入同一份内置国庆 token 表和日期判断。它会在外壳加载页或动态插件树渲染前写入 `color-scheme`、`body[data-ds-dark-theme]` 和国庆内联 token 变量；激活后，ThemeRuntime 与 ui-layout 仍按[插件前主题引导决策](../bug-fix/2026-08-10-pre-plugin-theme-bootstrap.zh.md)继续作为权威来源。

该主题仍由 token 驱动，而不是由布局驱动。ui-layout 只在侧边栏网格单元内通过侧边栏专用 token 重新绑定文字别名，使红色侧边栏填充能保留可读文字，同时不把会话栏文字颜色染到会话列。ui-sidebar 让展开态 New Session 胶囊读取专用的填充、边框、文字、hover 与阴影 token，使主操作在红色栏上保持清晰，而收起轨道控件仍使用轨道文字别名。ui-conversation 在常驻根节点上读取可选的 `--dsw-specific-conversation-fill` 背景 token，普通主题则回退到 `--dsw-alias-bg-base`；它还渲染一个非交互 SVG 装饰层，该层默认通过显示 token 隐藏，让国庆主题可以在现有 Hero 控件后方增加五星和彩旗装饰，而不替换组件树。ui-settings-general 在固定定位的设置面板内通过设置面板专用 token 重置继承的文字和导航填充别名，因为该面板挂在 `sidebar.settings` 下，否则会继承侧边栏文字颜色。

## 验证

`ui-theme` 单元测试覆盖持久化 schema、运行时注册表、国庆 token 表、待写入 Host fence、日历解析、午夜重新检查、引导代码 token 写入、外观行文案以及 Host 收集。`ui-primitives` 图标测试在 currentColor、无硬编码调色板约定下包含新的 SVG 导出。`ui-sidebar` 与 `ui-conversation` 测试覆盖 New Session token 钩子和 SVG 五星/彩旗层。Web settings e2e 通过已交付对话框点击国庆选项块，检查 `settings.yaml`、body token 变化、设置面板 token 重置、New Session 计算颜色和可见国庆 SVG 装饰数量，随后重新加载，并在同一 settings home 上打开第二个端口。

## 曾考虑的替代方案

**把国庆注册为第三方主题。** 第三方 id 是进程内扩展，并且有意不跨越 Host settings schema。那会失去持久化和插件前引导行为，因此不能承载产品级外观选项。

**增加单独的国庆首页或替代 Hero 树。** 需求是在现有布局上应用主题。并行页面会复制 Hero、编辑器和侧边栏结构，并产生另一处必须与会话和工作区行为同步的界面。

**让用户每年手动选择国庆。** 显式选项对节日窗口外仍有用，但 System 用户不应在本地事件窗口开始时依赖刷新或手动切换。日历解析提供了这项主动更新，同时不改变显式偏好。

**用全局文字覆盖支持红色侧边栏。** 在深红侧边栏上可读的全局文字颜色会在暖色会话背景上失效，而适合暖色背景的深色文字又会在侧边栏上失效。侧边栏作用域的文字 token 同时保留两处对比度。

## 后果

System 模式现在有一个日期相关分支。断言 System 解析颜色的测试必须在 10 月 1 日至 10 月 7 日之外采样，或显式考虑节日窗口。新的季节性主题可以复用同一个日历 helper、定时器和引导 token 路径，但每个内置偏好仍需要 schema、设置行文案、token、文档和已组装 Web 覆盖。
