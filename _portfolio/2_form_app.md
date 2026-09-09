---
title: "Weekly Registration System for Ski School Ski Zadov"
collection: portfolio
permalink: /portfolio/registration-system/
date: 2025-10-20
excerpt: "A web app for Ski Zadov, automating weekly ski school registrations. Customers buy a season course and then choose 8 out of 12 weeks through this webpage each week."
repo: https://github.com/tercasaskova311/form_app
tags: [Flask, PostgreSQL, SQLAlchemy, Python, Java, Railway.app]
header:
  teaser: /images/registration_system.png
classes: wide
---

## Weekly Registration System for Ski School

This project is a production-ready webpage application developed for **Ski Zadov**, my family ski school, in order to automate and manage weekly registrations for their seasonal ski courses.

> 🏔️ **Live project:**  
> 👉 [https://vikendovelyzovani.zadov.cz/](https://vikendovelyzovani.zadov.cz/)  
> *(The live version is active, though the backend database is still being developed.)*

<img src="{{ 'images/registration_system.png' | relative_url }}" alt="Ski Zadov Registration System Screenshot" style="width:240px; float:right; margin:0 0 1rem 1.5rem; border-radius:12px; box-shadow:0 6px 18px rgba(0,0,0,0.15);" />

---

## Core Problem & Solution

### Problem

Customers purchase a season course, which entitles them to up to 8 lessons out of 12 available weeks during the winter with a possibility a book a given weekend lesson till each wednesday night. Managing these constraints manually, ensuring no over-booking, handling multiple time slots, and enforcing weekly cutoffs, was time-consuming and error-prone.

### Solution

A **Flask + PostgreSQL** web app that:

- Automates registration limits (8 out of 12 weeks)
- Allows two/even three time slots per weekend (Friday/Saturday)
- Automatically closes registration every Wednesday at 24:00
- Provides an admin dashboard with Google Sheets synchronization

---

## Architecture Overview

### Tech Stack

- **Backend:** Flask (Python)
- **Database:** PostgreSQL (hosted on Railway)
- **ORM:** SQLAlchemy
- **Hosting:** Railway.app
- **Integrations:** Google Sheets API for attendance tracking
- **Import:** Secure CSV import of registered students from e-shop exports

### Key Features

- Unique constraints prevent duplicate registrations  
- Schema migration scripts for evolving database models  
- Secure environment handling via `config.py`  
- Optimized admin interface for real-time oversight  

---

## Live Deployment

🌐 **Live web app:** [https://vikendovelyzovani.zadov.cz/](https://vikendovelyzovani.zadov.cz/)  
*(Used in production by Ski Zadov to manage weekly registrations for the ski school.)*
