import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { BarChart3, TrendingUp, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Welcome to AdTech Platform</h1>
        <p className="mt-2 text-base text-muted-foreground sm:mt-3 sm:text-lg">
          Manage your advertising campaigns with powerful analytics and real-time insights
        </p>
      </div>

      {/* CTA */}
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-3">
        <Link href="/campaigns/new">
          <Button size="lg" className="w-full sm:w-auto">
            Create Campaign
          </Button>
        </Link>
        <Link href="/campaigns">
          <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
            View All Campaigns
          </Button>
        </Link>
      </div>

      {/* Features */}
      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="p-5 sm:p-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
            <BarChart3 className="h-6 w-6 text-primary-foreground" />
          </div>
          <h3 className="mb-2 text-base font-semibold text-foreground sm:text-lg">Campaign Analytics</h3>
          <p className="text-xs text-muted-foreground sm:text-sm">
            Track CTR, CPC, impressions, and clicks in real-time
          </p>
        </Card>

        <Card className="p-5 sm:p-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
            <TrendingUp className="h-6 w-6 text-primary-foreground" />
          </div>
          <h3 className="mb-2 text-base font-semibold text-foreground sm:text-lg">Performance Insights</h3>
          <p className="text-xs text-muted-foreground sm:text-sm">
            Analyze campaign performance and optimize your strategy
          </p>
        </Card>

        <Card className="p-5 sm:p-6 sm:col-span-2 lg:col-span-1">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-6 w-6 text-primary-foreground" />
          </div>
          <h3 className="mb-2 text-base font-semibold text-foreground sm:text-lg">Quick Management</h3>
          <p className="text-xs text-muted-foreground sm:text-sm">
            Pause, resume, or finish campaigns with a single click
          </p>
        </Card>
      </div>

      {/* Info */}
      <Card className="border border-border/50 bg-card/50 p-5 sm:p-6">
        <h2 className="mb-3 text-base font-semibold text-foreground sm:mb-4 sm:text-lg">Getting Started</h2>
        <ul className="space-y-2 text-xs text-muted-foreground sm:text-sm">
          <li>✓ Create new advertising campaigns with custom budgets and dates</li>
          <li>✓ Monitor campaign performance with real-time statistics</li>
          <li>✓ Manage campaign status (active, paused, finished)</li>
          <li>✓ Update impressions and clicks for accurate metrics</li>
        </ul>
      </Card>
    </div>
  )
}
