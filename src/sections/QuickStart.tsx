import { AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import CodeBlock from '@/components/CodeBlock'

export default function QuickStart() {
  return (
    <section id="quick-start" className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Quick Start</h1>
        <p className="text-muted-foreground mt-1">
          The essential workflow for every contribution.
        </p>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>5-Step Workflow</CardTitle>
        </CardHeader>
        <CardContent>
          <CodeBlock
            code={`1. Branch from main       →  git checkout -b feature/my-feature
2. Make changes & commit  →  git commit -m "✨ feat: add feature"
3. Push to remote         →  git push origin feature/my-feature
4. Create PR to staging   →  Review & merge via GitHub/GitLab
5. After testing          →  Merge staging → main`}
          />
        </CardContent>
      </Card>

      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Critical Rules
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3">
            <Badge variant="destructive" className="shrink-0">Never</Badge>
            <span className="text-sm">
              commit directly to <code className="bg-muted px-1 rounded text-xs">main</code> or{' '}
              <code className="bg-muted px-1 rounded text-xs">staging</code>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="shrink-0">Always</Badge>
            <span className="text-sm">branch from an updated <code className="bg-muted px-1 rounded text-xs">main</code></span>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="shrink-0">Always</Badge>
            <span className="text-sm">use Gitmoji + Conventional Commits</span>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="shrink-0">Always</Badge>
            <span className="text-sm">get PR approval before merging</span>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
