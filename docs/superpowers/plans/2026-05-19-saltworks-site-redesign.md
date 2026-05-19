# Saltworks Site Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add four new case studies (Cessna, Road Scholar, Wells Fargo, TIAA), update the Grand Banks case study hero image, and fix seven UI issues: carousel legibility, logo sizing, clients collapse/expand, section backgrounds, leadership circular images, black bar above footer, and footer logo size.

**Architecture:** Two independent tracks. Track A is purely content — creating/updating markdown files and copying image assets. Track B is purely component changes — each component fix is isolated and can be committed individually. All content is driven by frontmatter in `content/work/*.md`; no new components or APIs are needed.

**Tech Stack:** Next.js 14+ (App Router), TypeScript, Tailwind CSS v4, gray-matter, remark/remark-html, Embla Carousel. Run `npm run dev` in `/Users/barba/Projects/Salt/site` to preview changes. No tests exist in this project — verification is visual via the dev server.

---

## File Map

### Track A — Content & Images
| Action | Path |
|--------|------|
| Create | `content/work/cessna-aircraft.md` |
| Create | `content/work/road-scholar.md` |
| Create | `content/work/wells-fargo.md` |
| Create | `content/work/tiaa-financial-services.md` |
| Modify | `content/work/grand-banks-yachts.md` (hero image path + add So What section) |
| Copy | `public/images/work/grand-banks-hero.jpg` ← from `.raw/Grand Banks 1.png` |
| Copy | `public/images/work/wells-fargo-hero.jpg` ← from `public/images/hero.jpg` |
| Copy | `public/images/work/wells-fargo-thumb.jpg` ← from `public/images/hero.jpg` |
| Copy | `public/images/work/tiaa-hero.jpg` ← from `public/images/hero-2.jpg` |
| Copy | `public/images/work/tiaa-thumb.jpg` ← from `public/images/hero-2.jpg` |
| Copy | `public/images/team/drake-pusey.png` ← from `../old-site/uploads/2020/06/drake_v1.png` |
| Copy | `public/images/team/katie-karatzas.png` ← from `../old-site/uploads/2020/06/Katie_v1.png` |

### Track B — Components
| Action | Path |
|--------|------|
| Modify | `components/Footer.tsx` |
| Modify | `components/Nav.tsx` |
| Modify | `components/sections/Hero.tsx` |
| Modify | `components/sections/AboutSection.tsx` |
| Modify | `components/sections/WhatWeDo.tsx` |
| Modify | `components/sections/TheTeam.tsx` |
| Modify | `components/sections/Clients.tsx` |

---

## Task 1: Copy Image Assets

**Files:**
- Copy: `site/public/images/work/grand-banks-hero.jpg`
- Copy: `site/public/images/work/wells-fargo-hero.jpg`
- Copy: `site/public/images/work/wells-fargo-thumb.jpg`
- Copy: `site/public/images/work/tiaa-hero.jpg`
- Copy: `site/public/images/work/tiaa-thumb.jpg`
- Copy: `site/public/images/team/drake-pusey.png`
- Copy: `site/public/images/team/katie-karatzas.png`

- [ ] **Step 1: Convert Grand Banks PNG to JPEG hero**

Working directory for all shell steps in this task: `/Users/barba/Projects/Salt/site`

```bash
sips -s format jpeg "/Users/barba/Projects/Salt/.raw/Grand Banks 1.png" \
  --out "/Users/barba/Projects/Salt/site/public/images/work/grand-banks-hero.jpg"
```

Expected: exit 0, file created at that path.

- [ ] **Step 2: Copy Wells Fargo placeholder images**

```bash
cp /Users/barba/Projects/Salt/site/public/images/hero.jpg \
   /Users/barba/Projects/Salt/site/public/images/work/wells-fargo-hero.jpg
cp /Users/barba/Projects/Salt/site/public/images/hero.jpg \
   /Users/barba/Projects/Salt/site/public/images/work/wells-fargo-thumb.jpg
```

- [ ] **Step 3: Copy TIAA placeholder images**

```bash
cp /Users/barba/Projects/Salt/site/public/images/hero-2.jpg \
   /Users/barba/Projects/Salt/site/public/images/work/tiaa-hero.jpg
cp /Users/barba/Projects/Salt/site/public/images/hero-2.jpg \
   /Users/barba/Projects/Salt/site/public/images/work/tiaa-thumb.jpg
```

- [ ] **Step 4: Copy Drake Pusey circular PNG from old site**

```bash
cp /Users/barba/Projects/Salt/old-site/uploads/2020/06/drake_v1.png \
   /Users/barba/Projects/Salt/site/public/images/team/drake-pusey.png
```

- [ ] **Step 5: Copy Katie Karatzas circular PNG from old site**

```bash
cp /Users/barba/Projects/Salt/old-site/uploads/2020/06/Katie_v1.png \
   /Users/barba/Projects/Salt/site/public/images/team/katie-karatzas.png
```

- [ ] **Step 6: Verify all files exist**

```bash
ls -lh /Users/barba/Projects/Salt/site/public/images/work/grand-banks-hero.jpg \
        /Users/barba/Projects/Salt/site/public/images/work/wells-fargo-hero.jpg \
        /Users/barba/Projects/Salt/site/public/images/work/wells-fargo-thumb.jpg \
        /Users/barba/Projects/Salt/site/public/images/work/tiaa-hero.jpg \
        /Users/barba/Projects/Salt/site/public/images/work/tiaa-thumb.jpg \
        /Users/barba/Projects/Salt/site/public/images/team/drake-pusey.png \
        /Users/barba/Projects/Salt/site/public/images/team/katie-karatzas.png
```

Expected: all 7 files listed with nonzero sizes.

- [ ] **Step 7: Commit**

```bash
cd /Users/barba/Projects/Salt && git add site/public/images && \
git commit -m "assets: add case study hero images and team circular PNGs"
```

---

## Task 2: Create Cessna Aircraft Case Study

**Files:**
- Create: `site/content/work/cessna-aircraft.md`

- [ ] **Step 1: Create the markdown file**

Write `/Users/barba/Projects/Salt/site/content/work/cessna-aircraft.md`:

