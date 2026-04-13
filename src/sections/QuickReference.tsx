import { ChevronDown } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import CodeBlock from '@/components/CodeBlock'

export default function QuickReference() {
  return (
    <section id="quick-reference" className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Quick Reference</h1>
        <p className="text-muted-foreground mt-1">Common commands and the full Gitmoji cheat sheet.</p>
      </div>

      <Separator />

      <Card>
        <CardHeader><CardTitle>Common Commands</CardTitle></CardHeader>
        <CardContent>
          <CodeBlock code={`# Branch Management
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
git blame <file>                    # See who changed each line`} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Essential Gitmoji</CardTitle></CardHeader>
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
              <TableRow><TableCell>✨</TableCell><TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:sparkles:</code></TableCell><TableCell>Adding new feature</TableCell></TableRow>
              <TableRow><TableCell>🐛</TableCell><TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:bug:</code></TableCell><TableCell>Fixing a bug</TableCell></TableRow>
              <TableRow><TableCell>📝</TableCell><TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:memo:</code></TableCell><TableCell>Writing or updating docs</TableCell></TableRow>
              <TableRow><TableCell>🔧</TableCell><TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:wrench:</code></TableCell><TableCell>Updating config files</TableCell></TableRow>
              <TableRow><TableCell>✅</TableCell><TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:white_check_mark:</code></TableCell><TableCell>Adding or updating tests</TableCell></TableRow>
              <TableRow><TableCell>♻️</TableCell><TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:recycle:</code></TableCell><TableCell>Refactoring code</TableCell></TableRow>
              <TableRow><TableCell>⚡</TableCell><TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:zap:</code></TableCell><TableCell>Improving performance</TableCell></TableRow>
              <TableRow><TableCell>🚑</TableCell><TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:ambulance:</code></TableCell><TableCell>Critical hotfix</TableCell></TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Full Gitmoji List</CardTitle></CardHeader>
        <CardContent>
          <Collapsible>
            <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              <ChevronDown className="h-4 w-4" />
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
                  <TableRow><TableCell className="font-medium">Features</TableCell><TableCell>✨</TableCell><TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:sparkles:</code></TableCell><TableCell>New feature</TableCell></TableRow>
                  <TableRow><TableCell></TableCell><TableCell>🎨</TableCell><TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:art:</code></TableCell><TableCell>Improve structure/format</TableCell></TableRow>
                  <TableRow><TableCell></TableCell><TableCell>⚡</TableCell><TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:zap:</code></TableCell><TableCell>Performance improvement</TableCell></TableRow>
                  <TableRow><TableCell></TableCell><TableCell>🔥</TableCell><TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:fire:</code></TableCell><TableCell>Remove code or files</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">Fixes</TableCell><TableCell>🐛</TableCell><TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:bug:</code></TableCell><TableCell>Bug fix</TableCell></TableRow>
                  <TableRow><TableCell></TableCell><TableCell>🚑</TableCell><TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:ambulance:</code></TableCell><TableCell>Critical hotfix</TableCell></TableRow>
                  <TableRow><TableCell></TableCell><TableCell>🔒</TableCell><TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:lock:</code></TableCell><TableCell>Security fix</TableCell></TableRow>
                  <TableRow><TableCell></TableCell><TableCell>🔐</TableCell><TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:closed_lock_with_key:</code></TableCell><TableCell>Add or update secrets</TableCell></TableRow>
                  <TableRow><TableCell></TableCell><TableCell>🩹</TableCell><TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:adhesive_bandage:</code></TableCell><TableCell>Simple fix</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">Documentation</TableCell><TableCell>📝</TableCell><TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:memo:</code></TableCell><TableCell>Add/update docs</TableCell></TableRow>
                  <TableRow><TableCell></TableCell><TableCell>💡</TableCell><TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:bulb:</code></TableCell><TableCell>Add/update comments</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">Testing</TableCell><TableCell>✅</TableCell><TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:white_check_mark:</code></TableCell><TableCell>Add/update tests</TableCell></TableRow>
                  <TableRow><TableCell></TableCell><TableCell>🧪</TableCell><TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:test_tube:</code></TableCell><TableCell>Add failing test</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">Maintenance</TableCell><TableCell>🔧</TableCell><TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:wrench:</code></TableCell><TableCell>Config changes</TableCell></TableRow>
                  <TableRow><TableCell></TableCell><TableCell>📦</TableCell><TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:package:</code></TableCell><TableCell>Update dependencies</TableCell></TableRow>
                  <TableRow><TableCell></TableCell><TableCell>♻️</TableCell><TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:recycle:</code></TableCell><TableCell>Refactor code</TableCell></TableRow>
                  <TableRow><TableCell></TableCell><TableCell>🗑️</TableCell><TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:wastebasket:</code></TableCell><TableCell>Deprecate code</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">CI/CD</TableCell><TableCell>👷</TableCell><TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:construction_worker:</code></TableCell><TableCell>CI/CD changes</TableCell></TableRow>
                  <TableRow><TableCell></TableCell><TableCell>🚀</TableCell><TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:rocket:</code></TableCell><TableCell>Deploy stuff</TableCell></TableRow>
                  <TableRow><TableCell></TableCell><TableCell>💚</TableCell><TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:green_heart:</code></TableCell><TableCell>Fix CI build</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">Other</TableCell><TableCell>🚧</TableCell><TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:construction:</code></TableCell><TableCell>Work in progress</TableCell></TableRow>
                  <TableRow><TableCell></TableCell><TableCell>⏪</TableCell><TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:rewind:</code></TableCell><TableCell>Revert changes</TableCell></TableRow>
                  <TableRow><TableCell></TableCell><TableCell>🔀</TableCell><TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:twisted_rightwards_arrows:</code></TableCell><TableCell>Merge branches</TableCell></TableRow>
                  <TableRow><TableCell></TableCell><TableCell>🎉</TableCell><TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:tada:</code></TableCell><TableCell>Initial commit</TableCell></TableRow>
                  <TableRow><TableCell></TableCell><TableCell>🔖</TableCell><TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:bookmark:</code></TableCell><TableCell>Release/version tags</TableCell></TableRow>
                  <TableRow><TableCell></TableCell><TableCell>💄</TableCell><TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:lipstick:</code></TableCell><TableCell>UI/style updates</TableCell></TableRow>
                  <TableRow><TableCell></TableCell><TableCell>🌐</TableCell><TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:globe_with_meridians:</code></TableCell><TableCell>Internationalization</TableCell></TableRow>
                  <TableRow><TableCell></TableCell><TableCell>✏️</TableCell><TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:pencil2:</code></TableCell><TableCell>Fix typos</TableCell></TableRow>
                  <TableRow><TableCell></TableCell><TableCell>🔊</TableCell><TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:loud_sound:</code></TableCell><TableCell>Add/update logs</TableCell></TableRow>
                  <TableRow><TableCell></TableCell><TableCell>🔇</TableCell><TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:mute:</code></TableCell><TableCell>Remove logs</TableCell></TableRow>
                  <TableRow><TableCell></TableCell><TableCell>🏗️</TableCell><TableCell><code className="bg-muted px-1 rounded text-xs font-mono">:building_construction:</code></TableCell><TableCell>Architectural changes</TableCell></TableRow>
                </TableBody>
              </Table>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>
    </section>
  )
}
