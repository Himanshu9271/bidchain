import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { DollarSvg } from "../assets/DollarSvg";
import { AddSvg } from "../assets/AddSvg";
import ViewAuctionModal from "./Modal/ViewAuctionModal";
const Entries = ({ entries, id, detectCurrentProvider }) => {
  const [openAuction, setOpenAuction] = useState(false);
  const handleAuctionOpen = () => setOpenAuction(true);
  const handleAuctionClose = () => setOpenAuction(false);
  return (
    <Box
      key={id}
      sx={{
        width: "60%",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        backgroundColor: "#FF7043",
        margin: "1em",
        borderRadius: "50px",
        height: "5em",
        padding: ".5em",
      }}
    >
      <Box
        sx={{
          marginLeft: "1em",
          display: "flex",
          flexDirection: "column",
          width: "30%",
          margin: "2.5em",
        }}
      >
        <p>{entries["0"]}</p>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <DollarSvg size={20} />
            <Box ml="0.5em">{entries["2"]}</Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <AddSvg size={20} />
            <Box ml="0.5em"> {entries["6"]}</Box>
          </Box>
        </Box>
      </Box>
      <Button
        sx={{ marginRight: "1em" }}
        variant="contained"
        color="info"
        onClick={handleAuctionOpen}
      >
        View
      </Button>
      <ViewAuctionModal
        open={openAuction}
        handleClose={handleAuctionClose}
        detectCurrentProvider={detectCurrentProvider}
        auction={entries}
      />
    </Box>
  );
};
export default Entries;
