# ExileCodex

ExileCodex is an unofficial Path of Exile 2 companion for Windows. It brings run guidance, build and filter tools, market context, crafting references, and other utilities into one lightweight desktop shell.

## Install

Download the current Windows installer from [GitHub Releases](https://github.com/NolvusMadeIt/exilecodex/releases). The `.exe` is the installer; the other release files are used by the app's update system.

## Development

Requirements: Node.js 22 or newer.

```powershell
npm ci
npm test
npm run dev
```

The desktop shell can be started with:

```powershell
npm run app
```

## Project layout

- `app/` — desktop shell, UI, Lua plugins, and local media
- `site/` — public landing page
- `test/` — parser, UI, release, and plugin-contract tests
- `scripts/` — packaging and repository maintenance helpers

## License and acknowledgments

ExileCodex is released under the [GNU General Public License v3.0](LICENSE). Third-party licenses and acknowledgments are collected in [ATTRIBUTION.md](ATTRIBUTION.md).

ExileCodex is fan-made and is not affiliated with or endorsed by Grinding Gear Games.
