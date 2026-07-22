# CV 中英文切换功能执行任务框架

## 1. 任务目标

在个人主页仓库 `ckyFi9zero/ckyFi9zero.github.io` 中，为首页 CV 增加中英文双语切换功能。

预期行为：

- 默认显示中文 CV。
- 点击语言按钮后切换为英文 CV。
- 再次点击后切换回中文 CV。
- 语言选择通过 `localStorage` 保留。
- 语言按钮的交互方式与现有亮暗模式按钮保持一致。
- 只修改首页 CV 相关内容。
- 暂不处理文章图片未渲染问题。
- 所有修改必须先在本机部署并验证，再决定是否推送。

---

## 2. 本次任务范围

### 2.1 需要实现

- [ ] 将现有中文 CV 内容拆分为独立文件。
- [ ] 新增英文 CV 内容文件。
- [ ] 在首页同时渲染中英文 CV 容器。
- [ ] 默认仅显示中文 CV。
- [ ] 在导航栏增加语言切换按钮。
- [ ] 实现中文与英文互相切换。
- [ ] 使用 `localStorage` 保存用户选择。
- [ ] 切换时同步更新页面标题。
- [ ] 切换时同步更新 `<html lang>`。
- [ ] 非 CV 页面不显示语言切换按钮。
- [ ] 保证语言切换不影响亮暗模式。
- [ ] 在本机完成构建、功能测试和回归测试。

### 2.2 明确不做

- [ ] 不修复文章图片路径。
- [ ] 不修改文章内容。
- [ ] 不修改 `_posts` 中的文件。
- [ ] 不调整已有图片资源。
- [ ] 不引入在线翻译 API。
- [ ] 不自动翻译其他页面。
- [ ] 不重构现有主题系统。
- [ ] 不修改 GitHub Pages 部署配置。
- [ ] 不直接向 `main` 分支推送。

---

## 3. 推荐分支

```bash
git clone https://github.com/ckyFi9zero/ckyFi9zero.github.io.git
cd ckyFi9zero.github.io

git switch -c feature/cv-language-toggle
```

分支命名：

```text
feature/cv-language-toggle
```

提交信息建议：

```text
feat: add Chinese-English CV toggle
```

---

## 4. 预计文件变更

### 4.1 新增文件

```text
_includes/cv/cv-zh.md
_includes/cv/cv-en.md
assets/js/language-toggle.js
```

可选：

```text
_sass/_language-toggle.scss
```

### 4.2 修改文件

```text
_pages/about.md
_includes/masthead.html
_includes/scripts.html
```

如果样式并入现有 SCSS，则还需要修改对应 SCSS 入口文件。

---

## 5. 实施阶段

## 阶段 A：准备工作

### A-1. 检查当前仓库状态

```bash
git status
git branch --show-current
```

验收条件：

- [ ] 当前工作区干净。
- [ ] 当前分支为 `feature/cv-language-toggle`。
- [ ] 没有未提交的历史修改。

### A-2. 确认本地依赖

```bash
ruby --version
bundle --version
```

如未安装 Bundler：

```bash
gem install bundler
```

安装项目依赖：

```bash
bundle install
```

验收条件：

- [ ] `bundle install` 成功。
- [ ] 没有依赖冲突。
- [ ] Jekyll 可以正常运行。

---

## 阶段 B：拆分 CV 内容

### B-1. 创建 CV include 目录

```bash
mkdir -p _includes/cv
```

### B-2. 创建中文 CV 文件

目标文件：

```text
_includes/cv/cv-zh.md
```

任务：

- [ ] 将 `_pages/about.md` 中现有 CV 正文迁移到该文件。
- [ ] 保留原有 Markdown 和 HTML 结构。
- [ ] 不修改专利、奖项、教育经历等内容。
- [ ] 不修改链接地址。
- [ ] 不修改图片资源。

验收条件：

- [ ] 中文 CV 内容完整。
- [ ] 页面结构与迁移前一致。
- [ ] 所有链接仍然保留。

### B-3. 创建英文 CV 文件

目标文件：

```text
_includes/cv/cv-en.md
```

建议英文结构：

```markdown
Intro

Research Interests
==================

Education
=========

Honors and Awards
=================

Intellectual Property
=====================

Patents
-------

Software Copyrights
-------------------

Last updated
```

任务：

- [ ] 完成人物简介英文版。
- [ ] 完成研究方向英文版。
- [ ] 完成教育经历英文版。
- [ ] 完成奖项英文版。
- [ ] 完成专利英文版。
- [ ] 完成软件著作权英文版。
- [ ] 校对学校、实验室和导师姓名。
- [ ] 校对竞赛官方英文名称。
- [ ] 校对专利状态和排名表述。

