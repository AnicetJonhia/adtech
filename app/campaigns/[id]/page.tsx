import Link from 'next/link'
import { CampaignDetail } from '@/components/campaign-detail'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'

interface CampaignDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function CampaignDetailPage({ params }: CampaignDetailPageProps) {
  const awaitedParams = await params;
  const { id } = awaitedParams;

  if (!id) {
    return (
      <div className="space-y-6 p-4 sm:p-6 lg:p-8">
        <Link href="/campaigns">
          <Button variant="ghost" className="gap-2">
            <ChevronLeft className="h-4 w-4" />
            Back to Campaigns
          </Button>
        </Link>
        <p>Invalid campaign ID</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <Link href="/campaigns">
        <Button variant="ghost" className="gap-2">
          <ChevronLeft className="h-4 w-4" />
          Back to Campaigns
        </Button>
      </Link>
      <CampaignDetail campaignId={id} />
    </div>
  )
}