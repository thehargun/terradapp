import { getChainOptions, WalletProvider } from '@terra-money/wallet-provider';
import { ConnectWallet } from 'components/ConnectWallet';
import { YourBalance } from 'components/YourBalance';
import { Donation } from 'components/Donation';
import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

function App() {
  return (
    <main
      style={{display: 'flex', flexDirection: 'column', gap: 40 }}
    >
      <div style={{position:'absolute',top:'0',right:'0',float:'right',marginTop:'50px',marginRight:'5%',marginLeft:'60%',textAlign:'right'}}>
      <ConnectWallet />
        </div>
        <div style={{position:'absolute', paddingTop:'300px',width:'20%', left:'40%',right:'40%',textAlign:'center'}}>
        <YourBalance />
        <br></br>
        <br></br>
      <Donation />
        </div>
    </main>
  );
}

getChainOptions().then((chainOptions) => {
  ReactDOM.render(
    <WalletProvider {...chainOptions}>
      <App />
    </WalletProvider>,
    document.getElementById('root'),
  );
});
