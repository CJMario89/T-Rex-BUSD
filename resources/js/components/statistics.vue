<template>
    <div class="statistics">
        <div class="MBTitle">
            STATISTICS
        </div>
        <div class="MBC">
            <div class="MBContent">
                <span>Daily Rewards <br> {{daily_reward}}BUSD</span>
                <div class="button" onClick='onDailyClaim'>CLAIM</div>
            </div>
            <div class="MBContent">
                <span>Last Claim <br> {{last_claim}} <br></span>
                <span>Next Claim <br> {{next_claim}} <br></span>
            </div>
            <div class="MBContent">
                <span>Available Withdrawal 50% Allowed <br> {{available_withdraw}}&ensp;BUSD</span>
                <div class="button" style="padding: 1vw" onClick='onWeeklyWithdraw'>WITHDRAW</div>
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
import {daily_claim, weekly_withdraw, get_msg_dailyClaim, get_msg_weeklywithdraw, get_msg_status} from '/js/contract';


var contract;
var account;

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
            this.get_statistics_data();
        });
        emitter.on("statistics", ()=>{
            this.get_statistics_data();
        });
        
    },
    methods:{
        onDailyClaim: async function(){
            await daily_claim(contract, account);
            await get_statistics_data();
        },
        onWeeklyWithdraw: async function(){
            await weekly_withdraw(contract, account);
            await get_statistics_data();
        },
        get_statistics_data: async function(){
            // var data = await Promise.all([DRP, WCP, STATUS]);
            const DR = await get_msg_dailyClaim(contract);
            const WC = await get_msg_weeklywithdraw(contract);
            const ST = await get_msg_status(contract);
            this.daily_reward = DR[0];
            this.next_claim = DR[1];
            if(ST[0] == false){//have claimed or not
                this.last_claim = 0;
            }else{
                this.last_claim = DR[1] - this.dayToTimeStamp(1);
            }

            console.log(DR)
            console.log(ST)

            this.available_withdraw = WC[0];
            this.total_withdrawn = WC[1];
            this.next_withdraw = WC[2];
            if(ST[1] == false){
                this.last_claim = 0;
            }else{
                this.last_claim = WC[2] - this.dayToTimeStamp(7);
            }
        },
        dayToTimeStamp: function(day){
            var timeStamp = day * 24 * 60 * 60 * 1000;//millisecond
            return timeStamp;
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