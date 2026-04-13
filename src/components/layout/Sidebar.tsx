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
