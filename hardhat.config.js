require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-web3");

const fs = require("fs");
const home = require("os").homedir();
const keyfile = require("path").join(home, ".cheapethkey");
const cheapKey = fs.readFileSync(keyfile, { encoding: "utf8" });

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.0",
  networks: {
    cheapeth: {
      url: "https://node.cheapeth.org/rpc",
      accounts: [cheapKey],
    },
    hardhat: {
      chainId: 1337,
      mining: {
        auto: false,
        interval: 5000
      }
    },
  },
};
