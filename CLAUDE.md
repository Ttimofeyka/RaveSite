# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static website for the Rave Programming Language built with VanJS (vanilla JavaScript reactive framework). The site is a single-page application with no build step, featuring glassmorphism design, animated benchmarks, and modern UI.

## Architecture

- **index.html**: Entry point, loads VanJS and app.js as ES modules, includes Google Fonts (Inter, JetBrains Mono)
- **js/app.js**: Main application using VanJS reactive components
- **js/van-1.6.0.min.js**: VanJS framework (vendored)
- **styles.css**: All styling with CSS custom properties, glassmorphism effects, and animations

The app uses VanJS's component model with reactive state (`van.state()`) and derived values (`van.derive()`). Components are pure functions returning VanJS elements created via destructured tag functions.

## Main Components

- `Navigation()`: Fixed navbar with logo and links
- `Hero()`: Hero section with animated logo, gradient title, CTA buttons
- `WhyChooseSection()`: Feature grid with glassmorphism cards
- `ExampleSection()`: Tabbed code examples with syntax highlighting
- `BenchmarksSection()`: Animated benchmark comparison bars (Rave vs GCC vs Clang)
- `StatsSection()`: Stats grid (Open Source, LLVM, Platforms, License)
- `FeaturesListSection()`: Language features with checkmarks
- `Footer()`: Footer with links and license

## Key Features

### Code Examples Tab System
Uses `van.state()` for active tab tracking:
```js
const selectedExample = van.state("hello")
```
Examples include: Hello World, HTTP Server, Multithreading, SIMD, File I/O

### Benchmark Animation
Progress bars use `data-width` attribute for target width, animated via IntersectionObserver when section becomes visible.

### Syntax Highlighting
Inline spans with classes: `code-keyword`, `code-type`, `code-string`, `code-function`, `code-comment`, `code-number`, `code-operator`

## Development

No build process required. Open index.html directly in a browser or use a local server:

```bash
python3 -m http.server 8000
```

## Code Style

- Components are capitalized functions (e.g., `Navigation()`, `Hero()`)
- Use destructured VanJS tags: `const { div, p, a, span } = van.tags`
- Reactive state with `van.state()` for mutable values (tab selection)
- Derived state with `van.derive()` for computed CSS classes
- Side effects run in `setTimeout(() => {...}, 0)` after DOM mount
- IntersectionObserver handles section visibility animations
- Glassmorphism cards use `.glass-card` class with backdrop-filter blur

## Color Scheme (CSS Variables)

```css
--primary: #6366f1 (indigo)
--secondary: #06b6d4 (cyan)
--accent: #f472b6 (pink)
--background: #030712
--surface: rgba(30, 41, 59, 0.7)
--text: #f1f5f9
```

## Animation Classes

- `.visible`: Added by IntersectionObserver for fade-in
- `.progress-fill`: Animated benchmark bars with shimmer effect
- `.logo`: Float and glow animations
- `.gradient-text`: Animated gradient shift