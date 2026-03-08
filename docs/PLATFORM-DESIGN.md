# EA Organizer Platform — Design & Architecture

**Product:** Web platform for Effective Altruism community organizers  
**Goal:** Help organizers develop themselves and their groups according to a Theory of Change, with clarity, action tracking, and coordination.

---

## 1. Full UI Layout Structure

### 1.1 Global Shell

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  [Logo]  Red EA México · Organizadores    [Search]  [Notifications] [Avatar]│
├─────────────────────────────────────────────────────────────────────────────┤
│  General  │  Personal  │  Group                                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                     MAIN CONTENT AREA                                │   │
│  │  (Section-specific layout; see 1.2–1.4)                              │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  [Floating Chatbot trigger — bottom-right]                                  │
└─────────────────────────────────────────────────────────────────────────────┘
```

- **Top bar:** Logo, product name, global search, notifications (e.g. new tasks, calendar suggestions), user avatar + dropdown (profile, settings, logout).
- **Primary nav:** Three tabs — **General** (default), **Personal**, **Group** — with clear active state.
- **Main content:** Single column on mobile; on desktop, dashboard grids with consistent card-based layout.
- **Chatbot:** Persistent floating button or side panel; does not block main content.

### 1.2 Section 1 — General (Dashboard)

**Purpose:** Main dashboard — Theory of Change progress, calendar, group objective, community activity.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Theory of Change Progress                                                   │
│  ┌─────────────────────────────────────┐  ┌─────────────────────────────┐  │
│  │ Personal ToC     [████████░░] 72%    │  │ Group ToC   [█████░░░░░] 45% │  │
│  └─────────────────────────────────────┘  └─────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────────────┤
│  Group Objective (current cycle)                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ "Run Intro Fellowship Q2 · Build leadership pipeline"     [Edit]      │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────────────────┤
│  Shared Calendar                    │  Community Dashboard                  │
│  ┌──────────────────────────────┐   │  ┌────────────────────────────────┐  │
│  │ [Personal] [Group] toggle    │   │  │ Other groups progress (bars)     │  │
│  │ [Month/week view]            │   │  │ Active fellowships · Events      │  │
│  │ · Event A · Meeting B        │   │  │ Map / timeline / list            │  │
│  │ · Suggested: 3× 1-1 (pre)    │   │  │ [View all] [Replicate strategy]  │  │
│  │ · Suggested: Review (post)   │   │  └────────────────────────────────┘  │
│  └──────────────────────────────┘   │                                       │
└─────────────────────────────────────────────────────────────────────────────┘
```

- **Theory of Change:** Two progress bars (personal + group); tooltips or modal with “what counts” (events, 1-1s, fellowships, programs, recruitment).
- **Group objective:** One editable line or short paragraph; cycle selector if needed.
- **Calendar:** Tabs or filter for Personal vs Group; list or week view; auto-suggested tasks (e.g. “3× 1-1 one week before event”, “Follow-up review one week after”) as soft calendar entries.
- **Community dashboard:** Read-only view of other groups (progress bars, active fellowships, events); links to “replicate strategy” or “share event”.

### 1.3 Section 2 — Personal Development

