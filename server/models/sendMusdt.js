const { ethers } = require('ethers');
require('dotenv').config();

const provider = new ethers.providers.JsonRpcProvider(process.env.JsonRpcProvider);
const privateKey = process.env.MusdtOwnerPrivateKey;
const wallet = new ethers.Wallet(privateKey, provider);
const tokenAddress = '0x09f585e350d4e5158912fee72cdb04552391dd07';
const tokenAbi = [{ inputs: [], payable: false, stateMutability: 'nonpayable', type: 'constructor' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'address', name: '_owner', type: 'address' }, { indexed: true, internalType: 'address', name: '_spender', type: 'address' }, { indexed: false, internalType: 'uint256', name: '_value', type: 'uint256' }], name: 'Approval', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'address', name: '_from', type: 'address' }, { indexed: true, internalType: 'address', name: '_to', type: 'address' }, { indexed: false, internalType: 'uint256', name: '_value', type: 'uint256' }], name: 'Transfer', type: 'event' }, { constant: true, inputs: [{ internalType: 'address', name: '', type: 'address' }, { internalType: 'address', name: '', type: 'address' }], name: 'allowance', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: false, inputs: [{ internalType: 'address', name: '_spender', type: 'address' }, { internalType: 'uint256', name: '_value', type: 'uint256' }], name: 'approve', outputs: [{ internalType: 'bool', name: 'success', type: 'bool' }], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: true, inputs: [{ internalType: 'address', name: '', type: 'address' }], name: 'balanceOf', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'decimals', outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'name', outputs: [{ internalType: 'string', name: '', type: 'string' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'symbol', outputs: [{ internalType: 'string', name: '', type: 'string' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'totalSupply', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: false, inputs: [{ internalType: 'address', name: '_to', type: 'address' }, { internalType: 'uint256', name: '_value', type: 'uint256' }], name: 'transfer', outputs: [{ internalType: 'bool', name: 'success', type: 'bool' }], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: false, inputs: [{ internalType: 'address', name: '_from', type: 'address' }, { internalType: 'address', name: '_to', type: 'address' }, { internalType: 'uint256', name: '_value', type: 'uint256' }], name: 'transferFrom', outputs: [{ internalType: 'bool', name: 'success', type: 'bool' }], payable: false, stateMutability: 'nonpayable', type: 'function' }];
const contract = new ethers.Contract(tokenAddress, tokenAbi, wallet);

const receiver = '0x69eFCCA88a0E0D584c6D73Be71e2c957bD881E12';

const sendMusdt = async (amountToSend) => {
  const decimals = await contract.decimals();
  const tx = await contract.transfer(receiver, ethers.utils.parseEther(amountToSend, decimals), { gasLimit: 100000 });
  console.log(tx);
  return tx;
};

module.exports = {
  sendMusdt
};