验收条件：

- [ ] 英文内容不依赖在线翻译。
- [ ] 中英文信息一致。
- [ ] 日期、排名、编号完全一致。
- [ ] 所有链接与中文版一致。

---

## 阶段 C：重构首页 CV 容器

目标文件：

```text
_pages/about.md
```

建议结构：

```liquid
---
permalink: /
title: "个人简历"
excerpt: "CV"
author_profile: true
redirect_from:
  - /about/
  - /about.html
---

{% include base_path %}

<section
  id="cv-zh"
  class="cv-language"
  data-cv-language="zh"
  lang="zh-CN"
  markdown="1"
>
{% include cv/cv-zh.md %}
</section>

<section
  id="cv-en"
  class="cv-language"
  data-cv-language="en"
  lang="en"
  markdown="1"
  hidden
>
{% include cv/cv-en.md %}
</section>
```

任务：

- [ ] 保留原有 Front Matter。
- [ ] 中文容器使用 `lang="zh-CN"`。
- [ ] 英文容器使用 `lang="en"`。
- [ ] 中文容器默认可见。
- [ ] 英文容器默认带 `hidden`。
- [ ] 使用 `data-cv-language` 标识语言。
- [ ] 确认 include 中 Markdown 可被正常解析。

验收条件：

- [ ] 禁用 JavaScript 时仍能显示中文 CV。
- [ ] 英文 CV 默认不显示。
- [ ] 页面 URL 仍然为 `/`。
- [ ] 原有 `/about/` 重定向保持不变。

---

## 阶段 D：增加语言切换按钮

目标文件：

```text
_includes/masthead.html
```

建议将语言按钮放在亮暗模式按钮左侧。

建议结构：

```html
<li id="language-toggle" class="masthead__menu-item persist tail">
  <button
    type="button"
    class="language-toggle__button"
    aria-label="Switch CV language to English"
    aria-pressed="false"
    title="Switch CV language"
  >
    <i class="fa-solid fa-language" aria-hidden="true"></i>
    <span id="language-toggle-label">EN</span>
  </button>
</li>
```

任务：

- [ ] 增加 `language-toggle` 容器。
- [ ] 使用原生 `<button>`。
- [ ] 增加语言图标。
- [ ] 默认按钮文案为 `EN`。
- [ ] 增加 `aria-label`。
- [ ] 增加 `aria-pressed`。
- [ ] 保证按钮与主题按钮相邻。
- [ ] 不修改现有主题按钮逻辑。

验收条件：

- [ ] 桌面端导航布局正常。
- [ ] 移动端按钮不会严重挤压导航。
- [ ] 按钮可通过键盘聚焦。
- [ ] 按下 Enter 或 Space 可触发。

---

## 阶段 E：实现语言切换脚本

目标文件：

```text
assets/js/language-toggle.js
```

建议功能模块：

### E-1. 常量

```javascript
const STORAGE_KEY = "cv-language";
const SUPPORTED_LANGUAGES = new Set(["zh", "en"]);
```

### E-2. 获取语言状态

规则：

- 优先读取 `localStorage`。
- 只接受 `zh` 或 `en`。
- 无有效状态时默认 `zh`。
- 首次访问不自动依据浏览器语言切换。

### E-3. 设置页面语言

需要同步更新：

- [ ] 中文 CV 容器显示状态。
- [ ] 英文 CV 容器显示状态。
- [ ] `<html lang>`。
- [ ] 语言按钮文字。
- [ ] 按钮 `aria-label`。
- [ ] 按钮 `aria-pressed`。
- [ ] 页面可见标题。
- [ ] 浏览器标签页标题。
- [ ] `localStorage`。

### E-4. 切换逻辑

规则：

```text
zh -> en
en -> zh
```

### E-5. 非 CV 页面处理

规则：

- 页面不存在中英文 CV 容器时，隐藏语言按钮。
- 不抛出 JavaScript 异常。
- 不影响其他页面加载。

### E-6. 初始化

建议在 `DOMContentLoaded` 后执行：

```javascript
if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    initializeLanguageToggle
  );
} else {
  initializeLanguageToggle();
}
```

验收条件：

- [ ] 首次访问显示中文。
- [ ] 点击后显示英文。
- [ ] 再次点击恢复中文。
- [ ] 快速点击不会同时显示两种语言。
- [ ] 刷新后保留语言。
- [ ] 非 CV 页面无报错。
- [ ] 不影响主题切换。

---

## 阶段 F：加载脚本

目标文件：

```text
_includes/scripts.html
```

建议：

```liquid
<script type="module" src="{{ base_path }}/assets/js/main.min.js"></script>
<script defer src="{{ base_path }}/assets/js/language-toggle.js"></script>

{% include analytics.html %}
```

