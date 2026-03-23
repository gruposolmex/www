/**
 * Nextcloud Deck Integration
 * Creates Kanban cards for operational discipline tracking
 */

import { NextcloudConfig, getAuthHeaders } from './index';

export async function createDeckCard(
  data: any,
  type: 'customer' | 'partner',
  config: NextcloudConfig
) {
  if (!config.deck?.enabled) {
    return { success: false, cardUrl: null, error: 'Deck not enabled' };
  }

  try {
    const stackId = type === 'partner' 
      ? config.deck?.stacks?.partner 
      : config.deck?.stacks?.customer;

    // Format card title based on type
    const cardTitle = type === 'partner'
      ? `🚂 Terminal: ${data.partnerCompany || data.empresa || 'N/A'} - ${data.partnerName || data.nombre}`
      : `🚂 ${data.empresa || 'Cliente'} - ${data.nombre}`;

    // Build card description with all data
    let cardDescription = `## Lead ${data.id || 'N/A'}\n\n`;

    if (type === 'partner') {
      cardDescription += `**Información de Terminal Partner**\n\n`;
      cardDescription += `| Campo | Valor |\n`;
      cardDescription += `|-------|-------|\n`;
      cardDescription += `| 👤 Nombre | ${data.partnerName || 'N/A'} |\n`;
      cardDescription += `| 🏢 Empresa | ${data.partnerCompany || 'N/A'} |\n`;
      cardDescription += `| 📧 Correo | ${data.partnerEmail || 'N/A'} |\n`;
      cardDescription += `| 📱 Teléfono | ${data.partnerPhone || 'N/A'} |\n`;
      cardDescription += `| 📍 Ubicación | ${data.terminalCity || 'N/A'}, ${data.terminalState || 'N/A'} |\n`;
      cardDescription += `| 🏭 Tipo Terminal | ${data.terminalType || 'N/A'} |\n`;
      cardDescription += `| 🔧 Servicios | ${data.services?.join(', ') || 'N/A'} |\n\n`;
    } else {
      cardDescription += `**Información de Contacto**\n\n`;
      cardDescription += `| Campo | Valor |\n`;
      cardDescription += `|-------|-------|\n`;
      cardDescription += `| 👤 Nombre | ${data.nombre || 'N/A'} |\n`;
      cardDescription += `| 🏢 Empresa | ${data.empresa || 'N/A'} |\n`;
      cardDescription += `| 📧 Correo | ${data.correo || 'N/A'} |\n`;
      cardDescription += `| 📱 Teléfono | ${data.telefono || 'N/A'} |\n\n`;
      if (data.mensaje) {
        cardDescription += `**Mensaje**\n> ${data.mensaje}\n\n`;
      }
    }

    cardDescription += `**Metadata**\n`;
    cardDescription += `- 📅 Fecha: ${data.timestampLocal || new Date().toLocaleString('es-MX')}\n`;
    cardDescription += `- 🌐 Origen: ${data.source || 'Landing Page'}\n`;
    if (data.url) cardDescription += `- 🔗 URL: ${data.url}\n`;
    if (data.referrer) cardDescription += `- 📍 Referrer: ${data.referrer}\n`;
    cardDescription += `\n---\n*Tarjeta creada automáticamente desde el formulario*`;

    const response = await fetch(
      `${config.baseUrl}/index.php/apps/deck/api/v1.0/boards/${config.deck.boardId}/stacks/${stackId}/cards`,
      {
        method: 'POST',
        headers: getAuthHeaders(config),
        body: JSON.stringify({
          title: cardTitle,
          description: cardDescription,
          type: 'plain',
          order: 999,
        }),
      }
    );

    if (response.ok) {
      const card = await response.json();
      const cardUrl = `${config.baseUrl}/index.php/apps/deck/#/board/${config.deck.boardId}/card/${card.id}`;
      console.log('✅ Deck card created:', cardUrl);
      return { success: true, cardUrl, cardId: card.id };
    } else {
      const errorText = await response.text();
      console.error('⚠️ Error creating Deck card:', response.status, errorText);
      return { success: false, cardUrl: null, error: `HTTP ${response.status}` };
    }
  } catch (error: any) {
    console.error('⚠️ Error connecting to Nextcloud Deck:', error);
    return { success: false, cardUrl: null, error: error.message };
  }
}


