---
title: "Weekend Registration System — Ski Zadov"
collection: portfolio
permalink: /portfolio/registration-system/
date: 2025-10-20
excerpt: "Production web app for a ski school: parents book weekend lessons online while PostgreSQL enforces the season quota, cutoffs and sibling accounts. Flask · PostgreSQL · Railway."
tags: [PostgreSQL, SQL, Flask, SQLAlchemy, Railway, Python, JavaScript]
header:
  teaser: /images/registration_system.png
classes: wide
---

**A booking system used by real customers: parents choose which winter weekends their children ski, and the database makes sure the course rules can't be broken.**

[Open the live app](https://vikendovelyzovani.zadov.cz/){: .btn .btn--primary target="_blank" }

The source code is private because it runs the school's real customer data. I'm happy to walk through it in an interview.
{: .notice--info}

| | |
|---|---|
| **Client** | Ski Zadov, our family ski school in Šumava |
| **My role** | Sole developer — requirements, database design, backend, frontend, deployment and data import |
| **Stack** | Python · Flask · SQLAlchemy · PostgreSQL · Railway · Gunicorn · vanilla JavaScript · Google Sheets |
| **Status** | In production since the 2025/26 winter season |

---

## The problem

Families buy a season course in the school's e-shop. That entitles each child to **8 lessons across a 12-weekend winter**, chosen week by week, in up to three time slots (Friday afternoon, Saturday morning, Saturday afternoon). Bookings for a weekend close **on Wednesday at midnight**.

Before this app, all of this was tracked by hand: counting lessons per child, chasing late sign-ups, and avoiding double bookings — while many families register **several siblings under one parent email**.

---

## Architecture

<figure>
  <img src="{{ '/images/registration-architecture.svg' | relative_url }}" alt="Parents use a custom domain served by a Flask web service on Railway, connected to PostgreSQL over Railway's private network. A one-off job imports enrolled students from the e-shop CSV. Staff read weekly attendance in Google Sheets through a token-protected JSON feed and can make admin overrides." style="width:100%;">
  <figcaption>Everything runs in one Railway project: the web service and PostgreSQL talk over the private network; staff work from Google Sheets.</figcaption>
</figure>

---

## Turning course rules into database logic

Each business rule has one clear owner in the system, so it can't be bypassed by a double click, a second browser tab or two parents booking at once.

| Course rule | How it's enforced |
|---|---|
| One booking per child, weekend and time slot | `UNIQUE (user_id, user_name, weekend_date, time_slot)` on `submissions` — re-submitting updates the row instead of duplicating it |
| Max 8 lessons per child per season | Count of accepted "yes" bookings inside the season window, checked before every insert; each time slot counts as one lesson |
| Siblings share a parent's email | A student is identified by **email + name**; the submitted name must match one of the students enrolled under that email |
| Only paying customers can book | Lookup against `enrolled_students`, imported from the e-shop export |
| Bookings close Wednesday 24:00 | Cutoff = weekend date − 3 days, compared in the `Europe/Prague` time zone so daylight-saving changes don't shift it |
| Staff can make exceptions | Token-protected admin override that skips quota and cutoff and records the reason in `note` |

### Data model

Three tables (`users`, `enrolled_students`, `submissions`); Postgres enums mean an invalid time slot or status simply cannot be stored. The two core tables:

```sql
CREATE TABLE enrolled_students (            -- who bought the course
  id          VARCHAR(255) PRIMARY KEY,      -- deterministic hash of email + name
  email       VARCHAR(255) NOT NULL,         -- not unique: siblings share it
  jmeno       VARCHAR(255) NOT NULL,
  prijmeni    VARCHAR(255) NOT NULL,
  is_active   BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE submissions (                  -- one row per child × weekend × slot
  id           SERIAL PRIMARY KEY,
  user_id      VARCHAR(255) NOT NULL REFERENCES users(user_id),
  user_name    VARCHAR(255),
  weekend_date DATE NOT NULL,
  time_slot    timeslotenum NOT NULL,        -- FRIDAY_1400 | SATURDAY_0815 | SATURDAY_1400
  answer       answerenum   NOT NULL,        -- ANO | NE
  status       statusenum   NOT NULL,        -- ACCEPTED | REJECTED
  submitted_at TIMESTAMP DEFAULT now(),
  note         TEXT,
  UNIQUE (user_id, user_name, weekend_date, time_slot)
);

CREATE INDEX idx_weekend       ON submissions (weekend_date);    -- weekly attendance lists
CREATE INDEX idx_user          ON submissions (user_id);         -- a family's bookings
CREATE INDEX idx_status_answer ON submissions (status, answer);  -- quota counts
```

Cancellations aren't deleted: the row flips to `NE / REJECTED`. That keeps a full history of what each family did and frees the lesson back into their quota automatically.

### Preventing race conditions

The quota check is a classic *read-then-write*: count lessons, then insert. If two requests for the same family arrive together, both can read "7 used" and both insert, ending at 9.

Every booking therefore runs inside a **PostgreSQL advisory lock keyed on the family's email** (`pg_try_advisory_lock`). Requests for the same family are serialised, while different families never wait for each other. If the lock isn't free, the user gets a clear "try again" message instead of a wrong result.

---

## Deployment on Railway

- **Deployed from GitHub** with a Nixpacks build and Gunicorn as the production server (`railway.json` holds the start command, health check and restart policy).
- **App and database on Railway's private network.** The app prefers `DATABASE_PRIVATE_URL` and only falls back to the public URL, and normalises the `postgres://` scheme Railway provides into what SQLAlchemy expects.
- **Resilient connections.** A start-up check retries until Postgres is reachable; the connection pool uses `pool_pre_ping` and recycles connections every 30 minutes so idle drops don't surface as errors.
- **Self-healing.** A `/health` endpoint is used by Railway's health check, and the service restarts automatically on failure.
- **Secrets only in environment variables.** A setup script generates the keys, and the app refuses to start in production if any default secret is still in place.
- **Custom domain** on the school's own domain, with HSTS, a Content-Security-Policy and per-endpoint rate limits.

### Importing customers from the e-shop

Enrolled students come from the e-shop's CSV export. A one-off import runs **inside Railway's environment** (`railway run`), so database credentials never leave the platform. Each student's ID is a deterministic hash of email + name, which makes the import **idempotent**: running it again updates existing students instead of creating duplicates.

### Attendance in Google Sheets

Instructors already work in Google Sheets, so instead of building an admin UI they had to learn, the app exposes token-protected JSON endpoints per weekend (attendance list and summary). The sheet pulls from them, so each weekend's list is always current.

---

## What I'd improve next

- **Schema migrations with Alembic** instead of creating tables at start-up, so the schema can evolve safely between seasons.
- **Automated tests in CI** for the quota, cutoff and sibling rules — the parts where a bug costs a family a lesson.
- **Season dates as configuration** rather than constants in code, so a new season needs no deploy.
- **A deterministic lock ID** (e.g. Postgres `hashtext`) so the per-family lock still holds if the service ever scales to several instances.