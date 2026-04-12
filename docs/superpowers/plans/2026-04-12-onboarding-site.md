# Aquila Onboarding Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static Vite + React + TypeScript onboarding site with a fixed sidebar, TanStack Router file-based routing, shadcn/ui components, and Flexoki theming — seeded with the organization's Git workflow content.

**Architecture:** TanStack Router's Vite plugin handles file-based routing with a `__root.tsx` layout wrapping all pages. Each page lives in `src/pages/` and is mounted via a corresponding `src/routes/` file. Section content is hardcoded JSX — no data layer.

**Tech Stack:** Vite, React 18, TypeScript (strict), TanStack Router v1, shadcn/ui, Tailwind CSS v3, lucide-react, pnpm

---

## File Map

| Action | Path | Responsibility |
|---|---|---|
| Create | `src/hooks/useTheme.ts` | Dark/light toggle with localStorage persistence |
| Create | `src/components/CodeBlock.tsx` | Styled `<pre>` with copy-to-clipboard |
| Create | `src/components/layout/Sidebar.tsx` | Page + section nav, ThemeToggle button |
| Create | `src/components/layout/RootLayout.tsx` | Two-column shell, mobile Sheet |
| Create | `src/routes/__root.tsx` | TanStack root layout route |
| Create | `src/routes/index.tsx` | Redirect `/` → `/git-workflow` |
| Create | `src/routes/git-workflow.tsx` | Git workflow page route |
| Create | `src/pages/GitWorkflow.tsx` | Renders all 7 section components |
| Create | `src/sections/QuickStart.tsx` | Quick start 5-step + critical rules |
| Create | `src/sections/BranchingStrategy.tsx` | Branch tables, diagrams, protection rules |
| Create | `src/sections/CommitMessageFormat.tsx` | Commit format, types table, examples |
| Create | `src/sections/WorkflowGuidelines.tsx` | Daily dev flow, rebase vs merge |
| Create | `src/sections/PullRequestProcess.tsx` | PR checklist, template, review guide |
| Create | `src/sections/QuickReference.tsx` | Commands, essential + full gitmoji tables |
| Create | `src/sections/Troubleshooting.tsx` | Scenario cards with fix commands |
| Modify | `src/main.tsx` | Router provider setup |
| Modify | `src/index.css` | Flexoki CSS variable overrides |
| Modify | `index.html` | Flash-prevention inline script |
| Modify | `vite.config.ts` | TanStack Router plugin + `@` alias |
| Modify | `tsconfig.json` | Strict mode + path alias |
| Delete | `src/App.tsx` | Replaced by router |
| Delete | `src/assets/react.svg` | Unused scaffold file |
| Delete | `public/vite.svg` | Unused scaffold file |
| Create | `src/test/setup.ts` | Vitest + jsdom setup |
| Create | `src/hooks/useTheme.test.ts` | useTheme unit tests |
| Create | `src/components/CodeBlock.test.tsx` | CodeBlock render + copy tests |

---

## Task 1: Scaffold Vite + React TypeScript project

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `src/main.tsx`, `src/App.tsx`, `index.html`

- [ ] **Step 1: Run Vite scaffold**

```bash
cd c:/Users/Jason/Documents/Git/aquila/docs
pnpm create vite@latest . --template react-ts
```

When prompted about non-empty directory, select **"Ignore files and continue"** to preserve existing `docs/` content.

- [ ] **Step 2: Install dependencies**

```bash
pnpm install
```

- [ ] **Step 3: Verify dev server starts**

```bash
pnpm dev
```

Expected: Server starts on `http://localhost:5173`. Stop with Ctrl+C.

- [ ] **Step 4: Remove unused scaffold files**

```bash
rm src/App.tsx src/assets/react.svg public/vite.svg
```

- [ ] **Step 5: Commit**

```bash
git add package.json pnpm-lock.yaml vite.config.ts tsconfig.json tsconfig.node.json index.html src/ public/ .gitignore
git commit -m "📦 build: scaffold vite react-ts project"
```

---

## Task 2: Configure Tailwind CSS

**Files:**
- Create: `tailwind.config.js`, `postcss.config.js`
- Modify: `src/index.css`

- [ ] **Step 1: Install Tailwind**

```bash
pnpm add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

- [ ] **Step 2: Configure content paths in `tailwind.config.js`**

```js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

- [ ] **Step 3: Replace `src/index.css` with Tailwind directives**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 4: Update `src/main.tsx` to import CSS**

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div>hello</div>
  </React.StrictMode>,
)
```

- [ ] **Step 5: Verify build**

```bash
pnpm build
```

Expected: `dist/` created with no errors.

- [ ] **Step 6: Commit**

```bash
git add tailwind.config.js postcss.config.js src/index.css src/main.tsx
git commit -m "📦 build: configure tailwind css"
```

---

## Task 3: Initialize shadcn/ui and install components

**Files:**
- Create: `components.json`, `src/lib/utils.ts`
- Modify: `tailwind.config.js`, `src/index.css`

- [ ] **Step 1: Run shadcn init**

```bash
pnpm dlx shadcn@latest init
```

Answer the prompts:
- Style: **Default**
- Base color: **Neutral**
- CSS variables: **Yes**

- [ ] **Step 2: Install required shadcn components**

```bash
pnpm dlx shadcn@latest add button card table badge separator sheet collapsible
```

- [ ] **Step 3: Verify `src/lib/utils.ts` exists with `cn` helper**

The file should contain:
```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

If it doesn't exist, create it manually with the content above and install deps:
```bash
pnpm add clsx tailwind-merge
```

- [ ] **Step 4: Verify build**

```bash
pnpm build
```

Expected: No errors.

- [ ] **Step 5: Commit**

```bash
git add components.json src/lib/ src/components/ui/ tailwind.config.js src/index.css
git commit -m "📦 build: initialize shadcn/ui with components"
```

---

## Task 4: Install and configure TanStack Router

**Files:**
- Modify: `vite.config.ts`, `tsconfig.json`

- [ ] **Step 1: Install TanStack Router packages**

```bash
pnpm add @tanstack/react-router
pnpm add -D @tanstack/router-vite-plugin
```

- [ ] **Step 2: Update `vite.config.ts`**

