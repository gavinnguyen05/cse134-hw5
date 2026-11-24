# SSG Exercise (Eleventy)

Copies of my Home and About pages, generated with [Eleventy](https://www.11ty.dev/). Both pages share one footer from `src/_includes/footer.njk`.

## Commands

Run these from inside the `ssg-exercise` folder.

```
npm install
npm run build
npm start
```

- `npm install` installs Eleventy.
- `npm run build` generates the pages into `_site/` (`_site/index.html` and `_site/about.html`).
- `npm start` builds the pages and previews them at http://localhost:8080. It rebuilds when a file changes.