```markdown
---
title: "The Turbulence in an Aircraft Buying Journey Happens After Takeoff"
client: "Cessna Aircraft"
category: "Business Aviation"
slug: "cessna-aircraft"
featured: true
featuredOrder: 3
summary: "Cessna's specification process frustrated buyers and delayed payments — not because customers resisted it, but because the handoff from sales broke continuity."
result: "Faster specification decisions, fewer production delays, accelerated milestone payments"
heroImage: "/images/work/cessna-hero.jpg"
thumbnailImage: "/images/work/cessna-thumb.jpg"
metaDescription: "Saltworks helped Cessna Aircraft redesign the Citation jet specification process — turning buyer confusion into confidence and removing friction from the entire system."
---

Cessna Aircraft Company was facing a subtle but serious problem. Customers began their journey confident in choosing a Citation jet — and ended satisfied with the final aircraft. But in between, the experience broke down.

## Before

The purchasing and specification phase — arguably the most critical — created confusion, frustration, and delays.

The stakes were significant: not just customer dissatisfaction in a high-touch category, but breakdowns in the specification process that slowed decisions, disrupted the manufacturing queue, and delayed milestone-based payments — introducing friction into a relationship that could shape future high-value purchase behavior.

## Inside Looking Out

Cessna believed the issue was customer reluctance to engage in the specification process.

They saw friction in getting buyers — often sophisticated individuals or committees — to commit to a three-day, in-person session at their Wichita headquarters.

The assumption: customers didn't fully appreciate the value of the experience.

Internally, they described it simply: strong on takeoff and landing — but turbulence in between.

The instinct was to better "sell" the process.

## Outside Looking In

Customer reality told a different story.

The issue wasn't resistance — it was how the experience unfolded.

Customers spent years building a trusted relationship with a single sales representative. Then, immediately after signing, that relationship effectively disappeared.

In its place came a wave of specialists — engineering, interiors, systems — each introducing new decisions and complexity. What had felt seamless quickly became disorienting.

At the same time, customers misunderstood the nature of the decisions. Many approached the process as a design exercise — choosing finishes and amenities — without understanding the operational trade-offs.

One moment made this clear: a customer enthusiastically selected a premium sound system and formal dining service — only to have both removed by engineering because the added weight compromised a core mission requirement: short-runway performance.

From the customer's perspective, the process felt arbitrary. From Cessna's, it was necessary.

And as confusion slowed decision-making, the impact didn't stop at the experience — it created downstream delays in production schedules and the release of milestone-based payments.

The gap wasn't capability. It was context and continuity.

## After

The solution wasn't to sell the process harder — it was to redesign how customers moved through it.

We helped Cessna reframe the experience around the customer's perspective:

- Maintaining continuity from sales into specification, avoiding an abrupt handoff
- Structuring the decision journey so customers understood both choices and trade-offs
- Providing context before and during the Wichita sessions to support better decisions
- Creating a communication program (print and digital) to guide both customers and internal teams

The result: more confident, informed customers — faster, more decisive specification choices — fewer delays flowing into production — a more predictable manufacturing queue — and faster release of milestone-based payments.

Because in a purchase this complex, improving the experience doesn't just increase satisfaction — it removes friction from the entire system.

## So What?

In high-consideration, high-emotion environments, the challenge is rarely just the product itself. It's the journey people go through to choose it — and the uncertainty they carry along the way.

That uncertainty doesn't just affect a single transaction. It becomes part of how people remember the experience, how they interpret future interactions, and how confidently they approach the next high-stakes decision.

When that journey breaks down, it doesn't just slow decisions — it undermines confidence, increases friction between people, and creates hesitation where there should be clarity.

The opportunity is to ask:

- Where are we introducing unnecessary uncertainty?
- Where does the experience disrupt trust or continuity?
- Where are people making decisions without the context they need?

Because in high-consideration environments, success isn't just about the quality of the product. It's about how confidently people can move through the decision — and how that experience shapes the next one.
```

- [ ] **Step 2: Verify the file parses correctly**

```bash
cd /Users/barba/Projects/Salt/site && node -e "
const matter = require('gray-matter');
const fs = require('fs');
const d = matter(fs.readFileSync('content/work/cessna-aircraft.md','utf8'));
console.log('slug:', d.data.slug);
console.log('featuredOrder:', d.data.featuredOrder);
console.log('featured:', d.data.featured);
"
```

Expected output:
```
slug: cessna-aircraft
featuredOrder: 3
featured: true
```

- [ ] **Step 3: Commit**

```bash
cd /Users/barba/Projects/Salt && git add site/content/work/cessna-aircraft.md && \
git commit -m "content: add Cessna Aircraft case study"
```

---

## Task 3: Create Road Scholar Case Study

**Files:**
- Create: `site/content/work/road-scholar.md`

- [ ] **Step 1: Create the markdown file**

Write `/Users/barba/Projects/Salt/site/content/work/road-scholar.md`:

