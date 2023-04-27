import React, { useEffect, useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import Web3 from "web3";
const ProfileModal = ({
  open,
  handleClose,
  detectCurrentProvider,
  onDisconnect,
}) => {
  const [data, setData] = useState({
    accountAddress: "",
    balance: "",
  });

  useEffect(() => {
    (async () => {
      const currentProvider = detectCurrentProvider();
      if (currentProvider) {
        await currentProvider.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(currentProvider);
        const userAccount = await web3.eth.getAccounts();
        const account = userAccount[0];
        let ethBalance = await web3.eth.getBalance(account);
        sessionStorage.setItem("accountAddress", account);
        sessionStorage.setItem("accountBalance", ethBalance);
        setData({
          accountAddress: account,
          balance: ethBalance,
        });
      } else {
        alert("Metamask error");
      }
    })();
  }, []);

  const handleOnSignout = () => {
    onDisconnect();
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "600px",
    bgcolor: "background.paper",
    borderRadius: "20px",
    fontFamily: "Poppins",
    pt: 2,
    px: 4,
    pb: 3,
  };
  const rowStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: "1em",
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ ...style }}>
        <h1>Profile</h1>
        <Box sx={{ ...rowStyle }}>
          <Typography width={"10em"}>Account Address :</Typography>
          <Typography>{data.accountAddress}</Typography>
        </Box>
        <Box sx={{ ...rowStyle }}>
          <Typography width={"10em"}>Balance :</Typography>
          <Typography>{data.balance}</Typography>
        </Box>

        <Box sx={{ ...rowStyle }}>
          <Button
            variant="contained"
            color="warning"
            sx={{ marginRight: "auto" }}
            onClick={handleClose}
          >
            Close
          </Button>
          <Button variant="contained" color="error" onClick={handleOnSignout}>
            Logout
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
export default ProfileModal;
