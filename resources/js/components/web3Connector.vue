
<template>
    <div class="providerContainer">
        <div class="provider mobileInvalid" v-on:click="Metamask">
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

    const BUSD_Address = "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee";
    //const BUSD_Address = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";
    const contract_address = "0xB6475E4924e1969CB52E38d37246B233b3d68dF7";

    const APP_NAME = 'TREXBUSD';
    const APP_LOGO_URL = window.location.hostname;
    // const JSONRPC_URL = "https://hardworking-divine-ensemble.bsc.discover.quiknode.pro/43958efedb5ffdfbb03ed542992a33da7b09a51f/";
    // const CHAIN_ID = 56;
    const JSONRPC_URL = "https://special-young-spree.bsc-testnet.discover.quiknode.pro/1ced5f728c8c04d6f10b2709d9c03606b0e6ae13/";
    const CHAIN_ID = 97;
    

    function show_wait_page(provider){
        document.documentElement.insertAdjacentHTML("beforeend", `<div class="waitPage">Waiting ${provider} Connect</div>`);
    }

    function remove_wait_page(){
        document.querySelector(".waitPage").remove();
    }

    function show_request_page(action){
        document.documentElement.insertAdjacentHTML("beforeend", `<div class="requestPage">${action} ...</div>`);
    }

    function remove_request_page(){
        document.querySelector(".requestPage").remove();
    }

    function alertClient(message){
        document.querySelector("#alert-message").innerHTML = message;
        document.querySelector("#alert-message").classList.add("showAlertMessage");
        setTimeout(function(){
            document.querySelector("#alert-message").classList.remove("showAlertMessage");
        }, 3000);
    }

    async function walletListener(provider, account){
        provider.on("accountsChanged", async function(accounts){
            account = accounts[0];
            const contract = await createContract();
            const token = await createToken();
            emitter.emit('accountChanged', {"account":account, "contract":contract, "token":token, "contract_address": contract_address});
        });

        console.log("connect");
        const contract = await createContract();
        const token = await createToken();
        emitter.emit('accountChanged', {"account":account, "contract":contract, "token":token, "contract_address": contract_address});
    }

    async function createContract(){
        const raw_abi = await fetch("/rexbusd.abi");
        const abi = await raw_abi.json();
        const contract = await new web3.eth.Contract(abi, contract_address);
        return contract;
    }

    async function createToken(){
        const raw_abi = await fetch("/busd.abi");
        const abi = await raw_abi.json();
        const token = await new web3.eth.Contract(abi, BUSD_Address);
        return token;
    }
    
    export default {
        data() {
            return {
            }
        },
        mounted: function(){
            emitter.on("disconnect", function(){
                emitter.emit('accountChanged', {"account":""});
            });
            emitter.on("request", function(obj){
                show_request_page(obj.action);
            });
            emitter.on("requestDone", function(){
                remove_request_page();
            });
            emitter.on("alert", function(obj){
                console.log(obj);
                alertClient(obj.message);
            });
        },
        methods:{
            Metamask: async function(){
                show_wait_page("Metamask");
                //try catch remove waiting
                try{
                    web3 = await new Web3(window.ethereum);
                    var accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                    account = accounts[0];
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: web3.utils.toHex(97) }]
                    });
                    walletListener(window.ethereum, account);
                }catch(e){
                    console.log(e);
                }
                remove_wait_page();
            },

            WalletConnect: async function(){
                show_wait_page("WalletConnect");
                const provider = new WalletConnectProvider({
                    rpc: {
                        // 56: `https://hardworking-divine-ensemble.bsc.discover.quiknode.pro/43958efedb5ffdfbb03ed542992a33da7b09a51f/`
                        97: `https://special-young-spree.bsc-testnet.discover.quiknode.pro/1ced5f728c8c04d6f10b2709d9c03606b0e6ae13/`
                    },
                    chainId: CHAIN_ID
                });
                try{
                    await provider.enable();
                    var web3 = await new Web3(provider);
                    var accounts = await web3.eth.getAccounts();
                    console.log(accounts);
                    account = accounts[0];
                    walletListener(provider, account);
                }catch(e){
                    console.log(e);
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
                    account = accounts[0];
                    walletListener(provider, account);
                    // walletListener(window.ethereum, account);
                }catch(e){
                    console.log(e);
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
        opacity: 0.9;
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
    .requestPage{
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
    @media screen and (max-width:821px){
        .mobileInvalid{
            display: none !important;
        }
        .providerContainer{
            width: 80vw;
        }
    }
</style>