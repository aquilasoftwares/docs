import CodeBlock from '@/components/CodeBlock'
import { Block, Callout, Code, DataTable, GuideSection } from '@/components/guide'

export default function GatewayAdminGuide() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-16 scroll-smooth">
      <GuideSection
        id="admin-overview"
        title="Admin Guide"
        intro="Running the Aquila Payment Gateway (AQPay): clients, payment routes, monitoring, billing and support."
      >
        <Block title="Access">
          <DataTable
            head={['Role', 'Can use']}
            rows={[
              ['Admin', 'All admin endpoints and the admin web app'],
              ['SuperAdmin', 'Same as Admin'],
              ['Client', 'Merchant portal only. Admin endpoints return 403'],
            ]}
          />
          <p>
            Admin endpoints live under <Code>/api/v1/admin/...</Code> and need a JWT from{' '}
            <Code>POST /api/v1/account/login</Code>. Every admin action is attributed to your username in the logs.
          </p>
        </Block>

        <Block title="Admin web app pages">
          <DataTable
            head={['Page', 'Path', 'Use it to']}
            rows={[
              ['Dashboard', '/admin', 'Volume and fee totals over time'],
              ['Clients', '/admin/clients', 'Create clients, API keys, payment config, checkout branding'],
              ['Transactions', '/admin/transactions', 'Search all transactions, cancel, replay callbacks'],
              ['Disbursements', '/admin/disbursements', 'See all client payouts'],
              ['Payment routes', '/admin/payment-routes', 'Choose the provider per method, switch a method on or off'],
              ['Reports', '/admin/reports', 'Billing cycle reports, mark as paid'],
              ['API keys', '/admin/api-keys', 'All keys across clients, revoke'],
              ['Callback logs', '/admin/callback-logs', 'Every merchant callback attempt'],
              ['Settings', '/admin/settings', 'Your account and password'],
            ]}
          />
        </Block>
      </GuideSection>

      <GuideSection
        id="admin-onboarding-client"
        title="Onboarding a Client"
        intro="From nothing to a merchant that can take its first payment."
      >
        <Block title="Steps">
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <strong className="text-foreground">Create the client.</strong>
              <CodeBlock
                className="mt-2"
                code={`POST /api/v1/admin/clients
{ "name": "Mabini Coffee Roasters", "email": "owner@mabini.example", "callbackUrl": "https://mabini.example/webhooks/payment" }`}
              />
            </li>
            <li>
              <strong className="text-foreground">Create an API key</strong> for the client:{' '}
              <Code>POST /api/v1/admin/clients/{'{id}'}/apikeys</Code>.
            </li>
            <li>
              <strong className="text-foreground">Set the payment config</strong> (redirect URLs, fee percentage,
              callback URL) on the key or on the client.
            </li>
            <li>
              <strong className="text-foreground">Set checkout branding</strong> if the client takes cards (below).
            </li>
            <li>Give the client its portal login, the API key and the webhook secret, then point them at the Client Integration Guide.</li>
          </ol>
        </Block>

        <Callout tone="warn" title="The API key and webhook secret are shown once.">
          They are only in the creation response. Hand them to the client over a private channel straight away. If
          either is lost or leaked, revoke the key (<Code>DELETE /api/v1/admin/clients/{'{id}'}/apikeys/{'{apiKeyId}'}</Code>)
          and create a new one. Revoking is how you cut off a client.
        </Callout>

        <Block title="Payment config levels">
          <p>The most specific config wins. Settings not set at one level fall to the next.</p>
          <DataTable
            head={['Level', 'Endpoint']}
            rows={[
              ['API key', 'GET / PUT / DELETE /api/v1/admin/clients/{id}/apikeys/{apiKeyId}/payment-config'],
              ['Client', 'GET / PUT / DELETE /api/v1/admin/clients/{id}/payment-configs/config'],
              ['Gateway default', 'Application settings, not editable here'],
            ]}
          />
        </Block>

        <Block title="Checkout branding (card payments)">
          <p>Set on the client payment config. All optional, all shown publicly on the card checkout page.</p>
          <DataTable
            head={['Field', 'Rule']}
            rows={[
              ['checkoutBaseUrl', 'https origin only, no path, query or credentials. Overrides the gateway default. API key value beats client value'],
              ['logoUrl', 'https URL, no credentials or fragment, up to 2048 characters'],
              ['supportEmail', 'Plain ASCII, up to 254 characters, none of ? & # % < > , ;'],
              ['supportPhone', 'Starts with a digit or +, digits spaces ( ) - only, at least 5 digits, up to 32 characters'],
            ]}
          />
          <p>An invalid value returns <Code>400</Code>. An empty or omitted value clears the field.</p>
          <Callout tone="warn" title="Custom checkout domain.">
            A <Code>checkoutBaseUrl</Code> other than the gateway default must also be added to{' '}
            <Code>Cors:AllowedOrigins</Code> and be served by the checkout page, otherwise the checkout link it builds
            will not work. Deleting the client payment config removes the redirect URLs, base URL, logo and support
            details together.
          </Callout>
        </Block>
      </GuideSection>

      <GuideSection
        id="admin-payment-routes"
        title="Payment Routes"
        intro="Which provider serves each payment method, and whether the method is on."
      >
        <CodeBlock
          code={`GET /api/v1/admin/paymentroutes                       list: paymentMethod, provider, isEnabled, allowedProviders
PUT /api/v1/admin/paymentroutes/{method}               { "provider": "Xendit" }
PUT /api/v1/admin/paymentroutes/{method}/status        { "isEnabled": false }`}
        />

        <Block title="Switch a provider">
          <p>
            The provider must be in the route's <Code>allowedProviders</Code>, otherwise the call returns{' '}
            <Code>400</Code> (<Code>Provider 'X' cannot serve payment method 'Y'.</Code>). New transactions use the new
            provider straight away. Existing transactions stay with the provider that created them.
          </p>
        </Block>

        <Block title="Switch a method on or off">
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <Code>isEnabled</Code> is required. Sending nothing returns <Code>400</Code>. An unknown method returns{' '}
              <Code>400</Code>, a method with no route row returns <Code>404</Code>.
            </li>
            <li>
              While a method is off, creating a transaction for it returns <Code>503</Code> with{' '}
              <Code>Payment method '...' is temporarily unavailable.</Code>
            </li>
            <li>
              Only creating a transaction is blocked. Transactions already created, their provider webhooks, callbacks
              and refunds carry on as normal.
            </li>
            <li>Setting the value it already has does nothing and succeeds.</li>
            <li>Each change is logged with your username.</li>
          </ul>
          <Callout title="Use it during a provider outage.">
            Turn the method off, tell affected clients, turn it back on when the provider recovers. Clients should
            already handle the <Code>503</Code> by offering another method.
          </Callout>
        </Block>
      </GuideSection>

      <GuideSection
        id="admin-transactions"
        title="Monitoring Transactions"
        intro="Search, report on and act on every client's transactions."
      >
        <Block title="Endpoints">
          <DataTable
            head={['Endpoint', 'Use']}
            rows={[
              ['GET /admin/transactions', 'Filter by status, clientId, apiKeyId, from, to, search'],
              ['GET /admin/transactions/totals', 'Count, amount, net, processing fee, provider fee, platform fee'],
              ['GET /admin/transactions/time-series', 'Daily, Weekly or Monthly points for charts'],
              ['POST /admin/transactions/{ref}/cancel', 'Cancel a Pending or Authorized transaction at the provider'],
              ['POST /admin/transactions/{ref}/retry-callback', 'Re-send the merchant callback'],
              ['GET /admin/transactions/callback-logs', 'Every callback attempt, filter by acknowledged'],
              ['GET /api/v1/admin/billing', 'Billing time series'],
            ]}
          />
          <p>All paths are under <Code>/api/v1</Code>.</p>
        </Block>

        <Block title="How the fees add up">
          <DataTable
            head={['Field', 'Meaning']}
            rows={[
              ['totalProcessingFee', 'What the client pays: amount x fee percent'],
              ['totalProviderFee', 'What Xendit or MPay charges AQPay'],
              ['totalPlatformFee', 'Your revenue: processing fee minus provider fee'],
            ]}
          />
        </Block>

        <Callout title="Capture is not used.">
          <Code>POST .../capture</Code> exists for manual capture, but card payments are captured automatically and
          manual capture is rejected for cards.
        </Callout>
      </GuideSection>

      <GuideSection
        id="admin-provider-webhooks"
        title="Provider Webhooks"
        intro="The provider-side setup that makes payment status reach the gateway."
      >
        <DataTable
          head={['Provider', 'Endpoint', 'Auth']}
          rows={[
            ['Xendit (payment requests, card sessions, refunds)', 'POST /api/v1/webhooks/xendit', 'x-callback-token must match the configured WebhookToken'],
            ['Xendit refunds (optional dedicated URL)', 'POST /api/v1/webhooks/xendit/refund', 'Same token'],
            ['MPay', 'POST /api/v1/webhooks/mpay', 'Signature in the body'],
          ]}
        />

        <Block title="Rules that matter">
          <ul className="list-disc pl-5 space-y-1">
            <li>
              In the Xendit dashboard set the payment request webhook, the <Code>payment_session</Code> webhook and the{' '}
              <Code>refund.succeeded</Code> event to the URL above.
            </li>
            <li>
              Xendit keeps <strong className="text-foreground">one session-webhook URL per account</strong>. Do not
              point it here while another application still depends on it.
            </li>
            <li>
              A missing or wrong token returns <Code>400</Code>. A token that is not configured on the server returns{' '}
              <Code>503</Code>. Bodies over 64 KB return <Code>413</Code>.
            </li>
            <li>
              The webhook is only a trigger. The gateway re-reads the payment or session from Xendit and applies
              Xendit's answer, so a forged or reordered webhook cannot credit a payment.
            </li>
            <li>
              A <Code>503</Code> from the gateway is deliberate: Xendit could not confirm the event, so Xendit retries.
              After repeated failures the event is dead-lettered.
            </li>
          </ul>
        </Block>

        <Block title="Replay dead-lettered events">
          <CodeBlock code={`POST /api/v1/admin/webhookevents/requeue-dead-lettered`} />
          <p>
            Puts dead-lettered provider events back in the queue and returns how many it queued. Use it after fixing
            the cause, for example an expired Xendit key or a provider outage.
          </p>
        </Block>
      </GuideSection>

      <GuideSection
        id="admin-reports-payouts"
        title="Reports, Payouts and Reconciliation"
        intro="Billing cycles, client payouts and ledger checks."
      >
        <Block title="Billing reports">
          <CodeBlock
            code={`POST  /api/v1/admin/reports            capture all Completed transactions not yet reported
GET   /api/v1/admin/reports            list
GET   /api/v1/admin/reports/{id}       report and its transactions
PATCH /api/v1/admin/reports/{id}/pay   mark as paid`}
          />
          <p>
            Creating a report snapshots every completed transaction that is not already in a report. Marking it paid
            locks those transactions out of future reports, so mark paid only after the money is settled.
          </p>
        </Block>

        <Block title="Disbursements">
          <p>
            <Code>GET /api/v1/admin/disbursements</Code> lists payouts across all clients. Clients create payouts
            themselves with their API key. A payout is blocked while the client's available balance is below the
            amount.
          </p>
        </Block>

        <Block title="Ledger drift check">
          <CodeBlock code={`GET /api/v1/admin/reconciliation/drift`} />
          <p>
            Compares stored balances with the ledger entries. Any drift is a data problem to investigate before more
            payouts go out.
          </p>
        </Block>
      </GuideSection>

      <GuideSection
        id="admin-runbook"
        title="Support Runbook"
        intro="What to do when a payment does not behave."
      >
        <DataTable
          head={['Symptom', 'Likely cause', 'Do this']}
          rows={[
            ['failureCode PAYMENT_MISMATCH', 'Customer paid a different amount or currency', 'Not credited. Check with the provider, then refund or settle by hand'],
            ['failureCode PAID_AFTER_TERMINAL', 'Customer paid after cancel, fail or refund', 'Not credited. Refund the customer or settle by hand'],
            ['failureCode REFUND_MISMATCH', 'Partial or currency-mismatched Xendit refund', 'Not auto-debited. Adjust the balance by hand after review'],
            ['Client says callback not received', 'Their endpoint is down, wrong URL, or no webhook secret on the key', 'Check Callback logs, fix the cause, then retry-callback'],
            ['Transaction stuck Pending', 'Provider webhook missed', 'Card sessions are polled as a fallback. Otherwise requeue dead-lettered events and check the provider dashboard'],
            ['Client gets 503 on create', 'The method is switched off, or the provider is down', 'Check Payment routes, switch the method back on or change provider'],
            ['Checkout link broken on a client domain', 'Custom checkoutBaseUrl not in CORS or not served', 'Add the origin to Cors:AllowedOrigins and serve the checkout page there'],
            ['Client lost its API key', 'Shown once only', 'Revoke it and create a new one'],
          ]}
        />

        <Block title="Before you escalate">
          <p>
            Collect the <Code>transactionReference</Code>, the <Code>requestId</Code> from the error and the callback
            log entries. Those three find almost any case in the logs.
          </p>
        </Block>
      </GuideSection>
    </div>
  )
}
