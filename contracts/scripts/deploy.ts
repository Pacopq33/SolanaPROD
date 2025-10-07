import { ethers } from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Deploying with', deployer.address);

  const GasToken = await ethers.deployContract('GasToken');
  await GasToken.waitForDeployment();
  console.log('GasToken deployed at', await GasToken.getAddress());

  const NFTShip = await ethers.deployContract('NFTShip');
  await NFTShip.waitForDeployment();
  console.log('NFTShip deployed at', await NFTShip.getAddress());

  const NFTWorker = await ethers.deployContract('NFTWorker');
  await NFTWorker.waitForDeployment();
  console.log('NFTWorker deployed at', await NFTWorker.getAddress());

  const Marketplace = await ethers.deployContract('Marketplace', [await GasToken.getAddress()]);
  await Marketplace.waitForDeployment();
  console.log('Marketplace deployed at', await Marketplace.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
