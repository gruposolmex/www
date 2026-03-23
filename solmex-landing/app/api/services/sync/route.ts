/**
 * Universal Services Sync API Route
 * 
 * Handles syncing to all configured external services:
 * - Nextcloud
 * - SAP (Future)
 * - Custom Logistic Engines (Future)
 */

import { NextRequest, NextResponse } from 'next/server';
import { syncToAllServices } from '@/lib/services';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data, type = 'customer' } = body;

    if (!data) {
      return NextResponse.json(
        { error: 'Missing data in request body' },
        { status: 400 }
      );
    }

    // Sync to all services
    const results = await syncToAllServices(data, type);

    const successCount = results.filter((r) => r.success).length;
    const totalCount = results.length;

    return NextResponse.json({
      success: successCount > 0,
      results,
      successCount,
      totalCount,
      message: `Synced to ${successCount}/${totalCount} services successfully`,
    });
  } catch (error: any) {
    console.error('Error in services sync:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error.message,
      },
      { status: 500 }
    );
  }
}