```markdown
---
title: "Reinventing a Brand Meant Rethinking What \"Educational Travel\" Really Means"
client: "Road Scholar"
category: "Educational Travel"
slug: "road-scholar"
featured: true
featuredOrder: 4
summary: "The rebrand from Elderhostel to Road Scholar was just the start. The real work was redefining what the experience meant to a new generation of learners."
result: "World's largest not-for-profit educational travel provider — thousands of programs across 100+ countries"
heroImage: "/images/work/roadscholar-hero.jpg"
thumbnailImage: "/images/work/roadscholar-thumb.jpg"
metaDescription: "Saltworks helped Road Scholar — formerly Elderhostel — reframe educational travel from obligation to discovery, launching the brand that now serves tens of thousands annually."
---

Road Scholar — originally founded as Elderhostel — was facing a slow but existential decline. What began in the 1970s as a pioneering idea had grown into a widely recognized program. But the world had changed.

## Before

The original audience was aging out, and growth had stalled. The next generation — Baby Boomers — was larger, wealthier, and more active. But they did not see themselves as "elder," nor were they interested in "hostels."

The organization had acquired a new name — Road Scholar — as a first step toward reinvention. What remained was a blank canvas — and a real risk: without a successful repositioning, the business faced steady erosion.

## Inside Looking Out

The assumption was straightforward: the name was the problem.

"Elderhostel" no longer resonated, and "Road Scholar" would provide a more modern, flexible foundation for growth. From there, the task appeared to be building a brand that would appeal to a broader, somewhat younger audience — one that still valued learning, but also saw travel as leisure and reward.

The opportunity seemed clear: refresh the brand, update the tone, and attract the next generation.

## Outside Looking In

Customer reality proved more complicated — and more revealing.

Yes, "Elderhostel" was a barrier. But simply removing it didn't create an attraction. The deeper issue was how the core idea — "educational travel" — was being interpreted.

For many Baby Boomers, travel was seen as an escape. Education, by contrast, felt like obligation — something tied to responsibility, not relaxation.

That tension surfaced clearly in early concept testing. One proposed direction — "The Journey Never Ends" — was intended to evoke lifelong learning and self-actualization.

The reaction: *"Oh my God… I'm already exhausted."*

That moment clarified the real problem: it wasn't about convincing people to keep learning. It was about redefining what learning felt like in the context of travel.

At the same time, another insight emerged: what truly differentiated the experience wasn't "education" in the abstract — it was **extraordinary access**:

- Going behind the scenes
- Engaging directly with experts
- Experiencing places in ways unavailable to typical tourists

The gap wasn't the name. It was the meaning behind the offering.

## After

The solution was not just a rebrand — but a reframing of the entire experience.

We helped define a new "soul of the brand," grounded in opening minds, enriching lives, and creating meaningful, perspective-changing travel experiences. This came to life through:

- A new brand identity and voice
- The inaugural tagline: *"Learning. It's a Trip."*
- A clear definition of what qualified as a Road Scholar experience

This clarity extended beyond marketing into product development. Experiences that delivered extraordinary access — such as behind-the-scenes engagement with Broadway producers before attending a performance — were amplified. Experiences that lacked that depth were reconsidered or redeveloped.

The result was a brand that didn't just sound different — it behaved differently.

Today, Road Scholar is the world's largest not-for-profit provider of educational travel, offering thousands of programs across more than 100 countries and serving tens of thousands of participants annually.

## So What?

Reinvention often starts with what's visible — names, logos, messaging. But in high-consideration, high-emotion categories, those are rarely the real problem.

The deeper challenge is how people interpret what you offer — and how it fits into their lives.

In this case, the organization believed it needed to modernize its image. But the real opportunity was to redefine the experience: from something that felt like obligation — to something that felt like discovery.

That shift didn't just change perception. It reshaped what the brand delivered, how it differentiated, and why people chose it.

The question for organizations facing reinvention is not just:

- How do we look more relevant?

It's:

- What does our offering actually mean to the people we're trying to reach?

Because in high-consideration environments, growth doesn't come from saying something better. It comes from making something feel fundamentally different.
```

- [ ] **Step 2: Verify parse**

```bash
cd /Users/barba/Projects/Salt/site && node -e "
const matter = require('gray-matter');
const fs = require('fs');
const d = matter(fs.readFileSync('content/work/road-scholar.md','utf8'));
console.log('slug:', d.data.slug);
console.log('featuredOrder:', d.data.featuredOrder);
"
```

Expected: `slug: road-scholar` / `featuredOrder: 4`

- [ ] **Step 3: Commit**

```bash
cd /Users/barba/Projects/Salt && git add site/content/work/road-scholar.md && \
git commit -m "content: add Road Scholar case study"
```

---

## Task 4: Create Wells Fargo Case Study

**Files:**
- Create: `site/content/work/wells-fargo.md`

- [ ] **Step 1: Create the markdown file**

Write `/Users/barba/Projects/Salt/site/content/work/wells-fargo.md`:

```markdown
---
title: "Getting the Right Problem Right Ended 12 Years of Friction"
client: "Wells Fargo Home Mortgage"
category: "Financial Services"
slug: "wells-fargo"
featured: true
featuredOrder: 5
summary: "After more than a decade of failed attempts to fix an internal policy tool, the real breakthrough came from observing how loan teams actually worked — not how leadership assumed they did."
result: "Broke a 12-year cycle. Redesigned around how teams actually work together."
heroImage: "/images/work/wells-fargo-hero.jpg"
thumbnailImage: "/images/work/wells-fargo-thumb.jpg"
metaDescription: "Saltworks helped Wells Fargo Home Mortgage reframe a decade-long internal tool problem by observing the collaborative reality of loan origination — and designing around it."
---

Wells Fargo was in the middle of a technical replatforming effort — creating an opportunity to rethink an internal policy reference resource used by loan origination teams. But progress had stalled for years.

## Before

Multiple attempts to improve the experience had failed to gain traction, and after more than a decade of trying, IT and business leaders still couldn't align on what the system should be.

At the same time, the organization was preparing to move forward with an approach that would have required an investment in the range of several million dollars. The risk wasn't just spending the money — it was investing further in a solution built around the wrong understanding of the problem.

## Inside Looking Out

The prevailing vision was straightforward: build a centralized, static library of policy information.

The assumption was that better access to content would solve the problem. That assumption extended to how the system itself would be used — designed around the idea that employees would interact with information on a single computer screen, in a relatively contained workflow.

But this approach reflected how organizations imagine information gets used — not how teams actually work in fast-moving, collaborative loan origination environments.

## Outside Looking In

We went into the field to observe how teams actually worked — not in conference rooms, but in their everyday environments.

What we found reframed the problem entirely. Loan origination wasn't an individual activity — it was deeply collaborative. Teams operated across experience levels, interpreting complex policies together, often in real time. They relied on each other — not just systems — to make sense of it all.

What mattered wasn't only access to information. It was **relevance, context, and shared understanding**.

We also discovered something deceptively simple, but critically important: virtually every employee had developed a multi-screen workstation configuration. People weren't working from a single contained interface — they were constantly moving between applications, documents, references, communications, and workflows simultaneously.

That changed everything about how information needed to be surfaced, prioritized, and navigated.

- Junior team members looked to more experienced colleagues for interpretation and reassurance
- Senior team members acted as informal guides, translating complexity into action
- Decisions were often shaped as much by conversation as by documentation
- Information usage was dynamic, spatial, and highly contextual — not static

The concept of a passive library didn't support how work actually got done. The gap wasn't information — it was **how information and judgment flowed between people in the real working environment**.

## After

Instead of building a better library, we helped redefine the system around how teams actually operated.

We introduced interaction models inspired by familiar consumer platforms like Amazon and Spotify — where discovery, curation, personalization, and contextual relevance are built into the experience. This enabled:

- Individuals to quickly find relevant information based on their immediate needs
- Experienced team members to curate and guide content for others
- Teams to align around shared understanding in real time
- Information to function naturally within multi-screen, multi-task workflows

The result was a system that didn't just store policies — it supported decision-making in a way that reflected how people actually worked together.

And just as importantly, it helped break a 12-year cycle of trying to solve the wrong problem.

## So What?

In high-consideration environments, decisions are rarely just technical. They're human.

Whether it's a customer choosing a complex product or a team navigating internal systems, the weight of the decision shows up in how people rely on each other — how they ask questions, check assumptions, and build confidence together.

The danger is that organizations often design solutions from a distance — based on assumptions about workflows, behaviors, or needs that feel logical internally, but don't reflect lived reality.

Sometimes the difference between years of friction and meaningful progress comes from observing something as simple as how people actually arrange their desks.

The opportunity is to ask:

- Are we designing around assumptions — or observed behavior?
- Do we understand how people really work together under pressure?
- Are we solving the visible problem — or the underlying one?

Because in high-consideration environments, success isn't just about solving the problem. It's about getting the right problem right.
```

