import { ObjectId } from 'mongodb'

export type CampaignStatus = 'active' | 'paused' | 'finished'

export interface Campaign {
  _id?: ObjectId
  id?: string
  name: string
  advertiser: string
  budget: number
  startDate: Date
  endDate: Date
  status: CampaignStatus
  impressions: number
  clicks: number
  createdAt?: Date
  updatedAt?: Date
}

export interface CampaignStats {
  ctr: number
  cpc: number
  totalImpressions: number
  totalClicks: number
  remainingBudget: number
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
