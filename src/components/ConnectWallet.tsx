import { useWallet, WalletStatus } from '@terra-money/wallet-provider';
import React from 'react';

export function ConnectWallet() {
  const {
    status,
    network,
    wallets,
    availableConnectTypes,
    availableInstallTypes,
    availableConnections,
    supportFeatures,
    connect,
    install,
    disconnect,
  } = useWallet();
  app_status = 'Not Connected'
  if(status == 'WALLET_CONNECTED'){
    var app_status = 'Wallet Connected'
  }
  
  return (
    <div>
      <h1 style={{color: 'white'}}>Connect Wallet</h1>
      <section>
        <pre style={{color: 'white'}}>
          {(app_status)}
        </pre>
      </section>

      <footer>
        {status === WalletStatus.WALLET_NOT_CONNECTED && (
          <>
            
            <br />
            {availableConnections.map(
              ({ type, name, icon }) => (
                
                <button
                  key={'connection-' + type}
                  onClick={() => connect(type)}
                >
                  <img
                    src={icon}
                    alt={name}
                    style={{ width: '1em', height: '1em' }}
                  />
                  {name}
                </button>
              ),
            )}
          </>
        )}
        {status === WalletStatus.WALLET_CONNECTED && (
          <button onClick={() => disconnect()}>Disconnect</button>
        )}
      </footer>
    </div>
  );
}
