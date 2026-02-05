'use client'

import Link from 'next/link'
import { Campaign } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface CampaignCardProps {
  campaign: Campaign & { id?: string }
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const ctr = campaign.impressions > 0
    ? ((campaign.clicks / campaign.impressions) * 100).toFixed(2)
    : '0.00'

  const statusColors = {
    active: 'bg-green-100 text-green-800',
    paused: 'bg-yellow-100 text-yellow-800',
    finished: 'bg-gray-100 text-gray-800',
  }

  return (
    <Card className="flex flex-col gap-4 p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground">{campaign.name}</h3>
          <p className="text-sm text-muted-foreground">{campaign.advertiser}</p>
        </div>
        <span
          className={cn(
            'rounded-full px-3 py-1 text-xs font-semibold capitalize',
            statusColors[campaign.status]
          )}
        >
          {campaign.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div>
          <p className="text-xs text-muted-foreground">Budget</p>
          <p className="text-sm font-bold text-foreground sm:text-lg">${campaign.budget.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Impressions</p>
          <p className="text-sm font-bold text-foreground sm:text-lg">{campaign.impressions.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">CTR</p>
          <p className="text-sm font-bold text-foreground sm:text-lg">{ctr}%</p>
        </div>
      </div>

      <div className="flex gap-2">
        <Link href={`/campaigns/${campaign.id}`} className="flex-1">
          <Button variant="outline" className="w-full bg-transparent">
            View Details
          </Button>
        </Link>
      </div>
    </Card>
  )
}
