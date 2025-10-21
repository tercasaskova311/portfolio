---
title: "Weekend Ski Course Registration System"
collection: portfolio
permalink: /portfolio/ski-registration/
date: 2025-01-15
excerpt: "Production-grade Flask application with MySQL, access control, and quota management—handling real ski course registrations with concurrency guarantees and enrollment verification."
tags: [Flask, PostgreSQL, SQLAlchemy, Docker, Production Systems, Backend Development]
header:
  teaser: /images/portfolio/ski-registration/form-preview.png
classes: wide
---

This is a production backend system I built for managing weekend ski course registrations. It handles real users, enforces strict quota limits (max 8 weekends per a kid signed up for a season course), and includes enrollment verification, concurrency control, and automated deadline enforcement.

The system will go live in December 2025 and will be used by course participants to register for weekend ski sessions in Ski Zadov ski schol. It replaces manual spreadsheet management with a robust, automated solution that prevents double-bookings, enforces registration deadlines, and provides real-time attendance tracking.

---

## The Problem: Manual Registration Chaos

The ski course runs every weekend from December to March—12 weekends total. Each kid can attend up to 8 weekends, choosing either Friday or Saturday. The previous system used Google Forms + manual spreadsheet check up, which created several problems:

1. **No quota enforcement**: Students could accidentally register for more than 8 weekends
2. **Late registrations**: No automated deadline cutoff (Wednesday before each weekend)
3. **Manual verification**: Instructors had to cross-check enrollments against the official student list
4. **No attendance tracking**: Extracting weekly attendance required manual CSV exports

This wasn't sustainable for a course with around 200 kids registering across 12 weekends.

---

## Technical Requirements

### Core Functionality

- **Quota management**: Each student gets exactly 8 weekend slots (winter season: Dec 13, 2025 - Mar 7, 2026)
- **Access control**: Only enrolled students (verified via website registration form exported CSV) can register
- **Deadline enforcement**: Registrations close Wednesday before each weekend (3 days prior)
- **Day selection**: Students choose Friday OR Saturday for each weekend
- **Status tracking**: Submissions are either ACCEPTED or REJECTED (quota exceeded, late submission)
- **Concurrency safety**: Multiple users registering simultaneously must not cause race conditions

### Operational Requirements

- **Real-time attendance**: Ski school office needs instant access to weekly participant lists on thursday in order to create groups for friday.
- **CSV export**: Integration with Google Sheets for easy logistics planning
- **Admin overrides**: Manual approval for edge cases (medical emergencies, system errors)
- **Audit trail**: Track all submission attempts with timestamps and rejection reasons

---

## Architecture & Implementation

### Technology Stack

**Backend**: Flask with SQLAlchemy ORM  
**Database**: PostgreSQL 
**Deployment**: Docker Compose (multi-container setup)  
**Frontend**: Vanilla HTML/CSS/JavaScript (server-rendered, no framework overhead)  
**Infrastructure**: Wedos - shared DB 

### Database Schema

Three core tables with strategic indexing:

**users**:
- Stores basic user info (email as primary key, name, phone)
- Prevents duplicate user creation via INSERT IGNORE

**enrolled_students**:
- Imported from Wix CSV export (official course enrollment list)
- Columns: email (PK), jmeno (first name), prijmeni (last name), is_active
- Used for access control: only active enrollees can register

**submissions**:
- Primary registration records
- Columns: user_id, weekend_date, day_choice (PATEK/SOBOTA), answer (ANO/NE), status (ACCEPTED/REJECTED)
- Unique constraint: `(user_id, weekend_date, day_choice)` prevents duplicate registrations
- Indexed on: `weekend_date` (weekly lookups), `user_id` (quota queries)

### Concurrency Control: PostgreSQL Named Locks

The hardest problem was **ensuring atomic quota checks**. Without locking, this race condition was possible:

1. User A and User B both have 7 accepted weekends
2. Both request their 8th weekend simultaneously
3. Both read "7 accepted" → both think they're under the limit
4. Both insert → User A and B both get 8 weekends (incorrect: only one should succeed)

**Solution**: MySQL's `GET_LOCK()` function provides **user-level advisory locks**:
```python
def acquire_user_lock(session, user_id, timeout=5):
    lock_name = f"user_lock_{user_id}"
    res = session.execute(
        text("SELECT GET_LOCK(:name, :t) AS got"), 
        {"name": lock_name, "t": timeout}
    ).fetchone()
    return bool(res and (list(res)[0] == 1))
```

**How it works**:
- Before processing any submission, acquire a lock on `user_lock_{user_id}`
- Only one request per user can proceed at a time
- Lock automatically releases on transaction commit/rollback
- 5-second timeout prevents deadlocks

