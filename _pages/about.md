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
