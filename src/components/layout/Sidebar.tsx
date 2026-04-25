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
      <div className="px-5 py-4 border-b border-border">
        <img
          src={`${import.meta.env.BASE_URL}aquila_logo_name.png`}
          alt="Aquila"
          className="h-6 w-auto dark:invert"
        />
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
        {PAGES.map(page => {
          const isActive = pathname === page.to
          return (
            <div key={page.to}>
              <Link
                to={page.to}
                className={cn(
                  'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors w-full',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/60',
                )}
              >
                <span className={cn('transition-colors', isActive ? 'text-primary' : 'text-muted-foreground/60')}>
                  {page.icon}
                </span>
                {page.label}
              </Link>

              {isActive && (
                <ul className="mt-0.5 ml-3 pl-3 border-l border-border space-y-0.5">
                  {page.sections.map(section => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <span className="w-1 h-1 rounded-full bg-border shrink-0" />
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
          className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
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
