# Aquila Onboarding Site — Design Spec

**Date:** 2026-04-12  
**Status:** Approved

---

## Overview

A static organization onboarding site built with Vite + React 18 + TypeScript. Displays Git workflow conventions, commit standards, and team guidelines sourced from the organization's internal README. Content is hardcoded as React components — no CMS, no backend, no data layer.

---

## Stack

| Tool | Version / Notes |
|---|---|
| Vite | Latest |
| React | 18 |
| TypeScript | Strict mode |
| React Router v6 | Client-side routing |
| shadcn/ui | Component primitives |
| Tailwind CSS | v3, via shadcn setup |
| lucide-react | Icons |
| pnpm | Package manager |

---

## Layout

**Pattern:** Fixed sidebar + scrollable content panel, shared across all pages via a root layout route.

- `RootLayout` wraps every page — renders the sidebar and the `<Outlet>` for page content
- Each page is a React Router route; adding a new page means adding a new route and a new `pages/` component
- Sidebar is fixed on the left, full viewport height
- Content area fills the remaining space and scrolls independently
- Within a page, active section is tracked via URL hash (`/git-workflow#branching-strategy`) so sections are deep-linkable
- On mobile, the sidebar collapses to a hamburger menu (Sheet from shadcn)

---

## Project Structure

```
src/
  components/
    layout/
      RootLayout.tsx        # Root route layout: sidebar + <Outlet>
      Sidebar.tsx           # Nav list (pages + sections) + ThemeToggle
    sections/               # Section components scoped to the git-workflow page
      QuickStart.tsx
      BranchingStrategy.tsx
      CommitMessageFormat.tsx
      WorkflowGuidelines.tsx
      PullRequestProcess.tsx
      QuickReference.tsx
      Troubleshooting.tsx
    ui/                     # shadcn-generated components (do not edit manually)
    CodeBlock.tsx           # <pre> wrapper styled with Flexoki ink/paper tokens
  pages/
    GitWorkflow.tsx         # Renders all git workflow sections; adding a page = new file here + new route
  routes/
    index.tsx               # React Router route definitions
  main.tsx                  # Router provider setup
  index.css                 # Flexoki theme tokens + shadcn CSS variable overrides
```

Adding a new page in future: create `pages/NewPage.tsx`, add a route in `routes/index.tsx`, add a nav entry in `Sidebar.tsx`.

---

## Sections

Each section is a self-contained React component. Content is hardcoded in JSX using shadcn primitives (`Card`, `Table`, `Badge`, `Separator`) and lucide icons.

| Section | Component | Content |
|---|---|---|
| Quick Start | `QuickStart.tsx` | 5-step flow, critical rules callout |
| Branching Strategy | `BranchingStrategy.tsx` | Branch flow diagram (ASCII), core/working branch tables, don'ts table, protection rules |
| Commit Message Format | `CommitMessageFormat.tsx` | Format structure, commit types table, best practices DO/DON'T, real-world examples |
| Workflow Guidelines | `WorkflowGuidelines.tsx` | Daily dev flow code block, rebase vs merge guidance |
| Pull Request Process | `PullRequestProcess.tsx` | PR checklist, PR template code block, review guidelines |
| Quick Reference | `QuickReference.tsx` | Common commands grouped, essential gitmoji table, collapsible full gitmoji table |
| Troubleshooting | `Troubleshooting.tsx` | Each scenario as a Card with problem title + fix code block |

---

## Components

### `RootLayout.tsx`
Root route component. Renders the two-column layout — sidebar on the left, `<Outlet>` on the right. On mobile, wraps sidebar in a shadcn `Sheet`. No props; layout is always present.

### `Sidebar.tsx`
Renders two levels of navigation: top-level page links (e.g. "Git Workflow") and, when on a page, its section anchor links. Uses React Router `NavLink` for page links (active styling automatic) and plain anchor `href="#section-id"` for in-page sections. Includes `ThemeToggle` at the bottom (sun/moon icon, toggles `dark` class on `<html>`).

### `CodeBlock.tsx`
A styled `<pre><code>` block. Uses Flexoki `--muted` background, monospace font, horizontal scroll for long lines. Includes a copy-to-clipboard button (lucide `Copy` icon).

### Section components
Each exports a single default component. Uses `<h1>` for the section title, `<h2>` for subsections. Content built from shadcn `Card`, `Table`, `Badge`, and the shared `CodeBlock`.

---

## Theming — Flexoki

Applied via CSS custom properties in `index.css`, overriding shadcn's default token names. Both light and dark variants defined.

```css
:root {
  --background: #fffcf0;   /* Flexoki Paper */
  --foreground: #100f0f;   /* Flexoki Black */
  --primary: #205ea6;      /* Flexoki Blue */
  --muted: #f2f0e5;        /* Flexoki Base-50 */
  --border: #e6e4d9;       /* Flexoki Base-200 */
  --card: #f2f0e5;         /* Flexoki Base-50 */
}

.dark {
  --background: #100f0f;   /* Flexoki Black */
  --foreground: #fffcf0;   /* Flexoki Paper */
  --primary: #4385be;      /* Flexoki Blue (dark) */
  --muted: #1c1b1a;        /* Flexoki Base-950 */
  --border: #282726;       /* Flexoki Base-800 */
  --card: #1c1b1a;         /* Flexoki Base-950 */
}
```

Theme toggle persists preference to `localStorage` and applies the `dark` class on `<html>` on load to prevent flash.

---

## Coding Standards

- TypeScript strict mode, no `any`
- Props typed with explicit interfaces, not inline
- Components are function components only
- `layout/` components use named exports; `sections/` components use default exports (convention for route-like components); `ui/` follows shadcn's own generated conventions
- `cn()` utility from `lib/utils.ts` for conditional class merging
- No state management library — React Router handles page state; `useState` only for UI interactions (mobile menu open/close, theme)
- Tailwind classes only — no inline styles, no CSS modules

---

## Out of Scope

- Search / filtering
- Authentication
- Editable content / CMS
- Animations beyond Tailwind transitions
- Multiple languages / i18n
