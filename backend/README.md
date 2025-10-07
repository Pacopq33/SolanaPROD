# Neon Drifters — Backend

API REST construida con NestJS, Prisma y PostgreSQL.

## Scripts

```bash
npm install
npm run prisma:generate
npm run start:dev
npm run test
```

## Variables de entorno

Crear `.env` desde `.env.example`:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/neon_drifters
JWT_SECRET=supersecret
CHAINLINK_VRF_KEY=sample
CHAIN_ID=11155111
```

## Servicios clave

- Autenticación por wallet `/auth/wallet/verify`.
- Exploraciones diarias `/exploration/start`.
- Mint aleatorio `/mint`.
- Marketplace `/market/list` y `/market/buy`.
- Cronjobs para reinicio de turnos y rotación de mapas.

Logs estructurados con pino y validaciones con class-validator.
