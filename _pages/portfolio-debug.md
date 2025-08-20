---
layout: single
title: "Portfolio Debug"
permalink: /portfolio-debug/
---

Found items: {{ site.portfolio | size }}

{% for it in site.portfolio %}
- {{ it.path }} — **{{ it.title | default: "(no title)" }}**
{% endfor %}