- [ ] **Step 2: Verify parse**

```bash
cd /Users/barba/Projects/Salt/site && node -e "
const matter = require('gray-matter');
const fs = require('fs');
const d = matter(fs.readFileSync('content/work/wells-fargo.md','utf8'));
console.log('slug:', d.data.slug);
console.log('featuredOrder:', d.data.featuredOrder);
"
```

Expected: `slug: wells-fargo` / `featuredOrder: 5`

- [ ] **Step 3: Commit**

```bash
cd /Users/barba/Projects/Salt && git add site/content/work/wells-fargo.md && \
git commit -m "content: add Wells Fargo case study"
```

---

## Task 5: Create TIAA Financial Services Case Study

**Files:**
- Create: `site/content/work/tiaa-financial-services.md`

- [ ] **Step 1: Create the markdown file**

Write `/Users/barba/Projects/Salt/site/content/work/tiaa-financial-services.md`:

```markdown
---
title: "Financial Services Fail When They Treat Life Transitions Like Transactions"
client: "TIAA Financial Services"
category: "Financial Services"
slug: "tiaa-financial-services"
featured: true
featuredOrder: 6
summary: "TIAA's asset retention efforts were fragmented across teams — and built on a flawed premise that major life events follow a linear path."
result: "Improved retention. Stronger trust at the highest-stakes moments in a customer's financial life."
heroImage: "/images/work/tiaa-hero.jpg"
thumbnailImage: "/images/work/tiaa-thumb.jpg"
metaDescription: "Saltworks helped TIAA redesign its customer engagement model around the cyclical reality of life transitions — improving retention and trust at critical financial moments."
---

TIAA was working to improve asset retention across key life events — moments when customers were most likely to close accounts or withdraw funds. But the effort was fragmented.

## Before

Multiple internal teams owned different parts of the experience, with limited coordination across the full customer journey. As a result, engagement was inconsistent at precisely the moments when continuity mattered most.

## Inside Looking Out

The organization focused on two primary trigger events: job changes and account holder deaths.

Job changes were detected through behavioral signals such as a stop in payroll contributions. The subsequent process treated all customers similarly, regardless of circumstance.

The beneficiary experience was similarly standardized — focused on documentation, legal requirements, and transaction completion, managed across separate functional silos.

The underlying assumption was that consistency in process would create fairness and efficiency.

## Outside Looking In

Customer research revealed a more complex reality: these were not linear events — they were cyclical human experiences that evolved over time.

Job changes were not a single moment, but a shifting sequence:

- Anticipation or disruption
- Transition and adjustment
- Stabilization and reassessment

Customers moved in and out of emotional readiness across that cycle.

Beneficiary experiences followed a similarly non-linear path:

- Immediate shock and emotional overload
- A period of practical disengagement or avoidance
- Later re-engagement when capacity for decision-making returned

In both cases, the experience was not a straight line from trigger to resolution — it was a series of emotional states over time. Yet the system treated these journeys as linear workflows.

That created a missed opportunity: multiple points where TIAA could have shown up more effectively — supporting customers when they were ready, not just when the process dictated engagement.

The gap wasn't segmentation. It was failing to recognize the cyclical nature of human decision-making under life transition.

## After

We helped redesign these experiences around journey models that reflected emotional cycles rather than linear steps. This included:

- Distinguishing between voluntary and involuntary job transitions, with engagement calibrated to different phases of the cycle
- Introducing phased beneficiary experiences that allowed for re-entry at different emotional points over time
- Mapping multiple touchpoints where the organization could re-engage meaningfully, rather than once at a fixed moment
- Aligning siloed teams around shared journey cycles instead of discrete process handoffs

The result was a more adaptive system — one that could meet customers at the right moment in their emotional and practical readiness, rather than forcing engagement on a fixed timeline.

This improved retention and strengthened trust during some of the most sensitive financial moments in a customer's life.

## So What?

In financial services, journeys are often designed as linear processes: a trigger happens, a workflow begins, and an outcome is delivered.

But life transitions don't behave that way. They are cyclical, with people moving in and out of readiness, clarity, and capacity over time.

That matters because engagement timing becomes just as important as engagement content. When organizations recognize these cycles, the opportunity expands: they are no longer limited to a single "moment of intervention," but can identify multiple points where support, guidance, or reassurance will actually be received.

The opportunity is to ask:

- Are we designing journeys as linear processes or lived cycles?
- Do we understand when people are actually ready to engage?
- Are we showing up at the right emotional points — or only the operational ones?

Because in high-consideration environments, success isn't just about completing the journey. It's about recognizing that the journey repeats, evolves, and returns — and being present when it does.
```

- [ ] **Step 2: Verify parse**

```bash
cd /Users/barba/Projects/Salt/site && node -e "
const matter = require('gray-matter');
const fs = require('fs');
const d = matter(fs.readFileSync('content/work/tiaa-financial-services.md','utf8'));
console.log('slug:', d.data.slug);
console.log('featuredOrder:', d.data.featuredOrder);
"
```

Expected: `slug: tiaa-financial-services` / `featuredOrder: 6`

- [ ] **Step 3: Commit**

```bash
cd /Users/barba/Projects/Salt && git add site/content/work/tiaa-financial-services.md && \
git commit -m "content: add TIAA Financial Services case study"
```

---

## Task 6: Update Grand Banks Case Study

**Files:**
- Modify: `site/content/work/grand-banks-yachts.md`

The existing file has the correct case study body but needs the `So What?` section added (it already exists in the RTF source) and the hero image is now replaced by Task 1.

- [ ] **Step 1: Replace the full file with updated content**

Write `/Users/barba/Projects/Salt/site/content/work/grand-banks-yachts.md`:

