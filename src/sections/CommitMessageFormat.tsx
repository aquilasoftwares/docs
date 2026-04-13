import { CheckCircle, XCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import CodeBlock from '@/components/CodeBlock'

export default function CommitMessageFormat() {
  return (
    <section id="commit-message-format" className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Commit Message Format</h1>
        <p className="text-muted-foreground mt-1">Every commit follows Gitmoji + Conventional Commits.</p>
      </div>

      <Separator />

      <Card>
        <CardHeader><CardTitle>Structure</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <CodeBlock code={`:gitmoji: type(scope): short description
           │    │      │
           │    │      └─→ Summary (max 50 chars, imperative)
           │    └────────→ Component/module (optional)
           └─────────────→ Commit type (feat, fix, etc.)

[optional body: explain WHY, not what - wrap at 72 chars]

[optional footer: issue references, breaking changes]`} />
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
        <CardHeader><CardTitle>Commit Types</CardTitle></CardHeader>
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
              <TableRow><TableCell><code className="bg-muted px-1 rounded text-xs font-mono">feat</code></TableCell><TableCell>✨ <code className="text-xs text-muted-foreground">:sparkles:</code></TableCell><TableCell>New feature</TableCell><TableCell className="text-xs text-muted-foreground">✨ feat(auth): add OAuth2 support</TableCell></TableRow>
              <TableRow><TableCell><code className="bg-muted px-1 rounded text-xs font-mono">fix</code></TableCell><TableCell>🐛 <code className="text-xs text-muted-foreground">:bug:</code></TableCell><TableCell>Bug fix</TableCell><TableCell className="text-xs text-muted-foreground">🐛 fix(api): resolve timeout issue</TableCell></TableRow>
              <TableRow><TableCell><code className="bg-muted px-1 rounded text-xs font-mono">docs</code></TableCell><TableCell>📝 <code className="text-xs text-muted-foreground">:memo:</code></TableCell><TableCell>Documentation</TableCell><TableCell className="text-xs text-muted-foreground">📝 docs(readme): update setup guide</TableCell></TableRow>
              <TableRow><TableCell><code className="bg-muted px-1 rounded text-xs font-mono">style</code></TableCell><TableCell>💄 <code className="text-xs text-muted-foreground">:lipstick:</code></TableCell><TableCell>UI/formatting</TableCell><TableCell className="text-xs text-muted-foreground">💄 style(button): improve hover state</TableCell></TableRow>
              <TableRow><TableCell><code className="bg-muted px-1 rounded text-xs font-mono">refactor</code></TableCell><TableCell>♻️ <code className="text-xs text-muted-foreground">:recycle:</code></TableCell><TableCell>Code restructure</TableCell><TableCell className="text-xs text-muted-foreground">♻️ refactor(auth): simplify validation</TableCell></TableRow>
              <TableRow><TableCell><code className="bg-muted px-1 rounded text-xs font-mono">perf</code></TableCell><TableCell>⚡ <code className="text-xs text-muted-foreground">:zap:</code></TableCell><TableCell>Performance</TableCell><TableCell className="text-xs text-muted-foreground">⚡ perf(api): optimize query speed</TableCell></TableRow>
              <TableRow><TableCell><code className="bg-muted px-1 rounded text-xs font-mono">test</code></TableCell><TableCell>✅ <code className="text-xs text-muted-foreground">:white_check_mark:</code></TableCell><TableCell>Tests</TableCell><TableCell className="text-xs text-muted-foreground">✅ test(utils): add validation tests</TableCell></TableRow>
              <TableRow><TableCell><code className="bg-muted px-1 rounded text-xs font-mono">build</code></TableCell><TableCell>📦 <code className="text-xs text-muted-foreground">:package:</code></TableCell><TableCell>Build/dependencies</TableCell><TableCell className="text-xs text-muted-foreground">📦 build(deps): upgrade React to v18</TableCell></TableRow>
              <TableRow><TableCell><code className="bg-muted px-1 rounded text-xs font-mono">ci</code></TableCell><TableCell>👷 <code className="text-xs text-muted-foreground">:construction_worker:</code></TableCell><TableCell>CI/CD</TableCell><TableCell className="text-xs text-muted-foreground">👷 ci(github): add automated tests</TableCell></TableRow>
              <TableRow><TableCell><code className="bg-muted px-1 rounded text-xs font-mono">chore</code></TableCell><TableCell>🔧 <code className="text-xs text-muted-foreground">:wrench:</code></TableCell><TableCell>Maintenance</TableCell><TableCell className="text-xs text-muted-foreground">🔧 chore(config): update eslint rules</TableCell></TableRow>
              <TableRow><TableCell><code className="bg-muted px-1 rounded text-xs font-mono">revert</code></TableCell><TableCell>⏪ <code className="text-xs text-muted-foreground">:rewind:</code></TableCell><TableCell>Revert commit</TableCell><TableCell className="text-xs text-muted-foreground">⏪ revert: rollback auth changes</TableCell></TableRow>
              <TableRow><TableCell><code className="bg-muted px-1 rounded text-xs font-mono">wip</code></TableCell><TableCell>🚧 <code className="text-xs text-muted-foreground">:construction:</code></TableCell><TableCell>Work in progress</TableCell><TableCell className="text-xs text-muted-foreground">🚧 wip(login): scaffold UI components</TableCell></TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Best Practices</CardTitle></CardHeader>
        <CardContent className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-primary flex items-center gap-1"><CheckCircle className="h-4 w-4" />Do</p>
            <ul className="space-y-1.5 text-sm">
              <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-primary" />Write in imperative mood: "add feature" not "added feature"</li>
              <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-primary" />Keep subject line under 50 characters</li>
              <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-primary" />Explain WHY in the body, not WHAT</li>
              <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-primary" />Reference issues: <code className="bg-muted px-1 rounded text-xs font-mono">Closes #123</code></li>
              <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-primary" />Indicate breaking changes: <code className="bg-muted px-1 rounded text-xs font-mono">BREAKING CHANGE:</code></li>
            </ul>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-destructive flex items-center gap-1"><XCircle className="h-4 w-4" />Don't</p>
            <ul className="space-y-1.5 text-sm">
              <li className="flex items-start gap-2"><XCircle className="h-4 w-4 shrink-0 mt-0.5 text-destructive" />Use vague messages: "fix stuff", "updates", "changes"</li>
              <li className="flex items-start gap-2"><XCircle className="h-4 w-4 shrink-0 mt-0.5 text-destructive" />Combine unrelated changes in one commit</li>
              <li className="flex items-start gap-2"><XCircle className="h-4 w-4 shrink-0 mt-0.5 text-destructive" />Commit commented-out code or debug logs</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Real-World Examples</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><p className="text-xs text-muted-foreground mb-1">Good: Clear, specific, with context</p>
            <CodeBlock code={`✨ feat(payment): add Stripe payment integration

Implements Stripe checkout flow with webhook support
for subscription management. Includes retry logic for
failed transactions.

Closes #234`} />
          </div>
          <div><p className="text-xs text-muted-foreground mb-1">Good: Bug fix with root cause</p>
            <CodeBlock code={`🐛 fix(auth): prevent token refresh race condition

Race condition occurred when multiple tabs refreshed
tokens simultaneously. Now using localStorage lock.

Fixes #456`} />
          </div>
          <div><p className="text-xs text-muted-foreground mb-1">Good: Breaking change</p>
            <CodeBlock code={`♻️ refactor(api): restructure endpoint paths

BREAKING CHANGE: All API endpoints now prefixed with /v2
Migration guide: docs/migration-v1-to-v2.md`} />
          </div>
          <div><p className="text-xs text-muted-foreground mb-1 text-destructive">Bad: Too vague</p>
            <CodeBlock code="fix: bug fixes" />
          </div>
          <div><p className="text-xs text-muted-foreground mb-1 text-destructive">Bad: Multiple unrelated changes</p>
            <CodeBlock code="feat: add login, fix navbar, update deps" />
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
