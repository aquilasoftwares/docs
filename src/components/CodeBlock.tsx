import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CodeBlockProps {
  code: string
  language?: string
  className?: string
}

export default function CodeBlock({ code, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn('relative group rounded-md bg-muted', className)}>
      <Button
        variant="ghost"
        size="icon"
        aria-label="copy"
        onClick={handleCopy}
        className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
      <pre className="overflow-x-auto p-4 text-sm font-mono">
        <code>{code}</code>
      </pre>
    </div>
  )
}
