<template>
    <div class="statistics">
        <div class="MBTitle">
            STATISTICS
        </div>
        <div class="MBC">
            <div class="MBContent">
                <span>Daily Rewards <br> {{daily_reward}}&ensp;BUSD</span>
                <div class="button" @click='onDailyClaim'>CLAIM</div>
            </div>
            <div class="MBContent">
                <span>Last Claim <br> {{last_claim}} <br></span>
                <span>Next Claim <br> {{next_claim}} <br></span>
            </div>
            <div class="MBContent">
                <span>Available Withdrawal 50% Allowed <br> {{available_withdraw}}&ensp;BUSD</span>
                <div class="button" style="padding: 1vw" @click='onWeeklyWithdraw'>WITHDRAW</div>
            </div>
            <div class="MBContent">
                <span>Last Withdraw <br> {{last_withdraw}} <br></span>
                <span>Next Withdraw <br> {{next_withdraw}} <br></span>
            </div>
            <div class="MBContent">
                <span>Total Withdrawn</span>
                <span>{{total_withdrawn}}&ensp;BUSD</span>
            </div>             
        </div> 
        
    </div>
</template>
<script>
import {daily_claim, weekly_withdraw, get_msg_dailyClaim, get_msg_weeklyWithdraw, get_msg_status} from '/js/contract';


var contract;
var account = "";
var DR;
var WC;
var ST;

// const DRP = function(){ Promise(async function(){
//     Promise.resolve(DR);
// })}

// const WCP = function(){ Promise(async function(){
    
//     Promise.resolve(WC);
// })}

// const STATUS = function(){ Promise(async function(contract){
//     Promise.resolve(ST);
// })}






export default {
    data() {
        return {
            daily_reward: 0,
            last_claim: 0,
            next_claim: 0,
            available_withdraw: 0,
            last_withdraw: 0,
            next_withdraw: 0,
            total_withdrawn: 0
        }
    },
    mounted: async function() {

        emitter.on("accountChanged", (obj)=>{
            contract = obj.contract;
            account = obj.account;
            this.get_statistics_data();
        });
        emitter.on("deposit", ()=>{
            this.get_statistics_data();
        });
        emitter.on("withdraw", ()=>{
            this.get_statistics_data();
        });
        
    },
    methods:{
        onDailyClaim: async function(){
            if(account == ""){
                emitter.emit("alert",{"message":"Connect wallet first"});
                return;
            }
            if(DR[0] == 0){
                emitter.emit("alert",{"message":"No daily claim BUSD"});
                return;
            }
            if(DR[1]*1000 > Date.now()){
                var time = new Date(DR[1]*1000 - Date.now());
                //emitter.emit("alert",{"message":`Daily claim available in ${time.getDate()}days ${time.getHours()}hours ${time.getMinutes()}minutes ${time.getSeconds()}seconds`});
                emitter.emit("alert",{"message":`Daily claim time has not come yet`});
                return;
            }
            emitter.emit("request", {"action": "Daily Claiming"});
            try{
                await daily_claim(contract, account);
                await this.get_statistics_data();
                emitter.emit("alert",{"message":"Claimed"});
            }catch(e){
                emitter.emit("alert",{"message":e});
                //emitter.emit("alert",{"message":e.data.message});
            }
            
            emitter.emit("requestDone");
        },
        onWeeklyWithdraw: async function(){
            if(account == ""){
                emitter.emit("alert",{"message":"Connect wallet first"});
                return;
            }
            if(WC[0] == 0){
                emitter.emit("alert",{"message":"No weekly withdraw BUSD"});
                return;
            }
            if(WC[2]*1000 > Date.now()){
                var time = new Date(WC[2]*1000 - Date.now() / 1000);
                //emitter.emit("alert",{"message":`Weekly withdraw available in ${time.getDate()}days ${time.getHours()}hours ${time.getMinutes()}minutes ${time.getSeconds()}seconds`});
                emitter.emit("alert",{"message":`Weekly withdraw time has not come yet`});
                return;
            }
            emitter.emit("request", {"action": "Weekly Withdrawing"});
            try{
                await weekly_withdraw(contract, account);
                await this.get_statistics_data();
                emitter.emit("wallet_balance");
                emitter.emit("alert",{"message":"Withdrawed"});
            }catch(e){
                emitter.emit("alert",{"message":e});
            }
            emitter.emit("requestDone");
            emitter.emit("info");
        },
        get_statistics_data: async function(){
            if(account == ""){
                return;
            }
            // var data = await Promise.all([DRP, WCP, STATUS]);
            DR = await get_msg_dailyClaim(contract, account);
            WC = await get_msg_weeklyWithdraw(contract, account);
            ST = await get_msg_status(contract, account);
            this.daily_reward = DR[0];
            if(DR[1] != 0){
                this.next_claim = this.timeConverter(DR[1]);
            }
            if(ST[0] == false){//have claimed or not
                this.last_claim = 0;
            }else{
                this.last_claim = this.timeConverter(DR[1] - this.minuteToTimeStamp(1));
            }


            this.available_withdraw = WC[0];
            this.total_withdrawn = WC[1];
            if(WC[2] != 0){
                this.next_withdraw = this.timeConverter(WC[2]);
            }
            if(ST[1] == false){
                this.last_withdraw = 0;
            }else{
                this.last_withdraw = this.timeConverter(WC[2] - this.minuteToTimeStamp(5));
            }
        },
        dayToTimeStamp: function(day){
            var timeStamp = day * 24 * 60 * 60;
            return timeStamp;
        },
        minuteToTimeStamp: function(minute){
            var timeStamp = minute * 60;
            return timeStamp;
        },
        timeConverter: function(UNIX_timestamp){
            var a = new Date(UNIX_timestamp * 1000);
            var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            var year = a.getFullYear();
            var month = months[a.getMonth()];
            var date = a.getDate();
            var hour = (a.getHours() < 10) ? "0" + a.getHours() : a.getHours();
            var min = (a.getMinutes() < 10) ? "0" + a.getMinutes() : a.getMinutes();
            var sec = (a.getSeconds() < 10) ? "0" + a.getSeconds() : a.getSeconds();
            var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
            return time;
        }
    }
}
</script>
<style lang="scss">
    .statistics{
        display: block;
        width: calc(100% - 2vw);
        height: calc(100% - 4vw);
        border-radius: 0.6vw;
        padding: 2vw 1vw;
        background: #794DFD;
    }
    @media screen and (max-width:821px) {
        .statistics{
            display: block;
            width: calc(100% - 12vw);
            height: calc(100% - 4vw);
            border-radius: 0.6vw;
            padding: 2vw 4vw;
            background: #794DFD;
            border: 1px white solid;
        }
    }
</style>