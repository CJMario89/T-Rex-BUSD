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
                <div class='button' @click="onApprove">APPROVE</div>
                <div class="approveHint">{{approved_hint}}</div>
            </div>
            <div class="MBContent">
                <input type='text' class='inputBlock' placeholder='BUSD' v-model='deposit_amount'>
                <div class='button' @click="onDeposit">DEPOSIT</div>
            </div>
            <!-- <div class="MBContent" style="justify-content:center; display: none;">
                <div class='button' @click="onEmergencyWithdraw">EMERGENCY WITHDRAW</div>
            </div> -->
        </div> 
    </div>
</template>
<script>
import {stake, unstake, approve, allowance, get_msg_deposit, get_msg_wallet_balance} from '/js/contract';


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
            approved_amount: 10,
            deposit_amount: 10,
            approved_hint: ""
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
            this.get_wallet_balance();
            this.checkAllowance();
            if(account == ""){
                this.wallet_balance = 0;
                this.user_invested = 0, 
                this.profit_5x = 0,
                this.remaining_5x = 0;
                this.daily_user_roi = 0;
                this.approved_amount = 10;
                this.deposit_amount = 10;
            }
        });
        emitter.on("wallet_balance", ()=>{
            this.get_wallet_balance();
            this.get_deposit_data();
        });
    },
    methods:{
        // onEmergencyWithdraw: async function(){
        //     if(account == ""){
        //         alert("Connect wallet first")
        //         return;
        //     }
        //     emitter.emit("request", {"action": "Emergency Withdrawing"});
        //     try{
        //         await unstake(contract, account);
        //         emitter.emit("withdraw");
        //         await this.get_deposit_data();
        //         await this.get_wallet_balance();
        //         emitter.emit("info");
        //         emitter.emit("alert",{"message":"Withdrawed"});
        //     }catch(e){
        //         alert(e);
        //     }
            
        //     emitter.emit("requestDone");
        // },
        onApprove: async function(){
            if(account == ""){
                emitter.emit("alert",{"message":"Connect wallet first"});
                return;
            }
            emitter.emit("request", {"action": "Approving"});
            try{
                await approve(token, account, contract_address, this.approved_amount);
                this.checkAllowance();
                emitter.emit("alert",{"message": "Approved"});
            }catch(e){
                emitter.emit("alert",{"message":"Rejected by User"});
            }
            emitter.emit("requestDone");

        },
        onDeposit: async function(){
            if(account == ""){
                emitter.emit("alert",{"message":"Connect wallet first"});
                return;
            }
            var allowAmount = await allowance(token, account, contract_address);
            if(allowAmount < this.deposit_amount){
                emitter.emit("alert",{"message":"Approved is not enough"});
                return;
            }
            if(this.deposit_amount < 10){
                emitter.emit("alert",{"message":"deposit should be at least 10 BUSD"});
                return;
            }
            if(this.deposit_amount > 100000){
                emitter.emit("alert",{"message":"deposit should be below 100000 BUSD"});
                return;
            }
            emitter.emit("request", {"action": "Staking"});
            try{
                await stake(contract, account, token, contract_address, this.referral_address, this.deposit_amount);
                emitter.emit("deposit");
                await this.get_deposit_data();
                await this.get_wallet_balance();
                emitter.emit("info");
                emitter.emit("referral");
                emitter.emit("alert",{"message":"Staked"});
            }catch(e){
                emitter.emit("alert",{"message":"Rejected by User"});
                // emitter.emit("alert",{"message":e});
            }
            emitter.emit("requestDone");
        },
        get_deposit_data: async function(){
            if(account == ""){
                return;
            }
            var data = await get_msg_deposit(contract, account);
            this.user_invested = web3.utils.fromWei(data[0]);
            this.profit_5x = web3.utils.fromWei(data[1]);
            this.remaining_5x = web3.utils.fromWei(data[2]);
            this.daily_user_roi = web3.utils.fromWei(data[3]);
        },
        get_wallet_balance: async function(){
            if(account == ""){
                return;
            }
            var data = await get_msg_wallet_balance(account, token);
            var balance = await web3.utils.fromWei(data, "ether");
            this.wallet_balance = Math.floor(balance * 1000) / 1000;
        },
        checkAllowance: async function(){
            if(account == ""){
                return;
            }
            var allowAmount = await allowance(token, account, contract_address);
            this.approved_hint = `You have approved: ${web3.utils.fromWei(allowAmount)} BUSD`;
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
        border-radius: 0.6vw;
        background: #794DFD;
    }
    .approveHint{
        position: absolute;
        display: block;
        color: #F0BF13;
        font-size: 1vw;
        bottom: 0vw;
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
        .approveHint{
            position: absolute;
            display: block;
            color: #F0BF13;
            font-size: 3vw;
            bottom: 0vw;
        }
    }

    
</style>