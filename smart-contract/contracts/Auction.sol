// SPDX-License-Identifier: GPL-3.0
// Created By: Himanshu Bharti
pragma solidity ^0.8.0;

contract Auction {
    string public name;
    string public description;
    uint256 public initialBid;
    uint256 public bidIncrement;
    address public creator;
    address public highestBidder;
    uint256 public highestBid;
    bool public ended;
    
    mapping(address => uint256) public bids;
    
    event AuctionEnded(address winner, uint256 amount);
    
    constructor(
        string memory _name,
        string memory _description,
        uint256 _initialBid,
        uint256 _bidIncrement,
        address _creator
    ) {
        name = _name;
        description = _description;
        initialBid = _initialBid;
        bidIncrement = _bidIncrement;
        creator = _creator;
    }
    
   function bid() public payable {
        require(msg.value >= initialBid, "Bid amount is less than initial bid.");
        require(msg.value >= highestBid + bidIncrement, "Bid amount is less than current bid + bid increment.");
        require(msg.sender != creator, "Creator cannot bid on their own auction.");
        require(!ended, "Auction has already ended.");

        // Refund the previous highest bidder
        if (highestBidder != address(0)) {
            bids[highestBidder] += highestBid;
            payable(highestBidder).transfer(highestBid);
        }

        // Update the highest bidder and highest bid amount
        highestBidder = msg.sender;
        highestBid = msg.value;
    }
    
    function endAuction() public payable {
        require(msg.sender == creator, "Only creator can end the auction");
        require(!ended, "Auction has already ended");
        
        ended = true;
        emit AuctionEnded(highestBidder, highestBid);
        payable(creator).transfer(highestBid);
    }
    
    function getAuctionDetails() public view returns (
        string memory,
        string memory,
        uint256,
        uint256,
        address,
        address,
        uint256,
        bool
    ) {
        return (
            name,
            description,
            initialBid,
            bidIncrement,
            creator,
            highestBidder,
            highestBid,
            ended
        );
    }
}
