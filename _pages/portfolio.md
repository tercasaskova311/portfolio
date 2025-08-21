---
layout: archive
title: "Portfolio"
permalink: /portfolio/
author_profile: false      # ← remove the left author sidebar to gain width
entries_layout: list       # ← was grid
classes: wide
---

{% assign portfolio_items = site.portfolio | sort: "date" | reverse %}
{% for post in portfolio_items %}
  {% include archive-single.html type="list" %}
{% endfor %}
{%- comment -%} one item per row {%- endcomment -%}