**Purpose:** Organizer growth — 1-1 meetings, development programs, networking.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  1-1 Meeting System                                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ [Schedule 1-1] [Calendly link] [Meeting links list]                  │   │
│  │ Notes: [New note] [Red AI] · Action items → [Add to calendar]        │   │
│  │ Workflow: Schedule → Meet → Notes → 10 min review → Calendar tasks  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────────────────┤
│  Development Programs                    │  Networking Growth                │
│  ┌────────────────────────────────────┐ │  ┌──────────────────────────────┐ │
│  │ CPP  [██████░░] 60%                │ │  │ LinkedIn reminder · Goals     │ │
│  │ WFM  [███░░░░░] 30%                │ │  │ Suggested connections         │ │
│  │ Resources · Recommended actions   │ │  └──────────────────────────────┘ │
│  └────────────────────────────────────┘ │                                   │
└─────────────────────────────────────────────────────────────────────────────┘
```

- **1-1:** CTA to schedule; Calendly link; list of upcoming 1-1s with meeting links; note-taking (incl. “Red AI”); post-meeting “10 min review” and “Convert action points to calendar”.
- **Programs:** Cards per program (e.g. CPP, WFM) with progress, resources, next actions.
- **Networking:** Reminders (e.g. LinkedIn), goals, suggested connections.

### 1.4 Section 3 — Group Development

**Purpose:** Group operations — documents, programs/fellowships, calendar, social, design resources.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Key Documents (Resource library)                                            │
│  [OSP] [Group rules] [Facilitator guides] [Program curricula]                │
├─────────────────────────────────────────────────────────────────────────────┤
│  Program Management (e.g. Fellowship)   │  Group Calendar                    │
│  ┌────────────────────────────────────┐ │  ┌──────────────────────────────┐ │
│  │ Applications · Review dates        │ │  │ Fellowships · Events          │ │
│  │ Acceptance dates                   │ │  │ Recruitment · Deadlines       │ │
│  │ [Accept] → Auto email (confirm,    │ │  └──────────────────────────────┘ │
│  │   materials, start, next steps)    │ │                                   │
│  └────────────────────────────────────┘ │                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│  Social Media          │  Design Resources                                  │
│  Instagram · LinkedIn  │  Canva · Presentations · Marketing assets          │
│  Metrics (Metropool)   │  Quick links                                       │
└─────────────────────────────────────────────────────────────────────────────┘
```

- **Documents:** Buttons or cards linking to OSP, rules, facilitator guides, curricula (external or in-app).
- **Program management:** Application list, review/acceptance dates; “Accept” triggers automated acceptance email (confirmation, materials, start date/time, next steps).
- **Group calendar:** Cycle view (fellowships, events, recruitment, deadlines).
- **Social:** Links + optional metrics (e.g. Metropool); **Design:** Links to Canva, decks, assets.

---

## 2. Component Hierarchy

### 2.1 App-level

- `AppShell` — Header, primary nav (General / Personal / Group), main content slot, chatbot slot.
- `ChatbotPanel` — Floating trigger + side panel or slide-over; uses existing chatbot (iframe or embed).

### 2.2 Shared / Design System

- `ProgressBar` — Label, value, max, optional subtitle; used for ToC, programs.
- `Card` — Container with optional title, actions, and content.
- `Button` (primary, secondary, ghost), `Badge`, `Avatar`, `Dropdown`.
- `Tabs` — Horizontal tabs (General, Personal, Group) and in-section tabs (e.g. Personal / Group calendar).
- `EmptyState` — Icon + message + optional CTA.
- `Modal` — For edit flows (e.g. group objective, event).

### 2.3 General section

- `TheoryOfChangeProgress` — Two `ProgressBar`s (personal, group) + optional detail modal.
- `GroupObjective` — Display + edit (inline or modal).
- `SharedCalendar` — View toggle, event list/grid, `CalendarSuggestions` (e.g. 3× 1-1 before, review after).
- `CommunityDashboard` — List/grid of groups with progress, fellowships, events; optional map/timeline.

### 2.4 Personal section

- `OneOnOneManager` — Schedule CTA, Calendly link, meeting list, notes, action extraction → calendar.
- `DevelopmentProgramCard` — Program name, progress, resources, next actions.
- `NetworkingGrowth` — Reminders, goals, suggested connections.

### 2.5 Group section

- `ResourceLibrary` — Document links (OSP, rules, guides, curricula).
- `FellowshipManager` — Applications table, review/accept dates, Accept → email automation.
- `GroupCalendar` — Cycle events, fellowships, recruitment, deadlines.
- `SocialMediaLinks` — Instagram, LinkedIn + optional metrics.
- `DesignResources` — Links to Canva, presentations, assets.

---

## 3. Database Schema Proposal

### 3.1 Core entities

**users**
- id, email, name, avatar_url, linkedin_url, created_at, updated_at
- (Auth handled by provider; table stores profile.)

**groups**
- id, name, slug, description, region/city, type (university | city | thematic), created_at, updated_at
- settings_json (e.g. social links, Metropool config)

**group_members**
- id, group_id, user_id, role (organizer | member | facilitator), joined_at

**organizer_profiles**
- id, user_id, group_id (primary group), personal_toc_target, personal_toc_current, group_toc_target, group_toc_current, calendly_url, created_at, updated_at