```ts
import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'

export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

- [ ] **Step 3: Update `tsconfig.json` — add strict mode and path alias**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

- [ ] **Step 4: Install `@types/node` for path resolution in vite config**

```bash
pnpm add -D @types/node
```

- [ ] **Step 5: Create minimal route files so the plugin can generate `routeTree.gen.ts`**

Create `src/routes/__root.tsx`:
```tsx
import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => <Outlet />,
})
```

Create `src/routes/index.tsx`:
```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: () => <div>Loading...</div>,
})
```

- [ ] **Step 6: Run dev server to trigger `routeTree.gen.ts` generation**

```bash
pnpm dev
```

Expected: `src/routeTree.gen.ts` is created automatically. Stop with Ctrl+C.

- [ ] **Step 7: Verify `src/routeTree.gen.ts` exists**

```bash
ls src/routeTree.gen.ts
```

Expected: File exists.

- [ ] **Step 8: Commit**

```bash
git add vite.config.ts tsconfig.json src/routes/ src/routeTree.gen.ts
git commit -m "📦 build: install and configure tanstack router"
```

---

## Task 5: Apply Flexoki theme and flash prevention

**Files:**
- Modify: `src/index.css`, `index.html`

- [ ] **Step 1: Replace CSS variable values in `src/index.css` with Flexoki palette**

Replace the entire `@layer base` block that shadcn generated with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 48 100% 97%;
    --foreground: 0 3% 6%;
    --card: 51 33% 92%;
    --card-foreground: 0 3% 6%;
    --popover: 51 33% 92%;
    --popover-foreground: 0 3% 6%;
    --primary: 212 68% 39%;
    --primary-foreground: 48 100% 97%;
    --secondary: 51 21% 88%;
    --secondary-foreground: 0 3% 6%;
    --muted: 51 33% 92%;
    --muted-foreground: 0 10% 35%;
    --accent: 51 21% 88%;
    --accent-foreground: 0 3% 6%;
    --destructive: 6 72% 44%;
    --destructive-foreground: 48 100% 97%;
    --border: 51 21% 88%;
    --input: 51 21% 88%;
    --ring: 212 68% 39%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 0 3% 6%;
    --foreground: 48 100% 97%;
    --card: 30 4% 11%;
    --card-foreground: 48 100% 97%;
    --popover: 30 4% 11%;
    --popover-foreground: 48 100% 97%;
    --primary: 208 49% 50%;
    --primary-foreground: 0 3% 6%;
    --secondary: 30 3% 15%;
    --secondary-foreground: 48 100% 97%;
    --muted: 30 4% 11%;
    --muted-foreground: 48 30% 65%;
    --accent: 30 3% 15%;
    --accent-foreground: 48 100% 97%;
    --destructive: 6 72% 55%;
    --destructive-foreground: 48 100% 97%;
    --border: 30 3% 15%;
    --input: 30 3% 15%;
    --ring: 208 49% 50%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

- [ ] **Step 2: Add flash-prevention script to `index.html` `<head>`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Aquila Onboarding</title>
    <script>
      (function () {
        var theme = localStorage.getItem('theme') ?? 'light';
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        }
      })();
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 3: Verify build**

```bash
pnpm build
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add src/index.css index.html
git commit -m "💄 style: apply flexoki theme tokens"
```

---

## Task 6: Set up Vitest

**Files:**
- Modify: `vite.config.ts`, `package.json`
- Create: `src/test/setup.ts`

- [ ] **Step 1: Install Vitest and Testing Library**

```bash
pnpm add -D vitest @vitest/ui jsdom @testing-library/react @testing-library/user-event @testing-library/jest-dom
```

- [ ] **Step 2: Add test config to `vite.config.ts`**

```ts
import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'

export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
})
```

- [ ] **Step 3: Create `src/test/setup.ts`**

```ts
import '@testing-library/jest-dom'
```

- [ ] **Step 4: Add test script to `package.json`**

Open `package.json` and add to `"scripts"`:
```json
"test": "vitest",
"test:ui": "vitest --ui"
```

- [ ] **Step 5: Update `tsconfig.json` to include test files and vitest types**

Add `"types": ["vitest/globals"]` to `compilerOptions` and `"src/test/**/*"` to `include`:
```json
{
  "compilerOptions": {
    "types": ["vitest/globals"]
  },
  "include": ["src"]
}
```

- [ ] **Step 6: Commit**

```bash
git add vite.config.ts package.json pnpm-lock.yaml tsconfig.json src/test/
git commit -m "✅ test: set up vitest and testing library"
```

---

## Task 7: Create `useTheme` hook (TDD)

**Files:**
- Create: `src/hooks/useTheme.ts`
- Create: `src/hooks/useTheme.test.ts`

- [ ] **Step 1: Write the failing test — create `src/hooks/useTheme.test.ts`**

```ts
import { renderHook, act } from '@testing-library/react'
import { useTheme } from './useTheme'

beforeEach(() => {
  localStorage.clear()
  document.documentElement.classList.remove('dark')
})

it('defaults to light theme', () => {
  const { result } = renderHook(() => useTheme())
  expect(result.current.theme).toBe('light')
  expect(document.documentElement.classList.contains('dark')).toBe(false)
})

it('reads saved theme from localStorage', () => {
  localStorage.setItem('theme', 'dark')
  const { result } = renderHook(() => useTheme())
  expect(result.current.theme).toBe('dark')
})

it('toggle switches from light to dark', () => {
  const { result } = renderHook(() => useTheme())
  act(() => result.current.toggle())
  expect(result.current.theme).toBe('dark')
  expect(document.documentElement.classList.contains('dark')).toBe(true)
  expect(localStorage.getItem('theme')).toBe('dark')
})

it('toggle switches from dark to light', () => {
  localStorage.setItem('theme', 'dark')
  const { result } = renderHook(() => useTheme())
  act(() => result.current.toggle())
  expect(result.current.theme).toBe('light')
  expect(document.documentElement.classList.contains('dark')).toBe(false)
  expect(localStorage.getItem('theme')).toBe('light')
})
```

- [ ] **Step 2: Run test to confirm it fails**

```bash
pnpm test src/hooks/useTheme.test.ts
```

Expected: FAIL — `useTheme` not found.

- [ ] **Step 3: Create `src/hooks/useTheme.ts`**

```ts
import { useState, useEffect } from 'react'

type Theme = 'light' | 'dark'

interface UseThemeReturn {
  theme: Theme
  toggle: () => void
}

export function useTheme(): UseThemeReturn {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) ?? 'light'
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggle = () => setTheme(t => (t === 'light' ? 'dark' : 'light'))

  return { theme, toggle }
}
```

- [ ] **Step 4: Run tests to confirm they pass**

```bash
pnpm test src/hooks/useTheme.test.ts
```

Expected: 4 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/hooks/
git commit -m "✅ test: add useTheme hook with tests"
```

---

## Task 8: Create `CodeBlock` component (TDD)

**Files:**
- Create: `src/components/CodeBlock.tsx`
- Create: `src/components/CodeBlock.test.tsx`

