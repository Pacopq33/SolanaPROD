import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('GasToken', () => {
  it('permite mintear con rol', async () => {
    const [owner, user] = await ethers.getSigners();
    const gasToken = await ethers.deployContract('GasToken');
    await gasToken.waitForDeployment();
    await gasToken.grantRole(await gasToken.MINTER_ROLE(), owner.address);
    await gasToken.mint(user.address, 1000n);
    expect(await gasToken.balanceOf(user.address)).to.equal(1000n);
  });
});
