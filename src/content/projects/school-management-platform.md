---
title: "School Management Platform"
description: "A role-based platform for managing students, teachers, parents, classes and academic operations — built to handle the complexity of real school administration."
problem: "Schools in Zimbabwe manage students, staff, classes, grades, attendance, fees and communication using paper, spreadsheets, and WhatsApp groups — creating chaos as they grow."
role: "Full-Stack Engineer"
technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS", "NextAuth.js"]
featured: true
status: "completed"
image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=700&h=525&fit=crop&auto=format&q=75"
publishedAt: 2026-06-15
---

## The Problem

Schools in Zimbabwe — and across Africa — manage increasingly complex operations with tools that weren't designed for the job. A growing school might have:

- 500+ students across multiple grades and streams
- 30+ teachers with different subjects and class assignments
- Fee records across multiple currencies (ZiG, USD)
- Attendance tracking that nobody does consistently
- Exam results that take weeks to compile manually
- Parent communication scattered across WhatsApp groups

The typical progression: paper → spreadsheets → WhatsApp coordination → chaos. Every school hits a point where manual processes break down. They need a system — but existing school management platforms are either too expensive, too complex, or designed for educational systems that work differently from Zimbabwean schools.

## The Solution

A role-based school management platform with four user types:

### Admin
- Manage school structure (terms, grades, streams, subjects)
- Handle student enrolment and staff management
- Configure fee structures and track payments
- Generate reports across all school operations

### Teacher
- Mark attendance (quick daily entry per class)
- Enter exam and assessment grades
- View class rosters and student information
- Communicate with parents through the platform

### Parent
- View child's attendance, grades, and progress
- Receive fee statements and make payments
- Get announcements and communicate with teachers

### Student
- View own academic record
- Access timetable and assignment information
- Track personal attendance and progress

## Technical Architecture

```
Frontend:         Next.js (App Router) + TypeScript + Tailwind CSS
Authentication:   NextAuth.js (role-based sessions)
Database:         PostgreSQL + Prisma ORM
Deployment:       Vercel (frontend) + Supabase (database)
```

### Key design decisions

**Next.js App Router** — Chose for its server-side rendering (fast initial loads on slow connections), built-in API routes (no separate backend needed), and TypeScript support. The school admin uses this daily — page loads need to be fast even on 3G.

**Role-based access from the start** — Rather than adding roles later, the entire data model and routing system is built around four distinct user types. Every API endpoint checks role permissions. Every page renders differently based on who's viewing it.

**PostgreSQL + Prisma** — Relational data is deeply relational in a school context: students belong to classes, classes have teachers, teachers teach subjects, subjects have grades, grades belong to terms. PostgreSQL handles this naturally. Prisma gives type-safe database access that catches errors at compile time.

**Multi-currency fee handling** — Zimbabwe's currency situation means schools often accept fees in multiple currencies. The fee module handles ZiG, USD, and rand with configurable exchange rates.

**Offline-aware design** — Teachers marking attendance in classrooms may have spotty connectivity. The attendance interface works with optimistic updates and syncs when connectivity returns.

## Challenges

### Data modelling complexity

A school's data relationships are surprisingly complex. Students move between classes. Teachers change subject assignments. Fee structures change between terms. Terms have different dates for different grades. Modelling this required multiple iterations to get right without creating a rigid system that couldn't handle real-world changes.

### Performance on low-bandwidth

The admin generates reports that aggregate data across the entire school — hundreds of students, thousands of grade entries. Making these queries fast enough for a usable experience on Zimbabwean internet required careful database indexing, server-side pagination, and aggressive caching of computed results.

### Multi-tenancy decisions

Should this serve one school or many? I designed the data model for multi-tenancy from the start (each record belongs to a `schoolId`), even though the first deployment is single-school. This means the platform can serve multiple schools without a rewrite — important for scaling.

### Authentication that works for non-technical users

Teachers and parents aren't software engineers. The authentication flow needed to be simple: email/password with password reset via email. No OAuth complexity. No 2FA (yet). Just a login that works on a phone.

## What I Learned

### 1. Start with the admin, not the parent

The natural instinct is to build the parent-facing features first (they're the "customer"). But the school admin is the buyer and daily power user. If the admin experience isn't excellent, nothing else matters — they won't adopt the system.

### 2. Reports win deals

School administrators make decisions with data — enrollment trends, fee collection rates, academic performance summaries. The reporting module is what convinces a school head to adopt the system. Beautiful UI is secondary to useful reports.

### 3. WhatsApp integration is essential

Even with a full platform, schools still communicate via WhatsApp. Rather than fighting this, the system generates formatted messages that admins can share to WhatsApp groups — fee reminders, grade summaries, announcements. Meeting users where they are.

### 4. Zimbabwean schools have unique requirements

Term structures, fee payment patterns, multi-currency handling, class streaming systems — these differ significantly from UK/US school software. Building specifically for Zimbabwean school operations is a genuine competitive advantage over generic international platforms.

## Results

- Student and staff management for 500+ students
- Attendance marking reduced from 15 minutes to 2 minutes per class
- Fee tracking automated (previously managed in Excel)
- Grade compilation reduced from weeks to days
- Parent access to real-time academic information

## Related Writing

- <a href="/writing/building-technology-for-africa">Building Technology for Africa</a>
- <a href="/writing/system-design-explained-for-beginners">System Design Explained for Beginners</a>
- <a href="/writing/software-engineering-guide-for-beginners">Software Engineering Guide for Beginners</a>
