import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import CodeBlock from '@/components/CodeBlock'

export default function WorkflowGuidelines() {
  return (
    <section id="workflow-guidelines" className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Workflow Guidelines</h1>
        <p className="text-muted-foreground mt-1">Day-to-day development process and branch synchronisation.</p>
      </div>

      <Separator />

      <Card>
        <CardHeader><CardTitle>Daily Development Flow</CardTitle></CardHeader>
        <CardContent>
          <CodeBlock code={`# 1. Start: Sync with main
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
git branch -d feature/user-dashboard`} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Keeping Your Branch Updated</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-sm font-medium mb-2">Recommended: Rebase (cleaner history)</p>
            <CodeBlock code={`git fetch origin main
git rebase origin/main`} />
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Alternative: Merge (preserves branch history)</p>
            <CodeBlock code={`git fetch origin main
git merge origin/main`} />
          </div>
          <div className="rounded-md border border-border p-4 space-y-2">
            <p className="text-sm font-medium">When to use which:</p>
            <ul className="space-y-1.5 text-sm">
              <li><span className="inline-flex items-center gap-1 font-mono text-xs bg-muted px-1.5 py-0.5 rounded mr-2">Rebase</span>Feature branches, before creating a PR — produces clean, linear history</li>
              <li><span className="inline-flex items-center gap-1 font-mono text-xs bg-muted px-1.5 py-0.5 rounded mr-2">Merge</span>Public/shared branches, <code className="bg-muted px-1 rounded text-xs font-mono">staging</code> → <code className="bg-muted px-1 rounded text-xs font-mono">main</code> — preserves branch history</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
