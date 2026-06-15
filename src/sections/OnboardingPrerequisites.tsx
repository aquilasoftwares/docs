import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import CodeBlock from '@/components/CodeBlock'

export default function OnboardingPrerequisites() {
  return (
    <section id="prerequisites" className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Prerequisites</h1>
        <p className="text-muted-foreground mt-1">
          Install these once before running any scripts. If you already have them, skip ahead.
        </p>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>1. Git</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">The scripts use Git to clone and update repositories.</p>
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Windows:</strong> Download from{' '}
            <code className="bg-muted px-1 rounded text-xs">https://git-scm.com/download/win</code> and run the installer. Accept all defaults.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">macOS:</strong> Git comes pre-installed. Verify by opening Terminal:
          </p>
          <CodeBlock code="git --version" />
          <p className="text-sm text-muted-foreground">After installing, set your name and email:</p>
          <CodeBlock code={`git config --global user.name  "Your Name"\ngit config --global user.email "your@email.com"`} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>2. PowerShell 7.4+</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            All scripts require PowerShell 7.4 or newer. Do not use the built-in Windows PowerShell 5 (the blue one).
          </p>
          <p className="text-sm font-medium">Windows:</p>
          <CodeBlock code={`# Open any terminal and run:\nwinget install --id Microsoft.PowerShell --source winget`} />
          <p className="text-sm text-muted-foreground">
            After installing, open <strong>PowerShell 7</strong> (search in Start menu — it shows the version number).
          </p>
          <p className="text-sm font-medium">macOS:</p>
          <CodeBlock code={`brew install --cask powershell\n# Then use 'pwsh' to start PowerShell`} />
          <p className="text-sm text-muted-foreground">Verify the version:</p>
          <CodeBlock code={`$PSVersionTable.PSVersion\n# Should show Major: 7, Minor: 4 or higher`} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>3. Allow scripts to run (Windows only)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            By default, Windows blocks local PowerShell scripts. Run this once in a PowerShell 7 window opened as Administrator:
          </p>
          <CodeBlock code="Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>4. Install global commands (run once)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Clone the dev scripts repo that your admin shared with you, then run the installer. This registers all
            commands globally so you can use them from any folder — no <code className="bg-muted px-1 rounded text-xs">.\</code>,
            no <code className="bg-muted px-1 rounded text-xs">.ps1</code>.
          </p>
          <CodeBlock code={`# Clone the dev scripts repo (ask your admin for the URL)\ngit clone https://github.com/yourorg/dev-automation-script.git\ncd dev-automation-script\n\n# Run the installer (just this once)\n.\\install.ps1\n\n# Reload your shell to activate\n. $PROFILE`} />
          <p className="text-sm text-muted-foreground">After this, these commands work from anywhere:</p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type this</TableHead>
                <TableHead>Does this</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><code className="bg-muted px-1 rounded text-xs">setup</code></TableCell>
                <TableCell className="text-muted-foreground">First-day project setup</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="bg-muted px-1 rounded text-xs">run</code></TableCell>
                <TableCell className="text-muted-foreground">Start the project</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="bg-muted px-1 rounded text-xs">update</code></TableCell>
                <TableCell className="text-muted-foreground">Pull latest code</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="bg-muted px-1 rounded text-xs">doctor</code></TableCell>
                <TableCell className="text-muted-foreground">Diagnose issues</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="bg-muted px-1 rounded text-xs">migrate</code></TableCell>
                <TableCell className="text-muted-foreground">Create and verify a migration</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="rounded-lg border-l-4 border-green-500 bg-green-50 dark:bg-green-950/20 p-4 text-sm text-muted-foreground">
            Once those four items are done, continue to the next section. The setup script will install
            everything else (.NET, Node, etc.) for you automatically.
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
