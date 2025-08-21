---
layout: archive
title: "Portfolio"
permalink: /portfolio/
author_profile: true
entries_layout: grid
classes: wide
---

{% assign portfolio_items = site.portfolio | sort: "date" | reverse %}
{% for post in portfolio_items %}
  {% include archive-single.html type="grid" %}
{% endfor %}
