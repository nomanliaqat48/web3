// src/App.js

import React, { useContext } from "react";
import { Web3Context } from "./context/Web3Context";
import { switchNetworkToChainId } from "./helpers/web3";
import Button from "react-bootstrap/Button";
import "./App.css";

const App = () => {
  const { web3, account, balance, connectWallet, error } =
    useContext(Web3Context);

  return (
    <div className="App">
      <header className="App-header">
        <h1>{account ? "Metamask Connected Successfully" : "Web3 Project"}</h1>
        {error && <p className="error">{error}</p>}
        {web3 ? (
          <>
            {account && balance ? (
              <>
                <p>
                  Connected Address:{" "}
                  {account.length > 0 && `${account.substring(0, 20)}........`}
                </p>
                <p>Account Balance: {parseFloat(balance).toFixed(6)} ETH</p>
                <div className="mt-4">
                  <Button
                    variant="primary"
                    onClick={() => switchNetworkToChainId("polygon")}
                  >
                    Switch to Polygon
                  </Button>
                </div>
                <div className="mt-3">
                  <Button
                    variant="primary"
                    onClick={() => switchNetworkToChainId("sepolia")}
                  >
                    Switch to Sepolia
                  </Button>
                </div>
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
