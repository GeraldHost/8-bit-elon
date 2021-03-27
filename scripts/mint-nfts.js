const hre = require("hardhat");

function getRandomArbitrary(min, max) {
  const n = Math.random() * (max - min) + min;
  return parseInt(n);
}

async function main() {
  const contractAddress = "0x6622f94aD519559b43658c8319F50c1c13faEEB7";
  const gerald = await ethers.getContractAt("EightBitElonV2", contractAddress);

  // create tokens
  const mainCethAddr = "0xCc58a00B5C2e0Fef71Cc98d34c1d7c3D27B6935F"; // main ceth account
  const mrhelloyellowAddr = "0x2bAc686cBC39d94a34b21eeB960b23Dd975504DE"; // @mrhelloyellow address

  const tokens = [
    {
      name: "Kanye Elon",
      uri: "Qma5AqXNzZYEr3dvDEPp5eHMtGPNkrKNN2cfcyk1SyphEf",
    },
    {
      name: "Wiki Elon",
      uri: "QmR9aR4Qwo4LvN6Q7Bd5gaXqNic1v79pCZsyXEQoqAvBzc",
    },
    {
      name: "Grimes Elon",
      uri: "QmVKWdJ7NoHsjeX24aBZbZw2uDe1CirHJf2z9NbMF3FMgb",
    },
    {
      name: "Weed Elon",
      uri: "QmXY8R4bieh6nN3tWFHA4eDzSK3uhQM6b4anzBAjp2DFvu",
    },
    {
      name: "Young Elon",
      uri: "QmWEtrrGwotFiZSoXKkkvGydGPGGVU5VZozDRfXUy4qmH1",
    },
    {
      name: "Not a Elon",
      uri: "QmRucCaTQLRcfRHkB1RF7dSADf2nsC4VDc4kwkwYeuFQtg",
    },
    // v2 additions
    {
      name: "Gotcha Elon",
      uri: "QmT7TimrmBGCtaxztRbPtBQL7WuwGTRDqdgF4WRK8vJSVG",
    },
    {
      name: "Lion Elon",
      uri: "QmVKmYsfDfEQHanGK1d2pKGMGz6wHpQxv5ijWW18zmBxqd",
    },
    {
      name: "Corona Elon",
      uri: "QmVZhJukuyRF8LN9Vhu5QSALZqYiZDtiZRFgCM1nHby3U8",
    },
  ];

  for (const token of tokens) {
    const addr = token.name === "Kanye Elon" ? mainCethAddr : mrhelloyellowAddr;
    const tokenValue = getRandomArbitrary(100, 500);
    await gerald.mint(addr, token.uri, tokenValue, token.name);
    await new Promise((res) => setTimeout(() => res(), 5000));
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
