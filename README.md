# DBLauncher — RydenVR

A static GitHub Pages Minecraft launcher hub.

## Included
- Version selector for Minecraft 1.8.8 and 1.12.2
- Eaglercraft 1.8.8 launch link
- 632 PNG skins from the supplied skin ZIP, searchable by name and collection
- Skin downloads
- DBSMP server address with copy button
- Settings for client URLs and server address

## Publish on GitHub Pages
1. Create a repository named `dblauncher`.
2. Upload the contents of this folder (not the folder itself) to the repository root.
3. Open Settings → Pages.
4. Set Source to Deploy from a branch, Branch to `main`, Folder to `/ (root)`.
5. Save. The project URL should be `https://YOUR-USERNAME.github.io/dblauncher/`.

## Configure Minecraft 1.12.2
The supplied Eaglercraft URL is used for 1.8.8. A separate 1.12.2 browser-client URL was not supplied, so the 1.12.2 launch button will explain that setup is needed until you provide one.
You can configure it in the Settings page (saved in the current browser) or set `minecraft1122Url` in `config.js` before publishing.

## Change server address
Edit `serverAddress` in `config.js`, or change it in Settings in your browser.
