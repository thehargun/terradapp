import { LCDClient } from '@terra-money/terra.js';
import { useConnectedWallet } from '@terra-money/wallet-provider';
import React, { useEffect, useMemo, useState } from 'react';

export function YourBalance() {
  const connectedWallet = useConnectedWallet();

  const [bank, setBank] = useState<null | string>();

  const lcd = useMemo(() => {
    if (!connectedWallet) {
      return null;
    }

    return new LCDClient({
      URL: connectedWallet.network.lcd,
      chainID: connectedWallet.network.chainID,
    });
  }, [connectedWallet]);

  useEffect(() => {
    if (connectedWallet && lcd) {
      lcd.bank.balance(connectedWallet.walletAddress).then(([coins]) => {
        setBank(parseInt(coins.toString())/(1000000) + ' UST');
      });
    } else {
      setBank(null);
    }
  }, [connectedWallet, lcd]);

  return (
    <div>
      <h1 style={{color: 'white'}}>Your Balance</h1>
      {bank && <pre style={{color: 'white'}}>{bank}</pre>}
      {!connectedWallet && <p style={{color: 'white'}}>Wallet not connected!</p>}
    </div>
  );
}
