import { Fee, MsgSend } from '@terra-money/terra.js';
import {
  CreateTxFailed,
  Timeout,
  TxFailed,
  TxResult,
  TxUnspecifiedError,
  useConnectedWallet,
  UserDenied,
} from '@terra-money/wallet-provider';
import React, { useCallback, useState } from 'react';

const DONATE_ADDRESS = 'terra175utwnj7hzqxehzs0a5y903rgtz37wul42862f';

export function Donation() {
  const [txResult, setTxResult] = useState<TxResult | null>(null);
  const [txError, setTxError] = useState<string | null>(null);

  const connectedWallet = useConnectedWallet();

  const proceed = useCallback(() => {
    if (!connectedWallet) {
      return;
    }

    setTxResult(null);
    setTxError(null);

    connectedWallet
      .post({
        fee: new Fee(300000, '200000uusd'),
        msgs: [
          new MsgSend(connectedWallet.walletAddress, DONATE_ADDRESS, {
            uusd: 5000000,
          }),
        ],
      })
      .then((nextTxResult: TxResult) => {
        console.log(nextTxResult);
        setTxResult(nextTxResult);
      })
      .catch((error: unknown) => {
        if (error instanceof UserDenied) {
          setTxError('User Denied');
        } else if (error instanceof CreateTxFailed) {
          setTxError('Create Tx Failed: ' + error.message);
        } else if (error instanceof TxFailed) {
          setTxError('Tx Failed: ' + error.message);
        } else if (error instanceof Timeout) {
          setTxError('Timeout');
        } else if (error instanceof TxUnspecifiedError) {
          setTxError('Unspecified Error: ' + error.message);
        } else {
          setTxError(
            'Unknown Error: ' +
              (error instanceof Error ? error.message : String(error)),
          );
        }
      });
  }, [connectedWallet]);

  return (
    <div>
      <h1 style={{color: 'white'}}>Buy me Coffee?</h1>

      {connectedWallet?.availablePost && !txResult && !txError && (
        <button style={{color: 'white', background: 'black',fontSize:'24px'}} onClick={proceed}>Send $5 to hargun.ust</button>
      )}

      {txResult && (
        <>
          {connectedWallet && txResult && (
            <div>
              <a
                href={`https://finder.terra.money/${connectedWallet.network.chainID}/tx/${txResult.result.txhash}`}
                target="_blank"
                rel="noreferrer"
              >
                Open Tx Result in Terra Finder
              </a>
            </div>
          )}
        </>
      )}

      {txError && <pre style={{color: 'white'}}>{txError}</pre>}

      {(!!txResult || !!txError) && (
        <button
          onClick={() => {
            setTxResult(null);
            setTxError(null);
          }}
          style={{color: 'white'}}>
          Thank You!
        </button>
      )}

      {!connectedWallet && <p style={{color: 'white'}}>Wallet not connected!</p>}

      {connectedWallet && !connectedWallet.availablePost && (
        <p style={{color: 'white'}}>This connection does not support post()</p>
      )}
    </div>
  );
}
