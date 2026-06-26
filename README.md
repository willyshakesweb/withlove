# With Love N — Nails by Niru
### Final static website — ready to deploy

## What's in this folder
- 7 HTML pages (index, about, services, gallery, book, contact, classes)
- /css/style.css — one compiled stylesheet (no build step needed)
- /js/ — 5 JavaScript files (booking logic, gallery, contact form, classes form, global nav/scroll)
- /images/ — all real photos, organized by use (backgrounds, homepage, gallery)

## How to deploy (GitHub → Netlify)
1. Create a new GitHub repository
2. Upload every file and folder in this zip exactly as-is, preserving the folder structure
3. On Netlify: "Add new site" → "Import an existing project" → connect your GitHub repo
4. Leave build settings empty (no build command, no publish directory needed — this is plain HTML/CSS/JS)
5. Deploy — you'll get a permanent live link

## Making future changes
1. Edit the file you need to change (on GitHub directly, or re-upload a replacement file)
2. Commit the change to the same repository
3. Netlify automatically redeploys within seconds
4. The live link never changes — visitors just see the update on refresh

## Why GitHub → Netlify (recommended over alternatives)
- Completely free for a site this size
- No build step required (this is why all the CSS/JS is pre-compiled into plain files)
- Automatic redeploy on every change — no manual re-uploading needed after the first setup
- The most widely used, well-documented combination — easiest to get help with if needed later

## Notes
- The PWA "Add to Home Screen" feature has been intentionally removed per request
- All real Niru's-Work photos and gallery images are wired in with correct file paths — do not rename image files without also updating the matching path in the HTML/JS
- Color system: white backgrounds, #FF5CCD (pastel pink) for buttons/accents, #9B1D63 (deep pink) for the footer and high-contrast elements
