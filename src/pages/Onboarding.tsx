import OnboardingOverview from '@/sections/OnboardingOverview'
import OnboardingPrerequisites from '@/sections/OnboardingPrerequisites'
import OnboardingPostgres from '@/sections/OnboardingPostgres'
import OnboardingToken from '@/sections/OnboardingToken'
import OnboardingSetup from '@/sections/OnboardingSetup'
import OnboardingRunning from '@/sections/OnboardingRunning'
import OnboardingDailyWorkflow from '@/sections/OnboardingDailyWorkflow'
import OnboardingMigrations from '@/sections/OnboardingMigrations'
import OnboardingQuickReference from '@/sections/OnboardingQuickReference'

export default function Onboarding() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-16 scroll-smooth">
      <OnboardingOverview />
      <OnboardingPrerequisites />
      <OnboardingPostgres />
      <OnboardingToken />
      <OnboardingSetup />
      <OnboardingRunning />
      <OnboardingDailyWorkflow />
      <OnboardingMigrations />
      <OnboardingQuickReference />
    </div>
  )
}
