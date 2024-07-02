import React, { useContext } from "react";
import { Web3Context } from "../../context/Web3Context";
import { switchNetworkToChainId } from "../../helpers/web3";
import Button from "react-bootstrap/Button";

const SwitchNetwork = ({setShowTransactionForm}) => {
  const { account, balance } = useContext(Web3Context);

  return (
    <>
      <p>
        Connected Address:{" "}
        {account.length > 0 && `${account.substring(0, 25)}........`}
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
      <div className="mt-3">
        <Button
          variant="primary"
          onClick={setShowTransactionForm}
        >
          Send Transaction
        </Button>
      </div>
    </>
  );
};

export default SwitchNetwork;
