import Web3 from "web3";

import { contractAbi, contractAddr } from "./contract.config";

let web3, contract;

async function loadContract() {
  return await new web3.eth.Contract(contractAbi, contractAddr);
}

async function load() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    window.ethereum.enable();

    contract = await loadContract();
  }
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

export async function withdraw(tokenId) {
  const accounts = await web3.eth.getAccounts();
  return contract.methods.withdraw().send({ from: accounts[0] });
}

export async function buy(tokenId, value) {
  const accounts = await web3.eth.getAccounts();
  const amountToSend = web3.utils.toWei(value, "ether");
  return contract.methods
    .buy(tokenId)
    .send({ from: accounts[0], value: amountToSend });
}

load();
