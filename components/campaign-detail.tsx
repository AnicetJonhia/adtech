'use client'

import { useEffect, useState } from 'react'
import { Campaign, CampaignStats } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from './toast-provider'
import { cn } from '@/lib/utils'

interface CampaignDetailProps {
  campaignId: string
}

export function CampaignDetail({ campaignId }: CampaignDetailProps) {
  const [campaign, setCampaign] = useState<(Campaign & { id?: string }) | null>(null)
  const [stats, setStats] = useState<CampaignStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [impressions, setImpressions] = useState('')
  const [clicks, setClicks] = useState('')
  const { addToast } = useToast()

  const fetchCampaign = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/campaigns/${campaignId}`)
      const data = await response.json()

      if (data.success) {
        setCampaign(data.data)
        setImpressions(data.data.impressions.toString())
        setClicks(data.data.clicks.toString())
        fetchStats()
      } else {
        addToast(data.error || 'Failed to load campaign', 'error')
      }
    } catch (error) {
      addToast('Error loading campaign', 'error')
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch(`/api/campaigns/${campaignId}/stats`)
      const data = await response.json()

      if (data.success) {
        setStats(data.data.stats)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  useEffect(() => {
    fetchCampaign()
  }, [campaignId])

  const handleStatusChange = async (newStatus: string) => {
    try {
      setUpdating(true)
      const response = await fetch(`/api/campaigns/${campaignId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })

      const data = await response.json()

      if (data.success) {
        setCampaign(data.data)
        addToast(`Campaign ${newStatus}!`, 'success')
      } else {
        addToast(data.error || 'Failed to update status', 'error')
      }
    } catch (error) {
      addToast('Error updating campaign', 'error')
    } finally {
      setUpdating(false)
    }
  }

  const handleUpdateStats = async () => {
    try {
      if (!impressions || !clicks) {
        addToast('Please fill in both fields', 'warning')
        return
      }

      setUpdating(true)
      const response = await fetch(`/api/campaigns/${campaignId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          impressions: parseInt(impressions),
          clicks: parseInt(clicks),
        }),
      })

      const data = await response.json()

      if (data.success) {
        setCampaign(data.data)
        setEditMode(false)
        addToast('Campaign stats updated!', 'success')
        fetchStats()
      } else {
        addToast(data.error || 'Failed to update stats', 'error')
      }
    } catch (error) {
      addToast('Error updating stats', 'error')
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-border border-t-primary" />
          <p className="text-muted-foreground">Loading campaign...</p>
        </div>
      </div>
    )
  }

  if (!campaign) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">Campaign not found</p>
      </Card>
    )
  }

  const statusColors = {
    active: 'bg-green-100 text-green-800',
    paused: 'bg-yellow-100 text-yellow-800',
    finished: 'bg-gray-100 text-gray-800',
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{campaign.name}</h1>
            <p className="mt-1 text-muted-foreground">by {campaign.advertiser}</p>
          </div>
          <span
            className={cn(
              'rounded-full px-4 py-2 text-sm font-semibold capitalize',
              statusColors[campaign.status as 'active' | 'paused' | 'finished']
            )}
          >
            {campaign.status}
          </span>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-xs text-muted-foreground sm:text-sm">Budget</p>
            <p className="text-xl font-bold text-foreground sm:text-2xl">${campaign.budget.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground sm:text-sm">Start Date</p>
            <p className="text-base font-semibold text-foreground sm:text-lg">
              {new Date(campaign.startDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground sm:text-sm">End Date</p>
            <p className="text-base font-semibold text-foreground sm:text-lg">
              {new Date(campaign.endDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          {campaign.status === 'active' && (
            <Button
              variant="outline"
              onClick={() => handleStatusChange('paused')}
              disabled={updating}
            >
              Pause Campaign
            </Button>
          )}
          {campaign.status === 'paused' && (
            <Button
              variant="outline"
              onClick={() => handleStatusChange('active')}
              disabled={updating}
            >
              Resume Campaign
            </Button>
          )}
          {campaign.status !== 'finished' && (
            <Button
              variant="outline"
              onClick={() => handleStatusChange('finished')}
              disabled={updating}
            >
              Finish Campaign
            </Button>
          )}
        </div>
      </Card>

      {/* Statistics */}
      {stats && (
        <Card className="p-6">
          <h2 className="mb-4 text-xl font-bold text-foreground">Performance Metrics</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-xs text-muted-foreground sm:text-sm">CTR (Click-Through Rate)</p>
              <p className="text-xl font-bold text-primary sm:text-2xl">{stats.ctr}%</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground sm:text-sm">CPC (Cost Per Click)</p>
              <p className="text-xl font-bold text-primary sm:text-2xl">${stats.cpc.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground sm:text-sm">Total Impressions</p>
              <p className="text-xl font-bold text-foreground sm:text-2xl">
                {stats.totalImpressions.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground sm:text-sm">Remaining Budget</p>
              <p className="text-xl font-bold text-foreground sm:text-2xl">
                ${stats.remainingBudget.toFixed(2)}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Edit Stats */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">Campaign Stats</h2>
          <Button
            variant="outline"
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? 'Cancel' : 'Edit Stats'}
          </Button>
        </div>

        {!editMode ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs text-muted-foreground sm:text-sm">Impressions</p>
              <p className="text-xl font-bold text-foreground sm:text-2xl">
                {campaign.impressions.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground sm:text-sm">Clicks</p>
              <p className="text-xl font-bold text-foreground sm:text-2xl">
                {campaign.clicks.toLocaleString()}
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="impressions">Impressions</Label>
                <Input
                  id="impressions"
                  type="number"
                  value={impressions}
                  onChange={(e) => setImpressions(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clicks">Clicks</Label>
                <Input
                  id="clicks"
                  type="number"
                  value={clicks}
                  onChange={(e) => setClicks(e.target.value)}
                />
              </div>
            </div>
            <Button
              onClick={handleUpdateStats}
              disabled={updating}
              className="w-full"
            >
              {updating ? 'Updating...' : 'Update Stats'}
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}
