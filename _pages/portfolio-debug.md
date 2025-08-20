---
layout: single
title: "Portfolio Debug"
permalink: /portfolio-debug/
---

Total items: {{ site.portfolio | size }}

{% for p in site.portfolio %}
- title: {{ p.title }}
  path: {{ p.path }}
  output: {{ p.output }}
  url: {{ p.url }}
  link: {{ p.link }}
  teaser: {{ p.header.teaser }}
{% endfor %}