- [ ] **Step 1: Write the failing test — create `src/components/CodeBlock.test.tsx`**

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CodeBlock from './CodeBlock'

it('renders the code content', () => {
  render(<CodeBlock code="git checkout -b feature/test" />)
  expect(screen.getByText('git checkout -b feature/test')).toBeInTheDocument()
})

it('copies code to clipboard on button click', async () => {
  const writeText = vi.fn().mockResolvedValue(undefined)
  Object.assign(navigator, { clipboard: { writeText } })

  const user = userEvent.setup()
  render(<CodeBlock code="git status" />)

  await user.click(screen.getByRole('button', { name: /copy/i }))
  expect(writeText).toHaveBeenCalledWith('git status')
})
```

- [ ] **Step 2: Run test to confirm it fails**

```bash
pnpm test src/components/CodeBlock.test.tsx
```

Expected: FAIL — `CodeBlock` not found.

- [ ] **Step 3: Create `src/components/CodeBlock.tsx`**

```tsx
import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CodeBlockProps {
  code: string
  language?: string
  className?: string
}

export default function CodeBlock({ code, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn('relative group rounded-md bg-muted', className)}>
      <Button
        variant="ghost"
        size="icon"
        aria-label="copy"
        onClick={handleCopy}
        className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
      <pre className="overflow-x-auto p-4 text-sm font-mono">
        <code>{code}</code>
      </pre>
    </div>
  )
}
```

- [ ] **Step 4: Run tests to confirm they pass**

```bash
pnpm test src/components/CodeBlock.test.tsx
```

Expected: 2 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/CodeBlock.tsx src/components/CodeBlock.test.tsx
git commit -m "✅ test: add CodeBlock component with copy button and tests"
```

---

## Task 9: Create `Sidebar` component

**Files:**
- Create: `src/components/layout/Sidebar.tsx`

- [ ] **Step 1: Create `src/components/layout/Sidebar.tsx`**

```tsx
import { Link, useLocation } from '@tanstack/react-router'
import { Sun, Moon, GitBranch } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useTheme } from '@/hooks/useTheme'

interface SectionItem {
  id: string
  label: string
}

interface PageItem {
  label: string
  to: string
  icon: React.ReactNode
  sections: SectionItem[]
}

const PAGES: PageItem[] = [
  {
    label: 'Git Workflow',
    to: '/git-workflow',
    icon: <GitBranch className="h-4 w-4" />,
    sections: [
      { id: 'quick-start', label: 'Quick Start' },
      { id: 'branching-strategy', label: 'Branching Strategy' },
      { id: 'commit-message-format', label: 'Commit Message Format' },
      { id: 'workflow-guidelines', label: 'Workflow Guidelines' },
      { id: 'pull-request-process', label: 'Pull Request Process' },
      { id: 'quick-reference', label: 'Quick Reference' },
      { id: 'troubleshooting', label: 'Troubleshooting' },
    ],
  },
]

export function Sidebar() {
  const { pathname } = useLocation()
  const { theme, toggle } = useTheme()

  return (
    <aside className="flex flex-col w-64 h-screen border-r border-border bg-card shrink-0">
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
          Aquila Onboarding
        </h2>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {PAGES.map(page => {
          const isActive = pathname === page.to
          return (
            <div key={page.to}>
              <Link
                to={page.to}
                className={cn(
                  'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors w-full',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-accent hover:text-accent-foreground',
                )}
              >
                {page.icon}
                {page.label}
              </Link>

              {isActive && (
                <ul className="mt-1 ml-4 space-y-0.5">
                  {page.sections.map(section => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="flex items-center rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                      >
                        {section.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        })}
      </nav>

      <div className="p-3 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggle}
          className="w-full justify-start gap-2"
          aria-label="toggle theme"
        >
          {theme === 'light' ? (
            <>
              <Moon className="h-4 w-4" />
              Dark mode
            </>
          ) : (
            <>
              <Sun className="h-4 w-4" />
              Light mode
            </>
          )}
        </Button>
      </div>
    </aside>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
pnpm tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Sidebar.tsx
git commit -m "✨ feat: add sidebar with page nav and theme toggle"
```

---

## Task 10: Create `RootLayout` and wire up routes

**Files:**
- Create: `src/components/layout/RootLayout.tsx`
- Modify: `src/routes/__root.tsx`
- Create: `src/routes/git-workflow.tsx`
- Modify: `src/routes/index.tsx`
- Modify: `src/main.tsx`

- [ ] **Step 1: Create `src/components/layout/RootLayout.tsx`**

```tsx
import { Menu } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Sidebar } from './Sidebar'

interface RootLayoutProps {
  children: React.ReactNode
}

export function RootLayout({ children }: RootLayoutProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Mobile header + Sheet */}
      <div className="flex flex-col flex-1 min-w-0">
        <header className="flex md:hidden items-center gap-2 px-4 py-3 border-b border-border">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <Sidebar />
            </SheetContent>
          </Sheet>
          <span className="font-semibold text-sm">Aquila Onboarding</span>
        </header>

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Update `src/routes/__root.tsx`**

```tsx
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { RootLayout } from '@/components/layout/RootLayout'

export const Route = createRootRoute({
  component: () => (
    <RootLayout>
      <Outlet />
    </RootLayout>
  ),
})
```

- [ ] **Step 3: Update `src/routes/index.tsx` to redirect to `/git-workflow`**

```tsx
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    throw redirect({ to: '/git-workflow' })
  },
})
```

- [ ] **Step 4: Create `src/routes/git-workflow.tsx`**

```tsx
import { createFileRoute } from '@tanstack/react-router'
import GitWorkflow from '@/pages/GitWorkflow'

export const Route = createFileRoute('/git-workflow')({
  component: GitWorkflow,
})
```

- [ ] **Step 5: Create placeholder `src/pages/GitWorkflow.tsx`**

```tsx
export default function GitWorkflow() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Git Workflow</h1>
      <p className="text-muted-foreground">Sections coming soon.</p>
    </div>
  )
}
```

- [ ] **Step 6: Update `src/main.tsx` with router provider**

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import './index.css'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
```

- [ ] **Step 7: Run dev server to regenerate route tree and verify app loads**

```bash
pnpm dev
```

Open `http://localhost:5173`. Expected: Redirects to `/git-workflow`, sidebar visible with "Git Workflow" link, "Git Workflow" heading shown in content area. Stop with Ctrl+C.

- [ ] **Step 8: Commit**

```bash
git add src/components/layout/RootLayout.tsx src/routes/ src/pages/ src/main.tsx src/routeTree.gen.ts
git commit -m "✨ feat: add root layout, routes, and router provider"
```

---

## Task 11: Create `QuickStart` section

