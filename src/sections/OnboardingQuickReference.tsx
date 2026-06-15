import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import CodeBlock from '@/components/CodeBlock'

export default function OnboardingQuickReference() {
  return (
    <section id="onboarding-quick-reference" className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Quick Reference</h1>
        <p className="text-muted-foreground mt-1">Commands, branch naming, file locations, and common fixes.</p>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Commands cheat sheet</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Command</TableHead>
                <TableHead>What it does</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><code className="bg-muted px-1 rounded text-xs">setup --token "your-token"</code></TableCell>
                <TableCell className="text-muted-foreground">First-day setup (run once)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="bg-muted px-1 rounded text-xs">run</code></TableCell>
                <TableCell className="text-muted-foreground">Start the project (shows menus)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="bg-muted px-1 rounded text-xs">run --local</code></TableCell>
                <TableCell className="text-muted-foreground">Start against your local database</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="bg-muted px-1 rounded text-xs">run --staging</code></TableCell>
                <TableCell className="text-muted-foreground">Start against staging</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="bg-muted px-1 rounded text-xs">update --project &lt;key&gt;</code></TableCell>
                <TableCell className="text-muted-foreground">Pull latest code and packages</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="bg-muted px-1 rounded text-xs">update --project &lt;key&gt; --new-branch "feature/name"</code></TableCell>
                <TableCell className="text-muted-foreground">Start working on a new feature</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="bg-muted px-1 rounded text-xs">doctor --project &lt;key&gt;</code></TableCell>
                <TableCell className="text-muted-foreground">Diagnose setup issues</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="bg-muted px-1 rounded text-xs">migrate --project &lt;key&gt; --name "MigrationName"</code></TableCell>
                <TableCell className="text-muted-foreground">Create and verify a migration locally</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Branch naming rules</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Branch type</TableHead>
                <TableHead>Format</TableHead>
                <TableHead>Example</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-muted-foreground">New feature</TableCell>
                <TableCell><code className="bg-muted px-1 rounded text-xs">feature/name</code></TableCell>
                <TableCell><code className="bg-muted px-1 rounded text-xs">feature/user-profile-page</code></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">Bug fix</TableCell>
                <TableCell><code className="bg-muted px-1 rounded text-xs">bugfix/name</code></TableCell>
                <TableCell><code className="bg-muted px-1 rounded text-xs">bugfix/login-redirect-loop</code></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">Daily work base</TableCell>
                <TableCell><code className="bg-muted px-1 rounded text-xs">staging</code> or <code className="bg-muted px-1 rounded text-xs">develop</code></TableCell>
                <TableCell className="text-muted-foreground">Switch to this in the morning</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Where your files live</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>What</TableHead>
                <TableHead>Where</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-muted-foreground">Cloned repos</TableCell>
                <TableCell><code className="bg-muted px-1 rounded text-xs">~/dev/&lt;project-key&gt;/</code></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">Local config (DB, etc.)</TableCell>
                <TableCell><code className="bg-muted px-1 rounded text-xs">~/dev/&lt;project-key&gt;/backend/appsettings.local.json</code></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">Saved token</TableCell>
                <TableCell><code className="bg-muted px-1 rounded text-xs">~/.devscripts/token</code></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">Script logs</TableCell>
                <TableCell><code className="bg-muted px-1 rounded text-xs">dev-automation-script/logs/</code></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Common issues</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Problem</TableHead>
                <TableHead>What to do</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-muted-foreground">Token expired or rejected</TableCell>
                <TableCell className="text-muted-foreground">Ask your admin for a new token, then run <code className="bg-muted px-1 rounded text-xs">setup --token "new-token"</code></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">Database connection failed</TableCell>
                <TableCell className="text-muted-foreground">Make sure PostgreSQL is running. Check credentials in <code className="bg-muted px-1 rounded text-xs">appsettings.local.json</code></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">Missing packages or build errors</TableCell>
                <TableCell className="text-muted-foreground">Run <code className="bg-muted px-1 rounded text-xs">update --project &lt;key&gt;</code> to restore everything</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">Something else is broken</TableCell>
                <TableCell className="text-muted-foreground">Run <code className="bg-muted px-1 rounded text-xs">doctor --project &lt;key&gt;</code> for a full diagnosis</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">Still stuck</TableCell>
                <TableCell className="text-muted-foreground">Contact your admin</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>npm / Node not recognized</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            If you see <em>"npm is not recognized"</em> or <em>"node is not recognized"</em> after setup, Node was
            installed by <strong className="text-foreground">fnm</strong> but the shell has not loaded it yet.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Fix — close and reopen PowerShell.</strong> fnm sets itself up in your
            profile, but changes only take effect in a new session. After reopening:
          </p>
          <CodeBlock code={`node --version\nnpm --version`} />
          <p className="text-sm text-muted-foreground">Both should print a version number. If they still fail:</p>
          <CodeBlock code="fnm use --lts" />
          <p className="text-sm text-muted-foreground">
            If <code className="bg-muted px-1 rounded text-xs">fnm</code> itself is not found, close PowerShell completely,
            reopen it, and try again. If the problem persists, contact your admin.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>dotnet not recognized</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            If you see <em>"dotnet is not recognized"</em> after setup, the .NET SDK was installed but your PATH
            has not been updated in the current session.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Fix — close and reopen PowerShell.</strong> After reopening:
          </p>
          <CodeBlock code="dotnet --version" />
          <p className="text-sm text-muted-foreground">If it still fails, check that .NET is installed:</p>
          <ol className="space-y-1 text-sm text-muted-foreground list-decimal list-inside">
            <li>Open <strong className="text-foreground">Start &rarr; Apps &rarr; Installed apps</strong> and search for <em>Microsoft .NET</em>.</li>
            <li>If it is listed, restart your machine to force PATH refresh.</li>
            <li>If it is not listed, contact your admin — setup may have failed during the install step.</li>
          </ol>
        </CardContent>
      </Card>

      <div className="rounded-lg border-l-4 border-green-500 bg-green-50 dark:bg-green-950/20 p-4 text-sm text-muted-foreground">
        <strong className="text-foreground">You are set up and ready to go.</strong> Run{' '}
        <code className="bg-muted px-1 rounded text-xs">update</code> every morning, use{' '}
        <code className="bg-muted px-1 rounded text-xs">run --local</code> when you work, and create a new branch
        when you start something new. That is all there is to it.
      </div>
    </section>
  )
}
