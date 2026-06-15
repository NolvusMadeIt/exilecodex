# Nolvus's Filter — Windows desktop shell

This is a thin Electron wrapper around the **same web build** in `../dist`. It's "just the
shell": it doesn't reimplement anything — it loads the web app in a native window.

## How it loads the app

By default the shell serves the bundled `dist/` build through a custom `app://` protocol.
That gives it a real, secure web origin, so the app's absolute paths (`/assets`, `/data`,
`/sounds`) resolve correctly and everything works **offline / self-contained**. A bare
`file://` origin would break those absolute paths — hence the custom protocol.

### "Always-latest" mode (load the live site)

If you'd rather the desktop app always show the deployed web version, point it at your
deployed URL — either:

- set an environment variable: `NOLVUS_APP_URL=https://nolvusfiltereditor.vercel.app`, or
- edit `REMOTE_URL` near the top of `main.cjs`.

When set, the shell loads the live site instead of the bundle (requires internet).

## Run it locally

```bash
npm run build      # build the web app into ../dist (required first)
npm run electron   # launch the desktop shell against that build
```

## Package a Windows app

```bash
npm run dist:win   # builds the web app, then packages with electron-builder → ../release/
```

This produces an NSIS installer and a portable `.exe` in `release/`. The output is git-ignored.

### Icon (optional branding)

No custom icon is bundled yet, so the packaged app uses the default Electron icon. To brand
it, drop a 512×512 `icon.png` (or a multi-res `icon.ico`) in this folder and add
`"icon": "electron/icon.png"` under the `build.win` key in `package.json`.
