# AGENTS.md

## Project

Static website for Rave Programming Language. No build step, no package.json.

## Architecture

- **VanJS** framework (vendored `js/van-1.6.0.min.js`) - NOT React/Vue/Svelte
- ES modules: `index.html` imports `js/app.js` as module
- Single CSS file: `styles.css`

## Preview

Cannot open `index.html` directly (ES module CORS). Use a local server:

```bash
python3 -m http.server 4000
```

Then open http://localhost:4000

## Deployment

GitHub Pages with custom domain (CNAME = ravelang.xyz). Push to main to deploy.

## VanJS Patterns

```js
const { div, p, a } = van.tags           // Destructure tags
const state = van.state("value")         // Mutable reactive state  
const derived = van.derive(() => ...)    // Computed values
van.add(document.body, Component())      // Mount
```

Components are **capitalized functions** returning VanJS elements.

## Code Structure

All components in `js/app.js`:
- `Navigation()`, `Hero()`, `WhyChooseSection()`, `ExampleSection()`, `BenchmarksSection()`, `StatsSection()`, `FeaturesListSection()`, `Footer()`

Side effects (IntersectionObserver, scroll) run in `setTimeout(() => {...}, 0)` after mount.

## Syntax Highlighting Classes

`code-keyword`, `code-type`, `code-string`, `code-comment`, `code-number`, `code-operator`