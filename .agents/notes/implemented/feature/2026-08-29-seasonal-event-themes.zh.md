# Agent Note: 季节性事件主题

Status: implemented

[English](2026-08-29-seasonal-event-themes.md) | 中文

## 问题

Web 客户端已有中性的 Light、Dark、System 偏好和一个国庆主题。元旦、生日、春节和中秋呈现需要复用现有 Web 外壳布局，通过同一套 Host 支撑的外观偏好持久化，并在本地事件日开始时自动切换，而不是为首页派生一套页面专用实现。

## 决策

`new-year`、`birthday`、`spring-festival`、`mid-autumn` 和 `national-day` 是内置 `ThemePreference` 值和已注册的 `ThemeDefinition`。每个主题都使用浅色基础配色，并通过共享的季节性 token helper 覆盖现有别名 token。外观设置行把五个事件主题放在 Light、Dark 和 System 之后，每个主题使用一个共享 SVG 图标组件。

`system` 会先通过 `calendarThemePreferenceAt()` 解析，再查询 `prefers-color-scheme`。本地事件日历将 1 月 1 日映射为 `new-year`，7 月 17 日映射为 `birthday`，农历正月初一映射为 `spring-festival`，农历八月十五映射为 `mid-autumn`，10 月 1 日至 10 月 7 日映射为 `national-day`。固定日期事件先于农历事件解析；如果中秋农历日期与 10 月国庆窗口重叠，则中秋先于国庆范围解析。显式具体偏好仍优先于日历；system 偏好会安排本地日期定时器，并且只在解析出的主题 id 改变时重新发布 `theme/change`。

ThemeRuntime 会记录最新的待写入内置偏好。早于该写入的 Host 快照不能覆盖用户刚点击的偏好；写入落定后，运行时要么保留已接受的偏好，要么采用恢复出的持久化值。这样在初始 settings 读取晚于用户点击选项块完成时，季节性主题不会先闪现再恢复。

插件前引导代码嵌入同一份季节性 token 表和日期解析器。它会在外壳加载页面或动态插件树渲染前写入 `color-scheme`、`body[data-ds-dark-theme]` 和当前内置主题 token 变量；激活后，ThemeRuntime 和 ui-layout 仍按[插件前主题引导决策](../bug-fix/2026-08-10-pre-plugin-theme-bootstrap.zh.md)继续作为权威来源。

这些主题仍由 token 驱动，而不是由布局驱动。ui-conversation 渲染 `SeasonalHeroDecor`，其中包含同一绝对定位平面上的每个事件的非交互 SVG 层。每个层默认通过自己的 `--dsw-specific-*-decoration-display` token 隐藏，因此主题可以在现有 Hero 控件后方显示事件装饰，而不替换组件树，也不移动 composer、Workspace picker、侧边栏或设置面板。

## 验证

`ui-theme` 单元测试覆盖持久化 schema、运行时注册表、季节性 token 表、待写入 Host fence、固定日期和农历日期解析、午夜重新检查、引导代码 token 写入、外观行文案以及 Host 收集。`ui-primitives` 图标测试在 currentColor、无硬编码调色板规则下包含新的 SVG 导出。`ui-conversation` 测试覆盖每个季节性 SVG 层及其装饰数量。Web settings e2e 通过已交付对话框点击每个季节性选项块，检查 `settings.yaml`、body token 变化、设置面板 token 重置、New Session 计算颜色和当前可见 SVG 装饰数量，随后重新加载，并在同一 settings home 上打开第二个端口。

## 曾考虑的替代方案

**把季节性主题注册为第三方主题。** 第三方 id 是进程内扩展，并且有意不跨越 Host settings schema。那会失去持久化和插件前引导行为，因此不能承载产品级外观选项。

**增加单独的季节性首页或替代 Hero 树。** 需求是在现有布局上应用主题。并行页面会复制 Hero、composer 和侧边栏结构，并产生更多必须与会话和工作区行为同步的界面。

**让用户手动选择季节性主题。** 显式选项在事件日之外仍有用，但 System 用户不应在本地事件日开始时依赖刷新或手动切换。日历解析提供了这项主动更新，同时不改变显式偏好。

**使用单个通用装饰 token。** 一个 token 只能显示或隐藏一个共享层。按事件拆分显示 token 后，每个主题都能显示自己的装饰，同时所有装饰层仍在同一绝对定位平面中。

## 后果

System 模式现在有多个日期相关分支。断言 System 解析颜色的测试必须在事件日期之外采样，或显式设置时钟。农历事件解析依赖 `Intl.DateTimeFormat` 对中国农历的支持；缺少该数据的运行时仍会解析固定日期事件。
