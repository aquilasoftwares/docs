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
      <CardHeader><CardTitle className="text-base">{title}</CardTitle></CardHeader>
      <CardContent><CodeBlock code={code} /></CardContent>
    </Card>
  )
}

export default function Troubleshooting() {
  return (
    <section id="troubleshooting" className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Troubleshooting</h1>
        <p className="text-muted-foreground mt-1">Solutions for common Git problems.</p>
      </div>

      <Separator />

      <ScenarioCard title="Merge Conflicts" code={`# When conflict occurs during rebase/merge:
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
git merge --abort`} />

      <ScenarioCard title="Accidentally Committed to Wrong Branch" code={`# Move last commit to a new branch
git branch feature/new-branch      # Create branch with current state
git reset --hard HEAD~1            # Remove commit from current branch
git checkout feature/new-branch    # Switch to new branch`} />

      <ScenarioCard title="Need to Update Last Commit" code={`# Add forgotten changes to last commit
git add <forgotten-file>
git commit --amend --no-edit       # Keep same message
git commit --amend                 # Edit message`} />

      <ScenarioCard title="Pushed Sensitive Data" code={`# 1. Remove from latest commit
git rm <file>
git commit --amend
git push --force

# 2. Remove from history (use with caution)
git filter-branch --index-filter \\
  'git rm --cached --ignore-unmatch <file>' HEAD

# 3. Rotate any exposed credentials immediately!`} />

      <ScenarioCard title="Sync Forked Repository" code={`# One-time setup
git remote add upstream <original-repo-url>

# Regular sync
git fetch upstream
git checkout main
git merge upstream/main
git push origin main`} />

      <ScenarioCard title="Branch Diverged from Remote" code={`# Option 1: Force push (if you're sure)
git push --force-with-lease

# Option 2: Pull and merge
git pull origin <branch> --rebase

# Option 3: Reset to remote (discard local changes)
git fetch origin
git reset --hard origin/<branch>`} />
    </section>
  )
}
