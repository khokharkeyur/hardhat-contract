const { expect } = require("chai");

describe("Token contract", () => {
  it("deployment should assign the total supply of tokens to the owner", async () => {
    const [owner] = await ethers.getSigners();

    console.log("owner", owner);
    const Token = await ethers.getContractFactory("Token");
    const hardhatToken = await Token.deploy();
    const ownerBalance = await hardhatToken.balancesOf(owner.address);
    console.log("ownerBalance", ownerBalance);
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });

  it("should transfer tokens between accounts", async () => {
    const [owner, addr1, addr2] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Token");
    const hardhatToken = await Token.deploy();

    await hardhatToken.transfer(addr1.address, 50);
    expect(await hardhatToken.balancesOf(addr1.address)).to.equal(50);

    await hardhatToken.connect(addr1).transfer(addr2.address, 50);
    expect(await hardhatToken.balancesOf(addr2.address)).to.equal(50);
  });
});
