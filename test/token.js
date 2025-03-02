const { expect } = require("chai");
const { ethers } = require("hardhat");

// describe("Token contract", () => {
//   it("deployment should assign the total supply of tokens to the owner", async () => {
//     const [owner] = await ethers.getSigners();

//     console.log("owner", owner);
//     const Token = await ethers.getContractFactory("Token");
//     const hardhatToken = await Token.deploy();
//     const ownerBalance = await hardhatToken.balancesOf(owner.address);
//     console.log("ownerBalance", ownerBalance);
//     expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
//   });

//   it("should transfer tokens between accounts", async () => {
//     const [owner, addr1, addr2] = await ethers.getSigners();

//     const Token = await ethers.getContractFactory("Token");
//     const hardhatToken = await Token.deploy();

//     await hardhatToken.transfer(addr1.address, 50);
//     expect(await hardhatToken.balancesOf(addr1.address)).to.equal(50);

//     await hardhatToken.connect(addr1).transfer(addr2.address, 50);
//     expect(await hardhatToken.balancesOf(addr2.address)).to.equal(50);
//   });
// });

describe("Token contract", function () {
  let Token;
  let hardhatToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    Token = await ethers.getContractFactory("Token");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    hardhatToken = await Token.deploy();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await hardhatToken.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await hardhatToken.balanceOf(owner.address);
      expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      await hardhatToken.transfer(addr1.address, 50);
      const addr1Balance = await hardhatToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(50);

      await hardhatToken.connect(addr1).transfer(addr2.address, 50);
      const addr2Balance = await hardhatToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });

    it("Should fail if sender doesn’t have enough tokens", async function () {
      const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);

      await expect(
        hardhatToken.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWith("Not enough tokens");

      expect(await hardhatToken.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });

    it("Should update balances after transfers", async function () {
      const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);

      await hardhatToken.transfer(addr1.address, BigInt(100));
      await hardhatToken.transfer(addr2.address, BigInt(50));

      const finalOwnerBalance = await hardhatToken.balanceOf(owner.address);
      expect(finalOwnerBalance).to.equal(initialOwnerBalance - BigInt(150));

      const addr1Balance = await hardhatToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(BigInt(100));

      const addr2Balance = await hardhatToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(BigInt(50));
    });
  });
});
