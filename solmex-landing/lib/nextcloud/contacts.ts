/**
 * Nextcloud Contacts Integration
 * Creates contacts in Nextcloud CRM
 */

import { NextcloudConfig, getAuthHeaders } from './index';

export async function createContact(
  data: any,
  type: 'customer' | 'partner',
  config: NextcloudConfig
) {
  if (!config.contacts?.enabled) {
    return { success: false, contactId: null, error: 'Contacts not enabled' };
  }

  try {
    // Prepare contact data
    const contactName = type === 'partner'
      ? `${data.partnerName || data.nombre || 'N/A'}`
      : `${data.nombre || 'N/A'}`;

    const org = type === 'partner'
      ? (data.partnerCompany || data.empresa || '')
      : (data.empresa || '');

    const email = type === 'partner'
      ? (data.partnerEmail || data.correo || '')
      : (data.correo || '');

    const phone = type === 'partner'
      ? (data.partnerPhone || data.telefono || '')
      : (data.telefono || '');

    // Build vCard
    let vCard = `BEGIN:VCARD\n`;
    vCard += `VERSION:3.0\n`;
    vCard += `FN:${contactName}\n`;
    vCard += `N:${contactName};;;;\n`;
    if (org) vCard += `ORG:${org}\n`;
    if (email) vCard += `EMAIL;TYPE=INTERNET:${email}\n`;
    if (phone) vCard += `TEL;TYPE=CELL:${phone}\n`;
    vCard += `NOTE:Lead ID: ${data.id || 'N/A'}\\nTipo: ${type === 'partner' ? 'Terminal Partner' : 'Cliente'}\\nOrigen: ${data.source || 'Landing Page'}\n`;
    vCard += `END:VCARD`;

    // Create contact via Nextcloud Contacts API (DAV)
    const contactFileName = `${contactName.replace(/\s+/g, '_')}_${Date.now()}.vcf`;
    const response = await fetch(
      `${config.baseUrl}/remote.php/dav/addressbooks/users/${config.auth.username}/${config.contacts.addressBook}/${contactFileName}`,
      {
        method: 'PUT',
        headers: {
          ...getAuthHeaders(config),
          'Content-Type': 'text/vcard',
        },
        body: vCard,
      }
    );

    if (response.ok || response.status === 201) {
      console.log('✅ Contact created in Nextcloud Contacts');
      return { success: true, contactId: contactName };
    } else {
      const errorText = await response.text();
      console.error('⚠️ Error creating contact:', response.status, errorText);
      return { success: false, contactId: null, error: `HTTP ${response.status}` };
    }
  } catch (error: any) {
    console.error('⚠️ Error connecting to Nextcloud Contacts:', error);
    return { success: false, contactId: null, error: error.message };
  }
}