### 3.2 Theory of Change & objectives

**group_objectives**
- id, group_id, title, description, cycle_start, cycle_end, created_at, updated_at
- (One “current” per group per cycle.)

**toc_actions** (action types that advance progress)
- id, code (e.g. event_hosted, fellowship_organized, one_on_one, program_completed, member_recruited), points_personal, points_group, label

**toc_log** (audit of completed actions)
- id, user_id, group_id, action_id, quantity (e.g. 1), created_at
- (Progress = sum of points from toc_log joined to toc_actions.)

### 3.3 Calendar & events

**calendar_events**
- id, group_id, created_by_user_id, title, type (event | workshop | fellowship | meeting | conference), start_at, end_at, location_or_link, is_personal (bool), metadata_json
- (is_personal true = personal agenda.)

**calendar_suggestions**
- id, source_event_id, suggested_type (e.g. one_on_one_x3, follow_up_review), due_date, title, created_at, status (pending | added | dismissed)

### 3.4 1-1 & programs

**one_on_ones**
- id, organizer_id, participant_name_or_email, scheduled_at, meeting_link, notes_text, created_at, updated_at
- action_items extracted or stored in metadata_json.

**development_programs**
- id, code (e.g. CPP, WFM), name, description, total_steps_or_weight

**user_program_progress**
- id, user_id, program_id, progress_value (e.g. 0–100 or step index), completed_at (nullable), updated_at

### 3.5 Fellowships / applications

**programs** (group-run programs, e.g. Intro Fellowship)
- id, group_id, name, type (fellowship | course), application_deadline, review_date, acceptance_notification_date, start_date, end_date, acceptance_email_template_id

**applications**
- id, program_id, applicant_email, applicant_name, status (draft | submitted | under_review | accepted | rejected), submitted_at, reviewed_at, accepted_at

**email_templates**
- id, program_id, type (acceptance | rejection), subject, body_html, variables (json: e.g. {{name}}, {{start_date}})

### 3.6 Community & resources

**group_resources**
- id, group_id, title, type (osp | rules | facilitator_guide | curriculum), url_or_file_id, created_at

**design_resources**
- id, group_id, title, type (canva | presentation | asset), url, created_at

**community_visibility**
- group_id, show_progress (bool), show_events (bool), show_fellowships (bool)
- (For community dashboard.)

---

## 4. User Flows

### 4.1 First-time organizer

1. Login (SSO or email).
2. Onboarding: select or create group; set initial group objective; optional personal/group ToC targets.
3. Land on General dashboard; see empty or seed progress; add first calendar event or 1-1 to see progress move.

### 4.2 Daily use (General)

1. Open platform → General tab.
2. Check Theory of Change bars; optional click for “what counts”.
3. See group objective; edit if new cycle.
4. Check calendar (personal/group); accept or dismiss suggested tasks (3× 1-1 before event, review after).
5. Check community dashboard; open another group’s strategy or event.

### 4.3 1-1 workflow (Personal)

1. Personal → 1-1: schedule via Calendly or in-app.
2. Before: see meeting link and any prep notes.
3. During: take notes (Red AI or plain); after meeting, “10 min review” step.
4. Add action items; “Convert to calendar tasks” creates calendar_events.
5. Mark 1-1 complete → toc_log entry (one_on_one) → personal/group progress updates.

### 4.4 Fellowship acceptance (Group)

1. Group → Program management: open fellowship; see applications.
2. Set review/acceptance dates if not set.
3. Click “Accept” on applicant → modal confirm.
4. System sends acceptance email (template with name, materials, start date/time, next steps).
5. Application status → accepted; optional calendar event for “Fellowship start”.

### 4.5 Event → suggestions (automation)

1. Organizer or system creates “Event” on calendar (e.g. workshop on March 15).
2. Automation: create calendar_suggestions — “3× 1-1 by March 8”, “Follow-up review by March 22”.
3. Organizer sees suggestions in Shared Calendar; can “Add to calendar” or dismiss.

---

## 5. Dashboard Design (Summary)

