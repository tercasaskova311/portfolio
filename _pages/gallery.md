---
layout: single
title: "Gallery"
permalink: /gallery/
classes: wide
author_profile: true
---

<section class="carousel-wrap" aria-label="Photo gallery">
  <div class="carousel" id="heroCarousel" data-interval="4000" data-autoplay="true" tabindex="0">
    <!-- Slides (add or remove <div class="slide"> blocks as needed) -->
    <div class="slide" role="group" aria-roledescription="slide" aria-label="1 of 4">
      <img src="{{ '/images/39745de9-1b01-4bae-87a1-bb5a33bd4466.JPG' | relative_url }}" alt="pic1">
    </div>

    <div class="slide" role="group" aria-roledescription="slide" aria-label="2 of 4">
      <img src="{{ '/images/canada_2.jpg' | relative_url }}" alt="pic2">
    </div>

    <div class="slide" role="group" aria-roledescription="slide" aria-label="3 of 4">
      <img src="{{ '/images/NSE09478.JPG' | relative_url }}" alt="pic3">
    </div>

    <div class="slide" role="group" aria-roledescription="slide" aria-label="4 of 4">
      <img src="{{ '/images/NSE09830.JPG' | relative_url }}" alt="pic4">
    </div>

    <!-- Controls -->
    <button class="carousel__control prev" aria-label="Previous slide" data-action="prev">&#10094;</button>
    <button class="carousel__control next" aria-label="Next slide" data-action="next">&#10095;</button>

    <!-- Pagination / Dots -->
    <div class="carousel-dots" aria-hidden="false"></div>
  </div>

  <!-- JS fallback: static grid when JS disabled -->
  <noscript>
    <div class="gallery-grid-noscript">
      <img src="{{ '/images/39745de9-1b01-4bae-87a1-bb5a33bd4466.JPG' | relative_url }}" alt="pic1">
      <img src="{{ '/images/canada_2.jpg' | relative_url }}" alt="pic2">
      <img src="{{ '/images/NSE09478.JPG' | relative_url }}" alt="pic3">
      <img src="{{ '/images/NSE09830.JPG' | relative_url }}" alt="pic4">
    </div>
  </noscript>
</section>

<!-- include carousel JS (you can also add this script to your main layout) -->
<script src="{{ '/assets/js/carousel.js' | relative_url }}" defer></script>

