import { NextRequest, NextResponse } from 'next/server';
import { syncToNextcloud } from '@/lib/nextcloud';

/**
 * POST /api/nextcloud/sync
 *
 * Receives contact/partner form submissions and syncs
 * to Nextcloud (Deck, Tables, Contacts).
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    if (!data || !type) {
      return NextResponse.json(
        { error: 'Missing required fields: type, data' },
        { status: 400 }
      );
    }

    const result = await syncToNextcloud(data, type);

    if (result.success) {
      return NextResponse.json(
        { success: true, data: result.data },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: false, error: result.error },
      { status: 500 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
