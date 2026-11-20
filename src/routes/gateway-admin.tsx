import { createFileRoute } from '@tanstack/react-router'
import GatewayAdminGuide from '@/pages/GatewayAdminGuide'

export const Route = createFileRoute('/gateway-admin')({
  component: GatewayAdminGuide,
})
