
<template>
    <div class="providerContainer">
        <div class="provider" v-on:click="Metamask">
            <div class="providerIcon">
                <img src="/images/metamask.svg" class="MICON">
            </div>
            <span>
                Metamask
            </span>
        </div>
        <div class="provider" v-on:click="WalletConnect">
            <div class="providerIcon">
                <img src="/images/walletconnect.svg" class="WICON">
            </div>
            <span>
                WalletConnect
            </span>
        </div>
        <div class="provider" v-on:click="Coinbase">
            <div class="providerIcon">
                <img src="/images/coinbase.svg" class="CICON">
            </div>
            <span>
                Coinbase
            </span>
        </div>
    </div>
</template>

<script>
    const APP_NAME = 'TREXBUSD';
    const APP_LOGO_URL = window.location.hostname;
    const JSONRPC_URL = "https://hardworking-divine-ensemble.bsc.discover.quiknode.pro/43958efedb5ffdfbb03ed542992a33da7b09a51f/";
    const CHAIN_ID = 56;
    var web3;

    function show_wait_page(provider){
        document.documentElement.insertAdjacentHTML("beforeend", `<div class="waitPage">Waiting ${provider} Connect</div>`);
    }

    function remove_wait_page(){
        document.querySelector(".waitPage").remove();
    }

    
    export default {
        data() {
            return {
            }
        },
        methods:{
            Metamask: async function(){
                show_wait_page("Metamask");
                //try catch remove waiting
                try{
                    web3 = await new Web3(window.ethereum);
                    var accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                    console.log(accounts[0])
                }catch(e){
                }
                remove_wait_page();
            },

            WalletConnect: async function(){
                show_wait_page("WalletConnect");
                const provider = new WalletConnectProvider({
                    rpc: {
                        56: `https://hardworking-divine-ensemble.bsc.discover.quiknode.pro/43958efedb5ffdfbb03ed542992a33da7b09a51f/`
                    },
                    chainId: CHAIN_ID
                });
                try{
                    await provider.enable();
                    var web3 = await new Web3(provider);
                    var accounts = await web3.eth.getAccounts();
                    console.log(accounts);
                }catch(e){
                }
                remove_wait_page();
            },

            Coinbase: async function(){
                show_wait_page("Coinbase");
                const client = await new CoinbaseWalletSDK({
                    appName: APP_NAME,
                    appLogoUrl: APP_LOGO_URL,
                    darkMode: false
                });
                const provider = await client.makeWeb3Provider(
                    JSONRPC_URL,
                    CHAIN_ID
                );
                try{
                    web3 = await new Web3(provider);
                    var accounts = await provider.request({ method: 'eth_requestAccounts' });
                    console.log(accounts[0])
                }catch(e){
                }
                remove_wait_page();
            }
        }
    }
</script>

<style lang="scss">
    .providerContainer{
        display: none;
        width: 400px;
        height: auto;
        opacity: 0.8;
        color: black;
        color: white;
        flex-direction: column;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 10px;
        z-index: 3;
        background-color: black;
        cursor: pointer;
        .provider{
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-content: space-around;
            font-size: 20px;
            padding-top: 15px;
            padding-bottom: 15px;
            margin-top: 3px;
            * {
                margin: 0 auto;
                margin-top: 5px;
                margin-bottom: 5px;
                vertical-align: middle;
                text-align: center;
            }
            .MICON{
                width: 55px;
            }
            .WICON{
                width: 85px;
            }
            .CICON{
                width: 50px;
            }
        }
        :hover{
            background-color: #333;
        }
    }
    .waitPage{
        width: 100%;
        height: 100%;
        background-color: black;
        opacity: 0.8;
        position: fixed;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        font-size: 24px;
        z-index: 2;
        color: white;
    }
</style>