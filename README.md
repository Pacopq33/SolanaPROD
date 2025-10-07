# Neon Drifters

"Neon Drifters" es una demo Web3 inspirada en CryptoMines que combina frontend React, backend NestJS, base de datos PostgreSQL y contratos inteligentes Solidity. El proyecto está organizado en tres paquetes principales:

- **frontend/** – Aplicación React + Vite con TailwindCSS, shadcn/ui, Zustand y React Query.
- **backend/** – API NestJS con Prisma, cronjobs y lógica de juego/economía.
- **contracts/** – Contratos Hardhat (ERC20 GAS, NFTs, Marketplace, Randomness Coordinator).
- **docs/** – Diagramas y documentación técnica.

## Puesta en marcha rápida

1. **Contratos** – Ve a `contracts/`, instala dependencias (`npm install`) y compila (`npm run build`). Puedes correr `npm test` para verificar los contratos base.
2. **Backend** – Ve a `backend/`, instala dependencias y genera el cliente Prisma. Configura una base PostgreSQL local, copia `.env.example` a `.env` y ejecuta `npm run start:dev`. Opcionalmente corre `npx prisma db push && npx ts-node prisma/seed.ts` para datos de ejemplo.
3. **Frontend** – Ve a `frontend/`, copia `.env.example` a `.env`, instala dependencias y ejecuta `npm run dev` para abrir la UI cyberpunk en `http://localhost:5173`.

### Flujos demostrativos

- **Mint**: Desde la UI elige un paquete (Básico/Intermedio/Premium). La API usa `MintService` para calcular el tier aleatorio basado en pesos, registrar el NFT y descontar GAS.
- **Exploración**: La vista de Exploración llama a `/exploration/start`, que aplica probabilidades dinámicas según mapas y nivel.
- **Marketplace**: Permite simular listados y compras con escrow server-side y el token GAS.

Consulta `frontend/README.md`, `backend/README.md` y `contracts/README.md` para detalles y scripts adicionales.
