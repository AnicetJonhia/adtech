import { NextRequest, NextResponse } from 'next/server'
import {
  getCampaignById,
  updateCampaignStatus,
  updateCampaignStats,
} from '@/lib/services/campaign.service'
import { ApiResponse } from '@/lib/types'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // Type it as Promise for clarity
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

    return NextResponse.json<ApiResponse<any>>({
      success: true,
      data: campaign,
    });
  } catch (error) {
    console.error('Error fetching campaign:', error);
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        error: 'Failed to fetch campaign',
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // Type it as Promise for clarity
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

    const body = await request.json();

    const { status, impressions, clicks } = body;

    if (status) {
      const campaign = await updateCampaignStatus(id, status);

      if (!campaign) {
        return NextResponse.json<ApiResponse<null>>(
          {
            success: false,
            error: 'Campaign not found',
          },
          { status: 404 }
        );
      }

      return NextResponse.json<ApiResponse<any>>({
        success: true,
        data: campaign,
        message: 'Campaign status updated successfully',
      });
    }

    if (impressions !== undefined || clicks !== undefined) {
      const current = await getCampaignById(id);

      if (!current) {
        return NextResponse.json<ApiResponse<null>>(
          {
            success: false,
            error: 'Campaign not found',
          },
          { status: 404 }
        );
      }

      const campaign = await updateCampaignStats(
        id,
        impressions !== undefined ? impressions : current.impressions,
        clicks !== undefined ? clicks : current.clicks
      );

      return NextResponse.json<ApiResponse<any>>({
        success: true,
        data: campaign,
        message: 'Campaign stats updated successfully',
      });
    }

    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        error: 'No fields to update',
      },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error updating campaign:', error);
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        error: 'Failed to update campaign',
      },
      { status: 500 }
    );
  }
}