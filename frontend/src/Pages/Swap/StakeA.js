/* eslint-disable react/no-deprecated */
import { Component } from 'react';
import Web3 from 'web3';
import MTwd from './abi/MTwd.json';
import AToken from './abi/AToken.json';
import StakeA from './abi/StakeA.json';
import Main from './stake_swp_frontend.js';

class TWDSwapStakeA extends Component {
  constructor (props) {
    super(props);
    this.state = {
      account: '0x0',
      MTwdToken: {},
      pdAToken: {},
      StakepdA: {},
      MTwdTokenBalance: '0',
      pdATokenBalance: '0',
      stakingBalance: '0',
      loading: true
    };
  }

  async componentWillMount () {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadBlockchainData () {
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0]);
    this.setState({ account: accounts[0] });

    const networkId = await web3.eth.net.getId();

    // Load MTwdToken
    const MTwdTokenData = MTwd.networks[networkId];
    if (MTwdTokenData) {
      // create a js version contract
      const MTwdToken = new web3.eth.Contract(MTwd.abi, MTwdTokenData.address);
      this.setState({ MTwdToken });
      const MTwdTokenBalance = await MTwdToken.methods.balanceOf(this.state.account).call();
      this.setState({ MTwdTokenBalance: MTwdTokenBalance.toString() });
    } else {
      window.alert('MTwdToken contract not deployed to detected network.');
    }

    // Load pdAToken
    const pdATokenData = AToken.networks[networkId];
    if (pdATokenData) {
      const pdAToken = new web3.eth.Contract(AToken.abi, pdATokenData.address);
      this.setState({ pdAToken });
      const pdATokenBalance = await pdAToken.methods.balanceOf(this.state.account).call();
      this.setState({ pdATokenBalance: pdATokenBalance.toString() });
    } else {
      window.alert('pdAToken contract not deployed to detected network.');
    }

    // Load StakepdA
    const StakepdAData = StakeA.networks[networkId];
    if (StakepdAData) {
      const StakepdA = new web3.eth.Contract(StakeA.abi, StakepdAData.address);
      this.setState({ StakepdA });
      // const stakingBalance = 50 * Math.pow(10, 18);
      const stakingBalance = await StakepdA.methods.stakingBalance(this.state.account).call();
      this.setState({ stakingBalance: stakingBalance.toString() });
    } else {
      window.alert('StakepdA contract not deployed to detected network.');
    }

    this.setState({ loading: false });
  }

  async loadWeb3 () {
    if (window.etherum) {
      window.web3 = new Web3(window.etherum);
      await window.etherum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying Metamask!');
    }
  }

  stakeTokens = (amount) => {
    this.setState({ loading: true });
    this.state.MTwdToken.methods.approve(this.state.StakepdA._address, amount).send({ from: this.state.account, gasLimit: 10000000 }).on('transactionHash', (hash) => {
      this.state.StakepdA.methods.stake(amount).send({ from: this.state.account, gasLimit: 10000000 }).on('transactionHash', (hash) => {
        this.setState({ loading: false });
      });
    });
  };

  unstakeTokens = (amount) => {
    this.setState({ loading: true });
    this.state.StakepdA.methods.unstakeTokens().send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false });
    });
  };

  render () {
    let content;
    if (this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>;
    } else {
      content = <Main
        MTwdTokenBalance={this.state.MTwdTokenBalance}
        pdATokenBalance={this.state.pdATokenBalance}
        stakingBalance={this.state.stakingBalance}
        stakeTokens={this.stakeTokens}
        unstakeTokens={this.unstakeTokens}
      />;
    }

    return (
      <div>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>
                {content}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default TWDSwapStakeA;
