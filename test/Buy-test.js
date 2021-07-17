const {expect} = require("chai");
const {ethers} = require("hardhat");


describe("TestToken contract", function () {
    // let Token, token, owner, addr1, addr2;

    // beforeEach(async() => {
    //     Token = await ethers.getContractFactory("TestToken");
    //     token = await Token.deploy();
    //     [owner, addr1, addr2, _] = await ethers.getSigners();
    // });

    // describe("Deployment", function () {
    //     it("Should set the right owner", async function () {
    //         expect(await token.owner()).to.equal(owner);
    //     });
    // });

    describe("Transaction", function () {
        it("Should transfer tokens between account", async function () {
            const accounts = await ethers.getSigners();
            const TestToken = await ethers.getContractFactory("TestToken");
            const Buy = await ethers.getContractFactory("Buy");

            const token = await TestToken.deploy(accounts[0].address);
            await token.deployed();

            const buy = await Buy.deploy(accounts[0].address);
            await buy.deployed();

            const addr1 = accounts[1];
            const addr2 = accounts[2];

            await token.transfer(addr1.address, 50);
            const addr1Balance = await token.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(50);

            await token.connect(addr1).transfer(addr2.address, 50);
            const addr2Balance = await token.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(50);
        });

        it("Should fail if sender doesn't have enought tokens", async function () {
            const accounts = await ethers.getSigners();
            const TestToken = await ethers.getContractFactory("TestToken");
            const Buy = await ethers.getContractFactory("Buy");

            const token = await TestToken.deploy(accounts[0].address);
            await token.deployed();

            const buy = await Buy.deploy(accounts[0].address);
            await buy.deployed();

            const owner = accounts[0];
            const addr1 = accounts[1];
            // const addr2 = accounts[2];

            const ownerInitialBalance = await token.balanceOf(owner.address);

            await expect(token.connect(addr1).transfer(owner.address, 1)).to.be.revertedWith("Not enought tokens");
            expect(await token.balanceOf(owner.address)).to.equal(ownerInitialBalance)
        });

        it("Update balances after transfer", async function() {
            const accounts = await ethers.getSigners();
            const TestToken = await ethers.getContractFactory("TestToken");
            const Buy = await ethers.getContractFactory("Buy");

            const token = await TestToken.deploy(accounts[0].address);
            await token.deployed();

            const buy = await Buy.deploy(accounts[0].address);
            await buy.deployed();

            const owner = accounts[0];
            const addr1 = accounts[1];
            const addr2 = accounts[2];

            const ownerInitialBalance = await token.balanceOf(owner.address);

            await token.transfer(addr1.address, 100);
            await token.transfer(addr2.address, 70);

            const ownerFinalBalance = await token.balanceOf(owner.address);
            expect(ownerFinalBalance).to.equal(ownerInitialBalance - 170);

            const addr1Balance = await token.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(100);

            const addr2Balance = await token.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(100);
        });
    });

    describe("Buy", function () {
        it("...", async function () {
            const accounts = await ethers.getSigners();
            const TestToken = await ethers.getContractFactory("TestToken");
            const Buy = await ethers.getContractFactory("Buy")

            const token = await TestToken.deploy(accounts[0].address);
            await token.deployed();

            const buy = await Buy.deploy(token.address);
            await buy.deployed();

            const balance = await token.balanceOf(accounts[0].address);
            expect(await token.balanceOf(accounts[0].address)).to.equal("1000000000000000000000");

            const tx = await token.connect(accounts[0]).transfer(buy.address, ethers.utils.parseEther("100"));
        });
    });
});