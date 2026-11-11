# RoboSpark Academy

Free, multilingual (EN · KZ · RU), self-paced online robotics school for students in Kazakhstan — MVP prototype.

**Learn at your own pace. Build beyond limits.**

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
# or: npm run build && npm start
```

## What's inside

| Page | Path |
|---|---|
| Home | `/` |
| Course catalogue (filters: category, level, language, duration) | `/courses` |
| Course details | `/courses/[slug]` |
| Video lesson / quiz / assignment | `/courses/[slug]/learn/[lessonId]` |
| My Learning dashboard | `/dashboard` |
| Mentors | `/mentors` |
| About + partnership form | `/about` |
| Registration (with parent/guardian consent) / Login | `/register`, `/login` |
| Privacy & community rules | `/privacy` |
| Certificate | `/certificate/[slug]` |

Stack: Next.js (App Router), React, Tailwind CSS. Fonts: Unbounded (display) + Inter, both with Cyrillic incl. Kazakh letters.

## Prototype status — what is NOT connected yet

- **Accounts & progress** are stored in the browser's `localStorage` only (`lib/state.tsx`). Replace the functions there with Supabase calls (auth, `enrolments`, `lesson_progress`, `submissions`).
- **Videos**: lessons show a "video not uploaded yet" placeholder. Set `videoUrl` (embed URL) and `videoLang` on a lesson in `lib/data/courses.ts`.
- **Mentor review**: the dashboard has a clearly labelled *demo* button that simulates mentor feedback.
- **Partnership form** does not send messages yet.
- **Courses and mentors are sample content** and are labelled as such in the UI (`sample: true`).

## Game mode

The academy is a space station: **every course is a room, every lesson is an object in it**. An object is a
blueprint until its lesson is finished, then it gets built. Lessons give **sparks** (video 10, quiz 20,
assignment 40, project 80); every 100 sparks is a new level.

| What | Where |
|---|---|
| Object drawings | `lib/game/art.ts` |
| Rooms: name, colours, which object stands where (in lesson order), place on the map | `lib/game/rooms.ts` |
| Room scene, station map, "how it works" strip | `components/game/` |

Adding a course? Add a room for it in `lib/game/rooms.ts` with one object per lesson.

### Automatic check of assignments (AI)

`app/api/check/route.ts` checks a submitted assignment with Claude and either accepts it or says what to add.
It is **off** until you add the key in Vercel → Project → Settings → Environment Variables:

- `ANTHROPIC_API_KEY` — from console.anthropic.com (set a monthly spending limit there)
- `ANTHROPIC_MODEL` — optional, default `claude-haiku-5-5`

Without the key, submissions wait for a mentor as before. The AI only reads the student's text, not photos or links.

## Editing content

- Interface translations: `lib/i18n/en.ts`, `kz.ts`, `ru.ts`
- Courses: `lib/data/courses.ts`
- Mentors: `lib/data/mentors.ts`
- Brand colours: `tailwind.config.ts` (raspberry `#A71950`, burgundy `#701637`, warm white `#F8F5F0`, gold `#C39A60`, blush `#F1DDE5`)
