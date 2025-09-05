---
title: "Config Debug"
permalink: /config-debug/
layout: single
---

- site.theme: `{{ site.theme | inspect }}`
- site.remote_theme: `{{ site.remote_theme | inspect }}`
- jekyll.environment: `{{ jekyll.environment }}`
