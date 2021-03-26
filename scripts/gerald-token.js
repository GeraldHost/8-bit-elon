// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const GeraldToken = await hre.ethers.getContractFactory("GeraldToken");
  const gerald = await GeraldToken.deploy("GeraldToken", "GER");

  await gerald.deployed();

  console.log("GeraldToken deployed to:", gerald.address);

  // create tokens
  const to = "0xCc58a00B5C2e0Fef71Cc98d34c1d7c3D27B6935F"; // main ceth account

  const tokens = [
    { name: "Kanye Elon" },
    { name: "Wiki Elon" },
    { name: "Grimes Elon" },
    { name: "Weed Elon" },
    { name: "Young Elon" },
    { name: "Not a Elon" },
  ];

  const tokenUri = "token-uri";
  const tokenValue = 1;

  for (const token of tokens) {
    await gerald.mint(to, tokenUri, tokenValue, token.name);
    await (new Promise((res) => setTimeout(() => res(), 5000)));
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
