import { useState, useEffect } from "react";
import "./App.css";
import Web3 from "web3";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./components/SignupComponent";
import Auction from "./components/Auction";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [ethBalance, setEthBalance] = useState(null);
  const [accountAddress, setAccountAddress] = useState(null);
  const detectCurrentProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      alert("Metamask not installed");
    }
    return provider;
  };
  const onConnect = async () => {
    try {
      const currentProvider = detectCurrentProvider();
      if (currentProvider) {
        await currentProvider.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(currentProvider);
        const userAccount = await web3.eth.getAccounts();
        const account = userAccount[0];
        let ethBalance = await web3.eth.getBalance(account);
        sessionStorage.setItem("accountAddress", account);
        sessionStorage.setItem("accountBalance", ethBalance);
        setEthBalance(ethBalance);
        setIsConnected(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onDisconnect = () => {
    setIsConnected(false);
    sessionStorage.clear();
  };

  useEffect(() => {
    if (sessionStorage.getItem("accountAddress"))
      setAccountAddress(sessionStorage.getItem("accountAddress"));
    if (sessionStorage.getItem("accountBalance"))
      setEthBalance(sessionStorage.getItem("accountBalance"));
    if (
      sessionStorage.getItem("accountAddress") &&
      sessionStorage.getItem("accountBalance")
    )
      setIsConnected(true);
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              isConnected ? (
                <Navigate to="auction" />
              ) : (
                <SignUp onConnect={onConnect} />
              )
            }
          />
          <Route
            exact
            path="/auction"
            element={
              isConnected ? (
                <Auction
                  onDisconnect={onDisconnect}
                  detectCurrentProvider={detectCurrentProvider}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
