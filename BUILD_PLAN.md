# SnapFit

## Product Overview
AI-powered Client Journey Tracking + Smart Nurture Hub for fitness, med spa, and weight loss clinics

## Tech Stack
- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS + shadcn/ui
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL
- **Auth**: NextAuth.js
- **AI**: OpenAI API (for content generation, insights)
- **Image Processing**: Sharp (for before/after photos)
- **Email**: Resend
- **SMS**: Twilio
- **Hosting**: Vercel

## Core Features

### 1. Client Journey Tracking
- Progress milestones (weight, measurements, photos)
- Before/after photo comparison slider
- Timeline view of entire client journey
- Goal setting & achievement tracking
- Body composition charts/graphs

### 2. Smart Nurture Hub
- Automated email sequences
  - Welcome series
  - Milestone celebrations
  - Re-engagement campaigns
  - Birthday/anniversary messages
- SMS check-ins
- Knowledge base/FAQ portal
- Seasonal offers automation

### 3. Milestone Sharing
- Auto-generated shareable cards
- Social media integration
- "I hit my goal!" templates
- Review request triggers at positive milestones

### 4. Client Portal
- Personal dashboard
- Appointment booking
- Progress photos private gallery
- Direct messaging with coach/staff
- Resource library access

## Database Schema

```sql
-- Businesses
businesses: id, name, type (gym/medspa/clinic), plan_tier, created_at

-- Clients
clients: id, business_id, email, name, phone, birth_date, goals, created_at

-- Milestones
milestones: id, client_id, type, value, date, notes, is_public, created_at

-- Progress Photos
progress_photos: id, client_id, photo_url, date, category, created_at

-- Nurture Sequences
sequences: id, business_id, name, trigger_type, trigger_delay, email_template_id

-- Emails Sent
emails: id, client_id, sequence_id, sent_at, opened_at, clicked_at

-- Appointments
appointments: id, client_id, business_id, date, type, status, notes

-- Reviews
reviews: id, client_id, business_id, platform, rating, review_text, created_at
```

## API Endpoints

```
POST   /api/clients
GET    /api/clients/:id/progress
POST   /api/milestones
POST   /api/progress-photos
GET    /api/sequences
POST   /api/sequences/trigger
POST   /api/share/milestone
GET    /api/analytics/retention
```

## MVP Milestones

### Phase 1: Journey Tracking (Week 1-2)
- [ ] Client onboarding flow
- [ ] Progress photo upload with comparison
- [ ] Milestone logging
- [ ] Basic charts

### Phase 2: Nurture Automation (Week 3-4)
- [ ] Email sequence builder
- [ ] Trigger automation
- [ ] Template library
- [ ] SMS integration

### Phase 3: Sharing & Social (Week 5)
- [ ] Shareable milestone cards
- [ ] Social media integration
- [ ] Review request automation

### Phase 4: Portal & Booking (Week 6)
- [ ] Client self-service portal
- [ ] Appointment booking
- [ ] Knowledge base

## Pricing Tiers
- **Starter**: $49/mo — 100 clients, basic tracking
- **Growth**: $99/mo — 500 clients, full nurture automation
- **Scale**: $199/mo — Unlimited, AI insights, white-label

## Marketing Flywheel → Services
- "Your retention is dropping — let us optimize your nurture sequences"
- "Clients love the journey tracking — let us create your content strategy"
- "Your reviews are flowing — let us manage your reputation"
