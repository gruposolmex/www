/**
 * Nextcloud integration
 *
 * Provides sync capabilities to Nextcloud services
 * (Deck, Tables, Forms, Contacts).
 */

export interface NextcloudConfig {
  baseUrl: string;
  auth: {
    username: string;
    password: string;
  };
  deck?: {
    enabled: boolean;
    boardId?: number;
    stackId?: number;
    stacks?: {
      customer?: number;
      partner?: number;
    };
  };
  tables?: {
    enabled: boolean;
    tableId?: number;
  };
  forms?: {
    enabled: boolean;
    formId?: number;
    customerFormId?: number;
    partnerFormId?: number;
  };
  contacts?: {
    enabled: boolean;
    addressBook?: string;
  };
}

export interface NextcloudSyncResult {
  success: boolean;
  data?: Record<string, unknown>;
  error?: string;
}

/**
 * Build auth headers for Nextcloud OCS API calls.
 */
export function getAuthHeaders(
  config?: NextcloudConfig
): Record<string, string> {
  if (config) {
    const credentials = btoa(
      `${config.auth.username}:${config.auth.password}`
    );
    return {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/json',
      'OCS-APIRequest': 'true',
    };
  }

  const token = process.env.NEXTCLOUD_TOKEN || '';
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'OCS-APIRequest': 'true',
  };
}

/**
 * Sync data to Nextcloud services (Deck cards, Tables, Contacts).
 * Currently a stub - configure NEXTCLOUD_URL and NEXTCLOUD_TOKEN
 * in .env to enable.
 */
export async function syncToNextcloud(
  data: Record<string, unknown>,
  type: 'customer' | 'partner' = 'customer'
): Promise<NextcloudSyncResult> {
  const baseUrl = process.env.NEXTCLOUD_URL;
  const token = process.env.NEXTCLOUD_TOKEN;

  if (!baseUrl || !token) {
    return {
      success: false,
      error: 'Nextcloud not configured. Set NEXTCLOUD_URL and NEXTCLOUD_TOKEN.',
    };
  }

  try {
    const endpoint =
      type === 'partner'
        ? `${baseUrl}/ocs/v2.php/apps/deck/api/v1.0/boards`
        : `${baseUrl}/ocs/v2.php/apps/tables/api/1/tables`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'OCS-APIRequest': 'true',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return {
        success: false,
        error: `Nextcloud responded with ${response.status}`,
      };
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
