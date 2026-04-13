import { XCircle, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import CodeBlock from '@/components/CodeBlock'

export default function BranchingStrategy() {
  return (
    <section id="branching-strategy" className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Branching Strategy</h1>
        <p className="text-muted-foreground mt-1">How branches are structured and where code flows.</p>
      </div>

      <Separator />

      <Card>
        <CardHeader><CardTitle>Branch Flow</CardTitle></CardHeader>
        <CardContent>
          <CodeBlock code={`main (production)
  ↑
  └── staging (pre-production)
        ↑
        ├── feature/new-login
        ├── bugfix/navbar-scroll
        └── hotfix/critical-security-fix → main (emergency only)`} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Core Branches</CardTitle></CardHeader>
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
                <TableCell><code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">main</code></TableCell>
                <TableCell>Production-ready code</TableCell>
                <TableCell>Auto-deploy to production</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">staging</code></TableCell>
                <TableCell>Integration &amp; testing</TableCell>
                <TableCell>Auto-deploy to staging environment</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="mt-4 space-y-1">
            <p className="text-sm font-medium">Rules for Core Branches:</p>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center gap-2 text-destructive"><XCircle className="h-4 w-4 shrink-0" /> No direct commits allowed</li>
              <li className="flex items-center gap-2 text-primary"><CheckCircle className="h-4 w-4 shrink-0" /> Updates only via approved Pull Requests</li>
              <li className="flex items-center gap-2 text-primary"><CheckCircle className="h-4 w-4 shrink-0" /> All CI/CD checks must pass before merge</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Working Branches</CardTitle></CardHeader>
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
                <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">feature/&lt;name&gt;</code></TableCell>
                <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">main</code></TableCell>
                <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">staging</code></TableCell>
                <TableCell>New functionality</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Bugfix</TableCell>
                <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">bugfix/&lt;name&gt;</code></TableCell>
                <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">main</code></TableCell>
                <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">staging</code></TableCell>
                <TableCell>Non-critical fixes</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Hotfix</TableCell>
                <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">hotfix/&lt;name&gt;</code></TableCell>
                <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">main</code></TableCell>
                <TableCell><code className="bg-muted px-1 rounded text-xs font-mono">main + staging</code></TableCell>
                <TableCell>Critical production fixes (urgent)</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div>
            <p className="text-sm font-medium mb-2">Branch Naming Examples:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2 text-primary"><CheckCircle className="h-4 w-4 shrink-0" /><code className="bg-muted px-1 rounded text-xs font-mono">feature/oauth-integration</code></div>
              <div className="flex items-center gap-2 text-primary"><CheckCircle className="h-4 w-4 shrink-0" /><code className="bg-muted px-1 rounded text-xs font-mono">bugfix/fix-navbar-overflow</code></div>
              <div className="flex items-center gap-2 text-primary"><CheckCircle className="h-4 w-4 shrink-0" /><code className="bg-muted px-1 rounded text-xs font-mono">hotfix/security-patch-CVE-2024</code></div>
              <div className="flex items-center gap-2 text-destructive"><XCircle className="h-4 w-4 shrink-0" /><code className="bg-muted px-1 rounded text-xs font-mono">my-feature</code><span className="text-muted-foreground">(too vague)</span></div>
              <div className="flex items-center gap-2 text-destructive"><XCircle className="h-4 w-4 shrink-0" /><code className="bg-muted px-1 rounded text-xs font-mono">feature-123</code><span className="text-muted-foreground">(use descriptive names)</span></div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><XCircle className="h-5 w-5 text-destructive" />What NOT to Do</CardTitle></CardHeader>
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
        <CardHeader><CardTitle>Branch Protection Rules</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Badge className="mb-2 font-mono">main</Badge>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center gap-2 text-primary"><CheckCircle className="h-4 w-4 shrink-0" />Requires PR approval from at least 1 reviewer</li>
              <li className="flex items-center gap-2 text-primary"><CheckCircle className="h-4 w-4 shrink-0" />Requires all CI/CD checks to pass</li>
              <li className="flex items-center gap-2 text-primary"><CheckCircle className="h-4 w-4 shrink-0" />Requires branches to be up-to-date before merge</li>
              <li className="flex items-center gap-2 text-destructive"><XCircle className="h-4 w-4 shrink-0" />No force pushes allowed</li>
              <li className="flex items-center gap-2 text-destructive"><XCircle className="h-4 w-4 shrink-0" />No deletions allowed</li>
            </ul>
          </div>
          <div>
            <Badge variant="secondary" className="mb-2 font-mono">staging</Badge>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center gap-2 text-primary"><CheckCircle className="h-4 w-4 shrink-0" />Requires PR approval from at least 1 reviewer</li>
              <li className="flex items-center gap-2 text-primary"><CheckCircle className="h-4 w-4 shrink-0" />Requires all CI/CD checks to pass</li>
              <li className="flex items-center gap-2 text-destructive"><XCircle className="h-4 w-4 shrink-0" />No force pushes allowed</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
