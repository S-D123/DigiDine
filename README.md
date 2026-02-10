# DigiDine (QRMenu Pro)

Lightweight static front-end for a QR-based restaurant menu and ordering demo.

This repository contains a static `public/` folder with a landing page (`index.html`), supporting assets (`styles.css`, `script.js`), and a simple demo site. The top-level `package.json` also includes Next.js and other dependencies — if you plan to run a Next.js app from this repo, see the "Run with Next.js" section below.

## Project structure

- public/
  - index.html        # Landing page (static)
  - login1.html       # Login page
  - menu.html         # Demo menu page
  - script.js         # Front-end JS
  - styles.css        # Styles
- package.json        # Project metadata (contains Next scripts & deps)

## Quick: serve the static `public` folder (PowerShell)

If you only want to view the static site (recommended for quick testing), use one of these options from PowerShell in the repo root (`C:\Users\Admin\Desktop\PM`):

1) Python (if Python 3 is installed)

```powershell
# run in foreground (Ctrl+C to stop)
python -m http.server 3000 --directory "C:\Users\Admin\Desktop\PM\public"

# or start in background
Start-Process -FilePath python -ArgumentList '-m','http.server','3000','--directory','C:\Users\Admin\Desktop\PM\public'
# stop background python server:
Get-Process -Name python | Stop-Process
```

2) Node (npx http-server or serve)

```powershell
# using http-server (no global install required)
npx http-server .\public -p 3000

# using serve
npx serve .\public -l 3000
```

After starting the server, open in your browser:

- http://localhost:3000/index.html
- http://localhost:3000/script.js  (verify the JS file is reachable)

## Run with Next.js (if this repo is a Next app)

The `package.json` contains Next scripts. If this is intended to be a Next project, install dependencies and run the dev server:

```powershell
npm install
npm run dev
```

Note: If you run `npm run dev`, Next will run from the project root and may expect pages in `pages/` or `app/` (depending on Next version). The `public/` folder will still be served by Next as static assets.

## Troubleshooting

- If switching branches or running commands fails because of uncommitted changes, either commit or stash them:

```powershell
git add .
git commit -m "WIP: save changes"
# or
git stash push -m "WIP"
```

- If `npx` prompts to install, allow it — it runs the package temporarily.
- If `python` is not found, install Python 3 or use the `npx` Node options.

## Contributing

- Make feature branches: `git switch -c feature/name`
- Commit small, focused changes and push: `git push -u origin feature/name`

## License

This repository currently has no license file. Add a `LICENSE` file if you want to set licensing terms.

---

If you want, I can also:
- add a small `serve` script to `package.json` (e.g., using `http-server`),
- or start a server here and verify the site is reachable — tell me which you'd prefer.
