# Kuangyi Chen — Personal Homepage

Static, bilingual personal résumé focused on robot perception research.

**Live:** [ckyFi9zero.github.io](https://ckyFi9zero.github.io)

## Structure

- `index.html` — semantic, SEO-readable page content
- `assets/css/style.css` — responsive light/dark visual system
- `assets/js/i18n.js` — language state and localized metadata
- `assets/js/main.js` — theme, navigation, disclosure, and dialog interactions
- `data/` — reusable Chinese and English profile data

No framework, dependency, or build step is required.

## Local preview

```sh
python3 -m http.server 4173
```

Then open `http://127.0.0.1:4173/`.

## CV PDF

The sidebar CV link opens `output/pdf/kuangyi-chen-cv.pdf` in a new tab. The PDF
is committed and served as a static file, so publishing the site requires no
document-generation tools.

To update the English CV, edit the content and revision date in
`scripts/build_cv.py`, install ReportLab, then run:

```sh
python3 scripts/build_cv.py
```

Render and visually check the regenerated PDF before publishing it. The script
embeds Times New Roman when available and otherwise uses the built-in Times font.