- **One home:** General = main dashboard; Personal and Group = focused sub-dashboards.
- **Progress first:** ToC bars above the fold; same component style for programs in Personal.
- **Action-oriented:** CTAs for “Schedule 1-1”, “Add suggestion to calendar”, “Accept applicant”; reminders for LinkedIn, review dates.
- **Consistent cards:** Same card style and spacing across sections; clear headings and secondary text.
- **Collaborative insight:** Community dashboard is read-only comparison and “replicate” entry point, not social feed.
- **Chatbot always available:** One click to open; use for planning, ToC, strategy, bottlenecks.

---

## 6. Automation Logic

### 6.1 Theory of Change progress

- **Triggers:** Creating/completing events, 1-1s, fellowships, development program steps, recruitment (e.g. new member or application accepted).
- **Logic:** On trigger, insert toc_log row(s) with appropriate action_id and quantity. Progress = SUM(toc_log × toc_actions.points_*) per user/group; cap at 100% or by target.

### 6.2 Calendar suggestions (event-driven)

- **When:** A calendar_events record with type in (event, workshop, fellowship, conference) is created or start_at is set.
- **Rules:**
  - One week before start_at: create up to 3 suggestions of type “one_on_one” (or one “Schedule 3× 1-1”).
  - One week after end_at: create one suggestion “Follow-up review meeting”.
- **Storage:** calendar_suggestions with source_event_id, suggested_type, due_date; status pending until user adds or dismisses.

### 6.3 Fellowship acceptance email

- **When:** Application status changes to “accepted” (user clicks Accept and confirms).
- **Steps:**
  1. Load acceptance email template; substitute {{name}}, {{start_date}}, {{start_time}}, {{materials_link}}, {{next_steps}}.
  2. Send email to applicant_email.
  3. Optionally create calendar_events for “Fellowship start” for the group.
  4. Log and show success.

### 6.4 Action items from 1-1 notes

- **When:** User saves 1-1 notes and clicks “Extract action items” or “Add to calendar”.
- **Logic:** Either AI (Red AI) or simple pattern (e.g. lines starting with “- [ ]”) → list of action items; user confirms → create calendar_events (or tasks) with due dates.

---

## 7. Suggested Tech Stack

### 7.1 Frontend

- **Framework:** React or Next.js (SSR for SEO if public pages; otherwise SPA for dashboard).
- **State:** React Query for server state; Zustand or React context for UI state (e.g. tab, chatbot open).
- **UI:** Tailwind CSS + design tokens aligned with RAEM (primary #1F5266, background #F6F6F6); component library (e.g. Radix UI) for accessible tabs, modals, dropdowns.
- **Calendar:** FullCalendar or similar; or custom list/week view with date navigation.
- **Charts:** Lightweight (e.g. Recharts) for community progress bars and simple visualizations.

### 7.2 Backend

- **Runtime:** Node.js (Next.js API routes or NestJS) or Python (FastAPI/Django).
- **Database:** PostgreSQL (users, groups, events, applications, toc_log, templates).
- **Auth:** NextAuth, Auth0, or Supabase Auth; group-based permissions in app logic (middleware or service layer).
- **Email:** Resend, SendGrid, or AWS SES; templates stored in DB or file.

### 7.3 Integrations

- **Calendar:** Calendly API (embed link + optional sync); Google Calendar API if needed for sync.
- **Social metrics:** Metropool or provider API; store snapshots in group_metrics or similar.
- **Chatbot:** Embed existing chatbot (iframe or API) in ChatbotPanel.

### 7.4 Deployment

- **Hosting:** Vercel (Next.js) or similar; API + DB on Railway, Render, or AWS.
- **Auth + DB:** Supabase can cover Postgres + Auth + realtime if desired.

---

## 8. File Deliverables Summary

| Deliverable              | Location / content |
|--------------------------|--------------------|
| Full UI layout           | §1 (shell + 3 section layouts) |
| Component hierarchy      | §2 (App, shared, section components) |
| Database schema          | §3 (tables and relations) |
| User flow                | §4 (onboarding, daily, 1-1, fellowship, event automation) |
| Dashboard design         | §5 (principles and placement) |
| Automation logic         | §6 (ToC, calendar suggestions, acceptance email, action items) |
| Suggested tech stack     | §7 (frontend, backend, integrations, deployment) |

A working **dashboard prototype** (HTML/CSS/JS) is provided in `/dashboard/` to illustrate the three-tab layout and key widgets using the RAEM visual system.
