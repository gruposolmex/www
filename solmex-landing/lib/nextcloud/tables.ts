/**
 * Nextcloud Tables Integration
 * Stub for Tables API
 */

import { getAuthHeaders } from './index';

export async function createTableRow(
  data: Record<string, unknown>,
  type: 'customer' | 'partner'
): Promise<{ success: boolean; error?: string }> {
  const baseUrl = process.env.NEXTCLOUD_URL;
  if (!baseUrl) {
    return { success: false, error: 'Nextcloud not configured' };
  }

  try {
    const response = await fetch(
      `${baseUrl}/ocs/v2.php/apps/tables/api/1/tables`,
      {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ ...data, type }),
      }
    );
    return { success: response.ok };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
