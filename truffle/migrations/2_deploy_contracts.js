const MTwd = artifacts.require("MTwd");
const AToken = artifacts.require("Atoken");
const StakeA = artifacts.require("StakeA");
const RedeemPoolA = artifacts.require("RedeemPoolA")


module.exports = async function (deployer, network, accounts) {


  // deploy MTwd
  await deployer.deploy(MTwd);
  const mtwd = await MTwd.deployed()

  // deploy AToken
  await deployer.deploy(AToken);
  const atoken = await AToken.deployed()

  //deploy StakeA
  await deployer.deploy(StakeA, mtwd.address, atoken.address);
  const stakeA = await StakeA.deployed()

  //deploy RedeemPoolA
  await deployer.deploy(RedeemPoolA, atoken.address);
  const redeemPoolA = await RedeemPoolA.deployed()


  //transfer 1000 MTwd to investor
  await mtwd.transfer(accounts[1], '1000000000000000000000')



};
