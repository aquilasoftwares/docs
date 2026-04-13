import QuickStart from '@/sections/QuickStart'
import BranchingStrategy from '@/sections/BranchingStrategy'
import CommitMessageFormat from '@/sections/CommitMessageFormat'
import WorkflowGuidelines from '@/sections/WorkflowGuidelines'
import PullRequestProcess from '@/sections/PullRequestProcess'
import QuickReference from '@/sections/QuickReference'
import Troubleshooting from '@/sections/Troubleshooting'

export default function GitWorkflow() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-16 scroll-smooth">
      <QuickStart />
      <BranchingStrategy />
      <CommitMessageFormat />
      <WorkflowGuidelines />
      <PullRequestProcess />
      <QuickReference />
      <Troubleshooting />
    </div>
  )
}
