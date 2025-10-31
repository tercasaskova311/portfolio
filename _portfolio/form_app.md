---
title: "Weekly Registration System for Ski School Ski Zadov"
collection: portfolio
permalink: /portfolio/registration-system/
date: 2025-09-20
excerpt: "Weekly Registration System for Ski School, providing a system for weekly ski school lessons. Customers buy a season course and then have a possibility to choose 8 out of 12 weeks. This app povide a registration platform for each week."
repo: https://github.com/tercasaskova311/form_app
tags: [Flask, PostgreSQL, sqlalchemy, python, java, railway.app]
header:
  teaser: 
classes: wide
---

## Weekly Registration System for Ski School

This project is application for a family business, production-ready web application developed for Ski Zadov, my family ski school, to automate and manage weekly registrations for their seasonal ski course. The system replaces a cumbersome manual check-up process, enabling customers to efficiently book their limited weekly lessons and allowing administrators to manage capacity and attendance.

<img src="{{ 'images/registration_system.png' | relative_url }}" style="width:240px; float:right; margin:0 0 1rem 1.5rem; border-radius:12px; box-shadow:0 6px 18px rgba(0,0,0,0.15);">


## Core Problem & Solution

Problem

Customers purchase a season course, which offer them up to 8 lessons out of a total of 12 available weeks throughout the winter. The challenge was managing this constrints, preventing over-registration, handling multiple possible time slots per weekend, and providing a reliable cutoff time for weekly booking. The previous manual check-up process was time-consuming and error-prone.

- manual registration check up
- possibility to registr for 8 out of 12 weeks during the winter 
- regitration always open till 24:00 wednesday every week
- possibility to choose both friday and saturday given week

## Architecture of the solution

I have decided to use railway app to deploy my system app which run on postgreSQl, as I thougth this would be the most relieable and suitable databese system. I developed a scalable Flask application that enforces the business logic while providing a clear and secure registration platform.

- Management: Tracks the total number of lessons booked against the user's limit of 8 per season.
- Time Slot Booking: Allows users to choose from specific, defined time slots (Friday 14:00, Saturday 08:15, Saturday 14:00), supporting more granular capacity planning than a simple "day choice."
- Registration Deadline: Automatically enforces a weekly registration cutoff (e.g., Wednesday at 24:00).
- Automated Admin Interface: Provides a streamlined way for administrators to check attendance via an optimized interface and Google Sheets integration.
  
## Architecture and Technology Stack

- Database	PostgreSQL (Managed by Railway)
- ORM	SQLAlchemy	Manages database interactions - defining models for User, Submission, and EnrolledStudent with complex constraints.
- Deployment	Railway.app	Platform - for continuous deployment and hosting of the application and PostgreSQL database
- Backend	Flask (Python)
- html fscripts for UX - form and attendated
- Google Sheets API	- Synchronizes attendance data for fast, real-time check-ins by ski school staff
- importing csv from registrastion (eshop)
- secure import 

Key Development Details

- Database Migration: Implemented a dedicated migrate_to_timeslots.py script to safely transition the database schema from the old day_choice column to the new, more flexible, and constrained time_slot system without data loss.
- Data Integrity: Utilized a Unique Constraint (ux_user_week_timeslot) to prevent duplicate submissions by the same user for the same weekend and time slot.
- Secure Import: Developed a secure import_wix.py script to periodically import and update the master list of entitled students from an external CSV source (like an e-shop export), ensuring only registered students can participate.
- Environment Configuration: Employed a robust config.py module to manage environment-specific settings (development, testing, production) and securely handle sensitive variables like ADMIN_TOKEN and database credentials.