**Files:**
- Create: `src/sections/QuickStart.tsx`

- [ ] **Step 1: Create `src/sections/QuickStart.tsx`**

```tsx
import { AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import CodeBlock from '@/components/CodeBlock'

export default function QuickStart() {
  return (
    <section id="quick-start" className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Quick Start</h1>
        <p className="text-muted-foreground mt-1">
          The essential workflow for every contribution.
        </p>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>5-Step Workflow</CardTitle>
        </CardHeader>
        <CardContent>
          <CodeBlock
            code={`1. Branch from main       →  git checkout -b feature/my-feature
2. Make changes & commit  →  git commit -m "✨ feat: add feature"
3. Push to remote         →  git push origin feature/my-feature
4. Create PR to staging   →  Review & merge via GitHub/GitLab
5. After testing          →  Merge staging → main`}
          />
        </CardContent>
      </Card>

      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Critical Rules
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3">
            <Badge variant="destructive" className="shrink-0">Never</Badge>
            <span className="text-sm">
              commit directly to <code className="bg-muted px-1 rounded text-xs">main</code> or{' '}
              <code className="bg-muted px-1 rounded text-xs">staging</code>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="shrink-0">Always</Badge>
            <span className="text-sm">branch from an updated <code className="bg-muted px-1 rounded text-xs">main</code></span>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="shrink-0">Always</Badge>
            <span className="text-sm">use Gitmoji + Conventional Commits</span>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="shrink-0">Always</Badge>
            <span className="text-sm">get PR approval before merging</span>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
pnpm tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/sections/QuickStart.tsx
git commit -m "✨ feat: add QuickStart section"
```

---

## Task 12: Create `BranchingStrategy` section

**Files:**
- Create: `src/sections/BranchingStrategy.tsx`

- [ ] **Step 1: Create `src/sections/BranchingStrategy.tsx`**

```tsx
import { XCircle, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import CodeBlock from '@/components/CodeBlock'

export default function BranchingStrategy() {
  return (
    <section id="branching-strategy" className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Branching Strategy</h1>
        <p className="text-muted-foreground mt-1">
          How branches are structured and where code flows.
        </p>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Branch Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <CodeBlock
            code={`main (production)
  ↑
  └── staging (pre-production)
        ↑
        ├── feature/new-login
        ├── bugfix/navbar-scroll
        └── hotfix/critical-security-fix → main (emergency only)`}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Core Branches</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Branch</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Deployment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">main</code>
                </TableCell>
                <TableCell>Production-ready code</TableCell>
                <TableCell>Auto-deploy to production</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">staging</code>
                </TableCell>
                <TableCell>Integration &amp; testing</TableCell>
                <TableCell>Auto-deploy to staging environment</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium">Rules for Core Branches:</p>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center gap-2 text-destructive">
                <XCircle className="h-4 w-4 shrink-0" /> No direct commits allowed
              </li>
              <li className="flex items-center gap-2 text-primary">
                <CheckCircle className="h-4 w-4 shrink-0" /> Updates only via approved Pull Requests
              </li>
              <li className="flex items-center gap-2 text-primary">
                <CheckCircle className="h-4 w-4 shrink-0" /> All CI/CD checks must pass before merge
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Working Branches</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Naming</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Use Case</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Feature</TableCell>
                <TableCell>
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">feature/&lt;name&gt;</code>
                </TableCell>
                <TableCell>
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">main</code>
                </TableCell>
                <TableCell>
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">staging</code>
                </TableCell>
                <TableCell>New functionality</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Bugfix</TableCell>
                <TableCell>
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">bugfix/&lt;name&gt;</code>
                </TableCell>
                <TableCell>
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">main</code>
                </TableCell>
                <TableCell>
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">staging</code>
                </TableCell>
                <TableCell>Non-critical fixes</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Hotfix</TableCell>
                <TableCell>
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">hotfix/&lt;name&gt;</code>
                </TableCell>
                <TableCell>
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">main</code>
                </TableCell>
                <TableCell>
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">main + staging</code>
                </TableCell>
                <TableCell>Critical production fixes (urgent)</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div>
            <p className="text-sm font-medium mb-2">Branch Naming Examples:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2 text-primary">
                <CheckCircle className="h-4 w-4 shrink-0" />
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">feature/oauth-integration</code>
              </div>
              <div className="flex items-center gap-2 text-primary">
                <CheckCircle className="h-4 w-4 shrink-0" />
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">bugfix/fix-navbar-overflow</code>
              </div>
              <div className="flex items-center gap-2 text-primary">
                <CheckCircle className="h-4 w-4 shrink-0" />
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">hotfix/security-patch-CVE-2024</code>
              </div>
              <div className="flex items-center gap-2 text-destructive">
                <XCircle className="h-4 w-4 shrink-0" />
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">my-feature</code>
                <span className="text-muted-foreground">(too vague)</span>
              </div>
              <div className="flex items-center gap-2 text-destructive">
                <XCircle className="h-4 w-4 shrink-0" />
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">feature-123</code>
                <span className="text-muted-foreground">(use descriptive names)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <XCircle className="h-5 w-5 text-destructive" />
            What NOT to Do
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Don't</TableHead>
                <TableHead>Do Instead</TableHead>
                <TableHead>Why</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-destructive">Commit directly to <code className="bg-muted px-1 rounded text-xs font-mono">main</code> or <code className="bg-muted px-1 rounded text-xs font-mono">staging</code></TableCell>
                <TableCell>Create a feature branch and PR</TableCell>
                <TableCell className="text-muted-foreground text-sm">Prevents untested code in production</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-destructive">Force push to shared branches</TableCell>
                <TableCell>Use <code className="bg-muted px-1 rounded text-xs font-mono">--force-with-lease</code> or rebase locally</TableCell>
                <TableCell className="text-muted-foreground text-sm">Protects team's work from being overwritten</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-destructive">Commit sensitive data (keys, passwords)</TableCell>
                <TableCell>Use <code className="bg-muted px-1 rounded text-xs font-mono">.env</code> files and <code className="bg-muted px-1 rounded text-xs font-mono">.gitignore</code></TableCell>
                <TableCell className="text-muted-foreground text-sm">Security vulnerability</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-destructive">Create vague commit messages</TableCell>
                <TableCell>Use Gitmoji + Conventional Commits</TableCell>
                <TableCell className="text-muted-foreground text-sm">Makes history searchable and clear</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-destructive">Work on outdated branches</TableCell>
                <TableCell>Sync with <code className="bg-muted px-1 rounded text-xs font-mono">main</code> daily</TableCell>
                <TableCell className="text-muted-foreground text-sm">Reduces merge conflicts</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-destructive">Mix multiple features in one PR</TableCell>
                <TableCell>Keep PRs focused (one feature)</TableCell>
                <TableCell className="text-muted-foreground text-sm">Faster reviews, easier rollback</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-destructive">Skip testing before pushing</TableCell>
                <TableCell>Run tests locally first</TableCell>
                <TableCell className="text-muted-foreground text-sm">Avoids breaking CI/CD pipeline</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Branch Protection Rules</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Badge className="mb-2 font-mono">main</Badge>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center gap-2 text-primary"><CheckCircle className="h-4 w-4 shrink-0" /> Requires PR approval from at least 1 reviewer</li>
              <li className="flex items-center gap-2 text-primary"><CheckCircle className="h-4 w-4 shrink-0" /> Requires all CI/CD checks to pass</li>
              <li className="flex items-center gap-2 text-primary"><CheckCircle className="h-4 w-4 shrink-0" /> Requires branches to be up-to-date before merge</li>
              <li className="flex items-center gap-2 text-destructive"><XCircle className="h-4 w-4 shrink-0" /> No force pushes allowed</li>
              <li className="flex items-center gap-2 text-destructive"><XCircle className="h-4 w-4 shrink-0" /> No deletions allowed</li>
            </ul>
          </div>
          <div>
            <Badge variant="secondary" className="mb-2 font-mono">staging</Badge>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center gap-2 text-primary"><CheckCircle className="h-4 w-4 shrink-0" /> Requires PR approval from at least 1 reviewer</li>
              <li className="flex items-center gap-2 text-primary"><CheckCircle className="h-4 w-4 shrink-0" /> Requires all CI/CD checks to pass</li>
              <li className="flex items-center gap-2 text-destructive"><XCircle className="h-4 w-4 shrink-0" /> No force pushes allowed</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
pnpm tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/sections/BranchingStrategy.tsx
git commit -m "✨ feat: add BranchingStrategy section"
```

