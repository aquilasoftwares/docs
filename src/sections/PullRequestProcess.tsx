import { Square } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import CodeBlock from '@/components/CodeBlock'

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm">
      <Square className="h-4 w-4 shrink-0 mt-0.5 text-muted-foreground" />
      {children}
    </li>
  )
}

export default function PullRequestProcess() {
  return (
    <section id="pull-request-process" className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pull Request Process</h1>
        <p className="text-muted-foreground mt-1">What to check before opening a PR and how to review one.</p>
      </div>

      <Separator />

      <Card>
        <CardHeader><CardTitle>PR Checklist</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">Before creating a PR, ensure:</p>
          <ul className="space-y-2">
            <CheckItem>Code builds successfully without errors</CheckItem>
            <CheckItem>All tests pass locally</CheckItem>
            <CheckItem>New features include tests</CheckItem>
            <CheckItem>Documentation updated (if needed)</CheckItem>
            <CheckItem>No debug code or console.logs</CheckItem>
            <CheckItem>Branch is up-to-date with target branch</CheckItem>
            <CheckItem>Commit messages follow conventions</CheckItem>
            <CheckItem>PR description explains WHAT and WHY</CheckItem>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>PR Template</CardTitle></CardHeader>
        <CardContent>
          <CodeBlock code={`## Description

Brief description of changes and motivation

## Type of Change

- [ ] Feature
- [ ] Bug fix
- [ ] Refactor
- [ ] Documentation

## Testing

How to test these changes:

1. Step one
2. Step two

## Screenshots (if applicable)

[Add screenshots for UI changes]

## Related Issues

Closes #123`} />
        </CardContent>
      </Card>

      <div className="grid sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle className="text-base">For Authors</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>Keep PRs focused (&lt; 400 lines of code ideally)</li>
              <li>Respond to feedback constructively</li>
              <li>Request re-review after making changes</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">For Reviewers</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>Review within 24–48 hours</li>
              <li>Focus on logic, security, performance</li>
              <li>Approve only if you'd be comfortable deploying it</li>
              <li>Be constructive and specific in feedback</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Review Checklist</CardTitle></CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <CheckItem>Code logic is sound and efficient</CheckItem>
            <CheckItem>No security vulnerabilities introduced</CheckItem>
            <CheckItem>Error handling is appropriate</CheckItem>
            <CheckItem>Tests cover edge cases</CheckItem>
            <CheckItem>Code follows project style guide</CheckItem>
            <CheckItem>No hardcoded credentials or sensitive data</CheckItem>
          </ul>
        </CardContent>
      </Card>
    </section>
  )
}
