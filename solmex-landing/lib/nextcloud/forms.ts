/**
 * Nextcloud Forms Integration
 * Submits form data to Nextcloud Forms
 */

import { NextcloudConfig, getAuthHeaders } from './index';

export async function submitToForm(
  data: any,
  type: 'customer' | 'partner',
  config: NextcloudConfig
) {
  if (!config.forms?.enabled) {
    return { success: false, formUrl: null, error: 'Forms not enabled' };
  }

  try {
    const formId = type === 'partner' ? config.forms?.partnerFormId : config.forms?.customerFormId;

    // Build form submission data
    const formData = type === 'partner'
      ? {
          'answer[partnerName]': data.partnerName || '',
          'answer[partnerEmail]': data.partnerEmail || '',
          'answer[partnerPhone]': data.partnerPhone || '',
          'answer[partnerCompany]': data.partnerCompany || '',
          'answer[terminalAddress]': data.terminalAddress || '',
          'answer[terminalCity]': data.terminalCity || '',
          'answer[terminalState]': data.terminalState || '',
          'answer[terminalType]': data.terminalType || '',
          'answer[services]': data.services?.join(', ') || '',
          'answer[whyJoin]': data.whyJoin || '',
        }
      : {
          'answer[nombre]': data.nombre || '',
          'answer[empresa]': data.empresa || '',
          'answer[correo]': data.correo || '',
          'answer[telefono]': data.telefono || '',
          'answer[mensaje]': data.mensaje || '',
        };

    const response = await fetch(
      `${config.baseUrl}/index.php/apps/forms/api/v1.2/submit/${formId}`,
      {
        method: 'POST',
        headers: getAuthHeaders(config),
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      const result = await response.json();
      const formUrl = `${config.baseUrl}/index.php/apps/forms/s/${formId}`;
      console.log('✅ Form submitted to Nextcloud Forms');
      return { success: true, formUrl, submissionId: result.id };
    } else {
      const errorText = await response.text();
      console.error('⚠️ Error submitting form:', response.status, errorText);
      return { success: false, formUrl: null, error: `HTTP ${response.status}` };
    }
  } catch (error: any) {
    console.error('⚠️ Error connecting to Nextcloud Forms:', error);
    return { success: false, formUrl: null, error: error.message };
  }
}