---

## Task 13: Create `CommitMessageFormat` section

**Files:**
- Create: `src/sections/CommitMessageFormat.tsx`

- [ ] **Step 1: Create `src/sections/CommitMessageFormat.tsx`**

```tsx
import { CheckCircle, XCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import CodeBlock from '@/components/CodeBlock'

export default function CommitMessageFormat() {
  return (
    <section id="commit-message-format" className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Commit Message Format</h1>
        <p className="text-muted-foreground mt-1">
          Every commit follows Gitmoji + Conventional Commits.
        </p>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Structure</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <CodeBlock
            code={`:gitmoji: type(scope): short description
           │    │      │
           │    │      └─→ Summary (max 50 chars, imperative)
           │    └────────→ Component/module (optional)
           └─────────────→ Commit type (feat, fix, etc.)

[optional body: explain WHY, not what - wrap at 72 chars]

[optional footer: issue references, breaking changes]`}
          />
          <div className="text-sm space-y-1">
            <p className="font-medium">Character Limits:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
              <li><strong>Subject line:</strong> Max 50 characters (hard limit 72)</li>
              <li><strong>Body:</strong> Wrap at 72 characters per line</li>
              <li><strong>Why?</strong> Ensures readability in <code className="bg-muted px-1 rounded text-xs font-mono">git log</code> and GitHub UI</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Commit Types</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Gitmoji</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Example</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">feat</code></TableCell>
                <TableCell>✨ <code className="text-xs text-muted-foreground">:sparkles:</code></TableCell>
                <TableCell>New feature</TableCell>
                <TableCell className="text-xs text-muted-foreground">✨ feat(auth): add OAuth2 support</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">fix</code></TableCell>
                <TableCell>🐛 <code className="text-xs text-muted-foreground">:bug:</code></TableCell>
                <TableCell>Bug fix</TableCell>
                <TableCell className="text-xs text-muted-foreground">🐛 fix(api): resolve timeout issue</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">docs</code></TableCell>
                <TableCell>📝 <code className="text-xs text-muted-foreground">:memo:</code></TableCell>
                <TableCell>Documentation</TableCell>
                <TableCell className="text-xs text-muted-foreground">📝 docs(readme): update setup guide</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">style</code></TableCell>
                <TableCell>💄 <code className="text-xs text-muted-foreground">:lipstick:</code></TableCell>
                <TableCell>UI/formatting</TableCell>
                <TableCell className="text-xs text-muted-foreground">💄 style(button): improve hover state</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">refactor</code></TableCell>
                <TableCell>♻️ <code className="text-xs text-muted-foreground">:recycle:</code></TableCell>
                <TableCell>Code restructure</TableCell>
                <TableCell className="text-xs text-muted-foreground">♻️ refactor(auth): simplify validation</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">perf</code></TableCell>
                <TableCell>⚡ <code className="text-xs text-muted-foreground">:zap:</code></TableCell>
                <TableCell>Performance</TableCell>
                <TableCell className="text-xs text-muted-foreground">⚡ perf(api): optimize query speed</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">test</code></TableCell>
                <TableCell>✅ <code className="text-xs text-muted-foreground">:white_check_mark:</code></TableCell>
                <TableCell>Tests</TableCell>
                <TableCell className="text-xs text-muted-foreground">✅ test(utils): add validation tests</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">build</code></TableCell>
                <TableCell>📦 <code className="text-xs text-muted-foreground">:package:</code></TableCell>
                <TableCell>Build/dependencies</TableCell>
                <TableCell className="text-xs text-muted-foreground">📦 build(deps): upgrade React to v18</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">ci</code></TableCell>
                <TableCell>👷 <code className="text-xs text-muted-foreground">:construction_worker:</code></TableCell>
                <TableCell>CI/CD</TableCell>
                <TableCell className="text-xs text-muted-foreground">👷 ci(github): add automated tests</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">chore</code></TableCell>
                <TableCell>🔧 <code className="text-xs text-muted-foreground">:wrench:</code></TableCell>
                <TableCell>Maintenance</TableCell>
                <TableCell className="text-xs text-muted-foreground">🔧 chore(config): update eslint rules</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">revert</code></TableCell>
                <TableCell>⏪ <code className="text-xs text-muted-foreground">:rewind:</code></TableCell>
                <TableCell>Revert commit</TableCell>
                <TableCell className="text-xs text-muted-foreground">⏪ revert: rollback auth changes</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">wip</code></TableCell>
                <TableCell>🚧 <code className="text-xs text-muted-foreground">:construction:</code></TableCell>
                <TableCell>Work in progress</TableCell>
                <TableCell className="text-xs text-muted-foreground">🚧 wip(login): scaffold UI components</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Best Practices</CardTitle>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-primary flex items-center gap-1"><CheckCircle className="h-4 w-4" /> Do</p>
            <ul className="space-y-1.5 text-sm">
              <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-primary" /> Write in imperative mood: "add feature" not "added feature"</li>
              <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-primary" /> Keep subject line under 50 characters</li>
              <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-primary" /> Explain WHY in the body, not WHAT</li>
              <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-primary" /> Reference issues: <code className="bg-muted px-1 rounded text-xs font-mono">Closes #123</code></li>
              <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-primary" /> Indicate breaking changes: <code className="bg-muted px-1 rounded text-xs font-mono">BREAKING CHANGE:</code></li>
            </ul>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-destructive flex items-center gap-1"><XCircle className="h-4 w-4" /> Don't</p>
            <ul className="space-y-1.5 text-sm">
              <li className="flex items-start gap-2"><XCircle className="h-4 w-4 shrink-0 mt-0.5 text-destructive" /> Use vague messages: "fix stuff", "updates", "changes"</li>
              <li className="flex items-start gap-2"><XCircle className="h-4 w-4 shrink-0 mt-0.5 text-destructive" /> Combine unrelated changes in one commit</li>
              <li className="flex items-start gap-2"><XCircle className="h-4 w-4 shrink-0 mt-0.5 text-destructive" /> Commit commented-out code or debug logs</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Real-World Examples</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Good: Clear, specific, with context</p>
            <CodeBlock
              code={`✨ feat(payment): add Stripe payment integration

