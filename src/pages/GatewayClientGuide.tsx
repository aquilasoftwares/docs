import CodeBlock from '@/components/CodeBlock'
import { Block, Callout, Code, DataTable, GuideSection } from '@/components/guide'

export default function GatewayClientGuide() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-16 scroll-smooth">
      <GuideSection
        id="client-overview"
        title="Client Integration Guide"
        intro="How a merchant application takes payments through the Aquila Payment Gateway (AQPay)."
      >
        <Block title="The flow">
          <CodeBlock
            code={`1. Your server  POST /api/v1/transactions            (x-api-key + Idempotency-Key)
2. Gateway      returns transactionReference + checkoutUrl
3. Your server  redirects the customer to checkoutUrl
4. Customer     pays on the hosted page
5. Gateway      POSTs a signed callback to your callback URL
6. Your server  verifies the signature, then fulfils the order`}
          />
          <p>
            The browser redirect back to your site is <strong className="text-foreground">not proof of payment</strong>.
            Only the signed callback, or a <Code>GET</Code> on the transaction, is.
          </p>
        </Block>

        <Block title="Basics">
          <DataTable
            head={['Item', 'Value']}
            rows={[
              ['Base URL', <Code key="b">/api/v1</Code>],
              ['Server calls', <span key="s">API key in the <Code>x-api-key</Code> header</span>],
              ['Portal (browser) calls', <span key="p">JWT from <Code>POST /api/v1/account/login</Code>, role <Code>Client</Code></span>],
              ['Amounts', 'Decimal, in the currency given (use PHP)'],
            ]}
          />
          <p>Every response uses one envelope:</p>
          <CodeBlock
            code={`{ "success": true,  "data": { ... }, "requestId": "...", "errors": null }
{ "success": false, "data": null,    "requestId": "...", "errors": [{ "code": "VALIDATION_ERROR", "message": "..." }] }`}
          />
          <p>Quote the <Code>requestId</Code> when you contact support.</p>
        </Block>
      </GuideSection>

      <GuideSection
        id="client-getting-started"
        title="Getting Started"
        intro="What you need before the first transaction."
      >
        <Block title="What your Aquila admin sets up for you">
          <ul className="list-disc pl-5 space-y-1">
            <li>A client account and a portal login (email and password).</li>
            <li>An API key, created for you or by you in the portal under API Keys.</li>
            <li>
              Your <strong className="text-foreground">callback URL</strong> and redirect URLs (success and cancel).
            </li>
            <li>Which payment methods are enabled for the gateway.</li>
          </ul>
        </Block>

        <Callout tone="warn" title="Store both secrets immediately.">
          The raw API key and the webhook secret are shown once, when the key is created. They cannot be read back
          later. If you lose one, revoke the key and create a new one. Keep both on your server only, never in a
          browser or mobile app.
        </Callout>

        <Block title="Log in to the portal">
          <CodeBlock
            code={`POST /api/v1/account/login
{ "email": "you@merchant.com", "password": "..." }`}
          />
          <p>
            The response carries <Code>authorization.token</Code>. Send it as <Code>Authorization: Bearer &lt;token&gt;</Code>
            on portal calls. The portal web app does this for you.
          </p>
        </Block>

        <Block title="Config resolution">
          <p>Redirect URLs, callback URL and fee percentage resolve in this order, first match wins:</p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>The API key's own payment config</li>
            <li>Your client's payment config</li>
            <li>The gateway default</li>
          </ol>
        </Block>
      </GuideSection>

      <GuideSection
        id="client-create-transaction"
        title="Create a Transaction"
        intro="Start a payment and get a URL to send the customer to."
      >
        <CodeBlock
          code={`POST /api/v1/transactions
x-api-key: <your_api_key>
Idempotency-Key: <unique value per order>
Content-Type: application/json

{
  "amount": 100.00,
  "currency": "PHP",
  "description": "Order #1234",
  "payMethod": "PH_GCASH_URL",
  "customer": {
    "firstName": "Juan",
    "lastName": "dela Cruz",
    "email": "juan@example.com",
    "phone": "+639171234567"
  },
  "items": [{ "name": "Product A", "quantity": 2, "totalAmount": 100.00 }]
}`}
        />

        <DataTable
          head={['Field', 'Required', 'Notes']}
          rows={[
            ['amount', 'Yes', 'Decimal'],
            ['currency', 'Yes', 'ISO 4217, for example PHP'],
            ['payMethod', 'Yes', 'See the table below'],
            ['description', 'No', 'Shown to the customer on card checkout'],
            ['captureMethod', 'No', 'AUTOMATIC (default). MANUAL is rejected with 400 for cards'],
            ['customer', 'No', 'phone in E.164 format'],
            ['items[]', 'No', 'name, quantity and totalAmount are all required per item'],
          ]}
        />

        <Block title="Payment methods">
          <DataTable
            head={['payMethod', 'Customer sees', 'Provider']}
            rows={[
              ['PH_GCASH_URL', 'GCash', 'Xendit'],
              ['MAYA', 'Maya', 'Xendit'],
              ['RCBC', 'RCBC direct debit', 'Xendit'],
              ['PH_QRPH_DYNAMIC', 'QR Ph', 'MPay'],
              ['CARD', 'AQPay hosted card page', 'Xendit'],
            ]}
          />
          <Callout tone="warn" title="A method can be switched off.">
            An admin can disable a payment method. Creating a transaction for it returns{' '}
            <Code>503</Code> with <Code>Payment method '...' is temporarily unavailable.</Code> Nothing is created
            and nothing is charged. Do not retry in a tight loop: show the customer another method, or try again
            later.
          </Callout>
        </Block>

        <Block title="Idempotency-Key">
          <p>
            Required, max 100 characters, one per order (a UUID works). If a request times out, retry with the{' '}
            <strong className="text-foreground">same key and the same body</strong> and you get the original result,
            not a second checkout.
          </p>
          <DataTable
            head={['Result', 'Meaning', 'What to do']}
            rows={[
              ['409 key reused', 'Same key, different amount, currency or description', 'Use a new key for a new order'],
              ['409 in progress', 'The first request is still running', 'Retry with the same key'],
              ['502 outcome unknown', 'The provider outcome is unknown, the payment may exist', 'Retry with the same key, never a new one'],
            ]}
          />
        </Block>

        <Block title="Response">
          <CodeBlock
            code={`{
  "success": true,
  "data": {
    "transactionReference": "20261001153045123456",
    "amount": 100.00,
    "status": "Pending",
    "checkoutId": "pr_abc123",
    "checkoutUrl": "https://checkout.xendit.co/...",
    "processingFee": 2.50,
    "netAmount": 97.50,
    "createdAt": "2026-10-01T15:30:45Z",
    "callbackStatus": "Pending"
  }
}`}
          />
          <p>
            Save <Code>transactionReference</Code> against your order, then redirect the customer to{' '}
            <Code>checkoutUrl</Code>.
          </p>
        </Block>
      </GuideSection>

      <GuideSection
        id="client-card-payments"
        title="Card Payments"
        intro="Cards use AQPay's hosted checkout page, so card data never reaches your server or ours."
      >
        <Block title="Rules">
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Send <Code>payMethod: "CARD"</Code> with no card fields. A request containing{' '}
              <Code>cardDetails</Code> is rejected with <Code>400</Code> and the value is not stored.
            </li>
            <li>
              <Code>checkoutUrl</Code> is <Code>{'{checkout base URL}/checkout/{token}'}</Code>. Redirect the
              customer there.
            </li>
            <li>
              The link expires after <strong className="text-foreground">10 minutes</strong>. Unpaid, the transaction
              becomes <Code>Failed</Code> with <Code>failureCode: SESSION_EXPIRED</Code>.
            </li>
            <li>
              For a card, <Code>checkoutId</Code> is <Code>null</Code> until the payment completes.
            </li>
            <li>Manual capture is not supported. Cards are captured automatically.</li>
          </ul>
        </Block>

        <Callout tone="warn" title="Do not offer a second attempt too early.">
          A customer sent to your cancel or failure URL can still pay on the same link until it expires. Wait for the
          callback before creating a new transaction, or the customer can pay twice.
        </Callout>

        <Block title="Failure codes that need a human">
          <DataTable
            head={['failureCode', 'Meaning', 'Action']}
            rows={[
              ['SESSION_EXPIRED', 'Link expired unpaid', 'Create a new transaction'],
              ['PAID_AFTER_TERMINAL', 'Customer paid after the transaction was cancelled or failed', 'Contact AQPay support, it needs a refund or manual settlement'],
              ['PAYMENT_MISMATCH', 'Amount or currency paid did not match', 'Contact AQPay support, it stays Pending until resolved'],
            ]}
          />
        </Block>
      </GuideSection>

      <GuideSection
        id="client-status"
        title="Transaction Status"
        intro="Read the current state of a payment."
      >
        <CodeBlock
          code={`GET /api/v1/transactions/{transactionReference}      one transaction with items and fees
GET /api/v1/transactions?pageNumber=1&pageSize=20     your transactions, newest first`}
        />
        <DataTable
          head={['Status', 'Meaning', 'Final']}
          rows={[
            ['Pending', 'Created, waiting for the customer', 'No'],
            ['Processing', 'Payment in progress', 'No'],
            ['Authorized', 'Authorized, waiting for capture', 'No'],
            ['Completed', 'Paid. Fulfil the order', 'Yes'],
            ['Failed', 'Payment failed', 'Yes'],
            ['Cancelled', 'Cancelled before completion', 'Yes'],
            ['Overdue', 'Expired without payment', 'Yes'],
            ['Refunded', 'Payment refunded', 'Yes'],
          ]}
        />
        <Callout title="Polling is a fallback.">
          Use the callback as the main signal. Poll <Code>GET</Code> only when a callback is late or after the customer
          returns to your site.
        </Callout>
      </GuideSection>

      <GuideSection
        id="client-callbacks"
        title="Callbacks (Webhooks)"
        intro="Signed notifications the gateway sends to your server when a transaction changes status."
      >
        <Block title="Delivery">
          <ul className="list-disc pl-5 space-y-1">
            <li>
              The gateway <Code>POST</Code>s JSON to your API key's callback URL. Answer with any{' '}
              <Code>2xx</Code> quickly, then do your work.
            </li>
            <li>
              A non-2xx answer or timeout is retried in the background, up to <strong className="text-foreground">8 times</strong>,
              waiting 2, 4, 8, ... minutes.
            </li>
            <li>No callback is sent unless the API key has a webhook secret.</li>
          </ul>
          <CodeBlock
            code={`{
  "eventId": "20261001153045123456:Completed",
  "transactionReference": "20261001153045123456",
  "status": "Completed",
  "amount": 100.00,
  "currency": "PHP",
  "paymentProvider": "Xendit",
  "processedAt": "2026-10-01T15:31:00Z"
}`}
          />
        </Block>

        <Block title="Headers">
          <DataTable
            head={['Header', 'Value']}
            rows={[
              ['X-Webhook-Timestamp', 'Unix seconds when the request was signed'],
              ['X-Webhook-Signature-V2', 't=<timestamp>,sha256=<hex>'],
              ['X-Webhook-Signature', 'sha256=<hex>, legacy, body only. Do not use for new integrations'],
            ]}
          />
        </Block>

        <Block title="Verify the signature (V2)">
          <p>
            Compute <Code>HMAC-SHA256(webhookSecret, timestamp + "." + rawBody)</Code> as lowercase hex and compare it
            in constant time with the <Code>sha256</Code> value. Reject timestamps more than a few minutes old.
          </p>
          <CodeBlock
            code={`import crypto from 'node:crypto'

// rawBody must be the exact bytes received, not JSON.stringify(req.body)
export function verify(rawBody, header, secret, maxAgeSec = 300) {
  const parts = Object.fromEntries(header.split(',').map(p => p.split('=')))
  const age = Math.abs(Date.now() / 1000 - Number(parts.t))
  if (!(age <= maxAgeSec)) return false

  const expected = crypto
    .createHmac('sha256', secret)
    .update(parts.t + '.' + rawBody)
    .digest('hex')

  const a = Buffer.from(expected)
  const b = Buffer.from(parts.sha256 ?? '')
  return a.length === b.length && crypto.timingSafeEqual(a, b)
}`}
          />
        </Block>

        <Callout tone="warn" title="Deduplicate on eventId.">
          A retry carries the same <Code>eventId</Code> (<Code>{'<transactionReference>:<status>'}</Code>). Store the
          ids you processed and ignore repeats, otherwise a retry can fulfil an order twice.
        </Callout>

        <Block title="Inspect and replay">
          <CodeBlock
            code={`GET  /api/v1/transactions/{ref}/callbacks         delivery attempts: status code, body, error
POST /api/v1/transactions/{ref}/retry-callback    send it again now`}
          />
          <p>Also visible in the portal under the transaction.</p>
        </Block>
      </GuideSection>

      <GuideSection
        id="client-payouts"
        title="Payouts and Balance"
        intro="Completed payments credit your balance. You can pay out to a bank account."
      >
        <Block title="Balance">
          <p>
            Each completed transaction credits its net amount (amount minus processing fee). A refund debits what was
            credited. The balance can go negative after a refund, and payouts are blocked while the available balance
            is below the payout amount. See Balance and Payouts in the portal.
          </p>
        </Block>

        <Block title="Create a payout (API key)">
          <CodeBlock
            code={`POST /api/v1/disbursements
x-api-key: <your_api_key>
Idempotency-Key: <unique value per payout>

{
  "amount": 1500.00,
  "currency": "PHP",
  "bankCode": "BDO",
  "accountHolderName": "Juan dela Cruz",
  "accountNumber": "1234567890",
  "description": "Weekly payout"
}`}
          />
          <p>
            The response has <Code>disbursementReference</Code> and <Code>status</Code>. The final result arrives by
            callback. Reuse the same <Code>Idempotency-Key</Code> when retrying a timed out call. The{' '}
            <Code>bankCode</Code> values accepted are set by the payment provider, confirm them with your admin.
          </p>
        </Block>
      </GuideSection>

      <GuideSection
        id="client-portal"
        title="Using the Merchant Portal"
        intro="The web portal for clients (role Client). It shows only your own data."
      >
        <DataTable
          head={['Page', 'Use it to']}
          rows={[
            ['Overview', 'See volume and totals over time (daily, weekly, monthly)'],
            ['Transactions', 'Search and filter by status and date, open a transaction, replay a callback'],
            ['Balance', 'See your balance and its ledger entries'],
            ['Payouts', 'See payout history and status'],
            ['Reports', 'See billing reports and whether they are paid'],
            ['Account', 'Manage API keys, callback URL, redirect URLs, change password'],
          ]}
        />
        <Callout title="Resetting redirect URLs">
          Resetting your redirect URLs clears only the redirect URLs. Your checkout page branding and support details
          are set by an admin and are not touched.
        </Callout>
      </GuideSection>

      <GuideSection
        id="client-go-live"
        title="Errors and Go-Live Checklist"
        intro="Handle these before you take real money."
      >
        <DataTable
          head={['HTTP', 'Code', 'Meaning']}
          rows={[
            ['400', 'VALIDATION_ERROR', 'A field failed validation. Fix the request'],
            ['401', 'UNAUTHORIZED', 'Missing or invalid API key or token'],
            ['403', 'FORBIDDEN', 'Your role cannot use this endpoint'],
            ['404', 'NOT_FOUND', 'Unknown transaction reference'],
            ['409', 'CONFLICT', 'Idempotency conflict or state violation'],
            ['502 / 503', 'PROVIDER_ERROR', 'Provider problem, or method disabled. Retry later or use another method'],
          ]}
        />

        <Block title="Checklist">
          <ul className="list-disc pl-5 space-y-1">
            <li>API key and webhook secret stored server side, not in source control.</li>
            <li>Every create call sends a fresh <Code>Idempotency-Key</Code> per order.</li>
            <li>Callback endpoint verifies the V2 signature on the raw body and checks the timestamp.</li>
            <li>Callback handler deduplicates on <Code>eventId</Code> and answers 2xx fast.</li>
            <li>Orders are fulfilled only on <Code>Completed</Code>, never on the browser redirect.</li>
            <li>Card flow: no second attempt until the callback or link expiry.</li>
            <li>You handle <Code>503</Code> for a disabled method by offering another method.</li>
            <li>A test transaction ran end to end on staging with a real callback received.</li>
          </ul>
        </Block>
      </GuideSection>
    </div>
  )
}
