# Eterna AfterLife Website

React + Vite version of the Eterna AfterLife website.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Notes

- Main page content and layout live in `src/App.jsx` (bilingual `cn` / `en` copy).
- Global styles are in `styles.css`; the aurora background is in `src/Aurora.jsx` (WebGL via `ogl`).
- Navigation, language toggle, and expandable persona cards are React components under `src/`.
- Language preference is persisted in `localStorage` under `afterlife-language`.
- `src/GlassSurface.jsx` is currently unused and kept for a future glass UI effect.
