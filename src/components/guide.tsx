import type { ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export function Code({ children }: { children: ReactNode }) {
  return <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">{children}</code>
}

export function GuideSection({
  id,
  title,
  intro,
  children,
}: {
  id: string
  title: string
  intro: string
  children: ReactNode
}) {
  return (
    <section id={id} className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground mt-1">{intro}</p>
      </div>
      <Separator />
      {children}
    </section>
  )
}

export function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-muted-foreground">{children}</CardContent>
    </Card>
  )
}

const TONES = {
  info: 'border-blue-500 bg-blue-50 dark:bg-blue-950/20',
  warn: 'border-amber-500 bg-amber-50 dark:bg-amber-950/20',
} as const

export function Callout({
  tone = 'info',
  title,
  children,
}: {
  tone?: keyof typeof TONES
  title?: string
  children: ReactNode
}) {
  return (
    <div className={`rounded-lg border-l-4 p-4 text-sm text-muted-foreground ${TONES[tone]}`}>
      {title && <strong className="text-foreground">{title} </strong>}
      {children}
    </div>
  )
}

/** First column renders as code. Other columns render as given. */
export function DataTable({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {head.map(h => (
            <TableHead key={h}>{h}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, i) => (
          <TableRow key={i}>
            {row.map((cell, j) => (
              <TableCell key={j} className={j === 0 ? '' : 'whitespace-normal'}>
                {j === 0 && typeof cell === 'string' ? <Code>{cell}</Code> : cell}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
