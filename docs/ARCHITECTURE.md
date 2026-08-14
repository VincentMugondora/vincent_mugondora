
This follows the original project's philosophy of keeping `AGENTS.md` short and putting deeper information elsewhere. 

---

# 2. `ARCHITECTURE.md`

This is where I would make a significant adaptation.

The original project uses a feature-first architecture with clear presentation/domain/data boundaries. 

For your portfolio, you don't need an artificial repository/data layer for everything. It's primarily a **content-driven website**, so we should optimize the architecture around pages, content and reusable UI.

```md
# Architecture

## Project purpose

vincentmugondora.com is Vincent Mugondora's personal brand platform.

It combines:

- Personal identity
- Software engineering portfolio
- AI experiments
- Technical writing
- Speaking
- Teaching
- Entrepreneurship
- Zimbabwe/Africa technology commentary

The website should function as the authoritative digital home for Vincent's professional identity.

---

## Technology

- Astro
- TypeScript
- Tailwind CSS
- Markdown / MDX where appropriate
- Astro Content Collections
- Optimized images
- Static-first rendering

Avoid client-side JavaScript unless interaction genuinely requires it.

---

## Folder structure

```text
src/
├── components/
│   ├── common/
│   ├── navigation/
│   ├── sections/
│   ├── projects/
│   ├── writing/
│   ├── speaking/
│   ├── teaching/
│   └── ui/
│
├── content/
│   ├── projects/
│   ├── posts/
│   ├── speaking/
│   └── experiments/
│
├── layouts/
│   ├── BaseLayout.astro
│   ├── PageLayout.astro
│   └── ArticleLayout.astro
│
├── pages/
│   ├── index.astro
│   ├── about.astro
│   ├── work/
│   ├── ai-lab/
│   ├── writing/
│   ├── speaking.astro
│   ├── teaching.astro
│   ├── now.astro
│   └── contact.astro
│
├── styles/
│   ├── global.css
│   └── typography.css
│
├── lib/
│   ├── content.ts
│   ├── seo.ts
│   └── utils.ts
│
└── config/
    ├── site.ts
    └── navigation.ts

Content architecture

Content should be separated from presentation.

Projects, articles, speaking engagements and AI experiments should be represented as structured content.

Example:

content/
├── projects/
│   ├── project-one.md
│   └── project-two.md
│
├── posts/
│   ├── article-one.md
│   └── article-two.md
│
└── experiments/
    └── ai-experiment-one.md

Pages consume content.

Components render content.

Content should not contain layout logic.

Page architecture
Home
Hero
→ Introduction
→ What I Build
→ Featured Work
→ Impact
→ Currently Building
→ Writing
→ Speaking
→ Zimnovate
→ CTA
→ Footer
About
Identity
→ Journey
→ Philosophy
→ Experience
→ Skills
→ Education
→ Community
→ Current Direction
Work
Project Index
→ Filters/categories
→ Featured Projects
→ All Projects
Case Study
Hero
→ Problem
→ Context
→ Research
→ Solution
→ Architecture
→ Implementation
→ Challenges
→ Results
→ Lessons
→ Gallery
→ Links
→ Next Project
AI Lab
Hero
→ Experiments
→ AI Agents
→ RAG
→ Automation
→ African/Local Problems
→ Research Notes
Writing
Featured Article
→ Categories
→ Article List
Article
Header
→ Metadata
→ Content
→ Code/Media
→ Related Articles
→ CTA
Speaking
Hero
→ Topics
→ Events
→ Workshops
→ Testimonials
→ Speaking Philosophy
→ Booking CTA
Teaching
Hero
→ What I Teach
→ Teaching Philosophy
→ Courses
→ Workshops
→ Mentorship
→ Student Work
→ Resources
Now
Currently Learning
→ Currently Building
→ Reading
→ Experiments
→ Current Focus
Contact
Contact Hero
→ Contact Options
→ Form
→ Social Links
→ Professional Email
Design system
Colors
Midnight Navy: #0B1220
Electric Blue: #2563EB
African Gold: #F4B942
Off White: #F8FAFC
Slate: #1E293B
Muted Slate: #64748B
White: #FFFFFF
Typography
Headings: Space Grotesk
Body: Inter
Technical/code: JetBrains Mono
Visual language
Editorial
Premium
Asymmetric
Technical
Spacious
Strong typography
Large imagery
Thin borders
Alternating light/dark sections
Restrained motion
Component boundaries

Shared components belong in components/.

Page-specific composition stays in the page.

A component should be extracted when:

It appears on multiple pages.
It represents a clear reusable UI pattern.
It becomes difficult to understand inline.

Do not create abstractions simply for the sake of abstraction.

Data flow
Content Collection
        ↓
Page
        ↓
Section Component
        ↓
UI Component

There is no backend in v1.

External APIs should only be introduced when explicitly required.

SEO architecture

Every page must support:

Title
Meta description
Canonical URL
Open Graph metadata
Twitter/X metadata
Semantic headings
Image alt text
Structured data where appropriate

The site should establish Vincent Mugondora as the primary entity.

Performance

Prefer:

Static rendering
Optimized images
Minimal JavaScript
Lazy loading
Responsive images
Preloaded critical fonts
Semantic HTML

Avoid unnecessary animation libraries.

Accessibility

All pages must support:

Keyboard navigation
Visible focus states
Semantic HTML
Accessible contrast
Reduced motion
Descriptive alt text
Proper form labels