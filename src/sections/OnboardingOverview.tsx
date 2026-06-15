import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export default function OnboardingOverview() {
  return (
    <section id="overview" className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground mt-1">
          Everything you need to go from zero to running on your first day.
        </p>
      </div>

      <Separator />

      <p className="text-sm text-muted-foreground">
        We use a set of scripts that automate your entire setup. You do not manually install packages,
        clone repos, or configure databases one by one. A single script handles all of it based on
        your assigned role and projects.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Your first day in three steps</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex gap-3 items-start text-sm">
            <span className="shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">1</span>
            <span>Install the required tools on this page</span>
          </div>
          <div className="flex gap-3 items-start text-sm">
            <span className="shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">2</span>
            <span>Receive your <strong>token</strong> from your admin</span>
          </div>
          <div className="flex gap-3 items-start text-sm">
            <span className="shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">3</span>
            <span>Run <code className="bg-muted px-1 rounded text-xs">setup --token "your-token-here"</code> — done</span>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/20 p-4 text-sm text-muted-foreground">
        <strong className="text-foreground">No AWS account needed.</strong> You will never configure
        cloud credentials or touch infrastructure. All of that is handled by your admin on the backend.
      </div>

      <Card>
        <CardHeader>
          <CardTitle>What the scripts do</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Script</TableHead>
                <TableHead>What it does</TableHead>
                <TableHead>When to use it</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><code className="bg-muted px-1 rounded text-xs">setup.ps1</code></TableCell>
                <TableCell className="text-muted-foreground">Clones repos, installs tools, sets up local DB</TableCell>
                <TableCell className="text-muted-foreground">First day only</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="bg-muted px-1 rounded text-xs">run.ps1</code></TableCell>
                <TableCell className="text-muted-foreground">Starts the project locally or against staging</TableCell>
                <TableCell className="text-muted-foreground">Every time you work</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="bg-muted px-1 rounded text-xs">update.ps1</code></TableCell>
                <TableCell className="text-muted-foreground">Pulls latest code, restores packages, runs new migrations</TableCell>
                <TableCell className="text-muted-foreground">Every morning</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="bg-muted px-1 rounded text-xs">doctor.ps1</code></TableCell>
                <TableCell className="text-muted-foreground">Checks if everything is set up correctly</TableCell>
                <TableCell className="text-muted-foreground">When something feels broken</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="bg-muted px-1 rounded text-xs">migrate.ps1</code></TableCell>
                <TableCell className="text-muted-foreground">Creates a migration and verifies it locally</TableCell>
                <TableCell className="text-muted-foreground">When you add or change EF Core entities</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  )
}
