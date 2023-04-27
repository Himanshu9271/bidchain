import React, { useEffect, useState } from "react";
import Logo from "../assets/bidchainLogo.jpg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddBoxIcon from "@mui/icons-material/AddBox";
import NewAuctionModal from "./Modal/NewAuctionModal";
import { AddSvg } from "../assets/AddSvg.jsx";
import { DollarSvg } from "../assets/DollarSvg.jsx";
import { Profile } from "../assets/Profile";
import Web3 from "web3";
import config from "../config";
import { Box, Button } from "@mui/material";
import ProfileModal from "./Modal/ProfileModal";
import Entries from "./Entries";
function Auction({ detectCurrentProvider, onDisconnect }) {
  const [allAuctions, setAllAuctions] = useState([]);
  const [myAcutions, setMyAuctions] = useState([]);
  const [tab, setTab] = useState("all");
  const [openAuctionCreate, setOpenAuctionCreate] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const handleProfileOpen = () => setOpenProfile(true);
  const handleProfileClose = () => setOpenProfile(false);
  const handleAuctionCreateClose = () => setOpenAuctionCreate(false);
  const handleAuctionCreateOpen = () => setOpenAuctionCreate(true);
  let provider = detectCurrentProvider();
  const web3 = new Web3(provider);
  const AuctionCreation = new web3.eth.Contract(
    config.creatorABI,
    config.auctionCreatorAddress
  );
  const fetchAuctionDetails = async (address) => {
    const Auction = new web3.eth.Contract(config.auctionABI, address);
    const data = await Auction.methods.getAuctionDetails().call();
    // console.log(data);
    return data;
  };
  useEffect(() => {
    AuctionCreation.methods
      .getAuctions()
      .call()
      .then(async (response) => {
        let auctions = response[0];
        let resultPromise = auctions?.map((val) => {
          let data = fetchAuctionDetails(val);
          return data;
        });
        let result = await Promise.all(resultPromise);
        auctions?.forEach((val, id) => {
          result[id]["8"] = val;
        });
        console.log(result);
        setAllAuctions(result);
      });
  }, []);
  useEffect(() => {
    let filterData = allAuctions.filter(
      (val) => val["4"] === sessionStorage.getItem("accountAddress")
    );
    // console.log(filterData,'filter');
    setMyAuctions(filterData);
  }, [allAuctions]);
  // AuctionCreation.methods.createAuction('first Contract',' lorem ipsum', 500, 100).send({from:sessionStorage.getItem('accountAddress')}).then(console.log)
  return (
    <div className="auction_main">
      <div className="main_nav">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="profile">
          <div onClick={handleProfileOpen}>
            <Profile size="50" />
          </div>
          <ProfileModal
            open={openProfile}
            handleClose={handleProfileClose}
            detectCurrentProvider={detectCurrentProvider}
            onDisconnect={onDisconnect}
          />
        </div>
      </div>

      <div className="main_add">
        <AddBoxIcon
          style={{ color: "#A8499B", cursor: "pointer" }}
          onClick={handleAuctionCreateOpen}
          className="addIcon"
        />
      </div>
      <NewAuctionModal
        open={openAuctionCreate}
        detectCurrentProvider={detectCurrentProvider}
        handleClose={handleAuctionCreateClose}
      />
      <div className="main_table_container">
        <div className="main_tabs">
          <button
            style={{
              border: tab === "all" ? " 1px solid #A8499B" : "none",
            }}
            onClick={() => setTab("all")}
          >
            All auctions
          </button>
          <button
            style={{
              border: tab != "all" ? "1px solid #A8499B" : "none",
            }}
            onClick={() => setTab("my")}
          >
            My Auctions
          </button>
        </div>
        <div className="auction_entries">
          {tab === "all"
            ? allAuctions.map((entries, id) => {
                return (
                  <Entries
                    detectCurrentProvider={detectCurrentProvider}
                    entries={entries}
                    id={id}
                  />
                );
              })
            : myAcutions.map((entries, id) => {
                return (
                  <Entries
                    detectCurrentProvider={detectCurrentProvider}
                    entries={entries}
                    id={id}
                  />
                );
              })}
        </div>
      </div>
    </div>
  );
}

export default Auction;
