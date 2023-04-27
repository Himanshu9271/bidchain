import React, { useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import Web3 from "web3";
import config from "../../config";
const ViewAuctionModal = ({
  open,
  handleClose,
  detectCurrentProvider,
  auction,
}) => {
  const [data, setData] = useState("");
  const checkBid = () => {};
  const handleOnChange = (e) => {
    setData(e.target.value);
  };
  let provider = detectCurrentProvider();
  const web3 = new Web3(provider);
  const Auction = new web3.eth.Contract(config.auctionABI, auction["8"]);

  const bid = async () => {
    try {
      let address = await Auction.methods
        .bid()
        .send({
          from: sessionStorage.getItem("accountAddress"),
          value: web3.utils.toWei(data, "wei"),
        });
      console.log(address);
      handleClose();
    } catch (e) {
      alert("Send Fail");
      console.log(e);
      // handleError()
    }
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
        <h1>View Auction: {auction["0"]}</h1>
        <Box sx={{ ...rowStyle }}>
          <Typography width={"10em"}>Auction Name :</Typography>
          <Typography>{auction["0"]}</Typography>
        </Box>
        <Box sx={{ ...rowStyle }}>
          <Typography width={"10em"}>Description :</Typography>
          <Typography>{auction["1"]}</Typography>
        </Box>
        <Box sx={{ ...rowStyle }}>
          <Typography width={"10em"}>Initial bid :</Typography>
          <Typography>{auction["2"]}</Typography>
        </Box>
        <Box sx={{ ...rowStyle }}>
          <Typography width={"10em"}>Bid Increment :</Typography>
          <Typography>{auction["3"]}</Typography>
        </Box>
        <Box sx={{ ...rowStyle }}>
          <Typography width={"10em"}>Creator Address :</Typography>
          <Typography>{auction["4"]}</Typography>
        </Box>
        <Box sx={{ ...rowStyle }}>
          <Typography width={"10em"}>Higest Bidder :</Typography>
          <Typography>{auction["5"]}</Typography>
        </Box>
        <Box sx={{ ...rowStyle }}>
          <Typography width={"10em"}>Current Bid :</Typography>
          <Typography>{auction["6"]}</Typography>
        </Box>
        <Box sx={{ ...rowStyle }}>
          <Typography width={"10em"}>Bid Status :</Typography>
          <Typography>{auction["7"] ? "Ended" : "Active"}</Typography>
        </Box>
        <Box sx={{ ...rowStyle }}>
          <Typography width={"10em"}>Auction Address :</Typography>
          <Typography>{auction["8"]}</Typography>
        </Box>
        <Box sx={{ ...rowStyle }}>
          <TextField
            width={"10em"}
            type="number"
            onChange={handleOnChange}
            disabled={
              auction["7"] ||
              auction["4"] == sessionStorage.getItem("accountAddress")
            }
          />
          <Button
            sx={{ marginLeft: "auto" }}
            variant="contained"
            disabled={
              auction["7"] ||
              auction["4"] == sessionStorage.getItem("accountAddress")
            }
            color="success"
            onClick={bid}
          >
            Bid
          </Button>
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
        </Box>
      </Box>
    </Modal>
  );
};
export default ViewAuctionModal;
