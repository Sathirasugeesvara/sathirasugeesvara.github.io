# Sathira Sugeesvara — Portfolio (React + Tailwind)

## Run it locally

```bash
npm install
npm run dev
```

Open the URL it prints (usually http://localhost:5173).

## Where to edit things

Everything you'll actually want to change lives in `src/data/`, not inside the components:

- `src/data/profile.js` — your name, tagline, resume link, socials, stats
- `src/data/projects.js` — featured projects (add a new object + screenshot in `public/images/` to add a project)
- `src/data/skills.js` — skill tags, grouped by category
- `src/data/timeline.js` — education & experience entries
- `src/data/certificates.js` — certificate cards (already carries over all 11 from your old site)

Images go in `public/images/`. Your resume PDF is at `public/sathira_cv.pdf` — replace that file (keep the same name) to update the downloadable CV.

## Deploy to Vercel (free)

1. Push this folder to a new GitHub repo.
2. Go to vercel.com → **Add New Project** → import that repo.
3. Framework preset: **Vite** (auto-detected). Build command `npm run build`, output dir `dist` — Vercel fills these in automatically.
4. Deploy. You'll get a URL like `sathira-sugeesvara.vercel.app` — you can rename the project in Vercel's settings to control that subdomain.

## Notes

- The contact form reuses your existing EmailJS service/template IDs from the old site, so it should work immediately.
- Add more projects/certificates anytime by editing the data files above — no component code needs to change.
