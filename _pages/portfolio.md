---
layout: archive
title: "Portfolio"
permalink: /portfolio/
author: "Tereza Sásková"      # must exactly match the key in authors.yml
author_profile: true
entries_layout: grid
classes: wide
---

{% for item in site.portfolio %}
  {% include archive-single.html %}
{% endfor %}
