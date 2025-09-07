---
title: "Blog"
layout: collection
permalink: /blog/
author_profile: false
entries_layout: list
---
{% for post in site.posts %}
  {% include archive-single.html post=post %}
{% endfor %}
