# Neon Drifters — Contratos

Colección de contratos Solidity desplegables con Hardhat. Incluye token GAS, NFTs para naves y trabajadores, marketplace con escrow y coordinador de aleatoriedad.

## Scripts

```bash
npm install
npx hardhat compile
npx hardhat test
npx hardhat run scripts/deploy.ts --network sepolia
```

## Variables de entorno

Crear `.env` desde `.env.example`:

```env
PRIVATE_KEY=0x...
ALCHEMY_URL=https://sepolia.infura.io/v3/KEY
VRF_COORDINATOR=0x0000000000000000000000000000000000000000
VRF_KEY_HASH=0x0000000000000000000000000000000000000000000000000000000000000000
```

## Contratos

- `GasToken.sol` – ERC20 utilitario con roles de minteo/burn.
- `NFTShip.sol` y `NFTWorker.sol` – ERC721 con metadata generativa.
- `Marketplace.sol` – Listado P2P con pagos en GAS y escrow seguro.
- `RandomnessCoordinator.sol` – Wrapper sencillo para Chainlink VRF o commit-reveal.
