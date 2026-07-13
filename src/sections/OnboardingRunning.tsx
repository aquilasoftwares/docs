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
          <CardTitle>Running with a mobile device</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            If your project includes a mobile repo, you need to start your device <strong className="text-foreground">before</strong> running the project.
          </p>

          <div className="space-y-2">
            <p className="text-sm font-medium">Step 1 — Start your device</p>
            <p className="text-sm text-muted-foreground">
              Open <strong className="text-foreground">Android Studio</strong> and launch an emulator from the Device Manager,
              or plug in a real Android device with USB debugging enabled.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium">Step 2 — Set the correct API URL in your mobile <code className="bg-muted px-1 rounded text-xs">.env</code></p>
            <p className="text-sm text-muted-foreground">
              The URL depends on which device you are using. Open the <code className="bg-muted px-1 rounded text-xs">.env</code> file
              inside your mobile repo folder and set it accordingly:
            </p>

            <p className="text-sm font-medium text-foreground">Android Studio emulator:</p>
            <CodeBlock code={`API_URL=http://10.0.2.2:<port>`} />
            <p className="text-sm text-muted-foreground">
              Emulators cannot reach <code className="bg-muted px-1 rounded text-xs">localhost</code> directly.{' '}
              <code className="bg-muted px-1 rounded text-xs">10.0.2.2</code> is the emulator's built-in alias for your machine's localhost.
            </p>

            <p className="text-sm font-medium text-foreground">Real device (USB or same Wi-Fi):</p>
            <CodeBlock code={`API_URL=http://<your-machine-ip>:<port>`} />
            <p className="text-sm text-muted-foreground">
              Your device and machine must be on the same network. Find your machine's local IP:
            </p>
            <CodeBlock code={`# Windows\nipconfig\n# Look for "IPv4 Address" under your active network adapter\n\n# macOS\nifconfig | grep "inet "\n# Look for the 192.168.x.x line`} />
          </div>

          <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/20 p-4 text-sm text-muted-foreground">
            Replace <code className="bg-muted px-1 rounded text-xs">&lt;port&gt;</code> with your backend's local port.
            Check <code className="bg-muted px-1 rounded text-xs">appsettings.local.json</code> in your backend repo for the port number.
          </div>
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
          <CardTitle>Running in hybrid mode</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <CodeBlock code={`# Uses your local database, but fetches the rest of the config from staging\nrun --hybrid`} />
          <p className="text-sm text-muted-foreground">
            Useful when you need to test against staging services (APIs, queues, etc.) but want to keep your
            database isolated. Your local DB won't affect other developers, but everything else behaves like staging.
          </p>
          <div className="rounded-lg border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/20 p-4 text-sm text-muted-foreground">
            <strong className="text-foreground">Still connects to staging services.</strong> Your DB is safe, but
            any side effects that touch staging infrastructure (emails, queues, external calls) will still fire.
            Use with the same caution as <code className="bg-muted px-1 rounded text-xs">--staging</code>.
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
