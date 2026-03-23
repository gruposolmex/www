# Grupo Solmex Landing - Next.js

Landing page for Grupo Solmex built with Next.js 16, React 19, and TypeScript.

## Features

- ✅ **Next.js App Router** - Modern React architecture
- ✅ **TypeScript** - Full type safety
- ✅ **API Routes** - Server-side integrations
- ✅ **Nextcloud Integration** - Deck, Tables, Forms, Contacts
- ✅ **Secure Credentials** - Environment variables (server-side only)
- ✅ **React Hooks** - `useNextcloudSync()` for easy integration
- ✅ **Step-based Forms** - Partner onboarding with validation
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Animations** - GSAP and Framer Motion

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in your Nextcloud credentials in `.env.local`:

```env
NEXTCLOUD_BASE_URL=https://nube.gruposolmex.com
NEXTCLOUD_USERNAME=comercial
NEXTCLOUD_APP_PASSWORD=your_actual_app_password
# ... other config
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
solmex-landing/
├── app/
│   ├── api/
│   │   ├── nextcloud/
│   │   │   └── sync/route.ts      # Nextcloud API endpoint
│   │   └── services/
│   │       └── sync/route.ts      # Universal services sync
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Home page
├── components/
│   └── solmex/
│       ├── Contact.tsx            # Contact form (uses API)
│       ├── PartnerOnboarding.tsx  # Partner form with steps
│       └── ...                    # Other components
├── hooks/
│   ├── useNextcloudSync.ts       # Nextcloud integration hook
│   └── useServicesSync.ts        # Universal services hook
├── lib/
│   ├── nextcloud/                # Nextcloud service layer
│   │   ├── index.ts              # Main orchestrator
│   │   ├── deck.ts               # Deck cards
│   │   ├── tables.ts             # Table records
│   │   ├── forms.ts              # Form submissions
│   │   └── contacts.ts           # CRM contacts
│   └── services/                 # Service integration hub
│       └── index.ts              # Universal sync
└── .env.local                    # Environment variables (gitignored)
```

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

## Using the Hooks

### useNextcloudSync

```tsx
import { useNextcloudSync } from '@/hooks/useNextcloudSync';

function MyForm() {
  const { sync, loading, success, error } = useNextcloudSync();

  const handleSubmit = async (data: FormData) => {
    await sync(data, 'customer');
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button disabled={loading}>
        {loading ? 'Enviando...' : 'Enviar'}
      </button>
      {success && <p>¡Enviado!</p>}
      {error && <p>Error: {error}</p>}
    </form>
  );
}
```

## Nextcloud Integration

The app automatically syncs form submissions to:

1. **Deck** - Creates Kanban cards for operational tracking
2. **Tables** - Creates records with custom fields and links
3. **Forms** - Submits to Nextcloud Forms
4. **Contacts** - Creates CRM contacts

All integrations run in parallel for optimal performance.

## Future Integrations

The architecture is ready for:

- **SAP Integration** - Add `lib/services/sap.ts`
- **Custom Logistic Engines** - Add `lib/services/logistic-engine.ts`
- **Other Services** - Extend `lib/services/index.ts`

## Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables in Production

Set environment variables in your hosting platform:
- Vercel: Project Settings > Environment Variables
- Other platforms: Follow their documentation

**Never commit `.env.local` to git!**

## Documentation

- [Integration Guide](./README-INTEGRATIONS.md) - External services setup
- [Migration Guide](./MIGRATION-GUIDE.md) - HTML to Next.js migration

## License

Private - Grupo Solmex
