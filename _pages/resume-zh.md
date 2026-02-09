---
layout: archive
title: "个人简历"
permalink: /resume-zh/
author_profile: true
---

{% include base_path %}

教育背景
======
* **硕士**, 杭州电子科技大学, 2025 (预计毕业)
* **学士**, 杭州电子科技大学, 2021-2025

项目/工作经历
======
* **2024 春季: Academic Pages 贡献者**
  * GitHub 大学
  * 主要工作：模板的更新与改进
  * 负责人：用户

* **2015 秋季: 研究助理**
  * GitHub 大学
  * 主要工作：合并 Pull Requests
  * 导师：Hub 教授

技能专长
======
* **编程语言:** Python, C++, Java
* **专业技能:** 深度学习, 自动化测试
* **语言能力:** 英语 (CET-6), 普通话 (母语)

主要论文
======
  <ul>{% for post in site.publications reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>
  
学术报告
======
  <ul>{% for post in site.talks reversed %}
    {% include archive-single-talk-cv.html  %}
  {% endfor %}</ul>
  
教学经历
======
  <ul>{% for post in site.teaching reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>
  
社会服务与荣誉
======
* 某某奖学金 (2023)
* 某某竞赛一等奖 (2022)
