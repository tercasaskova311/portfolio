---
layout: single
title: "Gallery"
permalink: /gallery/
classes: wide
author_profile: true
---

<style>
.masonry-gallery {
  column-count: 3;
  column-gap: 20px;
  padding: 20px 0;
}

.masonry-gallery img {
  width: 100%;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  transition: transform 0.3s ease;
  break-inside: avoid;
}

.masonry-gallery img:hover {
  transform: scale(1.02);
}

@media (max-width: 768px) {
  .masonry-gallery {
    column-count: 2;
  }
}

@media (max-width: 480px) {
  .masonry-gallery {
    column-count: 1;
  }
}
</style>

<div class="masonry-gallery">
      <img src="{{ '/images/gallery_4 2.jpg' | relative_url }}" alt="pic1">
      <img src="{{ '/images/gallery_3.jpg' | relative_url }}" alt="pic2">
      <img src="{{ '/images/gallery1.jpg' | relative_url }}" alt="pic3">
      <img src="{{ '/images/canada.JPG' | relative_url }}" alt="pic4">
      <img src="{{ '/images/homepage.JPG' | relative_url }}" alt="pic5">
      <img src="{{ '/images/MS-mtb-juniorky_tereza-cil.jpg' | relative_url }}" alt="pic6">
      <img src="{{ '/images/IMG_0016 2.JPG' | relative_url }}" alt="pic7">
      <img src="{{ '/images/DSC00707.jpg' | relative_url }}" alt="pic8">
      <img src="{{ '/images/DSC00824.jpg' | relative_url }}" alt="pic9">
      <img src="{{ '/images/DSC00834.JPG' | relative_url }}" alt="pic10">
      <img src="{{ '/images/DSC00849.JPG' | relative_url }}" alt="pic11">
</div>

