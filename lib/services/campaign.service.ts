import { ObjectId } from 'mongodb'
import { getDatabase } from '@/lib/db'
import { Campaign, CampaignStats } from '@/lib/types'

const COLLECTION_NAME = 'campaigns'

// Utilitaire pour query compatible ObjectId + string
function buildIdQuery(id: string): any {
  if (ObjectId.isValid(id)) {
    return {
      $or: [
        { _id: new ObjectId(id) },
        { _id: id },
      ],
    }
  }
  return { _id: id }
}

// === CREATE ===
export async function createCampaign(campaign: Omit<Campaign, '_id' | 'id'>) {
  const db = await getDatabase()
  const collection = db.collection<Campaign>(COLLECTION_NAME)
  
  const result = await collection.insertOne({
    ...campaign,
    impressions: campaign.impressions ?? 0,
    clicks: campaign.clicks ?? 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  
  return {
    _id: result.insertedId,
    id: result.insertedId.toString(),
    ...campaign,
    impressions: campaign.impressions ?? 0,
    clicks: campaign.clicks ?? 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}

// === LIST ===
export async function getCampaigns(
  skip = 0,
  limit = 10,
  filter: Partial<Campaign> = {}
) {
  const db = await getDatabase()
  const collection = db.collection<Campaign>(COLLECTION_NAME)
  
  const query: any = {}
  if (filter.status) query.status = filter.status
  if (filter.advertiser) query.advertiser = { $regex: filter.advertiser, $options: 'i' }
  
  const campaigns = await collection
    .find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .toArray()
    
  const total = await collection.countDocuments(query)
  
  return {
    campaigns: campaigns.map((c) => ({
      ...c,
      id: c._id?.toString(),
    })),
    total,
    page: Math.floor(skip / limit) + 1,
    pages: Math.ceil(total / limit),
  }
}

// === BY ID ===
export async function getCampaignById(id: string) {
  const db = await getDatabase()
  const collection = db.collection<Campaign>(COLLECTION_NAME)
  
  console.log('getCampaignById - ID reçu:', id, 'valide ObjectId:', ObjectId.isValid(id))
  
  try {
    const campaign = await collection.findOne(buildIdQuery(id))
    if (!campaign) {
      console.log('getCampaignById - Campaign non trouvée pour ID:', id)
      return null
    }
    return {
      ...campaign,
      id: campaign._id?.toString(),
    }
  } catch (error) {
    console.error('Erreur getCampaignById:', error)
    return null
  }
}

// === UPDATE STATUS ===
export async function updateCampaignStatus(id: string, status: string) {
  const db = await getDatabase()
  const collection = db.collection<Campaign>(COLLECTION_NAME)
  
  console.log('updateCampaignStatus - ID:', id, 'nouveau status:', status)
  
  try {
    const result = await collection.findOneAndUpdate(
      buildIdQuery(id),
      {
        $set: {
          status,
          updatedAt: new Date(),
        },
      },
      { returnDocument: 'after' }
    )
    
    if (!result.value) {
      console.log('updateCampaignStatus - Aucune campagne trouvée pour ID:', id)
      return null
    }
    
    console.log('updateCampaignStatus - Mise à jour réussie')
    return {
      ...result.value,
      id: result.value._id?.toString(),
    }
  } catch (error) {
    console.error('Erreur updateCampaignStatus:', error)
    return null
  }
}

// === UPDATE STATS ===
export async function updateCampaignStats(id: string, impressions: number, clicks: number) {
  const db = await getDatabase()
  const collection = db.collection<Campaign>(COLLECTION_NAME)
  
  console.log('updateCampaignStats - ID:', id, 'impressions:', impressions, 'clicks:', clicks)
  
  try {
    const result = await collection.findOneAndUpdate(
      buildIdQuery(id),
      {
        $set: {
          impressions,
          clicks,
          updatedAt: new Date(),
        },
      },
      { returnDocument: 'after' }
    )
    
    if (!result.value) {
      console.log('updateCampaignStats - Aucune campagne trouvée pour ID:', id)
      return null
    }
    
    console.log('updateCampaignStats - Mise à jour réussie')
    return {
      ...result.value,
      id: result.value._id?.toString(),
    }
  } catch (error) {
    console.error('Erreur updateCampaignStats:', error)
    return null
  }
}

// === CALCULATE STATS ===
export function calculateStats(campaign: Campaign): CampaignStats {
  const ctr = campaign.impressions > 0
    ? (campaign.clicks / campaign.impressions) * 100
    : 0
  const cpc = campaign.clicks > 0
    ? campaign.budget / campaign.clicks
    : 0
    
  return {
    ctr: parseFloat(ctr.toFixed(2)),
    cpc: parseFloat(cpc.toFixed(2)),
    totalImpressions: campaign.impressions,
    totalClicks: campaign.clicks,
    remainingBudget: Math.max(0, campaign.budget - (campaign.clicks * cpc)),
  }
}