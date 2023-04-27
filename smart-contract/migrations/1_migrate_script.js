var MyContract = artifacts.require("AuctionCreation");

module.exports = function (deployer) {
  // deployment steps
  deployer.deploy(MyContract);
};
