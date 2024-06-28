// src/App.js

import React, { useContext } from "react";
import { Web3Context } from "./context/Web3Context";
import "./App.css";

const App = () => {
  const { web3, account, balance, connectWallet, error } =
    useContext(Web3Context);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Web3 Project</h1>
        {error && <p className="error">{error}</p>}
        {web3 ? (
          <>
            {account && balance ? (
              <>
                <p>Connected Account: {account}</p>
                <p>Account Balance: {parseFloat(balance).toFixed(4)}</p>
              </>
            ) : (
              <button onClick={connectWallet}>Connect MetaMask</button>
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
