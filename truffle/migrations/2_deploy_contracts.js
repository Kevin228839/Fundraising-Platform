const MUsdt = artifacts.require("MUsdt");
const AToken = artifacts.require("Atoken");
const StakeA = artifacts.require("StakeA");
const RedeemPoolA = artifacts.require("RedeemPoolA")


module.exports = async function (deployer, network, accounts) {


  // deploy MUsdt
  await deployer.deploy(MUsdt);
  const musdt = await MUsdt.deployed()

  // deploy AToken
  await deployer.deploy(AToken);
  const atoken = await AToken.deployed()

  //deploy StakeA
  await deployer.deploy(StakeA, musdt.address, atoken.address);
  const stakeA = await StakeA.deployed()

  //deploy RedeemPoolA
  await deployer.deploy(RedeemPoolA, atoken.address);
  const redeemPoolA = await RedeemPoolA.deployed()


  //transfer 1000 MUsdt to investor
  await musdt.transfer(accounts[1], '1000000000000000000000')



};
