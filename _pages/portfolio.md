---
layout: archive
title: "Portfolio"
permalink: /portfolio/
author_profile: true
entries_layout: grid
---

{% include base_path %}

{% for item in site.portfolio %}
  {% include archive-single.html %}
{% endfor %}
