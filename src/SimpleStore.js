import React, { useState } from "react";
import { ethers } from "ethers";
import TodoList_abi from "./TodoList_abi.json";
const SimpleStore = () => {
  const contractAddress = "0xdc7A017000cfa23913db89E9F641efeec3151430";
  //Variables
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");

  const [currentContractVal, setCurrentContractVal] = useState(null);

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

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

  const accountChangedHandler = (_account) => {
    setDefaultAccount(_account);
    updateEther();
  };

  const updateEther = () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);
    let tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);
console.log(TodoList_abi);
    let tempContract = new ethers.Contract(
      contractAddress,
      TodoList_abi.abi,
      tempSigner
    );

    setContract(tempContract);
  };
  const getCurrentVal = async () => {
    alert("ok");
    let val = await contract.tasks;
    console.log(val);
    // setCurrentContractVal(val)
  };
  return (
    <div>
      <h3>{"Get Set Interaction with contract"}</h3>
      <button onClick={connectWalletHandler}>{connButtonText}</button>
      <h3>Address:{defaultAccount}</h3>
      <button onClick={getCurrentVal}>Get Current Value</button>
    </div>
  );
};

export default SimpleStore;
