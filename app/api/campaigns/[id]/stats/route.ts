import { NextRequest, NextResponse } from 'next/server'
import {
  getCampaignById,
  calculateStats,
} from '@/lib/services/campaign.service'
import { ApiResponse } from '@/lib/types'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const awaitedParams = await params;
    const { id } = awaitedParams;

    if (!id) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: 'Invalid campaign ID',
        },
        { status: 400 }
      );
    }

    const campaign = await getCampaignById(id);

    if (!campaign) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: 'Campaign not found',
        },
        { status: 404 }
      );
    }

    const stats = calculateStats(campaign);

    return NextResponse.json<ApiResponse<any>>({
      success: true,
      data: {
        campaign,
        stats,
      },
    });
  } catch (error) {
    console.error('Error fetching campaign stats:', error);
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        error: 'Failed to fetch stats',
      },
      { status: 500 }
    );
  }
}