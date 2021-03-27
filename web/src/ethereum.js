import Web3 from "web3";

import { contractAbi, contractAddr } from "./contract.config";

let web3, contract;

async function loadContract() {
  return await new web3.eth.Contract(contractAbi, contractAddr);
}

async function load() {
  web3 = new Web3(window.ethereum || "https://node.cheapeth.org/rpc");
  if (window.ethereum) {
    window.ethereum.enable();
  }
  contract = await loadContract();
}

export async function checkNetwork() {
  const netId = await web3.eth.net.getId();
  if (netId !== 777) {
    return false;
  }
  return true;
}

export function getOwner(tokenId) {
  return contract.methods.ownerOf(tokenId).call();
}

export function getValue(tokenId) {
  return contract.methods.tokenValue(tokenId).call();
}

export function getName(tokenId) {
  return contract.methods.tokenName(tokenId).call();
}

export function getUri(tokenId) {
  return contract.methods.tokenURI(tokenId).call();
}

export async function setTokenValue(tokenId, value) {
  const account = await getAccount();
  return contract.methods.setTokenValue(tokenId, value).send({ from: account });
}

export async function withdraw() {
  const account = await getAccount();
  return contract.methods.withdraw().send({ from: account });
}

export async function getAccount() {
  const accounts = await web3.eth.getAccounts();
  return accounts[0];
}

export async function buy(tokenId, value) {
  const account = await getAccount();
  const amountToSend = web3.utils.toWei(value, "ether");
  return contract.methods
    .buy(tokenId)
    .send({ from: account, value: amountToSend });
}

load();
