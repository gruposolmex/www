# External Services Integration

This Next.js application integrates with multiple external services for operational discipline and data management.

## Architecture

```
┌─────────────┐
│   Client    │
│  (React)    │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│   API Routes    │
│  /api/nextcloud │
│  /api/services  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Service Layer  │
│  lib/services/  │
│  lib/nextcloud/ │
└────────┬────────┘
         │
    ┌────┴────┬──────────┬──────────────┐
    ▼         ▼          ▼              ▼
┌────────┐ ┌──────┐ ┌────────┐ ┌──────────────┐
│Nextcloud│ │ SAP │ │Logistic│ │  Future...   │
│         │ │      │ │ Engine │ │              │
└────────┘ └──────┘ └────────┘ └──────────────┘
```

## Setup

### 1. Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in your actual credentials in `.env.local` (this file is gitignored).

### 2. Nextcloud Configuration

1. Go to Nextcloud Settings > Security > App passwords
2. Create a new app password
3. Add it to `NEXTCLOUD_APP_PASSWORD` in `.env.local`
4. Configure board IDs, table IDs, form IDs, etc.

### 3. Test Integration

```bash
npm run dev
```

Submit a form and check the console logs for integration results.

## API Routes

### POST `/api/nextcloud/sync`

Syncs data to Nextcloud services (Deck, Tables, Forms, Contacts).

**Request:**
```json
{
  "data": {
    "nombre": "John Doe",
    "empresa": "Acme Corp",
    "correo": "john@acme.com",
    "telefono": "+521234567890",
    "mensaje": "Interested in services"
  },
  "type": "customer"
}
```

**Response:**
```json
{
  "success": true,
  "results": {
    "deck": { "success": true, "cardUrl": "..." },
    "table": { "success": true, "recordId": 123 },
    "form": { "success": true, "formUrl": "..." },
    "contact": { "success": true, "contactId": "..." }
  },
  "successCount": 4,
  "totalCount": 4
}
```

### POST `/api/services/sync`

Syncs data to all configured services (Nextcloud, SAP, etc.).

## Adding New Services

### 1. Create Service Module

Create a new file in `lib/services/`:

```typescript
// lib/services/sap.ts
export async function syncToSAP(data: any, type: string) {
  // Implementation
}
```

### 2. Add to Service Hub

Update `lib/services/index.ts` to include the new service.

### 3. Add Environment Variables

Add configuration to `.env.example` and `.env.local`.

## Security Notes

- ✅ All credentials are stored in environment variables (server-side only)
- ✅ API routes are server-side only (credentials never exposed to client)
- ✅ `.env.local` is gitignored
- ✅ API routes can be protected with authentication middleware

## Future Integrations

### SAP Integration

Planned for:
- Customer master data
- Sales order creation
- Material management
- Logistics execution

### Custom Logistic Engine

Planned for:
- Route optimization
- Capacity planning
- Real-time tracking
- Performance analytics


