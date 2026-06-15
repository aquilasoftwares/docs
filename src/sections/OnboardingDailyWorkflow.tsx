import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import CodeBlock from '@/components/CodeBlock'

export default function OnboardingDailyWorkflow() {
  return (
    <section id="daily-workflow" className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Daily Workflow</h1>
        <p className="text-muted-foreground mt-1">
          What to run every morning and how to start new work.
        </p>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Every morning — pull the latest code</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">Before you start working, sync with the team:</p>
          <CodeBlock code="update --project projectalpha" />
          <p className="text-sm text-muted-foreground">
            This pulls the latest code, restores packages, and runs any new database migrations — all in one command.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Starting a new feature or bug fix</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Use <code className="bg-muted px-1 rounded text-xs">--new-branch</code> to cut a fresh branch from the latest staging:
          </p>
          <CodeBlock code={`update --project projectalpha --new-branch "feature/my-feature-name"\n\n# Use these naming conventions:\n#   feature/descriptive-name     (new functionality)\n#   bugfix/what-you-are-fixing    (bug fixes)`} />
          <p className="text-sm text-muted-foreground">This automatically:</p>
          <ol className="space-y-1 text-sm text-muted-foreground list-decimal list-inside">
            <li>Switches to the latest <code className="bg-muted px-1 rounded text-xs">staging</code> or <code className="bg-muted px-1 rounded text-xs">develop</code> branch</li>
            <li>Pulls the latest code so your branch starts up to date</li>
            <li>Creates and checks out your new branch</li>
          </ol>
          <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/20 p-4 text-sm text-muted-foreground">
            Always use <code className="bg-muted px-1 rounded text-xs">--new-branch</code> instead of creating branches manually.
            It ensures you start from the latest code, which avoids merge conflicts before your PR is even opened.
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>The typical day</CardTitle>
        </CardHeader>
        <CardContent>
          <CodeBlock code={`Morning:    update --project alpha                       # pull latest\nStarting:   update --project alpha --new-branch "feature/my-thing"\nWorking:    run --local                                  # run and code\nDone:       git add . ; git commit ; git push            # open a PR`} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>If something feels broken — run the doctor</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <CodeBlock code="doctor --project projectalpha" />
          <p className="text-sm text-muted-foreground">
            The doctor checks everything — tool versions, repo state, database connection, token validity — and gives
            you a color-coded pass/fail list. It does not make any changes.
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
