import { createFileRoute } from '@tanstack/react-router'
import GatewayClientGuide from '@/pages/GatewayClientGuide'

export const Route = createFileRoute('/gateway-client')({
  component: GatewayClientGuide,
})
