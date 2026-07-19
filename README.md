# Eterna Homepage

React + Vite homepage for Eterna and its digital resident system.

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
- Global layout and the restrained visual system live in `styles.css`; the Aurora background is rendered by `src/Aurora.jsx`.
- Navigation and the language toggle are React components under `src/`.
- Language preference is persisted in `localStorage` under `eterna-language`.
- The early-access form posts to `/api/create` using the existing serverless function.
