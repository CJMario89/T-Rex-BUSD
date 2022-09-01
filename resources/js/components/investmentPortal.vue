<template>
    <div class="investmentPortal">
        <div class="MBTitle">
            INVESTMENT PORTAL
        </div>
        <div class="MBC">
            <div class="MBContent">
                <span>Wallet Balance</span>
                <span>{{wallet_balance}}&ensp;BUSD</span>
            </div>
            <div class="MBContent">
                <span>User Invested</span>
                <span>{{user_invested}}&ensp;BUSD</span>
            </div>
            <div class="MBContent">
                <span>5x Profit</span>
                <span>{{profit_5x}}&ensp;BUSD</span>
            </div>
            <div class="MBContent">
                <span>5x Remaining</span>
                <span>{{remaining_5x}}&ensp;BUSD</span>
            </div>
            <div class="MBContent">
                <span>Daily User ROI</span>
                <span>{{daily_user_roi}}&ensp;BUSD</span>
            </div>
            <div class="MBContent">
                <input type='text' class='inputBlock' placeholder='BUSD' v-model='approved_amount'>
                <div class='button' @click="onStake">APPROVE</div>
            </div>
            <div class="MBContent" style="justify-content:center">
                <div class='button' @click="onEmergencyWithdraw">EMERGENCY WITHDRAW</div>
            </div>
        </div> 
    </div>
</template>
<script>
import {stake, unstake, get_msg_deposit} from '/js/contract';


var contract;
var account = "";
var token;
var contract_address;




export default {
    data() {
        return {
            wallet_balance: 0,
            user_invested: 0, 
            profit_5x: 0,
            remaining_5x: 0,
            daily_user_roi: 0,
            approved_amount: 50,

        }
    },
    props:{
        referral_address: String
    },
    mounted: async function(){
        emitter.on("accountChanged", (obj)=>{
            contract = obj.contract;
            token = obj.token;
            account = obj.account;
            contract_address = obj.contract_address;
            this.get_deposit_data();
        });
    },
    methods:{
        onEmergencyWithdraw: async function(){
            if(account == ""){
                alert("Connect wallet first")
                return;
            }
            emitter.emit("request", {"action": "Emergency Withdrawing"});
            try{
                await unstake(contract, account);
                emitter.emit("withdraw");
                await this.get_deposit_data();
                emitter.emit("info");
                emitter.emit("alert",{"message":"Withdrawed"});
            }catch(e){
                alert(e);
            }
            
            emitter.emit("requestDone");
        },
        onStake: async function(){
            if(account == ""){
                alert("Connect wallet first")
                return;
            }
            emitter.emit("request", {"action": "Staking"});
            try{
                await stake(contract, account, token, contract_address, this.referral_address, this.approved_amount);
                emitter.emit("deposit");
                await this.get_deposit_data();
                emitter.emit("info");
                emitter.emit("alert",{"message":"Staked"});
            }catch(e){
                console.log(e);
                alert(e);
                //emitter.emit("alert",{"message":e.message});
            }
            emitter.emit("requestDone");
        },
        get_deposit_data: async function(){
            if(account == ""){
                return;
            }
            var data = await get_msg_deposit(contract, account);
            console.log(data);
            this.wallet_balance = data[0];
            this.user_invested = data[1];
            this.profit_5x = data[2];
            this.remaining_5x = data[3];
            this.daily_user_roi = data[4];
        }
    }
}
</script>
<style lang="scss">
    .investmentPortal{
        display: block;
        width: calc(100% - 2vw);
        height: calc(100% - 4vw);
        padding: 2vw 1vw;
        background: #794DFD;
    }

    @media screen and (max-width: 821px) {
        .investmentPortal{
            display: block;
            width: calc(100% - 12vw);
            height: calc(100% - 4vw);
            border-radius: 1.2vw;
            padding: 2vw 4vw;
            background: #794DFD;
            border: 1px white solid;
        }
    }

    
</style>