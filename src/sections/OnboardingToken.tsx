import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export default function OnboardingToken() {
  return (
    <section id="your-token" className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Your Onboarding Token</h1>
        <p className="text-muted-foreground mt-1">
          Your token tells the scripts who you are, your role, and which projects you have access to.
        </p>
      </div>

      <Separator />

      <p className="text-sm text-muted-foreground">
        Your admin will send you a token string via Teams DM or email. It looks like a long string of
        random characters with a dot in the middle — that is normal. Copy the entire thing.
      </p>

      <div className="rounded-lg border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/20 p-4 text-sm text-muted-foreground">
        <strong className="text-foreground">Keep your token private.</strong> Do not forward it, upload it,
        or share it anywhere. If you lose it or think it was compromised, ask your admin for a new one immediately.
      </div>

      <Card>
        <CardHeader>
          <CardTitle>What you receive from your admin</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Your admin will send you a token string via Teams DM or email. It looks like a long string of
            random characters with a dot in the middle — that is normal. Copy the entire thing.
          </p>
          <p className="text-sm text-muted-foreground">
            Your token is scoped to your role — you will only see and interact with what you need.
          </p>
        </CardContent>
      </Card>

      <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/20 p-4 text-sm text-muted-foreground">
        After you run <code className="bg-muted px-1 rounded text-xs">setup</code> successfully, your token
        is saved automatically. You will never need to paste it again.
      </div>
    </section>
  )
}
