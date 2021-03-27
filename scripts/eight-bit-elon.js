const hre = require("hardhat");

function getRandomArbitrary(min, max) {
  const n = Math.random() * (max - min) + min;
  return parseInt(n);
}

async function main() {
  const EightBitElon = await hre.ethers.getContractFactory("EightBitElonV2");
  const elon = await EightBitElon.deploy("EightBitElonV2", "8BE");

  await elon.deployed();

  console.log("EightBitElonV2 deployed to:", elon.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
