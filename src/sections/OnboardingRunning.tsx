import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import CodeBlock from '@/components/CodeBlock'

export default function OnboardingRunning() {
  return (
    <section id="running-the-project" className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Running the Project</h1>
        <p className="text-muted-foreground mt-1">
          Use <code className="bg-muted px-1 rounded text-xs">run</code> to start the project after setup is complete.
        </p>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Running locally (your default every day)</CardTitle>
        </CardHeader>
        <CardContent>
          <CodeBlock code={`# Starts the project using your local database and appsettings.local.json\nrun --local\n\n# Or just run with no flags — it will show you a menu\nrun`} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Running against staging</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <CodeBlock code={`# Fetches staging config from the server and starts the project against staging\nrun --staging`} />
          <div className="rounded-lg border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/20 p-4 text-sm text-muted-foreground">
            <strong className="text-foreground">Be careful with staging.</strong> Staging shares a database
            with other developers. Always make sure you know what your code does before pointing it at staging.
            When in doubt, use <code className="bg-muted px-1 rounded text-xs">--local</code>.
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Selecting a project</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            If you have multiple projects, <code className="bg-muted px-1 rounded text-xs">run</code> will show a project
            selection menu automatically. You can skip it by passing the project key:
          </p>
          <CodeBlock code="run --project projectalpha --local" />
          <p className="text-sm text-muted-foreground">
            If you run <code className="bg-muted px-1 rounded text-xs">run</code> from inside a project's repo folder, it
            automatically detects which project it is and skips the project menu entirely.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Running only part of the project</CardTitle>
        </CardHeader>
        <CardContent>
          <CodeBlock code={`# If the project has multiple repos, pick which ones to run:\nrun --local --repos backend\nrun --local --repos backend,mobile`} />
        </CardContent>
      </Card>
    </section>
  )
}
