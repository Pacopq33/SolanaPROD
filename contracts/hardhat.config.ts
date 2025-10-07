import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import * as dotenv from 'dotenv';

dotenv.config();

const config: HardhatUserConfig = {
  solidity: '0.8.23',
  networks: {
    sepolia: {
      url: process.env.ALCHEMY_URL || '',
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    }
  },
  namedAccounts: {
    deployer: {
      default: 0
    }
  }
};

export default config;
