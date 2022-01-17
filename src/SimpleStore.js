import React, { useState } from "react";
import { ethers } from "ethers";
import TodoList_abi from "./TodoList_abi.json";
const SimpleStore = () => {
  const contractAddress = "0xCfc61E5E000726e73e320d33A69Fa7B3E539F4ac";
  //Variables
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");

  const [balanceButton, setBalanceButton] = useState("Fetch balance");

  const [currentContractVal, setCurrentContractVal] = useState(null);

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  const [balance, setDefaultBalance] = useState(0);

  const connectWalletHandler = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0]);
          setConnButtonText("Wallet Connected");
        });
    } else {
      setErrorMessage("Need to install the Metamask");
    }
  };

  const accountChangedHandler = async (_account) => {
    await setDefaultAccount(_account);
    await updateEther();
    getDefaultBalance();
  };
  const updateEther = async () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);
    let tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);
    let tempContract = new ethers.Contract(
      contractAddress,
      TodoList_abi.abi,
      tempSigner
    );
    setContract(tempContract);
  };
  const getDefaultBalance = async () => {
    setBalanceButton("Fetching Balance....");
    let balance = defaultAccount
      ? await provider.getBalance(defaultAccount)
      : 0;
    setDefaultBalance(ethers.utils.formatEther(balance));
    setBalanceButton("Fetch Balance");
  };

  const getCurrentVal = async () => {
    setCurrentContractVal("fetching value...");
    // await contract.createTask("New task");

    let val = await contract.tasks(2);
    console.log(contract);
    console.log(val);
    setCurrentContractVal(val.content);
    updateEther();
  };
  return (
    <div>
      <h3>{"Get Set Interaction with contract"}</h3>
      <button onClick={connectWalletHandler}>{connButtonText}</button>
      <h3>Address:{defaultAccount}</h3>
      <button onClick={getDefaultBalance}>{balanceButton}</button>
      <h3>Balance:{balance} Ether</h3>
      <button onClick={getCurrentVal}>Get Current Value</button>
      <h3>{currentContractVal}</h3>
    </div>
  );
};

export default SimpleStore;