Implements Stripe checkout flow with webhook support
for subscription management. Includes retry logic for
failed transactions.

Closes #234`}
            />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Good: Bug fix with root cause</p>
            <CodeBlock
              code={`🐛 fix(auth): prevent token refresh race condition

Race condition occurred when multiple tabs refreshed
tokens simultaneously. Now using localStorage lock.

Fixes #456`}
            />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Good: Breaking change</p>
            <CodeBlock
              code={`♻️ refactor(api): restructure endpoint paths

BREAKING CHANGE: All API endpoints now prefixed with /v2
Migration guide: docs/migration-v1-to-v2.md`}
            />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1 text-destructive">Bad: Too vague</p>
            <CodeBlock code="fix: bug fixes" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1 text-destructive">Bad: Multiple unrelated changes</p>
            <CodeBlock code="feat: add login, fix navbar, update deps" />
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
pnpm tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/sections/CommitMessageFormat.tsx
git commit -m "✨ feat: add CommitMessageFormat section"
```

---

## Task 14: Create `WorkflowGuidelines` section

**Files:**
- Create: `src/sections/WorkflowGuidelines.tsx`

- [ ] **Step 1: Create `src/sections/WorkflowGuidelines.tsx`**

```tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import CodeBlock from '@/components/CodeBlock'

export default function WorkflowGuidelines() {
  return (
    <section id="workflow-guidelines" className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Workflow Guidelines</h1>
        <p className="text-muted-foreground mt-1">
          Day-to-day development process and branch synchronisation.
        </p>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Daily Development Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <CodeBlock
            code={`# 1. Start: Sync with main
git checkout main
git pull origin main

# 2. Create: New feature branch
git checkout -b feature/user-dashboard

# 3. Develop: Make changes and commit
git add .
git commit -m "✨ feat(dashboard): add user analytics widget"

# 4. Sync: Keep branch updated (daily)
git fetch origin main
git rebase origin/main

# 5. Push: Share your work
git push origin feature/user-dashboard

# 6. PR: Create pull request to staging
# (via GitHub/GitLab UI)

# 7. Cleanup: After merge
git checkout main
git pull origin main
git branch -d feature/user-dashboard`}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Keeping Your Branch Updated</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-sm font-medium mb-2">Recommended: Rebase (cleaner history)</p>
            <CodeBlock
              code={`git fetch origin main
git rebase origin/main`}
            />
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Alternative: Merge (preserves branch history)</p>
            <CodeBlock
              code={`git fetch origin main
git merge origin/main`}
            />
          </div>

          <div className="rounded-md border border-border p-4 space-y-2">
            <p className="text-sm font-medium">When to use which:</p>
            <ul className="space-y-1.5 text-sm">
              <li>
                <span className="inline-flex items-center gap-1 font-mono text-xs bg-muted px-1.5 py-0.5 rounded mr-2">Rebase</span>
                Feature branches, before creating a PR — produces clean, linear history
              </li>
              <li>
                <span className="inline-flex items-center gap-1 font-mono text-xs bg-muted px-1.5 py-0.5 rounded mr-2">Merge</span>
                Public/shared branches, <code className="bg-muted px-1 rounded text-xs font-mono">staging</code> → <code className="bg-muted px-1 rounded text-xs font-mono">main</code> — preserves branch history
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
pnpm tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/sections/WorkflowGuidelines.tsx
git commit -m "✨ feat: add WorkflowGuidelines section"
```

---

## Task 15: Create `PullRequestProcess` section

**Files:**
- Create: `src/sections/PullRequestProcess.tsx`

- [ ] **Step 1: Create `src/sections/PullRequestProcess.tsx`**

```tsx
import { CheckSquare, Square } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import CodeBlock from '@/components/CodeBlock'

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm">
      <Square className="h-4 w-4 shrink-0 mt-0.5 text-muted-foreground" />
      {children}
    </li>
  )
}