```markdown
---
title: "The Wrong Problem Was Costing a Yacht Maker Millions"
client: "Grand Banks Yachts"
category: "Luxury Yachts"
slug: "grand-banks-yachts"
featured: true
featuredOrder: 2
summary: "A yacht maker planned a costly hull redesign. Customer research revealed the real issue was below deck — and far cheaper to fix."
result: "Avoided a multi-million dollar misstep. Stronger sales, more efficient capital."
heroImage: "/images/work/grand-banks-hero.jpg"
thumbnailImage: "/images/work/grand-banks-thumb.jpg"
metaDescription: "Saltworks helped Grand Banks Yachts avoid a multi-million dollar hull redesign by uncovering the real barrier to purchase: an outdated onboard experience."
---

Grand Banks Yachts came to us facing sluggish sales in a competitive, high-end market. Internally, they had already identified what they believed was the issue: their yachts weren't fast enough.

## Inside Looking Out

The Grand Banks team's hypothesis was clear — performance was the problem. If competitors were winning on speed, the solution was to re-engineer the hull design to go faster. But this wasn't a minor adjustment — it would require a significant capital investment in design, engineering, and production.

Before committing millions, they asked us to validate the assumption.

## Outside Looking In

We went directly to the source: customers.

Across interviews with current owners and prospective buyers, a very different picture emerged. Speed wasn't driving dissatisfaction — or purchase decisions.

Instead, a consistent theme surfaced: the **onboard experience** felt dated. Cabin interiors were described as uninspired, even out of step with the expectations of a luxury buyer. For customers spending extended time onboard, this wasn't a minor detail — it was central to the experience.

In other words, the issue wasn't how the yacht moved. It was how it made people feel when they were on it.

## After

By uncovering the real barrier to purchase, we helped Grand Banks avoid a costly misstep. Rather than investing millions in hull redesign, they redirected resources toward modernizing cabin interiors — elevating comfort, aesthetics, and overall onboard experience.

The impact was immediate and meaningful: stronger customer resonance, increased sales, and a far more efficient use of capital.

Because in luxury categories, performance gets you considered — but experience is what gets you chosen.

## So What?

When growth slows, companies often look to engineering for answers — more features, more performance, more innovation. But customers don't buy specs. They buy outcomes — and how those outcomes make them feel.

The risk is solving the wrong problem expensively:

- Are you optimizing for what's measurable, or what actually matters to customers?
- Are internal assumptions replacing real customer understanding?
- Are you investing in improvements customers will notice — or ignoring the ones they care about most?

For brands in high-consideration, high-emotion categories, the biggest gains rarely come from doing more. They come from seeing more clearly. Because the difference between insight and assumption isn't subtle — it's often measured in millions.
```

- [ ] **Step 2: Verify**

```bash
cd /Users/barba/Projects/Salt/site && node -e "
const matter = require('gray-matter');
const fs = require('fs');
const d = matter(fs.readFileSync('content/work/grand-banks-yachts.md','utf8'));
console.log('featuredOrder:', d.data.featuredOrder);
console.log('heroImage:', d.data.heroImage);
"
```

Expected: `featuredOrder: 2` / `heroImage: /images/work/grand-banks-hero.jpg`

- [ ] **Step 3: Commit**

```bash
cd /Users/barba/Projects/Salt && git add site/content/work/grand-banks-yachts.md && \
git commit -m "content: update Grand Banks case study with new hero and So What section"
```

---

## Task 7: Fix Footer — Remove Black Bar and Resize Logo

**Files:**
- Modify: `site/components/Footer.tsx`

**Root cause of black bar:** `<footer className="bg-charcoal mt-20">` — the `mt-20` (80px margin) creates a gap between the charcoal Contact section and charcoal Footer, filled by the black body background.

- [ ] **Step 1: Update Footer.tsx**

In `/Users/barba/Projects/Salt/site/components/Footer.tsx`, replace the entire file content:

```tsx
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-charcoal">
      <div className="section-inner py-14 flex flex-col md:flex-row justify-between items-start gap-10">
        <div>
          <Image
            src="/images/saltworks-logo.png"
            alt="Saltworks"
            width={480}
            height={65}
            className="w-auto mb-4"
            style={{ height: "clamp(22px, 2.5vw, 32px)", mixBlendMode: "screen", opacity: 0.75 }}
          />
          <p className="text-muted text-sm font-light leading-relaxed">
            Enthusiast Branding &amp; Experience Design
          </p>
        </div>

        <address className="not-italic text-sm text-muted font-light leading-loose">
          Seaport Lofts<br />
          437 D Street, Unit 7D<br />
          Boston, MA 02210<br />
          <a href="tel:6175780100" className="text-muted hover:text-cream transition-colors">
            617.578.0100
          </a>
        </address>

        <nav aria-label="Footer" className="flex flex-col gap-3">
          {[
            { href: "/about", label: "About" },
            { href: "/work", label: "Work" },
            { href: "/contact", label: "Contact" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm uppercase tracking-widest text-muted hover:text-cream font-normal transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t border-black/30">
        <div className="section-inner py-5">
          <p className="text-sm text-muted/60 font-light">
            &copy; {new Date().getFullYear()} Saltworks, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Verify dev server compiles without error**

```bash
cd /Users/barba/Projects/Salt/site && npm run build 2>&1 | tail -20
```

Expected: build succeeds, no TypeScript errors.

- [ ] **Step 3: Commit**

```bash
cd /Users/barba/Projects/Salt && git add site/components/Footer.tsx && \
git commit -m "fix: remove footer mt-20 black bar, increase logo size responsively"
```

---

## Task 8: Fix Nav Logo Size

**Files:**
- Modify: `site/components/Nav.tsx`

The logo `style` is currently commented out, causing the 480×65 logo to render at full intrinsic size — too large on desktop, not responsive.

- [ ] **Step 1: Update the logo Image in Nav.tsx**

In `/Users/barba/Projects/Salt/site/components/Nav.tsx`, replace the `<Image>` block inside the logo `<Link>`:

```tsx
<Link href="/" className="block" aria-label="Saltworks — Home">
  <Image
    src="/images/saltworks-logo.png"
    alt="Saltworks"
    width={480}
    height={65}
    className="w-auto"
    style={{ height: "clamp(24px, 3vw, 38px)", mixBlendMode: "screen" }}
    priority
  />
