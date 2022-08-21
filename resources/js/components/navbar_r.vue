<template>
    <div class="navbarR">
        <div class="language" v-on:click="toggleLanguage">
            <span>{{language}}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
            </svg>
        </div>
        <div class="langContainer">
            <label>
                EN<input type="radio" value="EN" v-model="language">
            </label>
            <!-- <label>
                中文<input type="radio" value="中文" v-model="language">
            </label> -->
        </div>
        <a class="navbarC">Telegram</a>
        <a class="navbarC" v-on:click="open">CONNECT WALLET</a>
        <vd-board :connectors="connectors" dark />
    </div>
</template>
<script>

import {
  useBoard,
  useEthers,
  useWallet,
  displayChainName,
  displayEther,
  shortenAddress,
  ChainId,
  useEthersHooks,
  MetaMaskConnector,
  WalletConnectConnector,
  CoinbaseWalletConnector,
} from 'vue-dapp';



  
export default {
    
    data: function(){
        return{
            language: "EN",
            langFlag: 0
        }
    },
    setup() {
        const { open } = useBoard();

        const { wallet, disconnect, onDisconnect, onAccountsChanged, onChainChanged } =
        useWallet()
        const { address, balance, chainId, isActivated, dnsAlias } = useEthers()
        const { onActivated, onChanged } = useEthersHooks()


        onDisconnect(() => {
            console.log('disconnect');
        })
        onAccountsChanged(() => {
            console.log('accounts changed');
        })
        onChainChanged((chainId) => {
            console.log('chain changed', chainId);
        })
        
        onActivated(() => {
            console.log(chainId.value);
            wallet.connector.switchChain(97);
        })
        onChanged(() => {
        console.log(chainId.value);
        })
        const infuraId = "7c15b9cfa231404394841593b5371ee8";
        const connectors = [
            new MetaMaskConnector({
                //appUrl: "https://special-young-spree.bsc-testnet.discover.quiknode.pro/1ced5f728c8c04d6f10b2709d9c03606b0e6ae13/",
                // appUrl: "https://hardworking-divine-ensemble.bsc.discover.quiknode.pro/43958efedb5ffdfbb03ed542992a33da7b09a51f/",
                appUrl: `https://mainnet.infura.io/v3/${infuraId}`
            }),
            new WalletConnectConnector({
                qrcode: true,
                rpc: {
                    // 97: `https://special-young-spree.bsc-testnet.discover.quiknode.pro/1ced5f728c8c04d6f10b2709d9c03606b0e6ae13/`,
                    56: `https://hardworking-divine-ensemble.bsc.discover.quiknode.pro/43958efedb5ffdfbb03ed542992a33da7b09a51f/`,
                },
                chainId: 56
            }),
            new CoinbaseWalletConnector({
                appName: "Vue Dapp",
                // jsonRpcUrl: `https://special-young-spree.bsc-testnet.discover.quiknode.pro/1ced5f728c8c04d6f10b2709d9c03606b0e6ae13/`,
                jsonRpcUrl: `https://hardworking-divine-ensemble.bsc.discover.quiknode.pro/43958efedb5ffdfbb03ed542992a33da7b09a51f/`,
                // jsonRpcUrl: `https://mainnet.infura.io/v3/${infuraId}`
            }),
        ];
        return {
            connectors,
            open,
        };
    },
    methods: {
        // connect_wallet: async function(){
        //     await web3_init();
        //     console.log(accounts);
        //     //await createContract();
        //     //await createToken();
        // },

        toggleLanguage: function(){
            document.querySelector(".langContainer").classList.toggle("visible");
            document.querySelector(".language").querySelector(".bi-chevron-down").classList.toggle("spin180");
            if(this.langFlag == 0){
                window.addEventListener("click", function(e){
                    if(e.target.closest(".langContainer") == null && e.target.closest(".language") == null){
                        document.querySelector(".langContainer").classList.remove("visible");
                        document.querySelector(".language").querySelector(".bi-chevron-down").classList.remove("spin180");
                    }
                });
                this.langFlag = 1;
            }
        }
    }
}
</script>
<style lang="scss">
    .navbarR{
        display: flex;
        flex-direction: row;
        position: relative;
        justify-content: flex-start;
        align-items: center;
    }
    .language{
        display: inline-block;
        position: relative;
        color: white;
        font-size: 0.9vw;
        width: fit-content;
        height: fit-content;
        padding: 1vw;
        margin-right: 1vw;
        cursor: pointer;
        transition: all 1s;
    }
    .language *{
        margin: 0.5vw;
        vertical-align: middle;
        cursor: pointer;
        left: -1vw;
        text-align: center;
    }
    .langContainer{
        position: absolute;
        display: block;
        width: fit-content;
        height: fit-content;
        opacity: 0;
        visibility: hidden;
        transition: all 1s;
        font-size: 0.9vw;
        width: 8vw;
        color: white;
        left: -1.8vw;
        top: 3.6vw;
        label{
            display: block;
            padding: 0.5vw;
            margin: 0 auto;
            text-align: center;
            input{
                display: none;
            }
        }
    }
    
</style>