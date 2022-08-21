import Web3 from "web3";
import Web3Modal from "web3modal";
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import WalletConnectProvider from "@walletconnect/web3-provider";

const providerOptions = {
  /* See Provider Options Section */
    walletconnect: {
        package: WalletConnectProvider, // required
        options: {
            qrcode: true,
            rpc: {
                56: `https://hardworking-divine-ensemble.bsc.discover.quiknode.pro/43958efedb5ffdfbb03ed542992a33da7b09a51f/`,
            },
        }
    },
    coinbasewallet: {
        package: CoinbaseWalletSDK, // Required
        options: {
          appName: "My Awesome App", // Required
          infuraId: "INFURA_ID", // Required
          rpc: "", // Optional if `infuraId` is provided; otherwise it's required
          chainId: 1, // Optional. It defaults to 1 if not provided
          darkMode: false // Optional. Use dark theme, defaults to false
        }
    }
};

const web3Modal = new Web3Modal({
  network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions // required
});

const provider = web3Modal.connect();

const web3 = new Web3(provider);