This guarantees **serializable isolation per user** without global table locks (other users' submissions proceed in parallel).

### Transaction Flow

Every submission goes through `submit_transactional()`:

1. **Enrollment check**: Verify email exists in `enrolled_students` table
2. **Acquire user lock**: Prevent concurrent modifications for this user
3. **Deadline validation**: Reject ANO answers after Wednesday cutoff (unless admin override)
4. **Quota check**: Count existing ACCEPTED+ANO submissions in winter date range
5. **State transition logic**:
   - Existing submission: Update answer/status if changed
   - New submission: Insert with appropriate status (ACCEPTED/REJECTED)
   - ANO → NE: Always accepted (freeing up quota)
   - NE → ANO: Check quota before accepting
6. **Commit + release lock**: Transaction guarantees atomicity

**Critical implementation detail**: SQLAlchemy auto-begins transactions, so calling `session.begin()` explicitly was causing nested transaction errors. The fix: trust the ORM's default behavior and only call `commit()` or `rollback()`.

---

## Key Features

### 1. Enrollment Verification

Environment variable `REQUIRE_ENROLLMENT=true` enables access control:
```python
def is_user_enrolled(session, email):
    if not REQUIRE_ENROLLMENT:
        return True, None
    
    student = session.query(EnrolledStudent).filter_by(
        id=email.lower().strip(),
        is_active=True
    ).first()
    
    return (True, f"{student.jmeno} {student.prijmeni}") if student else (False, None)
```

Frontend checks enrollment in real-time (AJAX call on email blur), displaying:
- ✓ Green badge: "Email ověřen - registrován jako: Jan Novák"
- ✗ Red badge: "Email není registrován v systému"

This prevents non-students from accessing the system while providing clear feedback.

### 2. Dynamic Weekend Generation

Frontend auto-generates all winter Saturdays (Dec 13, 2025 - Mar 7, 2026):
```javascript
function generateWinterWeekends() {
  const startDate = new Date('2025-12-13');
  const endDate = new Date('2026-03-07');
  const saturdays = [];
  
  let current = new Date(startDate);
  while (current.getDay() !== 6) current.setDate(current.getDate() + 1);
  
  while (current <= endDate) {
    saturdays.push(new Date(current));
    current.setDate(current.getDate() + 7);
  }
  return saturdays;
}
```

Past weekends are automatically disabled. The dropdown shows human-readable dates: "13. - 14. prosince 2025".

### 3. Google Sheets Integration

Endpoint `/sheets/attendance/{week_date}` returns CSV formatted for `IMPORTDATA()`:
```python
@app.route('/sheets/attendance/<week_date>', methods=['GET'])
def sheets_attendance(week_date):
    # Returns: Jméno,Email,Den,Přihlášeno
    # Format: Jan Novák,jan@email.cz,SOBOTA,20.12.2024 14:30
```

Instructors embed this in Google Sheets:
```
=IMPORTDATA("https://lyzovani.domain.com/sheets/attendance/2025-12-14")
```

Live-updating attendance list—no manual exports needed.

### 4. Admin Override System

Endpoint `/admin/override` with token authentication allows manual intervention:
```bash
curl -X POST https://lyzovani.domain.com/admin/override \
  -H "X-ADMIN-TOKEN: secret" \
  -d '{
    "user_id": "student@email.cz",
    "weekend_date": "2025-12-14",
    "action": "force_accept",
    "note": "lékařská omluvenka"
  }'
```

Actions:
- `force_accept`: Bypass quota and deadlines (medical emergencies)
- `force_reject`: Manually reject a registration (disciplinary reasons)

All overrides are logged in the `note` column for auditing.

---

## Deployment & Production Setup

### Docker Compose Architecture

Two-container setup with health checks:
```yaml
services:
  db:
    image: mysql:8.0
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 10s
      retries: 5
  
  app:
    build: .
    depends_on:
      db:
        condition: service_healthy  # Wait for DB before starting
    environment:
      DB_HOST: db
      ADMIN_TOKEN: ${ADMIN_TOKEN}
      REQUIRE_ENROLLMENT: "true"
```

The `depends_on` with `condition: service_healthy` prevents race conditions during startup (app attempting to connect before MySQL is ready).

### Cloudflare Tunnel Setup

Exposes local development to HTTPS public domain without port forwarding:
```yaml
# cloudflared/config.yml
tunnel: <tunnel-id>
credentials-file: /path/to/credentials.json

ingress:
  - hostname: lyzovani.yourdomain.com
    service: http://localhost:5000
  - service: http_status:404
```

Benefits:
- Free HTTPS certificates
- No firewall configuration
- DDoS protection included
- Revocable access (no exposed ports)

### One-Click Setup Script

`setup.sh` automates the entire deployment:

1. Checks prerequisites (Docker, Python)
2. Installs Python dependencies (SQLAlchemy, pymysql)
3. Starts Docker containers
4. Waits for MySQL health check
5. Creates database tables
6. Imports enrolled students from CSV
7. Validates application is responding

Run with: `bash setup.sh`

Output includes:
- Database credentials
- Application URLs (form, attendance page)
- Useful commands (view logs, restart, list students)

---

## Challenges & Solutions

### Problem 1: Transaction Nested Error

**Symptom**: `sqlalchemy.exc.InvalidRequestError: A transaction is already begun`

**Root cause**: Calling `session.begin()` explicitly when SQLAlchemy's sessionmaker already auto-begins transactions.

**Fix**: Remove all `session.begin()` calls. Trust the ORM's default behavior—transactions start automatically on first query, commit with `session.commit()`.

### Problem 2: Enum Column Mismatch

**Symptom**: Database had `status ENUM('PENDING','ACCEPTED','REJECTED')` but code only used ACCEPTED/REJECTED

**Root cause**: Legacy schema from earlier design where submissions could be "pending approval"

**Fix**: Removed PENDING from enum definition. All submissions are immediately either ACCEPTED or REJECTED based on quota/deadline validation.

### Problem 3: Timezone Handling

**Issue**: Python's `datetime.now()` returns UTC, but course operates in Europe/Prague timezone

**Solution**: Use `zoneinfo.ZoneInfo` for timezone-aware dates:
```python
from zoneinfo import ZoneInfo
PRAGUE_TZ = ZoneInfo("Europe/Prague")

def now_prague_date():
    return datetime.now(PRAGUE_TZ).date()
```

Critical for deadline enforcement (Wednesday cutoff must be Prague time, not UTC).

### Problem 4: CSV Import Character Encoding

**Issue**: Wix exports used Windows-1250 encoding (Czech characters corrupted with UTF-8)

**Solution**: Pandas `read_csv()` with explicit encoding:
```python
df = pd.read_csv(csv_path, encoding='windows-1250')
```

Handles Czech diacritics (ěščřžýáíé) correctly.

---

## Results & Impact

**System went live**: December 2025  
**Current usage**: 50+ active students, 12 weekends of registrations  

**Measurable improvements**:
- **Zero manual quota tracking**: System enforces limits automatically
- **100% deadline compliance**: Wednesday cutoff enforced server-side (no instructor intervention)
- **Real-time attendance**: Instructors access live lists via `/attendance.html` or Google Sheets
- **Audit trail**: Every submission logged with timestamp, status, and rejection reason
- **Zero race conditions**: User-level locking guarantees data consistency

**Before/after comparison**:

| Task | Before (Manual) | After (Automated) |
|------|----------------|-------------------|
| Quota tracking | Manual spreadsheet counting | Automatic (SQL query) |
| Deadline enforcement | Honor system | Server-enforced |
| Attendance export | Manual CSV download | Live Google Sheets integration |
| Enrollment verification | Manual cross-check | Automatic (database lookup) |
| Concurrency handling | Spreadsheet conflicts | MySQL locks |

---

## Technical Debt & Future Work

**Current limitations**:

1. **No email notifications**: Students don't receive confirmation emails after registration
   - **Fix**: Integrate SendGrid or AWS SES for transactional emails

2. **No payment tracking**: System doesn't track which weekends have been paid for
   - **Fix**: Add `payment_status` column to submissions table

3. **Admin UI is API-only**: Overrides require curl commands
   - **Fix**: Build admin dashboard (Flask-Admin or custom React frontend)

4. **No analytics dashboard**: Instructors can't see weekly trends (registration velocity, popular days)
   - **Fix**: Add `/admin/analytics` endpoint with charts (Chart.js or Plotly)

5. **Single-tenant only**: One course per deployment
   - **Fix**: Add `course_id` foreign key for multi-tenant support

---

## Key Takeaways

**Concurrency is subtle**: The quota race condition wasn't obvious until we stress-tested with concurrent requests. MySQL named locks were the right tool—simpler than distributed locks (Redis) and sufficient for single-database deployments.

**Timezone bugs are silent killers**: Deadline enforcement broke for the first weekend because we forgot Prague != UTC. Always use timezone-aware datetimes in production.

**Production means error handling**: Every database query has exception handling, every endpoint returns structured JSON errors, every transaction has rollback logic. Development code doesn't need this—production code dies without it.

**One-click setup pays dividends**: The 30 minutes spent writing `setup.sh` saved hours of "it doesn't work on my machine" debugging. Automated deployments are worth the upfront investment.

**Real users find edge cases**: We added admin overrides after a student got COVID and needed a last-minute registration change. Production requirements emerge from actual usage, not upfront specs.

---

📂 [Full source code and deployment guide]({{ page.repo }})  
📊 [Live attendance tracker](https://lyzovani.yourdomain.com/attendance.html)

**Tech Stack**: Flask, SQLAlchemy, MySQL, Docker, Cloudflare Tunnel  
**Project Type**: Production backend system (live since December 2025)  
**Role**: Solo developer (design, implementation, deployment, maintenance)