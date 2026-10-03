# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/vite-plugin-react/README.md) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/vite-plugin-react-swc/README.md) uses [SWC](https://swc.rs)

## React Compiler

The React Compiler is not enabled in this project because of its impact on build performance.

## Deployment note

<!-- FIX: Vercel SPA fallback is configured in vercel.json so direct navigation/reloads of React Router routes such as /login, /register, and /create resolve to index.html instead of returning a Vercel 404. -->

The admin app uses React Router with client-side routes. The accompanying `vercel.json` configures a SPA rewrite so Vercel serves `index.html` for those routes on direct requests and page refreshes.
