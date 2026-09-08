# Vittoria Fornari — portfolio

A static site. No build step, no dependencies, no npm. Three files do the work:

```
index.html                  page skeleton (rarely needs touching)
assets/js/content.js        ← ALL your content lives here. This is the file you edit.
assets/js/main.js           the sketchbook animation, pinboard and case studies
assets/css/style.css        the look
```

---

## 1. Add your assets

Copy the things from your `portfoliowebsiteimages` folder into these places.
**The names matter** — the site looks for them exactly.

### Your typeface
```
assets/fonts/display.woff2      ← preferred
assets/fonts/display.otf        ← or this
assets/fonts/display.ttf        ← or this
assets/fonts/display-italic.woff2   (optional, if you have an italic)
```
Rename whatever your font file is called to `display.<ext>`. If it isn't there,
the site falls back to a clean sans and still looks fine — it just won't be yours.

`.woff2` loads about 3× faster than `.otf`. Convert yours at
[cloudconvert.com/otf-to-woff2](https://cloudconvert.com/otf-to-woff2) — worth
the two minutes.

### Your logo
```
assets/logo.svg
```
SVG if you have it, otherwise a transparent PNG (rename to `logo.svg` won't
work for a PNG — instead change the `logo:` line in `content.js` to
`"assets/logo.png"`). If there's no logo file, your name appears as text instead.

### Project images
One folder per project, named after the project's `slug`:
```
assets/images/projects/maggo/cover.jpg
assets/images/projects/maggo/01.jpg
assets/images/projects/maggo/02.jpg
assets/images/projects/enifolia/cover.jpg
...
```
`cover.jpg` is the photo that flies out of the sketchbook and sits in the grid.

### Archive and portrait
```
assets/images/archive/01.jpg … 06.jpg
assets/images/about/portrait.jpg
assets/images/og.jpg              ← the preview when the link is shared, 1200×630
```

**Any image that isn't there yet shows as a blank paper slot with its caption
written on it.** Nothing breaks, nothing looks unfinished-in-a-bad-way. Fill
them in as you go.

Resize photos to about **2000px on the long edge** before committing. Full-size
camera files will make the site slow and GitHub has a 100MB per-file limit.

---

## 2. Add a project

Open `assets/js/content.js`, copy an existing block in `projects`, change the
fields:

```js
{
  slug: "new-project",              // folder name + the URL: /#/new-project
  title: "New Project",
  category: "Brand identity",
  year: "2026",
  blurb: "One line, shown under the title.",
  cover: "assets/images/projects/new-project/cover.jpg",
  size: "regular",                  // "wide" | "tall" | "regular"
  intro: "The opening paragraph of the case study.",
  sections: [
    {
      heading: "What I did",
      body: "A paragraph.",
      images: [
        { src: "assets/images/projects/new-project/01.jpg", caption: "Caption" }
      ]
    }
  ],
  credits: ["Client", "Role"]
}
```

That's the whole job. The grid, the case study page, the next-project link and
the sketchbook spread all update themselves.

**The first six projects** are the ones that appear on the open sketchbook
spread. Anything after that sits in the grid below and fades in — so put your
strongest six first.

Deleting a project: delete its block. Reordering: move the blocks.

To add archive pieces, add entries to the `archive` list the same way. The
pinboard grows in rows to fit however many you add.

---

## 3. Put it on GitHub Pages

You already have `vittofrn.github.io`, so:

**Option A — new repo (recommended, gives you `vittofrn.github.io/portfolio/`)**

1. On GitHub: **New repository** → name it `portfolio` → Public → Create.
2. On the empty repo page, click **uploading an existing file**.
3. Drag in the *contents* of this folder (`index.html`, the `assets` folder,
   `.nojekyll`) — not the folder itself.
4. Commit.
5. Repo **Settings → Pages** → Source: *Deploy from a branch* → Branch: `main`,
   folder `/ (root)` → Save.
6. Wait a minute or two. It's live at
   `https://vittofrn.github.io/portfolio/`.

**Option B — replace the site at `vittofrn.github.io/`**

Same steps, but upload into your existing `vittofrn.github.io` repo. This will
overwrite what's currently at the root of that repo, so make sure your
`abstract-entity-atlas` project lives in its own subfolder first (it does — it's
at `/abstract-entity-atlas/`, so it will keep working).

**With the command line, if you prefer:**
```bash
cd <this folder>
git init
git add .
git commit -m "Portfolio site"
git branch -M main
git remote add origin https://github.com/vittofrn/portfolio.git
git push -u origin main
```
Then turn on Pages in Settings as above.

### Updating it later
Drag the changed file into the repo on github.com and commit, or
`git add . && git commit -m "New project" && git push`. The site rebuilds in
under a minute.

### A custom domain
Buy a domain, add a file called `CNAME` at the root containing just your domain
(e.g. `vittoriafornari.com`), then set it under **Settings → Pages → Custom
domain** and point your registrar's DNS at GitHub. Free, apart from the domain.

---

## Working on it locally

Double-clicking `index.html` mostly works, but fonts and some browsers are
fussy about `file://`. Better:

```bash
cd <this folder>
python3 -m http.server 8000
```
Then open `http://localhost:8000`.

---

## Notes on how it behaves

- **The opening sequence** runs on screens wider than 860px. On phones, and for
  anyone who has "reduce motion" turned on in their system settings, the book
  is shown closed as a still hero and the work grid sits straight below it —
  the same content, no pinned scrolling, which is the right call on a small
  screen and for people who get motion sickness.
- **The pinboard** is draggable on desktop. On mobile it becomes a tappable
  two-column grid, because dragging inside a scrolling page on a touchscreen
  fights with the scroll.
- **Case studies** are at `/#/slug`, so every project has its own shareable
  link and the back button works.
- **Keyboard**: cards and scraps are focusable, Escape closes a case study or a
  note.
- The whole thing is about 45KB before your images. It will load instantly.

## Still to do

- Drop in your font, logo and images (section 1).
- Write the two case studies I couldn't recover from the old Framer site —
  **The Clash × Basquiat** and **Scomodo**. Their blocks in `content.js` have
  the title and category filled in and an empty `heading`/`body` waiting.
- Check the `archive` entries — I wrote plausible placeholders for six pieces,
  but you know what's actually in that folder.
- Add your email to `identity.email` in `content.js` if you want a mailto link
  in the footer.
