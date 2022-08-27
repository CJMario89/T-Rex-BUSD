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

var daily_reward = 0, last_claim = 0, next_claim = 0, available_withdrawl = 0, last_withdraw = 0, next_withdraw = 0, total_withdrawn = 0;

export default {
    data() {
        return {
            statistics:{}
        }
    },
    created() {
        this.statistics = {
            "DR":{left: `<span>Daily Rewards <br> ${daily_reward}BUSD</span>`, right: `<div class="button">CLAIM</div>`},
            "LC":{left: `<span>Last Claim <br> ${last_claim} <br></span>`, right: `<span>Next Claim <br> ${next_claim} <br></span>`},
            "AW":{left: `<span>Available Withdrawal 50% Allowed <br> ${available_withdrawl}&ensp;BUSD</span>`, right: `<div class="button" style="padding: 1vw">WITHDRAW</div>`},
            "LW":{left: `<span>Last Withdraw <br> ${last_withdraw} <br></span>`, right: `<span>Next Withdraw <br> ${next_withdraw} <br></span>`},
            "TW":{left: "<span>Total Withdrawn</span>", right: `<span>${total_withdrawn}&ensp;BUSD</span>`}
        }
    },
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