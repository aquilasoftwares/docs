import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import CodeBlock from '@/components/CodeBlock'

const steps = [
  {
    title: 'Validates your token',
    desc: 'Checks your identity, role, and project assignments.',
  },
  {
    title: 'Asks which project to set up',
    desc: 'If you have multiple projects assigned, you will see a menu to pick one. Use arrow keys or type the number. Press Enter to confirm.',
  },
  {
    title: 'Asks which repos to clone',
    desc: 'Projects may have multiple repos (backend, mobile, web admin, etc.). All are selected by default — press Space to deselect any you don\'t need, then Enter.',
  },
  {
    title: 'Installs the correct tool versions',
    desc: 'Installs .NET and Node.js at the exact versions required — never the latest. Skips silently if already installed.',
  },
  {
    title: 'Clones your repos',
    desc: 'Clones backend, mobile, and/or frontend repos to ~/dev/<project>/ on your machine.',
  },
  {
    title: 'Sets up your local database',
    desc: 'Creates the database and runs migrations automatically. Requires PostgreSQL to be installed (Section 1).',
  },
  {
    title: 'Creates appsettings.local.json',
    desc: 'Generates a local config file in your backend folder with safe defaults. This file is gitignored — you can edit it freely.',
  },
  {
    title: 'Saves your token',
    desc: 'Saves your token to ~/.devscripts/token. You will never need to pass --token again.',
  },
]

export default function OnboardingSetup() {
  return (
    <section id="first-day-setup" className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">First-Day Setup</h1>
        <p className="text-muted-foreground mt-1">
          One command sets up everything from repos to local database.
        </p>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Run setup</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Open <strong className="text-foreground">PowerShell 7</strong> from anywhere and run:
          </p>
          <CodeBlock code={`setup --token "paste-the-token-your-admin-sent-you"`} />
          <p className="text-sm text-muted-foreground">That is all you type. The script handles everything from there.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Custom database credentials (optional)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            By default, setup connects to PostgreSQL on <code className="bg-muted px-1 rounded text-xs">localhost:5432</code> with
            username <code className="bg-muted px-1 rounded text-xs">postgres</code> and password{' '}
            <code className="bg-muted px-1 rounded text-xs">postgres</code>. If your local PostgreSQL uses different credentials:
          </p>
          <CodeBlock code={`setup --token "your-token" --db-port 5433 --db-user myuser --db-password mypass`} />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Flag</TableHead>
                <TableHead>Default</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><code className="bg-muted px-1 rounded text-xs">--db-port</code></TableCell>
                <TableCell className="text-muted-foreground"><code className="bg-muted px-1 rounded text-xs">5432</code></TableCell>
                <TableCell className="text-muted-foreground">PostgreSQL port</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="bg-muted px-1 rounded text-xs">--db-user</code></TableCell>
                <TableCell className="text-muted-foreground"><code className="bg-muted px-1 rounded text-xs">postgres</code></TableCell>
                <TableCell className="text-muted-foreground">PostgreSQL username</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="bg-muted px-1 rounded text-xs">--db-password</code></TableCell>
                <TableCell className="text-muted-foreground"><code className="bg-muted px-1 rounded text-xs">postgres</code></TableCell>
                <TableCell className="text-muted-foreground">PostgreSQL password</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/20 p-4 text-sm text-muted-foreground">
            These flags only affect the initial local database setup. If you need to change them later,
            edit the connection string directly in{' '}
            <code className="bg-muted px-1 rounded text-xs">appsettings.local.json</code> inside your backend repo folder.
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What happens during setup</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-4">
                <span className="shrink-0 w-7 h-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                  {i + 1}
                </span>
                <div className="pt-0.5">
                  <p className="text-sm font-medium text-foreground">{step.title}</p>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-lg border-l-4 border-green-500 bg-green-50 dark:bg-green-950/20 p-4 text-sm text-muted-foreground">
            When setup finishes, you will see a summary of what was cloned and where. If anything goes
            wrong, the script will tell you exactly what failed and what to do next.
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
