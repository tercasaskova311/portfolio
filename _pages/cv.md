---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
---

**Data engineer** focused on data architecture, pipelines and Earth observation. I design how data is modelled, stored and processed, and build the systems that run on it.

[Download CV (PDF)]({{ '/files/Tereza_Saskova_CV.pdf' | relative_url }}){: .btn .btn--primary}

## Experience

**Data Science Intern**, Fondazione Bruno Kessler (FBK), Digital Commons Lab, Trento, Italy  
*Feb 2026 to Aug 2026, continued as MSc thesis, TALEA project*

- Designed the pipeline and its data architecture, built around one DuckDB spatial database, to measure the 3-30-300 urban greenery rule across Italian cities from open orthophotos and OpenStreetMap
- Detected individual trees without training labels using DeepForest and SAM2, with per-city calibration and manual validation against annotated ground truth, and benchmarked against a fine-tuned detector
- Computed tree visibility from every address with per-floor GDAL viewsheds, canopy cover from vegetation indices (ExG, NDVI) aggregated to H3 hexagons, and park access with network routing (OSMnx, GraphHopper)
- Acquired data from regional WMS services and detected and corrected wrong image resolutions and distorted pixels
- Ran multi-city workloads on GPU cloud (RunPod) with resumable processing

*Python, PyTorch, DeepForest, SAM2, GDAL, rasterio, GeoPandas, DuckDB, OSMnx, QGIS*

**Data Analyst**, Ski Zadov (ski and bike school), South Bohemia, Czechia  
*Sep 2023 to Dec 2025*

- Designed and built the weekend registration system used in production (see Projects)
- Analysed marketing campaign data and measured campaign performance
- Cleaned, filtered and managed client data in SQL for registrations and marketing
- Built ETL from e-shop exports into PostgreSQL and an attendance feed to Google Sheets
- Led ski and MTB programmes, including the summer kids' programme

## Projects

**Weekend Registration System**, Ski Zadov, *2025 to present*, [details](/portfolio/registration-system/)  
A booking system parents use to choose which winter weekends their children ski. Each child gets 8 lessons across 12 weekends in three time slots, and bookings close every Wednesday at midnight. I designed the PostgreSQL schema so constraints and advisory locks enforce these rules, even when parents book at the same time. Deployed on Railway.  
*Python, Flask, SQLAlchemy, PostgreSQL, Railway*

**Logiwise**, Gruber Logistics Hackathon, *2026*  
Designed the team's data architecture: a layered DuckDB pipeline with append-only raw API snapshots, rebuildable feature tables and scored results, feeding a truck routing optimiser. Best score 932/1000.  
*Python, DuckDB, Streamlit*

**Podcast Recommendation Platform**, University of Trento, team project, *2025*, [details](/portfolio/podcast-platform/)  
An event-driven hybrid recommender combining speech-to-text, transcript embeddings with KNN, and implicit-feedback ALS on streamed user events. I owned ingestion, the Kafka and Spark pipelines, and model training.  
*Kafka, Spark (Streaming, ML), Delta Lake, Airflow, MongoDB, DuckDB, Docker*

**Parallel Spectral Clustering**, HPC cluster, *2025*  
Distributed spectral clustering with a ScaLAPACK eigensolver and k-means across MPI ranks, with a strong and weak scaling study.  
*C, MPI, ScaLAPACK, PBS*

**Forest Loss Monitoring, Šumava National Park**, personal project, *ongoing*  
Detecting logging and forest cover change from Sentinel-2 imagery.  
*Google Earth Engine, Sentinel-2, Python*

## Education

**MSc Data Science**, University of Trento, Italy, *2024 to 2026*  
Specialisation: big data engineering and geospatial analysis  
Coursework: Machine Learning, Statistical Learning, Foundation Models, Big Data Technologies, High Performance Computing, Geospatial Analysis, Signal, Image and Video Processing

**Certificates:** Google Data Analytics Professional Certificate (Coursera, 2022), IBM Introduction to Software Engineering (Coursera, 2023)

## Skills

| | |
|---|---|
| **Architecture** | Data modelling, pipeline design, batch and streaming, lakehouse, schema constraints, distributed computing |
| **Languages** | Python, SQL, R, C |
| **Data engineering** | Spark, Kafka, Airflow, Delta Lake, DuckDB, PostgreSQL, MongoDB, Docker |
| **ML and CV** | PyTorch, scikit-learn, Spark ML, DeepForest, SAM2, sentence embeddings |
| **Geospatial and EO** | GDAL, rasterio, GeoPandas, QGIS, Google Earth Engine, OSMnx, H3 |
| **Deployment** | Flask, Railway, GPU cloud (RunPod), Git, GitHub |

## Other experience

- **180 Degrees Consulting:** student consultant on data projects with NGOs (Oct 2023 to Jul 2024)
- **Česko.Digital:** volunteer content creator for civic tech initiatives
- **Future Founder, NOI Techpark:** start-up programme in idea testing and pitching
- **Ski instructor** at Viamode, Saas-Fee, Switzerland (May 2023 to Apr 2024), **MTB guide** in Finale Ligure, Italy, and freelance English tutor

## Sport

Former professional XCO mountain biker: **Junior Vice-World Champion**, World Cup winner, 13th overall in the U23 World Cup, and multiple Czech national champion.