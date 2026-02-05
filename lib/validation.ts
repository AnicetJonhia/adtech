import { Campaign } from './types'

interface ValidationError {
  field: string
  message: string
}

export function validateCampaign(campaign: Partial<Campaign>): ValidationError[] {
  const errors: ValidationError[] = []

  // Name validation
  if (!campaign.name || campaign.name.trim().length === 0) {
    errors.push({ field: 'name', message: 'Campaign name is required' })
  } else if (campaign.name.length > 255) {
    errors.push({ field: 'name', message: 'Campaign name must be less than 255 characters' })
  }

  // Advertiser validation
  if (!campaign.advertiser || campaign.advertiser.trim().length === 0) {
    errors.push({ field: 'advertiser', message: 'Advertiser name is required' })
  } else if (campaign.advertiser.length > 255) {
    errors.push({ field: 'advertiser', message: 'Advertiser name must be less than 255 characters' })
  }

  // Budget validation
  if (campaign.budget === undefined || campaign.budget === null) {
    errors.push({ field: 'budget', message: 'Budget is required' })
  } else if (campaign.budget <= 0) {
    errors.push({ field: 'budget', message: 'Budget must be greater than 0' })
  } else if (campaign.budget > 1000000000) {
    errors.push({ field: 'budget', message: 'Budget is too large' })
  }

  // Date validation
  if (!campaign.startDate) {
    errors.push({ field: 'startDate', message: 'Start date is required' })
  }

  if (!campaign.endDate) {
    errors.push({ field: 'endDate', message: 'End date is required' })
  }

  if (campaign.startDate && campaign.endDate) {
    const startDate = new Date(campaign.startDate)
    const endDate = new Date(campaign.endDate)

    if (isNaN(startDate.getTime())) {
      errors.push({ field: 'startDate', message: 'Invalid start date' })
    }

    if (isNaN(endDate.getTime())) {
      errors.push({ field: 'endDate', message: 'Invalid end date' })
    }

    if (startDate >= endDate) {
      errors.push({
        field: 'endDate',
        message: 'End date must be after start date',
      })
    }
  }

  // Status validation
  if (campaign.status && !['active', 'paused', 'finished'].includes(campaign.status)) {
    errors.push({ field: 'status', message: 'Invalid campaign status' })
  }

  // Stats validation
  if (campaign.impressions !== undefined && campaign.impressions < 0) {
    errors.push({ field: 'impressions', message: 'Impressions cannot be negative' })
  }

  if (campaign.clicks !== undefined && campaign.clicks < 0) {
    errors.push({ field: 'clicks', message: 'Clicks cannot be negative' })
  }

  if (
    campaign.impressions !== undefined &&
    campaign.clicks !== undefined &&
    campaign.clicks > campaign.impressions
  ) {
    errors.push({ field: 'clicks', message: 'Clicks cannot exceed impressions' })
  }

  return errors
}

export function validateObjectId(id: string): boolean {
  return /^[0-9a-fA-F]{24}$/.test(id)
}

export function formatValidationErrors(errors: ValidationError[]): string {
  if (errors.length === 0) return ''
  if (errors.length === 1) return errors[0].message
  return errors.map((e) => `${e.field}: ${e.message}`).join(', ')
}
