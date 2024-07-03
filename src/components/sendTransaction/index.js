import React, { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import { Web3Context } from "../../context/Web3Context";
import { sendTransaction } from "../../helpers/web3";

const InputField = ({ label, value, onChange, name, readOnly }) => {
  return (
    <Form.Group className="mb-3 w-100">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="text"
        placeholder={label}
        value={value}
        onChange={onChange}
        name={name}
        readOnly={readOnly}
      />
    </Form.Group>
  );
};

const SendTransaction = ({ setShowTransactionForm }) => {
  const { account, web3 } = useContext(Web3Context);
  const [sendFormValue, setSendFormValue] = useState({
    sendFrom: "",
    sendTo: "",
    amount: "",
  });
  const [transactionsDetail, setTransactionsDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setSendFormValue((prevState) => ({
      ...prevState,
      sendFrom: account,
    }));
  }, [account]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSendFormValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { sendFrom, sendTo, amount } = sendFormValue;
    if (web3 && sendFrom && sendTo && amount) {
      try {
        const response = await sendTransaction({
          from: sendFrom,
          to: sendTo,
          amount,
          account,
        });
        setTransactionsDetail(response);
        setIsLoading(false);
      } catch (error) {
        console.error("Transaction failed", error);
        setIsLoading(false);
      }
    }
  };

  return (
    <Card className="w-50 mt-5">
      <Card.Body>
        <h1 className="mt-2">Send Transaction</h1>
        <hr />
        <Form className="text-start mt-2" onSubmit={handleSubmit}>
          <InputField
            label={"Send From"}
            value={sendFormValue.sendFrom}
            onChange={handleChange}
            name="sendFrom"
            readOnly
          />
          <InputField
            label={"Send To"}
            value={sendFormValue.sendTo}
            onChange={handleChange}
            name="sendTo"
          />
          <InputField
            label={"Amount"}
            value={sendFormValue.amount}
            onChange={handleChange}
            name="amount"
          />
          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
            <span>{isLoading ? "Loading..." : "Submit"}</span>
          </Button>
          {isLoading && (
            <div className="spinner-loading">
              <Spinner
                animation="border"
                style={{
                  height: "5rem",
                  width: "5rem",
                  background: "transparent",
                }}
                variant={"dark"}
              />
            </div>
          )}
        </Form>

        {transactionsDetail?.length > 0 &&
          transactionsDetail.map((transaction) => (
            <div className="text-start mt-4">
              <h2 className="mt-5">Transaction Details</h2>
              <p>
                <strong>From:</strong> {transaction.from}
              </p>
              <p>
                <strong>To:</strong> {transaction.to}
              </p>
              <p>
                <strong>Value:</strong>{" "}
                {web3.utils.fromWei(transaction?.value, "ether")} ETH
              </p>
              <p>
                <strong>Gas Used:</strong> {transaction.gas.toString()}
              </p>
              <p>
                <strong>Gas Price:</strong>{" "}
                {web3.utils.fromWei(transaction.gasPrice, "gwei")} Gwei
              </p>
              <p>
                <strong>Block Number:</strong>{" "}
                {transaction.blockNumber.toString()}
              </p>
              <p>
                <strong>Transaction Hash:</strong> {transaction.hash}
              </p>
            </div>
          ))}
        <div className="text-end">
          <Button variant="primary" onClick={setShowTransactionForm}>
            Back
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SendTransaction;
