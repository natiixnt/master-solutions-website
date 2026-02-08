# master solutions — Landing Page

One-page dark-theme landing for the master solutions studio (software, automations, CRM). Built with Next.js 16 (App Router) and Tailwind v4, with Framer Motion, Lenis smooth scrolling, and Lucide icons for subtle motion and line icons.

## Quick start

```bash
npm install
npm run dev
```

- App: http://localhost:3000
- Single page lives in `src/app/page.tsx`; shared styles/tokens in `src/app/globals.css`.

## Scripts

- `npm run dev` – start dev server
- `npm run build` – production build
- `npm start` – run built app
- `npm run lint` – ESLint (Next.js config)

## Notes

- Typography: Plus Jakarta Sans (body) + Space Grotesk (display).
- Design tokens/colors are set in `globals.css` (dark, high-contrast, glassmorphism accents).
- Sections: Navbar (sticky), Hero, Proof/Stats, Trusted by, Services, Process, Case Studies, Tech Stack, Testimonials, Pricing, FAQ, Final CTA + Contact, Footer.
- Accessibility: semantic headings/landmarks, `focus-visible`, high-contrast buttons, reduced motion-friendly transitions.
- SEO: custom title/meta/OG/Twitter in `src/app/layout.tsx`; OG image at `public/og-image.svg`.
