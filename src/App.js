// src/App.js

import React, { useContext, useState } from "react";
import { Web3Context } from "./context/Web3Context";
import Button from "react-bootstrap/Button";
import SwitchNetwork from "./components/switchNetwork";
import "./App.css";
import SendTransaction from "./components/sendTransaction";

const App = () => {
  const { web3, account, balance, connectWallet, error } =
    useContext(Web3Context);

  const [showTransactionForm, setShowTransactionForm] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <h1>{account ? showTransactionForm ? "Transaction" : "Metamask Connected Successfully" : "Web3 Project"}</h1>
        {error && <p className="error">{error}</p>}
        {web3 ? (
          <>
            {account && balance ? (
              <>
                {showTransactionForm ? (
                  <SendTransaction
                    setShowTransactionForm={() => setShowTransactionForm(false)}
                  />
                ) : (
                  <SwitchNetwork
                    setShowTransactionForm={() => setShowTransactionForm(true)}
                  />
                )}
              </>
            ) : (
              <Button variant="primary" onClick={connectWallet}>
                Connect MetaMask
              </Button>
            )}
          </>
        ) : (
          <p>Please install MetaMask to use this app.</p>
        )}
      </header>
    </div>
  );
};

export default App;
