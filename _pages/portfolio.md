---
layout: archive
title: "Portfolio"
permalink: /portfolio/
author_profile: true
entries_layout: grid
classes: wide
---

{% assign portfolio_items = site.portfolio | sort: "date" | reverse %}
{% for item in portfolio_items %}
  {% include archive-single.html %}
{% endfor %}