</Link>
```

- [ ] **Step 2: Verify build**

```bash
cd /Users/barba/Projects/Salt/site && npm run build 2>&1 | tail -10
```

Expected: no TypeScript errors.

- [ ] **Step 3: Commit**

```bash
cd /Users/barba/Projects/Salt && git add site/components/Nav.tsx && \
git commit -m "fix: restore responsive logo sizing in Nav"
```

---

## Task 9: Fix Carousel Tab Font Legibility

**Files:**
- Modify: `site/components/sections/Hero.tsx`

**Problems:** Tab labels at 11px with inactive color `#a1abac` (too dim). Old site used 14px tabs.  
**Fix:** Increase to 13px, inactive color → `#e4e2db` (cream) for clear contrast on the `#1a1a1a` pager bar.

- [ ] **Step 1: Update tab button styles in Hero.tsx**

In `/Users/barba/Projects/Salt/site/components/sections/Hero.tsx`, find the `<button>` inside the tab navigation and replace its `style` prop:

Old:
```tsx
style={{
  fontSize: "11px",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  fontWeight: 400,
  color: i === current ? "#be6021" : "#a1abac",
  borderTop: `2px solid ${i === current ? "#be6021" : "transparent"}`,
}}
```

New:
```tsx
style={{
  fontSize: "13px",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  fontWeight: 400,
  color: i === current ? "#be6021" : "#e4e2db",
  borderTop: `2px solid ${i === current ? "#be6021" : "transparent"}`,
}}
```

- [ ] **Step 2: Verify build**

```bash
cd /Users/barba/Projects/Salt/site && npm run build 2>&1 | tail -10
```

- [ ] **Step 3: Commit**

```bash
cd /Users/barba/Projects/Salt && git add site/components/sections/Hero.tsx && \
git commit -m "fix: improve carousel tab legibility — larger font, cream inactive color"
```

---

## Task 10: Fix Section Background Colors

**Files:**
- Modify: `site/components/sections/AboutSection.tsx`
- Modify: `site/components/sections/WhatWeDo.tsx`
- Modify: `site/components/sections/TheTeam.tsx`

Approved scheme: About → `bg-[#1a1a1a]`, What We Do → `bg-charcoal`, The Team → `bg-black`.

- [ ] **Step 1: Add background to AboutSection.tsx**

In `/Users/barba/Projects/Salt/site/components/sections/AboutSection.tsx`, replace:

```tsx
<section className="py-16 md:py-24" aria-labelledby="about-heading">
```

With:

```tsx
<section className="py-16 md:py-24 bg-[#1a1a1a]" aria-labelledby="about-heading">
```

- [ ] **Step 2: Add background to WhatWeDo.tsx**

In `/Users/barba/Projects/Salt/site/components/sections/WhatWeDo.tsx`, replace:

```tsx
<section className="py-16 md:py-24" id="what-we-do" aria-labelledby="services-heading">
```

With:

```tsx
<section className="py-16 md:py-24 bg-charcoal" id="what-we-do" aria-labelledby="services-heading">
```

- [ ] **Step 3: Add background to TheTeam.tsx**

In `/Users/barba/Projects/Salt/site/components/sections/TheTeam.tsx`, replace:

```tsx
<section className="py-16 md:py-24" id="team" aria-labelledby="team-heading">
```

With:

```tsx
<section className="py-16 md:py-24 bg-black" id="team" aria-labelledby="team-heading">
```

- [ ] **Step 4: Verify build**

```bash
cd /Users/barba/Projects/Salt/site && npm run build 2>&1 | tail -10
```

- [ ] **Step 5: Commit**

```bash
cd /Users/barba/Projects/Salt && \
git add site/components/sections/AboutSection.tsx \
        site/components/sections/WhatWeDo.tsx \
        site/components/sections/TheTeam.tsx && \
git commit -m "fix: add explicit section backgrounds for visual rhythm"
```

---

## Task 11: Fix Leadership Team Images

**Files:**
- Modify: `site/components/sections/TheTeam.tsx`

**Problem:** Drake and Katie use JPEG portrait files (612×792, no transparency). The correct files are circular transparent PNGs (400×400 RGBA) now in `public/images/team/`. All six team members should use `object-contain` so circular PNGs display correctly without cropping.

- [ ] **Step 1: Update TheTeam.tsx — image references and rendering**

Replace the entire `TheTeam.tsx` file at `/Users/barba/Projects/Salt/site/components/sections/TheTeam.tsx`:

