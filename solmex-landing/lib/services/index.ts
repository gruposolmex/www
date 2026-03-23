/**
 * External Services Integration Hub
 * 
 * Centralized service layer for all external integrations:
 * - Nextcloud (Deck, Tables, Forms, Contacts)
 * - SAP (Future)
 * - Custom Logistic Engines (Future)
 */

import { syncToNextcloud } from '../nextcloud';

export interface ServiceResult {
  success: boolean;
  service: string;
  data?: any;
  error?: string;
}

/**
 * Sync to all configured services
 */
export async function syncToAllServices(
  data: any,
  type: 'customer' | 'partner' = 'customer'
): Promise<ServiceResult[]> {
  const results: ServiceResult[] = [];

  // Nextcloud integration
  try {
    const nextcloudResult = await syncToNextcloud(data, type);
    results.push({
      success: nextcloudResult.success,
      service: 'nextcloud',
      data: nextcloudResult,
    });
  } catch (error: any) {
    results.push({
      success: false,
      service: 'nextcloud',
      error: error.message,
    });
  }

  // TODO: SAP integration
  // if (process.env.SAP_ENABLED === 'true') {
  //   try {
  //     const sapResult = await syncToSAP(data, type);
  //     results.push({
  //       success: sapResult.success,
  //       service: 'sap',
  //       data: sapResult,
  //     });
  //   } catch (error: any) {
  //     results.push({
  //       success: false,
  //       service: 'sap',
  //       error: error.message,
  //     });
  //   }
  // }

  // TODO: Custom Logistic Engine integration
  // if (process.env.LOGISTIC_ENGINE_ENABLED === 'true') {
  //   try {
  //     const engineResult = await syncToLogisticEngine(data, type);
  //     results.push({
  //       success: engineResult.success,
  //       service: 'logistic-engine',
  //       data: engineResult,
  //     });
  //   } catch (error: any) {
  //     results.push({
  //       success: false,
  //       service: 'logistic-engine',
  //       error: error.message,
  //     });
  //   }
  // }

  return results;
}