export default function PullRequestProcess() {
  return (
    <section id="pull-request-process" className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pull Request Process</h1>
        <p className="text-muted-foreground mt-1">
          What to check before opening a PR and how to review one.
        </p>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>PR Checklist</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">Before creating a PR, ensure:</p>
          <ul className="space-y-2">
            <CheckItem>Code builds successfully without errors</CheckItem>
            <CheckItem>All tests pass locally</CheckItem>
            <CheckItem>New features include tests</CheckItem>
            <CheckItem>Documentation updated (if needed)</CheckItem>
            <CheckItem>No debug code or console.logs</CheckItem>
            <CheckItem>Branch is up-to-date with target branch</CheckItem>
            <CheckItem>Commit messages follow conventions</CheckItem>
            <CheckItem>PR description explains WHAT and WHY</CheckItem>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>PR Template</CardTitle>
        </CardHeader>
        <CardContent>
          <CodeBlock
            code={`## Description

Brief description of changes and motivation

## Type of Change

- [ ] Feature
- [ ] Bug fix
- [ ] Refactor
- [ ] Documentation

## Testing

How to test these changes:

1. Step one
2. Step two

## Screenshots (if applicable)

[Add screenshots for UI changes]

## Related Issues

Closes #123`}
          />
        </CardContent>
      </Card>

      <div className="grid sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">For Authors</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>Keep PRs focused (&lt; 400 lines of code ideally)</li>
              <li>Respond to feedback constructively</li>
              <li>Request re-review after making changes</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">For Reviewers</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>Review within 24–48 hours</li>
              <li>Focus on logic, security, performance</li>
              <li>Approve only if you'd be comfortable deploying it</li>
              <li>Be constructive and specific in feedback</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Review Checklist</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <CheckItem>Code logic is sound and efficient</CheckItem>
            <CheckItem>No security vulnerabilities introduced</CheckItem>
            <CheckItem>Error handling is appropriate</CheckItem>
            <CheckItem>Tests cover edge cases</CheckItem>
            <CheckItem>Code follows project style guide</CheckItem>
            <CheckItem>No hardcoded credentials or sensitive data</CheckItem>
          </ul>
        </CardContent>
      </Card>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
pnpm tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/sections/PullRequestProcess.tsx
git commit -m "✨ feat: add PullRequestProcess section"
```

---

## Task 16: Create `QuickReference` section

**Files:**
- Create: `src/sections/QuickReference.tsx`

- [ ] **Step 1: Create `src/sections/QuickReference.tsx`**

```tsx
import { ChevronDown } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import {
  Collapsible, CollapsibleContent, CollapsibleTrigger,
} from '@/components/ui/collapsible'
import CodeBlock from '@/components/CodeBlock'

export default function QuickReference() {
  return (
    <section id="quick-reference" className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Quick Reference</h1>
        <p className="text-muted-foreground mt-1">
          Common commands and the full Gitmoji cheat sheet.
        </p>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Common Commands</CardTitle>
        </CardHeader>
        <CardContent>
          <CodeBlock
            code={`# Branch Management
git branch                          # List local branches
git branch -a                       # List all branches (including remote)
git branch -d <branch>              # Delete local branch
git push origin --delete <branch>   # Delete remote branch

# Syncing
git fetch origin                    # Download remote changes
git pull origin main                # Fetch + merge from main
git rebase origin/main              # Rebase onto main

# Stashing (save work temporarily)
git stash                           # Save changes
git stash pop                       # Restore changes
git stash list                      # View stashed changes

# Undo Changes
git reset HEAD~1                    # Undo last commit (keep changes)
git reset --hard HEAD~1             # Undo last commit (discard changes)
git revert <commit-hash>            # Create new commit that undoes changes

# View History
git log --oneline --graph           # Visual commit history
git log --author="<name>"           # Commits by author
git blame <file>                    # See who changed each line`}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Essential Gitmoji</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Gitmoji</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>When to Use</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>✨</TableCell>
                <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:sparkles:</code></TableCell>
                <TableCell>Adding new feature</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>🐛</TableCell>
                <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:bug:</code></TableCell>
                <TableCell>Fixing a bug</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>📝</TableCell>
                <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:memo:</code></TableCell>
                <TableCell>Writing or updating docs</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>🔧</TableCell>
                <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:wrench:</code></TableCell>
                <TableCell>Updating config files</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>✅</TableCell>
                <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:white_check_mark:</code></TableCell>
                <TableCell>Adding or updating tests</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>♻️</TableCell>
                <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:recycle:</code></TableCell>
                <TableCell>Refactoring code</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>⚡</TableCell>
                <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:zap:</code></TableCell>
                <TableCell>Improving performance</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>🚑</TableCell>
                <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:ambulance:</code></TableCell>
                <TableCell>Critical hotfix</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Full Gitmoji List</CardTitle>
        </CardHeader>
        <CardContent>
          <Collapsible>
            <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              <ChevronDown className="h-4 w-4 transition-transform [[data-state=open]_&]:rotate-180" />
              Click to expand full list
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Gitmoji</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Usage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium" rowSpan={4}>Features</TableCell>
                    <TableCell>✨</TableCell>
                    <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:sparkles:</code></TableCell>
                    <TableCell>New feature</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>🎨</TableCell>
                    <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:art:</code></TableCell>
                    <TableCell>Improve structure/format</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>⚡</TableCell>
                    <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:zap:</code></TableCell>
                    <TableCell>Performance improvement</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>🔥</TableCell>
                    <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:fire:</code></TableCell>
                    <TableCell>Remove code or files</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium" rowSpan={4}>Fixes</TableCell>
                    <TableCell>🐛</TableCell>
                    <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:bug:</code></TableCell>
                    <TableCell>Bug fix</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>🚑</TableCell>
                    <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:ambulance:</code></TableCell>
                    <TableCell>Critical hotfix</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>🔒</TableCell>
                    <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:lock:</code></TableCell>
                    <TableCell>Security fix</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>🩹</TableCell>
                    <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:adhesive_bandage:</code></TableCell>
                    <TableCell>Simple fix</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium" rowSpan={2}>Documentation</TableCell>
                    <TableCell>📝</TableCell>
                    <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:memo:</code></TableCell>
                    <TableCell>Add/update docs</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>💡</TableCell>
                    <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:bulb:</code></TableCell>
                    <TableCell>Add/update comments</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium" rowSpan={2}>Testing</TableCell>
                    <TableCell>✅</TableCell>
                    <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:white_check_mark:</code></TableCell>
                    <TableCell>Add/update tests</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>🧪</TableCell>
                    <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:test_tube:</code></TableCell>
                    <TableCell>Add failing test</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium" rowSpan={4}>Maintenance</TableCell>
                    <TableCell>🔧</TableCell>
                    <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:wrench:</code></TableCell>
                    <TableCell>Config changes</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>📦</TableCell>
                    <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:package:</code></TableCell>
                    <TableCell>Update dependencies</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>♻️</TableCell>
                    <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:recycle:</code></TableCell>
                    <TableCell>Refactor code</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>🗑️</TableCell>
                    <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:wastebasket:</code></TableCell>
                    <TableCell>Deprecate code</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium" rowSpan={3}>CI/CD</TableCell>
                    <TableCell>👷</TableCell>
                    <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:construction_worker:</code></TableCell>
                    <TableCell>CI/CD changes</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>🚀</TableCell>
                    <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:rocket:</code></TableCell>
                    <TableCell>Deploy stuff</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>💚</TableCell>
                    <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:green_heart:</code></TableCell>
                    <TableCell>Fix CI build</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium" rowSpan={10}>Other</TableCell>
                    <TableCell>🚧</TableCell>
                    <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:construction:</code></TableCell>
                    <TableCell>Work in progress</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>⏪</TableCell>
                    <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:rewind:</code></TableCell>
                    <TableCell>Revert changes</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>🔀</TableCell>
                    <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:twisted_rightwards_arrows:</code></TableCell>
                    <TableCell>Merge branches</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>🎉</TableCell>
                    <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:tada:</code></TableCell>
                    <TableCell>Initial commit</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>🔖</TableCell>
                    <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:bookmark:</code></TableCell>
                    <TableCell>Release/version tags</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>💄</TableCell>
                    <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:lipstick:</code></TableCell>
                    <TableCell>UI/style updates</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>🌐</TableCell>
                    <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:globe_with_meridians:</code></TableCell>
                    <TableCell>Internationalization</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>✏️</TableCell>
                    <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:pencil2:</code></TableCell>
                    <TableCell>Fix typos</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>🔊</TableCell>
                    <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:loud_sound:</code></TableCell>
                    <TableCell>Add/update logs</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>🔇</TableCell>
                    <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:mute:</code></TableCell>
                    <TableCell>Remove logs</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
pnpm tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/sections/QuickReference.tsx
git commit -m "✨ feat: add QuickReference section with collapsible gitmoji table"
```

---

## Task 17: Create `Troubleshooting` section

**Files:**
- Create: `src/sections/Troubleshooting.tsx`

- [ ] **Step 1: Create `src/sections/Troubleshooting.tsx`**

```tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import CodeBlock from '@/components/CodeBlock'

interface ScenarioCardProps {
  title: string
  code: string
}

function ScenarioCard({ title, code }: ScenarioCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CodeBlock code={code} />
      </CardContent>
    </Card>
  )
}

export default function Troubleshooting() {
  return (
    <section id="troubleshooting" className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Troubleshooting</h1>
        <p className="text-muted-foreground mt-1">
          Solutions for common Git problems.
        </p>
      </div>

      <Separator />

      <ScenarioCard
        title="Merge Conflicts"
        code={`# When conflict occurs during rebase/merge:
# 1. View conflicted files
git status

# 2. Open files and resolve conflicts (look for <<<<<<, ======, >>>>>>)

# 3. After resolving, mark as resolved
git add <resolved-file>

# 4. Continue rebase/merge
git rebase --continue    # for rebase
git merge --continue     # for merge

# Abort if needed
git rebase --abort
git merge --abort`}
      />

      <ScenarioCard
        title="Accidentally Committed to Wrong Branch"
        code={`# Move last commit to a new branch
git branch feature/new-branch      # Create branch with current state
git reset --hard HEAD~1            # Remove commit from current branch
git checkout feature/new-branch    # Switch to new branch`}
      />

      <ScenarioCard
        title="Need to Update Last Commit"
        code={`# Add forgotten changes to last commit
git add <forgotten-file>
git commit --amend --no-edit       # Keep same message
git commit --amend                 # Edit message`}
      />

      <ScenarioCard
        title="Pushed Sensitive Data"
        code={`# 1. Remove from latest commit
git rm <file>
git commit --amend
git push --force

# 2. Remove from history (use with caution)
git filter-branch --index-filter \\
  'git rm --cached --ignore-unmatch <file>' HEAD

# 3. Rotate any exposed credentials immediately!`}
      />

      <ScenarioCard
        title="Sync Forked Repository"
        code={`# One-time setup
git remote add upstream <original-repo-url>

# Regular sync
git fetch upstream
git checkout main
git merge upstream/main
git push origin main`}
      />

      <ScenarioCard
        title="Branch Diverged from Remote"
        code={`# Option 1: Force push (if you're sure)
git push --force-with-lease

# Option 2: Pull and merge
git pull origin <branch> --rebase

# Option 3: Reset to remote (discard local changes)
git fetch origin
git reset --hard origin/<branch>`}
      />
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
pnpm tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/sections/Troubleshooting.tsx
git commit -m "✨ feat: add Troubleshooting section"
```

---

## Task 18: Create `GitWorkflow` page

**Files:**
- Modify: `src/pages/GitWorkflow.tsx`

- [ ] **Step 1: Update `src/pages/GitWorkflow.tsx` to compose all sections**

```tsx
import QuickStart from '@/sections/QuickStart'
import BranchingStrategy from '@/sections/BranchingStrategy'
import CommitMessageFormat from '@/sections/CommitMessageFormat'
import WorkflowGuidelines from '@/sections/WorkflowGuidelines'
import PullRequestProcess from '@/sections/PullRequestProcess'
import QuickReference from '@/sections/QuickReference'
import Troubleshooting from '@/sections/Troubleshooting'

export default function GitWorkflow() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-16 scroll-smooth">
      <QuickStart />
      <BranchingStrategy />
      <CommitMessageFormat />
      <WorkflowGuidelines />
      <PullRequestProcess />
      <QuickReference />
      <Troubleshooting />
    </div>
  )
}
```

- [ ] **Step 2: Run dev server and verify the full page renders**

```bash
pnpm dev
```

Open `http://localhost:5173`. Expected:
- Sidebar shows "Git Workflow" link (active/highlighted) with all 7 section anchors beneath it
- Content area shows all 7 sections with correct content
- Clicking a section anchor in the sidebar scrolls to that section
- Dark/light toggle works and persists on reload
- Mobile: hamburger button shows sidebar in a Sheet
Stop with Ctrl+C.

- [ ] **Step 3: Verify TypeScript**

```bash
pnpm tsc --noEmit
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add src/pages/GitWorkflow.tsx
git commit -m "✨ feat: compose GitWorkflow page with all sections"
```

---

## Task 19: Run all tests and final build verification

- [ ] **Step 1: Run all tests**

```bash
pnpm test --run
```

Expected: 6 tests pass (4 useTheme + 2 CodeBlock), 0 failures.

- [ ] **Step 2: Run production build**

```bash
pnpm build
```

Expected: `dist/` produced with no TypeScript or bundle errors.

- [ ] **Step 3: Preview production build**

```bash
pnpm preview
```

Open `http://localhost:4173`. Verify:
- App loads and redirects to `/git-workflow`
- All sections visible
- Copy button works on code blocks
- Theme toggle works and persists
- Mobile layout renders correctly (resize browser)
Stop with Ctrl+C.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "🎉 feat: complete aquila onboarding site"
```

---

## Self-Review Notes

- All 7 sections from the spec are implemented as distinct components.
- Flash prevention is handled by an inline script in `index.html` before CSS loads.
- TanStack Router file-based routing is used throughout — adding a page requires only a new `routes/` file + `pages/` component + sidebar nav entry.
- `routeTree.gen.ts` is auto-generated; the plan explicitly triggers generation in Task 4 Step 6 before `main.tsx` imports it.
- The `Collapsible` in QuickReference uses shadcn's component and the CSS `[[data-state=open]_&]:rotate-180` Tailwind selector for the chevron animation.
- All shared component interfaces are explicit (no inline props) per coding standards.