```tsx
"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";

const team = [
  {
    name: "Paul Caldera",
    title: "Brand Integration · Cofounder",
    image: "/images/team/paul-caldera.png",
    bio: "For the past two decades, Paul has helped leading companies in a wide range of enthusiast industries develop strategic design and integrated brand communication programs. In all cases, his work has had a positive and measurable impact on his clients' business performance.",
    enthusiast: "Tennis, running, Red Sox enthusiast",
    email: "paul@saltworksinc.com",
  },
  {
    name: "Doreen Caldera",
    title: "Brand Design · Cofounder",
    image: "/images/team/doreen-caldera.png",
    bio: "As creative director and enthusiast-branding expert, Doreen works in close collaboration with brand partners to develop targeted branding and identity solutions that motivate enthusiasts to take action. Her work has been consistently recognized in national and international design publications including Graphis, Communication Arts, Print and HOW.",
    enthusiast: "Dark chocolate, urban dwelling + dog enthusiast",
    email: "doreen@saltworksinc.com",
  },
  {
    name: "Christine Bailey",
    title: "Brand Build",
    image: "/images/team/christine-bailey.png",
    bio: "Christine brings a unique blend of design, production and client service skills and expertise to her role at Saltworks. Her brand-building portfolio spans a broad range of enthusiast organizations that include the Phoenix Coyotes Hockey Club, Backroads Active Travel, Boyd Gaming and Ballet Arizona.",
    enthusiast: "Running, yoga, Charity Miles enthusiast",
    email: "christine@saltworksinc.com",
  },
  {
    name: "Carlos Alcala",
    title: "Brand Interactive",
    image: "/images/team/carlos-alcala.png",
    bio: "Carlos has more than 25 years of experience developing integrated branding, interactive, and social programs for enthusiast audiences. He works closely with project teams throughout the different phases of each engagement to ensure that design, content and technical development align with both client and user goals.",
    enthusiast: "Wine, music, travel enthusiast",
    email: "carlos@saltworksinc.com",
  },
  {
    name: "Drake Pusey",
    title: "Brand Ecosystems",
    image: "/images/team/drake-pusey.png",
    bio: "Drake enables brands to achieve sustainable differentiation by proactively empowering customers. By developing strategic alignment between brand, customer experience, and product development, he can turn what is often a zero-sum game into a win-win situation.",
    enthusiast: "Bushido, exploration, and wildlife enthusiast",
    email: "drake@saltworksinc.com",
  },
  {
    name: "Katie Karatzas",
    title: "Brand Experience",
    image: "/images/team/katie-karatzas.png",
    bio: "Katie has a strong foundation anchored in ethnographic research and product innovation. Her superpowers include the ability to translate data from qualitative research into effective tools for design and sift through complex information to quickly present a clear and concise point of view.",
    enthusiast: "Gardening, cooking and painting enthusiast",
    email: "katie@saltworksinc.com",
  },
];

export default function TheTeam() {
  const [active, setActive] = useState<string | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = useCallback((name: string) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setActive(name);
  }, []);

  const handleLeave = useCallback(() => {
    leaveTimer.current = setTimeout(() => setActive(null), 150);
  }, []);

  const handlePanelEnter = useCallback(() => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
  }, []);

  const activeMember = team.find((m) => m.name === active) ?? null;

  return (
    <section className="py-16 md:py-24 bg-black" id="team" aria-labelledby="team-heading">
      <div className="section-inner">
        <p className="section-label mb-6">The Team</p>
        <h2 id="team-heading" className="text-olive text-2xl font-light mb-12">
          Leadership
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {team.map((member) => (
            <div
              key={member.name}
              onMouseEnter={() => handleEnter(member.name)}
              onMouseLeave={handleLeave}
              className="cursor-pointer group"
              role="button"
              tabIndex={0}
              aria-expanded={active === member.name}
              onFocus={() => handleEnter(member.name)}
              onBlur={handleLeave}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActive(active === member.name ? null : member.name);
                }
              }}
            >
              {/* Photo — transparent circle PNG, no background fill */}
              <div className="relative w-full aspect-square mb-3">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-contain transition-all duration-300"
                  style={{
                    filter: active === member.name ? "grayscale(0%)" : "grayscale(100%)",
                    opacity: active === member.name ? 1 : 0.75,
                  }}
                />
              </div>

              <p
                className="text-sm font-normal transition-colors"
                style={{ color: active === member.name ? "#919655" : "#e4e2db" }}
              >
                {member.name}
              </p>
              <p className="text-muted text-xs font-light mt-0.5">{member.title}</p>
            </div>
          ))}
        </div>

        {/* Full-width bio panel */}
        <div
          onMouseEnter={handlePanelEnter}
          onMouseLeave={handleLeave}
          className="overflow-hidden transition-all duration-300"
          style={{
            maxHeight: activeMember ? "300px" : "0px",
            opacity: activeMember ? 1 : 0,
            marginTop: activeMember ? "2rem" : "0",
          }}
          aria-live="polite"
        >
          {activeMember && (
            <div className="border-t border-olive/20 pt-8 pb-4">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-1">
                  <p className="text-cream text-sm font-normal mb-1">{activeMember.name}</p>
                  <p className="text-muted text-xs font-light mb-4">{activeMember.title}</p>
                  <p className="text-muted text-base font-light leading-loose">{activeMember.bio}</p>
                </div>
                <div className="md:w-64 shrink-0">
                  <p className="text-olive/70 text-sm font-light italic mb-3">{activeMember.enthusiast}</p>
                  <a
                    href={`mailto:${activeMember.email}`}
                    className="text-sm text-olive hover:text-rust transition-colors font-normal"
                  >
                    {activeMember.email}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
cd /Users/barba/Projects/Salt/site && npm run build 2>&1 | tail -10
```

- [ ] **Step 3: Commit**

```bash
cd /Users/barba/Projects/Salt && git add site/components/sections/TheTeam.tsx && \
git commit -m "fix: use circular transparent PNGs for all team photos, object-contain layout"
```

---

## Task 12: Fix Clients Section — Logo Size and Collapse/Expand

**Files:**
- Modify: `site/components/sections/Clients.tsx`

**Changes:**
1. Convert to client component (add `"use client"`)
2. Show first 18 logos by default; remaining 30 hidden with a "+" toggle
3. Reduce cell and image size — current `min-h-[150px]` cells with 150×150 logos are oversized; reduce cells to `min-h-[80px]` and logos to display at a natural readable size
4. Increase logo opacity from 0.55 → 0.7 at rest (brighter on hover stays at 0.9)

- [ ] **Step 1: Update globals.css for client logo opacity**

In `/Users/barba/Projects/Salt/site/app/globals.css`, replace:

```css
.client-logo {
  mix-blend-mode: screen;
  opacity: 0.55;
}
```

With:

```css
.client-logo {
  mix-blend-mode: screen;
  opacity: 0.7;
}
```

- [ ] **Step 2: Replace Clients.tsx**

Write `/Users/barba/Projects/Salt/site/components/sections/Clients.tsx`:

