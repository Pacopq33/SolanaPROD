# Neon Drifters — Frontend

Aplicación React + Vite + TypeScript con TailwindCSS, shadcn/ui, Zustand, React Query y soporte i18n.

## Scripts

```bash
npm install
npm run dev        # Inicia entorno de desarrollo
npm run build      # Genera build de producción
npm run preview    # Sirve build
npm run lint       # Ejecuta ESLint
```

## Variables de entorno

Crear `.env` a partir de `.env.example`:

```env
VITE_API_URL=http://localhost:3333
VITE_CHAIN_ID=11155111
VITE_GAS_TOKEN=0x0000000000000000000000000000000000000000
```

## Características

- Estética cyberpunk minimalista con gradientes y glassmorphism.
- HUD interactivo con saldo de GAS, energía y turnos.
- Módulos: Hangar, Barracones, Exploración, Estación de Gas, Marketplace, Mint, Inventario, Perfil.
- Soporte ES/EN mediante i18next.
- Simulación de exploraciones, mint aleatorio y eventos dinámicos desde la API.
