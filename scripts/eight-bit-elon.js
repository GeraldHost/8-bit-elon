const hre = require("hardhat");

function getRandomArbitrary(min, max) {
  const n = Math.random() * (max - min) + min;
  return parseInt(n);
}

async function main() {
  const EightBitElon = await hre.ethers.getContractFactory("EightBitElon");
  const gerald = await EightBitElon.deploy("EightBitElon", "8BE");

  await gerald.deployed();

  console.log("EightBitElon deployed to:", gerald.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
