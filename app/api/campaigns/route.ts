import { NextRequest, NextResponse } from 'next/server'
import { createCampaign, getCampaigns } from '@/lib/services/campaign.service'
import { Campaign, ApiResponse } from '@/lib/types'
import { PAGINATION } from '@/lib/constants'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
    const limit = Math.min(
      PAGINATION.MAX_LIMIT,
      Math.max(1, parseInt(searchParams.get('limit') || PAGINATION.DEFAULT_LIMIT.toString()))
    )
    const status = searchParams.get('status') || undefined

    const skip = (page - 1) * limit

    const result = await getCampaigns(skip, limit, status ? { status } as any : {})

    return NextResponse.json<ApiResponse<any>>({
      success: true,
      data: result,
    })
  } catch (error) {
    console.error('[v0] Error fetching campaigns:', error)
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        error: 'Failed to fetch campaigns',
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { name, advertiser, budget, startDate, endDate, status } = body

    if (!name || !advertiser || budget === undefined || !startDate || !endDate) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: 'Missing required fields: name, advertiser, budget, startDate, endDate',
        },
        { status: 400 }
      )
    }

    if (budget <= 0) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: 'Budget must be greater than 0',
        },
        { status: 400 }
      )
    }

    const startDateObj = new Date(startDate)
    const endDateObj = new Date(endDate)

    if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: 'Invalid date format',
        },
        { status: 400 }
      )
    }

    if (startDateObj >= endDateObj) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: 'End date must be after start date',
        },
        { status: 400 }
      )
    }

    const campaign = await createCampaign({
      name,
      advertiser,
      budget,
      startDate: startDateObj,
      endDate: endDateObj,
      status: status || 'active',
      impressions: 0,
      clicks: 0,
    } as Omit<Campaign, '_id' | 'id'>)

    console.log('[v0] Campaign created:', campaign.id)

    return NextResponse.json<ApiResponse<any>>(
      {
        success: true,
        data: campaign,
        message: 'Campaign created successfully',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[v0] Error creating campaign:', error)
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        error: 'Failed to create campaign',
      },
      { status: 500 }
    )
  }
}
