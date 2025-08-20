---
layout: archive
title: "Curriculum Vitae"
permalink: /cv-json/
author_profile: false
redirect_from:
  - /resume-json
---

<!-- Render the CV from JSON -->
{% include cv-template.html %}

<!-- Download options -->
<div class="cv-download-links">
  <a href="{{ base_path }}/files/cv.pdf" class="btn btn--primary">
    <i class="fas fa-file-pdf"></i> Download PDF
  </a>
  <a href="{{ base_path }}/cv/" class="btn btn--inverse">
    <i class="fas fa-code"></i> View Markdown Version
  </a>
</div>
