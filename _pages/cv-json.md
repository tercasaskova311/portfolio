---
layout: archive
title: "Curriculum Vitae"
permalink: /cv-json/
author_profile: false
redirect_from:
  - /resume-json
---

{% include base_path %}

<!-- Load styles -->
<link rel="stylesheet" href="{{ base_path }}/assets/css/cv-style.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

<!-- Inline layout tweaks -->
<style>
  .archive {
    width: 90%;
    margin: 0 auto;
    float: none;
    padding-right: 0;
  }

  @media (min-width: 80em) {
    .archive {
      width: 75%;
    }
  }

  .cv-download-links {
    margin-top: 2em;
    display: flex;
    gap: 1em;
    flex-wrap: wrap;
  }

  .cv-download-links a {
    text-decoration: none;
  }
</style>

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
