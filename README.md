# K M Mohith: portfolio

Personal portfolio of K M Mohith (B.Tech ECE, VIT Chennai, 2027), built with React,
Tailwind CSS v4 and Framer Motion, bundled with Vite. Live at https://kmmohith.github.io/

## Run locally

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
```

Node 20.19+ or 22.12+.

## Deployment

Every push to `main` builds the site and publishes it to GitHub Pages through
`.github/workflows/deploy.yml`.

## Updating content

All text, links and lists are in `src/data/profile.js`. The downloadable resume is
`public/resume.pdf`; replace the file to update it.

## Structure

```
src/
  data/profile.js        all content
  components/            Navbar, Hero, Waveform, Section, About, Experience,
                         Projects, Skills, Education, Achievements, Contact, Footer
  hooks/useActiveSection.js
  index.css              Tailwind import and design tokens (@theme)
preview/                 offline single-file preview build (not used by Vite)
```

Accessibility: skip link, semantic landmarks, labelled sections, visible focus, and
reduced-motion support via `MotionConfig reducedMotion="user"`.
