// src/context/Web3Context.js

import React, { createContext, useState, useEffect } from 'react';
import Web3 from 'web3';

export const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      setWeb3(web3);
    } else {
        debugger
      setError('MetaMask is not installed. Please install it to use this app.');
    }
  }, []);

  const connectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if(accounts.length > 0) {
        setAccount(accounts[0]);
        getBalance(accounts[0]);
      }
    } catch (err) {
      setError('Failed to connect to MetaMask');
    }
  };

  const getBalance = async (account) => {
    if (web3) {
      const balance = await web3.eth.getBalance(account);
      setBalance(web3.utils.fromWei(balance, 'ether'));
    }
  };

  return (
    <Web3Context.Provider value={{ web3, account, balance, connectWallet, error }}>
      {children}
    </Web3Context.Provider>
  );
};
