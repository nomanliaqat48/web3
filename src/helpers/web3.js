import Web3 from "web3";
import { toast } from "react-toastify";
import { networks } from "../utils/network";

// Get web3 instance
export const getWeb3 = async () => {
  try {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const web3 = new Web3(window.ethereum);
      return web3;
    } else {
      toast.error(
        "MetaMask is not installed. Please install it to use this app."
      );
    }
  } catch (err) {
    toast.error(err?.message || err);
  }
};

export const connectWithMetamask = async () => {
  try {
    let web3 = await getWeb3();
    await window.ethereum.request({
      method: "wallet_requestPermissions",
      params: [
        {
          eth_accounts: {},
        },
      ],
    });
    let accounts = await web3.eth.getAccounts();
    if (accounts.length > 0) {
      return accounts[0];
    }
    return false;
  } catch (err) {
    toast.error(err?.message || err);
    throw new Error(err);
  }
};

export const switchNetworkToChainId = async (network_name) => {
  if (window?.ethereum) {
    try {
      let web3 = await getWeb3();
      await web3.currentProvider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: Web3.utils.toHex(networks[network_name].chainId) }],
      });
      let accounts = await web3.eth.getAccounts();
      return accounts[0];
    } catch (err) {
      if ([4902, -32603].includes(err.code)) {
        await addNewNetworkAutomatically(network_name);
        return;
      }
      toast.error(err?.message || err);
    }
  }
};

const addNewNetworkAutomatically = async (network_name) => {
  try {
    return await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [networks[network_name]],
    });
  } catch (err) {
    toast.error(err?.message || err);
  }
};

export const getAccountBalance = async (account) => {
  try {
    let web3 = await getWeb3();
    return await web3.eth.getBalance(account);
  } catch (err) {
    toast.error(err?.message || err);
  }
};

export const sendTransaction = async ({ from, to, amount, account }) => {
  let web3 = await getWeb3();
  const value = web3.utils.toWei(amount, "ether");
  try {
    const txHash = await web3.eth.sendTransaction({
      from,
      to,
      value,
    });
    console.log("Transaction Successful!: ", txHash);
    const result = [];
    const block = await web3.eth.getBlock(txHash.blockNumber, true);
    if (block && block.transactions) {
      block.transactions.forEach((transaction) => {
        if (transaction.from.toLowerCase() === account.toLowerCase()) {
          result.push(transaction);
        }
      });
    }
    return result;
  } catch (err) {
    console.error("Transaction failed", err);
    toast.error(err?.data?.message || err?.message || err);
  }
};
