# Electron + Vite + React Starter

A minimal Electron application scaffolded with Vite, React, and TypeScript. It bundles the Electron main/preload processes and the renderer UI with `vite-plugin-electron`, and packages binaries for macOS, Windows, and Linux via `electron-builder`.

## Highlights
- Fast renderer development with Vite + React + HMR.
- TypeScript-enabled Electron main and preload processes.
- Secure `contextBridge` exposing a trimmed IPC surface to the renderer.
- Cross-platform packaging targets preconfigured in `electron-builder.json5`.

## Prerequisites
- Node.js 18 or newer (Electron 39 requires modern Node features).
- npm 9+ (comes with recent Node distributions).
- macOS, Windows, or Linux for development; packaging requires running on the target OS for best results.

## Quick Start
```bash
npm install
npm run dev
```

- `npm run dev` launches the Vite dev server and starts Electron once the renderer is ready (handled by `vite-plugin-electron`).
- Any edits under `src/` trigger hot-module reload in the renderer; updates to `electron/main.ts` or `electron/preload.ts` trigger process restarts.

## Available Scripts
- `npm run dev` – start the development workflow described above.
- `npm run build` – type-check, bundle renderer/main/preload code, then create installers via `electron-builder`.
- `npm run preview` – serve the Vite-built renderer in a browser-only context (no Electron shell).
- `npm run lint` – run ESLint across the entire project with the configured TypeScript/React rules.

## Project Layout
```
electron-vite-project/
├─ electron/            # TypeScript entry points for main & preload processes
├─ public/              # Static assets copied during renderer builds
├─ src/                 # React renderer source (HMR-enabled)
├─ electron-builder.json5
├─ vite.config.ts
└─ tsconfig*.json       # Shared TypeScript configuration
```

## IPC Surface
`electron/preload.ts` exposes a minimal, type-safe subset of `ipcRenderer` to the renderer via `contextBridge`. Use this exported API (`window.ipcRenderer`) for any renderer ↔ main messaging and extend the preload script if additional channels are required.

## Packaging Notes
- Update `productName` and `appId` in `electron-builder.json5` before distributing builds.
- The default targets are `dmg` (macOS), `nsis` (Windows x64), and `AppImage` (Linux). Adjust the `mac`, `win`, or `linux` sections to add/remove targets or tweak installer behavior.
- Build artifacts are emitted to `release/<version>`; bump `version` in `package.json` ahead of releases.

## Troubleshooting
- Ensure `npm run build` completes before running `electron-builder` manually; the script already orchestrates the necessary steps.
- If Electron fails to launch during `npm run dev`, delete the `.vite` cache and restart: `rm -rf node_modules/.vite && npm run dev`.

## Further Reading
- [Electron documentation](https://www.electronjs.org/docs)
- [Vite documentation](https://vitejs.dev/guide/)
- [vite-plugin-electron](https://github.com/electron-vite/vite-plugin-electron)
- [electron-builder Configuration](https://www.electron.build/configuration/configuration)
