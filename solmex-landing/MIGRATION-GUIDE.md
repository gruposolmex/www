# Migration Guide: HTML to Next.js

This guide explains how to migrate from the static HTML landing page to the Next.js application with API routes.

## Architecture Changes

### Before (Static HTML)
```
index.html
├── Inline JavaScript
├── Credentials in config.nextcloud.js (client-side)
└── Direct API calls from browser
```

### After (Next.js)
```
app/
├── page.tsx (React components)
├── api/
│   ├── nextcloud/sync/route.ts (Server-side API)
│   └── services/sync/route.ts (Universal sync)
lib/
├── nextcloud/ (Service layer)
│   ├── index.ts
│   ├── deck.ts
│   ├── tables.ts
│   ├── forms.ts
│   └── contacts.ts
└── services/ (Integration hub)
hooks/
└── useNextcloudSync.ts (React hook)
```

## Key Benefits

1. **Security**: Credentials stored in environment variables (server-side only)
2. **Scalability**: Easy to add new services (SAP, custom engines)
3. **Type Safety**: Full TypeScript support
4. **Better UX**: Server-side rendering, optimized loading
5. **Maintainability**: Component-based architecture

## Migration Steps

### 1. Update Form Components

**Before (HTML):**
```javascript
// Direct fetch to Nextcloud
const response = await fetch('https://nube.gruposolmex.com/...', {
  headers: {
    'Authorization': 'Basic ' + btoa(`${username}:${password}`)
  }
});
```

**After (Next.js):**
```typescript
import { useNextcloudSync } from '@/hooks/useNextcloudSync';

function ContactForm() {
  const { sync, loading, success, error } = useNextcloudSync();
  
  const handleSubmit = async (data: FormData) => {
    await sync(data, 'customer');
  };
  
  // ...
}
```

### 2. Environment Variables

Create `.env.local`:
```bash
NEXTCLOUD_BASE_URL=https://nube.gruposolmex.com
NEXTCLOUD_USERNAME=comercial
NEXTCLOUD_APP_PASSWORD=your_actual_password
# ... other config
```

### 3. Component Migration

Migrate HTML sections to React components:

- `index.html` sections → `components/solmex/*.tsx`
- Form handlers → Use `useNextcloudSync()` hook
- Inline styles → Tailwind CSS classes
- GSAP animations → Keep as-is or migrate to Framer Motion

## Example: Contact Form Migration

### Before (HTML)
```html
<form id="contactForm">
  <input name="nombre" />
  <button type="submit">Enviar</button>
</form>

<script>
  contactForm.addEventListener('submit', async (e) => {
    const formData = new FormData(contactForm);
    // Direct Nextcloud API call...
  });
</script>
```

### After (Next.js)
```tsx
'use client';

import { useNextcloudSync } from '@/hooks/useNextcloudSync';
import { useState } from 'react';

export default function ContactForm() {
  const { sync, loading, success, error } = useNextcloudSync();
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    correo: '',
    telefono: '',
    mensaje: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const leadData = {
      id: `SOL-${Date.now().toString(36).toUpperCase()}`,
      ...formData,
      timestamp: new Date().toISOString(),
      timestampLocal: new Date().toLocaleString('es-MX'),
      source: 'Landing Page - Formulario de Contacto',
      status: 'nuevo',
    };

    try {
      await sync(leadData, 'customer');
      // Show success message
    } catch (err) {
      // Show error message
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.nombre}
        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  );
}
```

## Next Steps

1. ✅ API routes created
2. ✅ Service layer implemented
3. ✅ Hooks created
4. ⏳ Migrate HTML components to React
5. ⏳ Update form handlers to use hooks
6. ⏳ Test all integrations
7. ⏳ Deploy and configure environment variables

## Testing

```bash
# Development
npm run dev

# Test API routes
curl -X POST http://localhost:3000/api/nextcloud/sync \
  -H "Content-Type: application/json" \
  -d '{"data": {...}, "type": "customer"}'
```

## Deployment

1. Set environment variables in your hosting platform (Vercel, etc.)
2. Build: `npm run build`
3. Deploy: `npm start` or use platform's deployment


