<template>
    <div class="statistics">
        <div class="MBTitle">
            STATISTICS
        </div>
        <div class="MBC">
            <div class="MBContent" v-for="(items, key) in statistics" :key="key">
                <div v-html="items.left"></div>
                <div v-html="items.right"></div>
            </div>                
        </div> 
        
    </div>
</template>
<script>


var daily_reward = 0, last_claim = 0, next_claim = 0, available_withdraw = 0, last_withdraw = 0, next_withdraw = 0, total_withdrawn = 0;

const DRP = function(){ Promise(async function(){
    const DR = await contract.methods.get_msg_dailyClaim();
    Promise.resolve(DR);
})}

const WCP = function(){ Promise(async function(){
    const WC = await contract.methods.get_msg_weeklyWithdraw();
    Promise.resolve(WC);
})}

const STATUS = function(){ Promise(async function(){
    const ST = await contract.methods.get_msg_status();
    Promise.resolve(ST);
})}

async function get_statistics_data(){
    var data = await Promise.all([DRP, WCP, STATUS]);
    daily_reward = data[0][0];
    next_claim = data[0][1];
    if(data[2][0] == false){//have claimed or not
        last_claim = 0;
    }else{
        last_claim = data[0][1] - dayToTimeStamp(1);
    }

    available_withdraw = data[1][0];
    total_withdrawn = data[1][1];
    next_withdraw = data[1][2];
    if(data[2][1] == false){
        last_claim = 0;
    }else{
        last_claim = data[1][2] - dayToTimeStamp(7);
    }
}

function dayToTimeStamp(day){
    var timeStamp = day * 24 * 60 * 60 * 1000;//millisecond
    return timeStamp;
}



export default {
    data() {
        return {
            statistics:{}
        }
    },
    mounted: async function() {
        this.statistics = {
            "DR":{left: `<span>Daily Rewards <br> ${daily_reward}BUSD</span>`, right: `<div class="button" @click='onDailyClaim'>CLAIM</div>`},
            "LC":{left: `<span>Last Claim <br> ${last_claim} <br></span>`, right: `<span>Next Claim <br> ${next_claim} <br></span>`},
            "AW":{left: `<span>Available Withdrawal 50% Allowed <br> ${available_withdraw}&ensp;BUSD</span>`, right: `<div class="button" style="padding: 1vw" @click='onWeeklyWithdraw'>WITHDRAW</div>`},
            "LW":{left: `<span>Last Withdraw <br> ${last_withdraw} <br></span>`, right: `<span>Next Withdraw <br> ${next_withdraw} <br></span>`},
            "TW":{left: "<span>Total Withdrawn</span>", right: `<span>${total_withdrawn}&ensp;BUSD</span>`}
        }

        emitter.on("accountChanged", ()=>{
            get_statistics_data();
        });
        
    },
    methods:{
        onDailyClaim: async function(){
            await daily_claim();
            await get_statistics_data();
        },
        onWeeklyWithdraw: async function(){
            await weekly_withdraw();
            await get_statistics_data();
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