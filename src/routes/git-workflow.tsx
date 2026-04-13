import { createFileRoute } from '@tanstack/react-router'
import GitWorkflow from '@/pages/GitWorkflow'

export const Route = createFileRoute('/git-workflow')({
  component: GitWorkflow,
})
