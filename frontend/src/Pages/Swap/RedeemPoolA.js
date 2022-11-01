/* eslint-disable react/no-deprecated */
import { Component } from 'react';
import Web3 from 'web3';

import AToken from './abi/AToken.json';
import RedeempdA from './abi/RedeemPoolA.json';
import Main from './redeem_pool_frontend.js';

class RedeempoolA extends Component {
  constructor (props) {
    super(props);
    this.state = {
      account: '0x0',
      pdAToken: {},
      RedeempdA: {},
      pdATokenBalance: '0',
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

    // Load RedeempdA
    const RedeempdAData = RedeempdA.networks[networkId];
    if (RedeempdAData) {
      const RedeempoolpdA = new web3.eth.Contract(RedeempdA.abi, RedeempdAData.address);
      this.setState({ RedeempoolpdA });
    //   const stakingBalance = await RedeempoolpdA.methods.stakingBalance(this.state.account).call();
    //   this.setState({ stakingBalance: stakingBalance.toString() });
    } else {
      window.alert('RedeempdA contract not deployed to detected network.');
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
    this.state.pdAToken.methods.approve(this.state.RedeempdA._address, amount).send({ from: this.state.account, gasLimit: 10000000 }).on('transactionHash', (hash) => {
      this.state.RedeempdA.methods.redeem(amount).send({ from: this.state.account, gasLimit: 10000000 }).on('transactionHash', (hash) => {
        this.setState({ loading: false });
      });
    });
  };

  render () {
    let content;
    if (this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>;
    } else {
      content = <Main
        pdATokenBalance={this.state.pdATokenBalance}
        // stakingBalance={this.state.stakingBalance}
        stakeTokens={this.stakeTokens}
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

export default RedeempoolA;