任务：

- [ ] 保留现有 `main.min.js`。
- [ ] 新增独立语言脚本。
- [ ] 使用 `defer`。
- [ ] 不重新打包 `main.min.js`。
- [ ] 不修改现有 Plotly、导航或主题逻辑。

验收条件：

- [ ] 主站脚本正常加载。
- [ ] 语言脚本返回 HTTP 200。
- [ ] 控制台没有加载错误。

---

## 阶段 G：增加样式

建议样式：

```scss
.language-toggle__button {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
}

.language-toggle__button:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 4px;
  border-radius: 3px;
}

#language-toggle-label {
  min-width: 1.8em;
  font-size: 0.85em;
  font-weight: 600;
  text-align: center;
}

.cv-language[hidden] {
  display: none !important;
}

@media (max-width: 600px) {
  .language-toggle__button {
    gap: 0.2rem;
  }

  #language-toggle-label {
    font-size: 0.75em;
  }
}
```

任务：

- [ ] 按钮样式与主题按钮协调。
- [ ] 增加键盘焦点样式。
- [ ] 保证 `hidden` 内容完全隐藏。
- [ ] 检查亮色主题。
- [ ] 检查暗色主题。
- [ ] 检查移动端。

验收条件：

- [ ] 按钮颜色自动继承主题。
- [ ] 中文和 `EN` 不发生明显跳动。
- [ ] 移动端文字不溢出。
- [ ] 暗色模式下按钮清晰可见。

---

## 6. 本地部署

### 6.1 启动开发服务器

```bash
bundle exec jekyll serve --livereload
```

访问：

```text
http://127.0.0.1:4000/
```

### 6.2 使用安全模式验证

```bash
bundle exec jekyll serve --safe --livereload
```

### 6.3 执行正式构建

```bash
bundle exec jekyll build
```

验收条件：

- [ ] 普通开发模式启动成功。
- [ ] 安全模式启动成功。
- [ ] 正式构建成功。
- [ ] `_site` 中首页生成正常。
- [ ] 无 Liquid 语法错误。
- [ ] 无 Markdown include 错误。

---

## 7. 功能测试清单

## 7.1 初始状态

- [ ] 清除 `localStorage` 后打开首页。
- [ ] 默认显示中文 CV。
- [ ] 英文 CV 不可见。
- [ ] 按钮显示 `EN`。
- [ ] `<html lang>` 为 `zh-CN`。
- [ ] 页面标题为中文。

## 7.2 中文切换英文

- [ ] 点击 `EN`。
- [ ] 中文 CV 隐藏。
- [ ] 英文 CV 显示。
- [ ] 按钮显示 `中文`。
- [ ] `<html lang>` 为 `en`。
- [ ] 页面标题变为英文。
- [ ] `localStorage["cv-language"]` 为 `en`。

## 7.3 英文切换中文

- [ ] 点击 `中文`。
- [ ] 英文 CV 隐藏。
- [ ] 中文 CV 显示。
- [ ] 按钮显示 `EN`。
- [ ] `<html lang>` 为 `zh-CN`。
- [ ] 页面标题恢复中文。
- [ ] `localStorage["cv-language"]` 为 `zh`。

## 7.4 刷新和持久化

- [ ] 英文状态刷新后仍为英文。
- [ ] 中文状态刷新后仍为中文。
- [ ] 关闭浏览器再打开后状态仍保留。
- [ ] 隐私窗口中恢复默认中文。

## 7.5 快速交互

- [ ] 连续快速点击按钮。
- [ ] 不会同时显示两种语言。
- [ ] 页面不会闪烁为空白。
- [ ] 控制台无异常。

---

## 8. 亮暗模式组合测试

测试以下四种组合：

| 语言 | 主题 | 验收 |
|---|---|---|
| 中文 | 亮色 | [ ] |
| 中文 | 暗色 | [ ] |
| English | Light | [ ] |
| English | Dark | [ ] |

检查项：

- [ ] 语言按钮在亮色模式可见。
- [ ] 语言按钮在暗色模式可见。
- [ ] 切换语言不改变主题。
- [ ] 切换主题不改变语言。
- [ ] 刷新后主题和语言均独立保留。
- [ ] 两个 `localStorage` 键互不覆盖。

预期键：

```text
theme
cv-language
```

---

## 9. 响应式测试

至少测试以下尺寸：

```text
375 × 667
768 × 1024
1440 × 900
```

检查项：

- [ ] 手机端按钮不溢出。
- [ ] 平板端导航布局正常。
- [ ] 桌面端按钮位置合理。
- [ ] `EN` 和 `中文` 不换行。
- [ ] 按钮进入隐藏导航时仍可用。
- [ ] 语言图标和文字对齐正常。

