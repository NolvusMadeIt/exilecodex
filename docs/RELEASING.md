# Release rules

Use these rules for every requested commit/upload:

- Plugin-only change: bump the affected entry in `app/plugins.manifest.json`, commit the plugin source and manifest, and push `main`. Do not rebuild the Windows installer. The plugin panel reads the manifest and source from the repository's raw URLs.
- App/UI/runtime change: bump the app version, run the full test suite, build the NSIS installer, and publish the installer, blockmap, and `latest.yml` together in a GitHub release. A copy in the repository's `dist/` directory is useful for provenance, but `electron-updater` reads release assets, not repository files.
- Never publish only an `.exe` or only `latest.yml`; the three updater assets are one set.
