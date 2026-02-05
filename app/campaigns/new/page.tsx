import { CampaignForm } from '@/components/campaign-form'

export default function NewCampaignPage() {
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Create Campaign</h1>
        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
          Set up a new advertising campaign with your budget and dates
        </p>
      </div>

      <CampaignForm />
    </div>
  )
}
