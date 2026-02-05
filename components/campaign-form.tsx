'use client'

import React from "react"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from './toast-provider'

export function CampaignForm() {
  const router = useRouter()
  const { addToast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    advertiser: '',
    budget: '',
    startDate: '',
    endDate: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.advertiser || !formData.budget || !formData.startDate || !formData.endDate) {
      addToast('Please fill in all fields', 'warning')
      return
    }

    if (parseFloat(formData.budget) <= 0) {
      addToast('Budget must be greater than 0', 'error')
      return
    }

    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      addToast('End date must be after start date', 'error')
      return
    }

    try {
      setLoading(true)
      const response = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          advertiser: formData.advertiser,
          budget: parseFloat(formData.budget),
          startDate: formData.startDate,
          endDate: formData.endDate,
          status: 'active',
        }),
      })

      const data = await response.json()

      if (data.success) {
        addToast('Campaign created successfully!', 'success')
        router.push('/campaigns')
      } else {
        addToast(data.error || 'Failed to create campaign', 'error')
      }
    } catch (error) {
      addToast('Error creating campaign', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="mx-auto max-w-2xl p-6">
      <h2 className="mb-6 text-2xl font-bold text-foreground">Create New Campaign</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Campaign Name *</Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g., Summer Sale 2024"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="advertiser">Advertiser Name *</Label>
            <Input
              id="advertiser"
              name="advertiser"
              placeholder="e.g., Acme Corp"
              value={formData.advertiser}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="budget">Budget ($) *</Label>
          <Input
            id="budget"
            name="budget"
            type="number"
            step="0.01"
            placeholder="5000"
            value={formData.budget}
            onChange={handleChange}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date *</Label>
            <Input
              id="startDate"
              name="startDate"
              type="datetime-local"
              value={formData.startDate}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endDate">End Date *</Label>
            <Input
              id="endDate"
              name="endDate"
              type="datetime-local"
              value={formData.endDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            type="submit"
            disabled={loading}
            className="flex-1"
          >
            {loading ? 'Creating...' : 'Create Campaign'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  )
}
