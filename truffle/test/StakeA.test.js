const MUsdt = artifacts.require("MUsdt");
const AToken = artifacts.require("AToken");
const StakeA = artifacts.require("StakeA");
const RedeemPoolA = artifacts.require("RedeemPoolA")

require('chai')
	.use(require('chai-as-promised'))
	.should()

function token(n) {
	return web3.utils.toWei(n, 'ether')
}

contract('StakeA', ([owner, investor]) => {
	let musdt, atoken, stakeA, redeemPoolA
	before(async() => {
		//load contract
		musdt = await MUsdt.new()
		atoken = await AToken.new()
		stakeA = await StakeA.new(musdt.address, atoken.address)
		redeemPoolA = await RedeemPoolA.new(atoken.address)

		//send 1000 Musdt to investor
		await musdt.transfer(investor, token('1000'), {from:owner})
	})

	describe("Musdt deployment", async() => {
		it('has a name', async() => {
			const name = await musdt.name()
			assert.equal(name, "MUsdt Token")
		})
		it('investor has 1000 musdt', async() => {
			const balance = await musdt.balanceOf(investor)
			assert.equal(balance,token('1000'))
		})
	})

	describe("Atoken deployment", async() => {
		it('has a name', async() => {
			const name = await atoken.name()
			const totalsupploy = await atoken.totalSupply()
			assert.equal(name,"AAA Token")
			assert.equal(totalsupploy, token('1000'))

		})
	})

	describe("StakeA deployment", async() => {
		it('has a name', async() => {
			const name = await stakeA.name()
			assert.equal(name, "Stake Pool A")

		})

	})

	describe("RedeemPoolA deployment", async() => {
		it('has a name', async() => {
			const name = await redeemPoolA.name()
			assert.equal(name, "Redeem Pool A")

		})

	})

	describe("add liquidity", async() => {
		it('owner successfully added 500 AToken and 500 MUsdt to pool', async() => {
			let result

			//check pool's musdt is equal to 0 before adding liquidity
			const balanceUsdt = await musdt.balanceOf(stakeA.address)
			assert.equal(balanceUsdt, token('0'))

			//check pool's A token is equal to 0 before adding liquidity
			const balanceTokenA = await atoken.balanceOf(stakeA.address)
			assert.equal(balanceTokenA, token('0'))

			//add liquidity(500 each)
			await atoken.approve(stakeA.address, token('500'), { from: owner })
			await musdt.approve(stakeA.address, token('500'), { from: owner })
			await stakeA.addLiquidity(token('500'),token('500'),{ from:owner })

			//check owner's token A amount is 500
			result = await atoken.balanceOf(owner)
			assert.equal(result.toString(), token('500'))

			//check owner's musdt amount is 999998500
			result = await musdt.balanceOf(owner)
			assert.equal(result.toString(), token('999998500'))

			//check pool's token A amount is 500
			result = await atoken.balanceOf(stakeA.address)
			assert.equal(result.toString(), token('500'))

			//check pool's musdt amount is 500
			result = await musdt.balanceOf(stakeA.address)
			assert.equal(result.toString(), token('500'))
		})
	})

	describe("withdraw liquidity", async() => {
		it('owner successfully withdrew 200 AToken and 200 MUSDT from pool', async() => {
			let result

			//withdraw liquidity(200 each)
			await stakeA.withdrawLiquidity(token('200'), token('200'), { from:owner })

			//check owner's musdt is 999998700
			result = await musdt.balanceOf(owner)
			assert.equal(result.toString(), token('999998700'))

			//check owner's token A is 700
			result = await atoken.balanceOf(owner)
			assert.equal(result.toString(), token('700'))

			//check pool's musdt amount is 300
			result = await musdt.balanceOf(stakeA.address)
			assert.equal(result.toString(), token('300'))

			//check pool's token A amount is 300
			result = await atoken.balanceOf(stakeA.address)
			assert.equal(result.toString(), token('300'))

		})
	})

	describe("Stake musdt and get token A", async() => {
		it('investor successfully staked 1 MUsdt for 1 A token ', async() => {
			let result

			//stake 5.5 musdt (only 4 is staked actually)
			await musdt.approve(stakeA.address, token('4'), {from : investor})
			await stakeA.stake(token('5.5'), {from : investor})

			//check investor's musdt amount is 996
			result = await musdt.balanceOf(investor)
			assert.equal(result.toString(), token('996'))

			//check investor's token A amount is 2
			result = await atoken.balanceOf(investor)
			assert.equal(result.toString(), token('2'))

			//check pool's musdt amount is 304
			result = await musdt.balanceOf(stakeA.address)
			assert.equal(result.toString(), token('304'))

			//check pool's token A amount is 298
			result = await atoken.balanceOf(stakeA.address)
			assert.equal(result.toString(), token('298'))
		})
	})

	describe("Redeem product A with a tokenA", async() => {
		it('investor successfully redeemed 1 product A with 1 tokenA', async() => {
			let result

			//redeem with 1 Token A
			await atoken.approve(redeemPoolA.address, token('1'), {from:investor})
			await redeemPoolA.redeem(token('1'), {from:investor})

			//check investor's token A amount is 1
			result = await atoken.balanceOf(investor)
			assert.equal(result.toString(), token('1'))

			//check RedeemPoolA's token A amount is 1
			result = await atoken.balanceOf(redeemPoolA.address)
			assert.equal(result.toString(), token('1'))
		})
	})











	


})