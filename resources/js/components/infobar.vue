<template>
    <div class="infobar">
        <div class="infobarC">
            <span>CONTRACT BALANCE</span>
            <span>{{contract_balance}}&ensp;BUSD</span>
        </div>
        <div class="infobarC">
            <span>DAILY ROI</span>
            <span>{{daily_roi_rate}}%</span>
        </div>
        <div class="infobarC">
            <span>WITHDRAW FEE</span>
            <span>{{withdraw_fee_rate}}%</span>
        </div>
        <div class="infobarC">
            <span>DEPOSIT FEE</span>
            <span>MARKET {{deposit_fee_market_rate}}% + DEV {{deposit_fee_dev_rate}}%</span>
        </div>
    </div>
</template>
<script>

import {rexbusd_data, contract_balance} from "/js/contract";

var contract;
var contract_address = "0xb7789A35DF704CccAae28cCE34C5185F3869BDF4";

export default {
    data: function(){
        return {
            contract_balance: '',
            daily_roi_rate: 20,
            withdraw_fee_rate: 6,
            deposit_fee_market_rate: 4,
            deposit_fee_dev_rate: 2
        }
    },
    mounted: async function(){
        const rex_web3 = await new Web3(new Web3.providers.HttpProvider('https://special-young-spree.bsc-testnet.discover.quiknode.pro/1ced5f728c8c04d6f10b2709d9c03606b0e6ae13/'));
        const raw_abi = await fetch("/rexbusd.abi");
        const abi = await raw_abi.json();
        contract = await new rex_web3.eth.Contract(abi, contract_address);

        emitter.on("info", ()=>{
            this.get_contract_balance();
        });
        this.get_rexbusd_data();
        this.get_contract_balance();
    },
    methods:{
        get_rexbusd_data: async function(){
            var data = await rexbusd_data(contract);
            this.daily_roi_rate = data[1];
            this.withdraw_fee_rate = data[2];
            this.deposit_fee_market_rate = data[3];
            this.deposit_fee_dev_rate = data[4];
        },
        get_contract_balance: async function(){
            var data = await contract_balance(contract);
            this.contract_balance = data;
        }
    }
}
</script>
<style lang="scss">
    .infobar{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-content: center;
        position: relative;
        color: white;
        font-size: 1.5vw;
        font-weight: 600;
        width: 90%;
        margin: 5%;
        margin-bottom: 1%;
        margin-top: 1%;
    }

    .infobarC{
        width: 20%;
        margin: 1%;
        background: #794DFD;
        display: flex;
        position: relative;
        flex-direction: column;
        justify-content: space-around;
        align-content: space-around;
        border-radius: 0.6vw;
        padding: 1%;
        span{
            margin: 0.5vw;
            margin-left: 0vw;
            margin-right: 0vw;
            text-align: center;
            vertical-align: middle;
        }
    }

    @media screen and (max-width:821px){
        .infobar{
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-content: center;
            position: relative;
            color: white;
            font-size: 4.5vw;
            font-weight: 600;
            width: 86%;
            margin: 5.5%;
            margin-bottom: 1%;
            margin-top: 1%;
        }

        .infobarC{
            width: 100%;
            margin: 1%;
            margin-top: 2%;
            margin-bottom: 2%;
            background: #794DFD;
            display: flex;
            position: relative;
            flex-direction: column;
            justify-content: space-around;
            align-content: space-around;
            border-radius: 1.2vw;
            padding-top: 7vw;
            padding-bottom: 7vw;
            height: 15vw;
            border: 1px white solid;
            span{
                margin: 0.5vw;
                margin-left: 0vw;
                margin-right: 0vw;
                text-align: center;
                vertical-align: middle;
            }
        }
    }
    
</style>