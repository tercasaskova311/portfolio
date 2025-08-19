---
layout: archive
title: "Portfolio"
permalink: /portfolio/
author_profile: false
entries_layout: grid
classes: wide
---

{% include base_path %}

{% for item in site.portfolio %}
  {% include archive-single.html %}
{% endfor %}
