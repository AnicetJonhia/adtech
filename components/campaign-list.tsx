'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CampaignCard } from './campaign-card'
import { Button } from '@/components/ui/button'
import { Campaign } from '@/lib/types'
import { useToast } from './toast-provider'

export function CampaignList() {
  const [campaigns, setCampaigns] = useState<(Campaign & { id?: string })[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const { addToast } = useToast()

  const fetchCampaigns = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/campaigns?page=${page}&limit=6`)
      const data = await response.json()

      if (data.success) {
        setCampaigns(data.data.campaigns)
        setTotalPages(data.data.pages)
      } else {
        addToast(data.error || 'Failed to load campaigns', 'error')
      }
    } catch (error) {
      addToast('Error loading campaigns', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCampaigns()
  }, [page])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-border border-t-primary" />
          <p className="text-muted-foreground">Loading campaigns...</p>
        </div>
      </div>
    )
  }

  if (campaigns.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-center">
          <h3 className="mb-2 text-lg font-semibold text-foreground">No campaigns yet</h3>
          <p className="mb-6 text-muted-foreground">Create your first campaign to get started</p>
          <Link href="/campaigns/new">
            <Button>Create Campaign</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {campaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
