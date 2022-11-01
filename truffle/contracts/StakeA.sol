pragma solidity >= 0.5.0;

import "./MTwd.sol";
import "./AToken.sol";

contract StakeA {
	string public name = "Stake Pool A";
	MTwd public mtwd;
	AToken public atoken;
	address public owner;
	//set transfer rate   
	uint public rateStake = 1;

	//add stakingBalance
    mapping(address => uint) public stakingBalance;
	
	

	constructor(MTwd _mtwd ,AToken _atoken) public {
		mtwd = _mtwd;
		atoken = _atoken;
		// set deployer as owner of the contract
		owner = msg.sender;
	}

	function addLiquidity(uint _addLiquidityAmountTwd, uint _addLiquidityAmountA) public {
		//only owner can add liquidity && adding amount should >= 0 && liquidity provider should have enough token 
		require(msg.sender == owner);
		require(_addLiquidityAmountTwd>= 0, "adding amount Twd should be greater than 0");
		require(_addLiquidityAmountA >= 0, "adding amount A should be greater than 0");
		require(mtwd.balanceOf(msg.sender) >= _addLiquidityAmountTwd);
		require(atoken.balanceOf(msg.sender) >= _addLiquidityAmountA);

		// add liquidity 
		mtwd.transferFrom(msg.sender, address(this), _addLiquidityAmountTwd);
		atoken.transferFrom(msg.sender, address(this), _addLiquidityAmountA);
		

	}

	function withdrawLiquidity(uint _withdrawLiquidityAmountTwd, uint _withdrawLiquidityAmountA) public {
		//only owner can withdraw liquidity &&  withdrawing amount should >=0 && pool should have enough token to be withdrew
		require(msg.sender == owner);
		require(_withdrawLiquidityAmountTwd >= 0, "withdrawing amount Twd should be greater than 0");
		require(_withdrawLiquidityAmountA >= 0, "withdrawing amount A should be greater than 0");
		require(mtwd.balanceOf(address(this)) >= _withdrawLiquidityAmountTwd);
		require(atoken.balanceOf(address(this)) >= _withdrawLiquidityAmountA);

		//withdraw liquidity
		mtwd.transfer(msg.sender, _withdrawLiquidityAmountTwd);
		atoken.transfer(msg.sender, _withdrawLiquidityAmountA);
	}

	function stake(uint _amountTwd) public {

		//investors cannot stake more MUsdt than they have
		require(mtwd.balanceOf(msg.sender) >= _amountTwd);

		//erc20 token: 1 ether == 10^18 wei
		uint unit = 10 ** 18;

		//transform _amountTwd to the form of "ether basis" and round to integer
		uint amountTwdInEther = _amountTwd / unit;

		//calculate how much A token to transfer to staker
		uint amountATokenInEther = amountTwdInEther / rateStake;

		//pool has enough token A 
		require(atoken.balanceOf(address(this)) >= amountATokenInEther*unit);

		//transfer twd from investor's wallet to pool
		mtwd.transferFrom(msg.sender, address(this), amountATokenInEther*rateStake*unit);

		//transfer A token from pool to investor
		atoken.transfer(msg.sender, amountATokenInEther*unit);

		// Update staking balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amountTwd;

	}


}