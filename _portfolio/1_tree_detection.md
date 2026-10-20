---
title: "Annotation-Free Tree Crown Detection"
collection: portfolio
permalink: /portfolio/singletree-detection/
date: 2026-08-30
excerpt: "Finding individual tree crowns in open aerial imagery with no training labels: a tree detector proposes, SAM2 draws the outline, simple rules decide. Part of my MSc thesis with FBK."
tags: [Computer Vision, Earth Observation, Object Detection, Segmentation, DeepForest, SAM2, PyTorch]
header:
  teaser: /images/tree-detection-delineate.jpg
classes: wide
---

**Can you find every individual tree in a city from free aerial photos, without labelling a single tree for training?**

This is the detection stage of my MSc thesis at the University of Trento, built with the FBK Digital Commons Lab. It works on open municipal orthophotos (plain RGB aerial images) from several Italian cities.

The thesis hasn't been defended yet, so this page shows the method visually. Quantitative results will follow after the defence.
{: .notice--info}

| | |
|---|---|
| **Context** | MSc thesis, University of Trento × FBK Digital Commons Lab, 2026 |
| **My role** | Designed and built the detection pipeline end to end |
| **Stack** | Python · PyTorch · DeepForest · SAM2 · GDAL · rasterio · GeoPandas · DuckDB spatial |

---

## The idea in one line

A tree detector knows **what** a tree is; a segmentation foundation model knows **where** an object's edge is. Neither does both, so the pipeline lets each do its own job and uses simple rules to settle disagreements.

---

## Step 1 Propose: where are the trees?

<figure>
  <img src="{{ '/images/deepforest.png' | relative_url }}" alt="Aerial image of a residential area next to a wooded park, with red boxes around individual tree crowns" style="width:100%; border-radius:8px;">
  <figcaption>DeepForest's crown boxes over a mixed scene: houses and streets on the left, a wooded slope in the centre, open meadow on the right.</figcaption>
</figure>

Each red box is one tree proposed by **DeepForest**, a detector pretrained on tree crowns, used here as-is with no fine-tuning.

What to notice:

- **Isolated trees** in the meadow and along the streets get clean, tight boxes — the easy case.
- **Dense canopy** in the centre is the hard case: crowns touch, and the detector has to decide where one tree ends. It splits the canopy into many individual proposals instead of one green blob.
- **Mixed urban surroundings** — red roofs, parked cars, lawns and shadows — are mostly left alone, but boxes only say "roughly here". A box is a rectangle; a crown isn't.

To make one detector work across cities, images are cut into tiles that always cover the **same ground area**, whatever the camera resolution, so a tree looks the same size to the model in every city.

---

## Step 2 Delineate: what shape is each tree?

<figure>
  <img src="{{ 'images/sam2.png' | relative_url }}" alt="The same aerial image with yellow outlines tracing the irregular shape of each tree crown" style="width:100%; border-radius:8px;">
  <figcaption>The same scene after SAM2: every box has become an outline of the actual crown.</figcaption>
</figure>

Each box from step 1 is given to **SAM2** (Segment Anything Model 2) as a prompt, and SAM2 traces the crown inside it.

What changes compared to step 1:

- **Shapes follow the canopy.** The outlines are irregular, like real crowns, instead of squares. That matters for anything measured downstream, such as crown area.
- **Shadows and background drop out.** On the meadow trees, the outline hugs the crown rather than the shadow or the grass that a box also contains.
- **Touching crowns get separate outlines**, so the dense centre becomes a mosaic of individual trees.

To keep this fast at city scale, each image chip is encoded by SAM2 **once**, and all boxes in it reuse that encoding.

---

## Step 3 Gate: keep or reject?

No labels means no learned way to tell a good result from a bad one. Instead, every outline has to pass a few checks that any real tree crown satisfies:

- **Is it green?** A vegetation index rejects rooftop edges, roads and dark shadows that occasionally get boxed.
- **Is it a plausible size?** Very tiny or huge outlines are dropped.
- **What if segmentation fails?** The original box is kept, so a tree the detector found is never lost because of a bad outline.

---

## Why this approach

- **Open data only.** RGB orthophotos are published by most cities, unlike LiDAR or tree inventories.
- **No labels, by design.** Fine-tuning was tested as an alternative and compared carefully; the label-free route transfers to a new city without anyone annotating trees there.
- **Each tree becomes an object.** That's what the rest of my thesis needs — for example, checking whether people can see trees from their homes.

Full results and the fine-tuning comparison will be added after the thesis defence.