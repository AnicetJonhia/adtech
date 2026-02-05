import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CampaignList } from '@/components/campaign-list'

export default function CampaignsPage() {
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Campaigns</h1>
          <p className="mt-1 text-sm text-muted-foreground sm:text-base">
            Manage and monitor your advertising campaigns
          </p>
        </div>
        <Link href="/campaigns/new" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto">New Campaign</Button>
        </Link>
      </div>

      <CampaignList />
    </div>
  )
}