---

## 10. 无障碍测试

- [ ] 使用 Tab 键可聚焦语言按钮。
- [ ] 焦点轮廓清晰。
- [ ] Enter 可切换语言。
- [ ] Space 可切换语言。
- [ ] `aria-label` 随语言更新。
- [ ] `aria-pressed` 状态正确。
- [ ] 当前页面语言通过 `<html lang>` 正确表达。
- [ ] 隐藏 CV 不被键盘访问。

---

## 11. 无 JavaScript 降级测试

禁用浏览器 JavaScript 后刷新首页。

验收条件：

- [ ] 中文 CV 正常显示。
- [ ] 英文 CV 保持隐藏。
- [ ] 页面主体不为空。
- [ ] 原有导航仍然可用。
- [ ] 原有链接仍然可点击。
- [ ] 不影响其他页面。

---

## 12. 其他页面回归测试

检查已有非首页页面。

验收条件：

- [ ] 语言按钮自动隐藏。
- [ ] 页面内容未被隐藏。
- [ ] 原有文章正常渲染。
- [ ] 图片行为没有发生变化。
- [ ] 亮暗模式仍正常。
- [ ] 导航仍正常。
- [ ] 控制台无 JavaScript 错误。

---

## 13. 代码质量检查

```bash
git diff --check
git status
git diff
```

检查项：

- [ ] 无行尾空格。
- [ ] 无无关格式化。
- [ ] 无图片路径修改。
- [ ] 无 `_posts` 修改。
- [ ] 无 `images` 目录修改。
- [ ] 无 `files` 目录修改。
- [ ] 无 `main.min.js` 大范围变化。
- [ ] 无 `_site` 被加入 Git。
- [ ] 无 `node_modules` 被加入 Git。
- [ ] 无 `vendor` 被加入 Git。

---

## 14. 最终构建检查

```bash
bundle exec jekyll build
```

完成后检查：

```bash
git status
git diff --stat
git diff
```

验收条件：

- [ ] 构建成功。
- [ ] 只存在预期文件变更。
- [ ] 首页生成正确。
- [ ] 中英文内容完整。
- [ ] 无构建警告影响上线。

---

## 15. 提交准备

建议暂存：

```bash
git add   _pages/about.md   _includes/cv/cv-zh.md   _includes/cv/cv-en.md   _includes/masthead.html   _includes/scripts.html   assets/js/language-toggle.js
```

如果新增样式文件，再额外加入对应文件。

检查暂存内容：

```bash
git diff --cached
git diff --cached --stat
```

提交：

```bash
git commit -m "feat: add Chinese-English CV toggle"
```

提交后检查：

```bash
git show --stat
git show
```

验收条件：

- [ ] 提交只包含 CV 双语切换相关内容。
- [ ] 没有图片修复内容。
- [ ] 没有其他页面重构。
- [ ] 没有依赖锁文件意外变化。
- [ ] 提交信息清晰。

---

## 16. 推送前最终确认

在推送之前确认：

- [ ] 本地首页中文正常。
- [ ] 本地首页英文正常。
- [ ] 语言状态可持久化。
- [ ] 亮暗模式不受影响。
- [ ] 移动端布局正常。
- [ ] 非 CV 页面不受影响。
- [ ] Jekyll 构建成功。
- [ ] `git status` 干净。
- [ ] `git show` 内容符合预期。
- [ ] 已人工校对英文 CV。

确认完成后再推送：

```bash
git push -u origin feature/cv-language-toggle
```

---

## 17. 完成定义

本任务只有在以下条件全部满足时才算完成：

- [ ] 首页可以在中文和英文之间双向切换。
- [ ] 默认语言为中文。
- [ ] 用户语言选择可以保留。
- [ ] 页面标题和语言属性同步更新。
- [ ] 非 CV 页面不显示语言切换按钮。
- [ ] 亮暗模式功能不受影响。
- [ ] 禁用 JavaScript 时中文 CV 仍可访问。
- [ ] 本地 Jekyll 构建通过。
- [ ] 所有测试项通过。
- [ ] 修改范围没有超出 CV 双语切换。
- [ ] 推送前已经人工审核完整差异。

---

## 18. 后续可选任务

以下内容不属于本次任务，可在后续单独处理：

- 修复文章图片未渲染问题。
- 为其他页面增加双语支持。
- 增加浏览器语言自动检测。
- 增加独立 `/en/` 页面。
- 为 CV 增加 PDF 下载入口。
- 增加中英文 SEO metadata。
- 增加自动化前端测试。
- 增加 GitHub Actions 构建验证。
