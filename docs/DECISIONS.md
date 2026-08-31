
---

# 3. `DECISIONS.md`

This one is particularly valuable when you're using Claude/Codex/Windsurf/other AI coding agents.

The original repository uses this document to record decisions that an AI might otherwise "helpfully" reverse later. 

For yours:

```md
# Decisions

Why things are the way they are.

Record decisions that an AI developer might reasonably try to change later.

Newest decisions go at the top.

---

## 2026-08-14 - Personal domain is the primary brand

**Decision:** The primary website is vincentmugondora.com.

**Why:** Vincent Mugondora is the long-term personal brand. The site must remain useful if Vincent's career evolves from software engineer to technical leader, founder, speaker, educator, or investor.

**Rejected:** Using a technology-focused domain such as vincentmugondora.dev as the primary domain.

**Revisit if:** The personal brand strategy changes substantially.

---

## 2026-08-14 - Personal brand is separate from Zimnovate

**Decision:** Vincent Mugondora and Zimnovate have distinct identities.

**Why:** Vincent is the personal authority brand. Zimnovate is a commercial technology company. Keeping them separate allows Vincent to build multiple companies and initiatives without making the personal brand dependent on one company.

**Rejected:** Making Zimnovate the primary identity of the website.

**Revisit if:** Zimnovate becomes Vincent's only long-term professional identity.

---

## 2026-08-14 - Static-first architecture

**Decision:** The portfolio will be primarily statically rendered using Astro.

**Why:** A personal portfolio does not require a complex backend. Static rendering provides strong performance, security, SEO and low infrastructure complexity.

**Rejected:** Building the portfolio as a full-stack Next.js application with a database.

**Revisit if:** The site requires authenticated functionality, dynamic applications, user accounts, or a CMS-backed application.

---

## 2026-08-14 - No CMS for v1

**Decision:** Portfolio content is maintained through the repository using Markdown/MDX and Astro content collections.

**Why:** The initial content volume is small and Vincent is comfortable working with Git and code.

**Rejected:** Adding a headless CMS immediately.

**Revisit if:** Content publishing becomes frequent enough that a non-technical editing workflow is required.

---

## 2026-08-14 - Brand colors

**Decision:** Use Midnight Navy, Electric Blue and African Gold as the core palette.

**Why:** The palette communicates technical authority and modernity while using gold as a restrained connection to African identity.

**Rejected:** Using generic green/yellow/red African branding.

**Revisit if:** The visual identity is professionally rebranded.

---

## 2026-08-14 - Typography

**Decision:** Space Grotesk for headings, Inter for body text and JetBrains Mono for technical content.

**Why:** The combination creates a modern technical/editorial identity while maintaining readability.

**Rejected:** Using a monospace font throughout the site.

**Revisit if:** Typography testing demonstrates accessibility or performance problems.

---

## 2026-08-14 - Reference image is inspiration, not a clone

**Decision:** The supplied portfolio image defines the visual direction but must not be copied directly.

**Why:** Vincent needs an original identity rather than another person's portfolio reproduced with different text.

**Rejected:** Pixel-for-pixel recreation.

**Revisit if:** A specific licensed design system is intentionally adopted.

---

## 2026-08-14 - Content must be truthful

**Decision:** Never invent achievements, statistics, clients, testimonials, awards, project results or experience.

**Why:** The portfolio represents Vincent professionally and must remain credible.

**Rejected:** Using fabricated metrics to make the portfolio appear more impressive.

**Revisit if:** Verified information becomes available.

---

## 2026-08-14 - Minimal JavaScript

**Decision:** Use JavaScript only where interaction genuinely requires it.

**Why:** The website is primarily a content and portfolio experience. Performance and accessibility take priority over unnecessary interactivity.

**Rejected:** Making every section interactive or animated.

**Revisit if:** A specific feature requires client-side state.

---

## 2026-08-14 - Dark/light editorial rhythm

**Decision:** Alternate between light editorial sections and Midnight Navy dark sections.

**Why:** This reproduces the visual rhythm of the reference while creating a distinctive Vincent Mugondora identity.

**Rejected:** Making every section dark.

**Revisit if:** User testing shows the contrast rhythm harms usability.