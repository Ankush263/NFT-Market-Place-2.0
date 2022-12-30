const hre = require("hardhat");

async function main() {

  const Lock = await hre.ethers.getContractFactory("NFTMarketplace");
  const lock = await Lock.deploy();

  await lock.deployed();

  console.log(
    `NFTMarketplace deployed to ${lock.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
