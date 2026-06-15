import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import CodeBlock from '@/components/CodeBlock'

export default function OnboardingPostgres() {
  return (
    <section id="install-postgresql" className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Install PostgreSQL</h1>
        <p className="text-muted-foreground mt-1">
          Our projects use PostgreSQL as the local database. Install it before running the setup script.
        </p>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Windows</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
            <li>Go to <code className="bg-muted px-1 rounded text-xs">https://www.postgresql.org/download/windows/</code> and click <em>Download the installer</em>.</li>
            <li>Run the installer. Leave the installation directory as the default.</li>
            <li>On the <em>Select Components</em> screen, make sure <strong className="text-foreground">PostgreSQL Server</strong> and <strong className="text-foreground">Command Line Tools</strong> are checked.</li>
            <li>Leave the data directory as the default.</li>
            <li>When asked for a password, enter: <code className="bg-muted px-1 rounded text-xs">postgres</code></li>
            <li>Leave the port as the default: <code className="bg-muted px-1 rounded text-xs">5432</code></li>
            <li>Leave the locale as the default and click Next through the remaining screens.</li>
            <li>When the installer finishes, uncheck <em>Launch Stack Builder</em> and click Finish.</li>
          </ol>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>macOS</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <CodeBlock code={`brew install postgresql@16\nbrew services start postgresql@16`} />
          <p className="text-sm text-muted-foreground">Then set the postgres user password to match the team default:</p>
          <CodeBlock code={`psql postgres -c "ALTER USER postgres PASSWORD 'postgres';"`} />
        </CardContent>
      </Card>

      <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/20 p-4 text-sm space-y-2">
        <p className="font-medium text-foreground">Default credentials — use these exactly:</p>
        <ul className="space-y-1 text-muted-foreground">
          <li>Host: <code className="bg-muted px-1 rounded text-xs">localhost</code></li>
          <li>Port: <code className="bg-muted px-1 rounded text-xs">5432</code></li>
          <li>Username: <code className="bg-muted px-1 rounded text-xs">postgres</code></li>
          <li>Password: <code className="bg-muted px-1 rounded text-xs">postgres</code></li>
        </ul>
        <p className="text-muted-foreground">
          These are the credentials the setup script expects by default. If you already have PostgreSQL installed
          with different credentials, pass them directly to <code className="bg-muted px-1 rounded text-xs">setup</code> — see the flags in Section 3.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Default local connection string</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            After setup, your local database connection string will be in{' '}
            <code className="bg-muted px-1 rounded text-xs">appsettings.local.json</code> inside your backend repo folder:
          </p>
          <CodeBlock code={`{\n  "ConnectionStrings": {\n    "DefaultConnection": "Server=localhost;Port=5432;UserId=postgres;Password=postgres;Database=projectname_local"\n  }\n}`} />
          <p className="text-sm text-muted-foreground">
            This file is <strong className="text-foreground">gitignored</strong> — it is on your machine only and will never be committed. You can edit it freely.
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
