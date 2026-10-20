---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
---

**Data scientist** — machine learning, computer vision and data pipelines, with a focus on Earth observation and geospatial data.

[Download CV (PDF)]({{ '/files/Tereza_Saskova_CV.pdf' | relative_url }}){: .btn .btn--primary}

---

## Experience

**Data Science Intern** — Fondazione Bruno Kessler (FBK), Digital Commons Lab · Trento, Italy  
*Feb – Aug 2026 · continued as MSc thesis · TALEA project*

- Built an end-to-end pipeline measuring the 3-30-300 urban-greenery rule across Italian cities from open orthophotos and OpenStreetMap
- Individual tree detection without training labels: DeepForest detection + SAM2 segmentation, per-city calibration, manual validation against annotated ground truth; benchmarked against a fine-tuned detector
- Tree visibility from every address with per-floor GDAL viewsheds; canopy cover from vegetation indices (ExG / NDVI) aggregated to H3 hexagons; park access via network routing (OSMnx, GraphHopper)
- Data acquisition from regional WMS services, including detection and correction of wrong image resolutions and distorted pixels
- Ran multi-city workloads on GPU cloud (RunPod) with DuckDB spatial as the analytical store, with resumable processing

*Python · PyTorch · DeepForest · SAM2 · GDAL · rasterio · GeoPandas · DuckDB · OSMnx · QGIS*

**Database Coordinator & Program Lead** — Sport Šumava & Ski Zadov (ski & bike schools) · South Bohemia, Czechia  
*Sep 2023 – Dec 2025*

- Designed and built the weekend registration system for Ski Zadov (see Projects)
- Cleaned and managed client data in SQL for registrations and marketing
- Marketing analytics: campaign design and data-driven performance evaluation
- Led ski and MTB programs, including the summer kids' program

---

## Projects

**Weekend Registration System** — Ski Zadov · *2025 – present* · [details](/portfolio/registration-system/)  
Production booking app for a ski school. PostgreSQL schema with constraints and advisory locks enforcing season quotas, weekly cutoffs and sibling accounts; deployed on Railway; attendance feed to Google Sheets.  
*Python · Flask · SQLAlchemy · PostgreSQL · Railway*

**Podcast Recommendation Platform** — University of Trento, team project · *2025* · [details](/portfolio/podcast-platform/)  
Hybrid recommender: speech-to-text, transcript embeddings + KNN, and implicit-feedback ALS on streamed user events. Owned ingestion, Kafka/Spark pipelines and model training.  
*Kafka · Spark (Streaming, ML) · Delta Lake · Airflow · MongoDB · DuckDB · Docker*

**Forest Loss Monitoring, Šumava National Park** — personal project · *ongoing*  
Detecting logging and forest-cover change from Sentinel-2 imagery.  
*Google Earth Engine · Sentinel-2 · Python*

---

## Education

**MSc Data Science** — University of Trento, Italy · *Sep 2024 – expected [month] 2026*  
Specialisation: big data engineering and geospatial analysis  
Coursework: Machine Learning · Statistical Learning · Foundation Models · Big Data Technologies · High Performance Computing · Geospatial Analysis · Signal, Image and Video Processing

**Certificates:** Google Data Analytics Professional Certificate (Coursera, 2022), IBM - introduction to software engineering (Cousera, 2023)

---

## Skills

| | |
|---|---|
| **Languages** | Python · SQL · R · C (basics) |
| **ML & CV** | PyTorch · scikit-learn · Spark ML · DeepForest · SAM2 · sentence embeddings |
| **Data engineering** | Spark · Kafka · Airflow · Delta Lake · DuckDB · PostgreSQL · MongoDB · Docker |
| **Geospatial & EO** | GDAL · rasterio · GeoPandas · QGIS · Google Earth Engine · OSMnx · H3 |
| **Deployment** | Flask · Railway · GPU cloud (RunPod) · Git / GitHub |

---

## Other experience

- **180 Degrees Consulting** — student consultant, data-driven projects with NGOs (Oct 2023 – Jul 2024)
- **Česko.Digital** — volunteer content creator for civic-tech initiatives
- **Future Founder, NOI Techpark** — start-up programme: idea testing and pitching
- **Ski instructor** — Viamode, Saas-Fee, Switzerland (May 2023 – Apr 2024); **MTB guide** — Finale Ligure, Italy; freelance English tutor

## Sport

Former professional XCO mountain biker: **Junior Vice-World Champion**, World Cup winner, 13th U23 World Cup overall, multiple Czech national champion.