```tsx
"use client";

import { useState } from "react";
import Image from "next/image";

const clients = [
  { name: "The North Face",               logo: "/images/clients/clients_01.png" },
  { name: "Cessna Aircraft",              logo: "/images/clients/clients_02.png" },
  { name: "Parker Guitars",               logo: "/images/clients/clients_03.png" },
  { name: "Backroads Active Travel",      logo: "/images/clients/clients_04.png" },
  { name: "Segway",                       logo: "/images/clients/clients_05.png" },
  { name: "Thomson Safaris",              logo: "/images/clients/clients_06.png" },
  { name: "JanSport",                     logo: "/images/clients/clients_07.png" },
  { name: "Hinckley Yachts",             logo: "/images/clients/clients_08.png" },
  { name: "Ben Hogan Golf",              logo: "/images/clients/clients_09.png" },
  { name: "TomTom Navigation",           logo: "/images/clients/clients_10.png" },
  { name: "Road Scholar",                logo: "/images/clients/clients_11.png" },
  { name: "MIT Sloan",                   logo: "/images/clients/clients_12.png" },
  { name: "Johnson & Johnson",           logo: "/images/clients/clients_13.png" },
  { name: "The Weather Channel",         logo: "/images/clients/clients_14.png" },
  { name: "Bombardier Aerospace",        logo: "/images/clients/clients_15.png" },
  { name: "W. L. Gore / Gore-Tex",       logo: "/images/clients/clients_16.png" },
  { name: "Citibank",                    logo: "/images/clients/clients_17.png" },
  { name: "The Salvation Army",          logo: "/images/clients/clients_18.png" },
  { name: "Teva",                        logo: "/images/clients/clients_19.png" },
  { name: "Best Western",               logo: "/images/clients/clients_20.png" },
  { name: "Top Flite Golf",             logo: "/images/clients/clients_21.png" },
  { name: "Alden Yachts",               logo: "/images/clients/clients_22.png" },
  { name: "Apollo Educational Group",   logo: "/images/clients/clients_23.png" },
  { name: "Chums",                       logo: "/images/clients/clients_24.png" },
  { name: "Samsonite",                   logo: "/images/clients/clients_25.png" },
  { name: "Doubletree Hotels",           logo: "/images/clients/clients_26.png" },
  { name: "Boyd Gaming",                logo: "/images/clients/clients_27.png" },
  { name: "Broadreach",                 logo: "/images/clients/clients_28.png" },
  { name: "Ranger Boats",               logo: "/images/clients/clients_29.png" },
  { name: "Del Webb",                   logo: "/images/clients/clients_30.png" },
  { name: "Degré 7 Skiwear",            logo: "/images/clients/clients_31.png" },
  { name: "Dial Company",               logo: "/images/clients/clients_32.png" },
  { name: "Troxel Cycling & Fitness",   logo: "/images/clients/clients_33.png" },
  { name: "California Artichoke Advisory Board", logo: "/images/clients/clients_34.png" },
  { name: "Earth Shoes",                logo: "/images/clients/clients_35.png" },
  { name: "Grand Banks Yachts",         logo: "/images/clients/clients_36.png" },
  { name: "Hodgdon Yachts",             logo: "/images/clients/clients_37.png" },
  { name: "Qwest Communications",       logo: "/images/clients/clients_38.png" },
  { name: "Motorola",                   logo: "/images/clients/clients_39.png" },
  { name: "Rockford Fosgate",           logo: "/images/clients/clients_40.png" },
  { name: "Starwood Hotels",            logo: "/images/clients/clients_41.png" },
  { name: "Tauck World Discovery",      logo: "/images/clients/clients_42.png" },
  { name: "Simon & Schuster",           logo: "/images/clients/clients_43.png" },
  { name: "Winston Flowers",            logo: "/images/clients/clients_44.png" },
  { name: "Weyerhaeuser",               logo: "/images/clients/clients_45.png" },
  { name: "TIAA",                       logo: "/images/clients/clients_46.png" },
  { name: "DuPont",                     logo: "/images/clients/clients_47.png" },
  { name: "Wells Fargo",                logo: "/images/clients/clients_48.png" },
];

const INITIAL_COUNT = 18;

export default function Clients() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? clients : clients.slice(0, INITIAL_COUNT);

  return (
    <section className="py-16 md:py-20 bg-black" id="clients" aria-labelledby="clients-heading">
      <div className="section-inner">
        <p className="section-label mb-2">Clients</p>
        <p className="text-muted text-sm font-light mb-12">
          Enthusiast brands come in all industries and sizes.
        </p>
        <h2 id="clients-heading" className="sr-only">Our Clients</h2>

        <ul
          className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-6 gap-y-8"
          role="list"
        >
          {visible.map(({ name, logo }) => (
            <li key={name} className="flex items-center justify-center min-h-[80px] group">
              <Image
                src={logo}
                alt={name}
                width={110}
                height={70}
                className="client-logo object-contain w-auto h-auto transition-opacity duration-200"
              />
            </li>
          ))}
        </ul>

        {clients.length > INITIAL_COUNT && (
          <div className="mt-10 flex items-center gap-3">
            <button
              onClick={() => setExpanded((e) => !e)}
              aria-expanded={expanded}
              className="flex items-center gap-2 text-muted hover:text-cream transition-colors text-xs uppercase tracking-widest font-normal group"
            >
              <span
                className="inline-flex items-center justify-center w-6 h-6 border border-muted group-hover:border-cream transition-colors text-base leading-none"
                aria-hidden="true"
              >
                {expanded ? "−" : "+"}
              </span>
              <span>{expanded ? "Show Less" : "More Clients"}</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
cd /Users/barba/Projects/Salt/site && npm run build 2>&1 | tail -10
```

Expected: clean build.

- [ ] **Step 4: Commit**

```bash
cd /Users/barba/Projects/Salt && \
git add site/components/sections/Clients.tsx site/app/globals.css && \
git commit -m "feat: clients section — collapse/expand toggle, better logo sizing"
```

---

## Task 13: Final Build Verification

- [ ] **Step 1: Full production build**

```bash
cd /Users/barba/Projects/Salt/site && npm run build 2>&1
```

Expected: exit 0. All 6 work slugs appear in the static generation output:
```
/work/cessna-aircraft
/work/road-scholar
/work/wells-fargo
/work/tiaa-financial-services
/work/grand-banks-yachts
/work/parker-guitars
```

- [ ] **Step 2: Spot-check case study routes in dev server**

```bash
cd /Users/barba/Projects/Salt/site && npm run dev &
sleep 5
curl -s http://localhost:3000/work/cessna-aircraft | grep -c "Turbulence"
curl -s http://localhost:3000/work/road-scholar | grep -c "Road Scholar"
curl -s http://localhost:3000/work/wells-fargo | grep -c "Wells Fargo"
curl -s http://localhost:3000/work/tiaa-financial-services | grep -c "TIAA"
```

Expected: each `grep -c` returns `1` or more.

- [ ] **Step 3: Kill dev server**

```bash
kill %1 2>/dev/null || true
```

- [ ] **Step 4: Final commit**

```bash
cd /Users/barba/Projects/Salt && git add -A && \
git status --short
```

If `git status --short` shows nothing unexpected, the implementation is complete.

---

## Self-Review Checklist

| Spec requirement | Covered by |
|-----------------|------------|
| 4 new case studies (Cessna, Road Scholar, Wells Fargo, TIAA) | Tasks 2–5 |
| Grand Banks hero → Grand Banks 1.png | Tasks 1, 6 |
| Parker Guitars unchanged | No task needed — featuredOrder already 1 |
| Case study sequence 1–6 | featuredOrder in each markdown file |
| "So What?" sections on all cases | All markdown files include it |
| Section backgrounds (alternating) | Tasks 10, 11 |
| Carousel tab legibility | Task 9 |
| Nav logo responsive sizing | Task 8 |
| Footer black bar removed | Task 7 |
| Footer logo larger | Task 7 |
| Clients collapse/expand | Task 12 |
| Client logos brighter | Task 12 (globals.css) |
| Leadership circular PNGs | Tasks 1, 11 |
| Drake + Katie correct images | Tasks 1, 11 |
