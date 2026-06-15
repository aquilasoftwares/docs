import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import CodeBlock from '@/components/CodeBlock'

const steps = [
  {
    title: 'Creates the migration',
    desc: 'Runs dotnet ef migrations add <name> inside your backend repo.',
  },
  {
    title: 'Applies it (Up)',
    desc: 'Runs the migration against your local database to verify it applies cleanly.',
  },
  {
    title: 'Rolls it back (Down)',
    desc: 'Rolls the migration back to verify the Down method works correctly.',
  },
  {
    title: 'Re-applies it (Up again)',
    desc: 'Applies the migration a second time, leaving your local database in the correct final state.',
  },
]

export default function OnboardingMigrations() {
  return (
    <section id="migrations" className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Running Migrations</h1>
        <p className="text-muted-foreground mt-1">
          Use <code className="bg-muted px-1 rounded text-xs">migrate</code> whenever you add, remove, or change an EF Core entity.
        </p>
      </div>

      <Separator />

      <p className="text-sm text-muted-foreground">
        The script handles the full cycle — it creates the migration, applies it, rolls it back, and applies it
        again to confirm it is clean in both directions.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Basic usage</CardTitle>
        </CardHeader>
        <CardContent>
          <CodeBlock code={`# Create a migration named "AddUserProfileTable"\nmigrate --project projectalpha --name "AddUserProfileTable"\n\n# If you only have one project assigned, you can omit --project\nmigrate --name "AddUserProfileTable"`} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What the script does</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
          <p className="text-sm text-muted-foreground">
            If any step fails, the script stops immediately and tells you what went wrong. The migration file will
            still be on disk — you can inspect and fix it, then run{' '}
            <code className="bg-muted px-1 rounded text-xs">migrate</code> again.
          </p>
          <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/20 p-4 text-sm text-muted-foreground">
            <strong className="text-foreground">Your local database stays in the correct state.</strong> Even if the
            Down step fails, the script never leaves your database in a half-applied state without telling you.
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Migration naming</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">Use PascalCase and describe what the migration does — not when it happened:</p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Good</TableHead>
                <TableHead>Avoid</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><code className="bg-muted px-1 rounded text-xs">AddUserProfileTable</code></TableCell>
                <TableCell><code className="bg-muted px-1 rounded text-xs">Migration1</code></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="bg-muted px-1 rounded text-xs">AddIndexToOrdersCreatedAt</code></TableCell>
                <TableCell><code className="bg-muted px-1 rounded text-xs">Update</code></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="bg-muted px-1 rounded text-xs">RenameEmailToEmailAddress</code></TableCell>
                <TableCell><code className="bg-muted px-1 rounded text-xs">June2025Changes</code></TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="rounded-lg border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/20 p-4 text-sm text-muted-foreground">
            <strong className="text-foreground">Never create migrations manually</strong> with{' '}
            <code className="bg-muted px-1 rounded text-xs">dotnet ef</code> directly. Always go through{' '}
            <code className="bg-muted px-1 rounded text-xs">migrate</code> — it ensures the Up/Down cycle is verified before you commit.
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
