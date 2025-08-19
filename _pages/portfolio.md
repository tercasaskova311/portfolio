---
layout: archive
title: "Portfolio"
permalink: /portfolio/
author_profile: false     # set true if you want the left sidebar
entries_layout: grid      # <-- card/grid layout
classes: wide             # optional: wider content area
---

{% include base_path %}

{% for item in site.portfolio %}
  {% include archive-single.html %}
{% endfor %}
