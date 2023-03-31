import React from "react";
import Logo from "../assets/bidchainLogo.jpg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddBoxIcon from "@mui/icons-material/AddBox";
function Auction() {
  return (
    <div className="auction_main">
      <div className="main_nav">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="profile">
          <AccountCircleIcon className="accountIcon" />
        </div>
      </div>
      <div className="main_add">
        <AddBoxIcon className="addIcon" />
      </div>
      <div className="main_table_container">
        <div className="main_tabs">
          <button>All</button>
          <button>Recent</button>
          <button>Created</button>
        </div>
        <div className="main_table">
          <table>
            <thead>
              <th>Title</th>
              <th>CurrentBid</th>
              <th>ContractAddress</th>
              <th>EndDate</th>
              <th>Bid</th>
            </thead>
            <tbody>
              <tr>
                <td>Lorem </td>
                <td>lorem</td>
                <td>lorem</td>
                <td>lorem</td>
                <td>lorem</td>
              </tr>
              <tr>
                <td>lorem</td>
                <td>lorem</td>
                <td>lorem</td>
                <td>lorem</td>
                <td>lorem</td>
              </tr>
              <tr>
                <td>lorem</td>
                <td>lorem</td>
                <td>lorem</td>
                <td>lorem</td>
                <td>lorem</td>
              </tr>
              <tr>
                <td>lorem</td>
                <td>lorem</td>
                <td>lorem</td>
                <td>lorem</td>
                <td>lorem</td>
              </tr>
              <tr>
                <td>lorem</td>
                <td>lorem</td>
                <td>lorem</td>
                <td>lorem</td>
                <td>lorem</td>
              </tr>
              <tr>
                <td>lorem</td>
                <td>lorem</td>
                <td>lorem</td>
                <td>lorem</td>
                <td>lorem</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Auction;
