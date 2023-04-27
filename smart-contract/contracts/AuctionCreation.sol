// SPDX-License-Identifier: GPL-3.0
// Created By: Himanshu Bharti
pragma solidity ^0.8.0;

import "./Auction.sol";

contract AuctionCreation {
    mapping(address => address) public auctions;
    // uint length = 0;
    address[] public keys;

    function createAuction( string memory _name , string memory _description , uint  _initailBid,uint  _bidIncrement ) public payable returns(address) {
        Auction newAuction = new Auction(_name, _description, _initailBid, _bidIncrement, msg.sender);
        auctions[address(newAuction)] = msg.sender ;
        keys.push(address(newAuction));
    }
    
    function getAuctions() public view returns (address[] memory, address[] memory ) {
        

        address[] memory values = new address[](keys.length);

        // uint256 counter = 0;
        for (uint256 i = 0;i<keys.length;i++) {
            
            values[i] = auctions[keys[i]];
            
        }

        return (keys, values);
    }
    // getAuctions done
}
