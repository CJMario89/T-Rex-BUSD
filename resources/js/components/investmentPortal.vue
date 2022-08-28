<template>
    <div class="investmentPortal">
        <div class="MBTitle">
            INVESTMENT PORTAL
        </div>
        <div class="MBC">
            <div class="MBContent" v-for="(items, key) in investment_portal" :key="key">
                <div v-html="items.left"></div>
                <div v-html="items.right"></div>
            </div>                
            <div class="MBContent" style="justify-content:center">
                <div class='button' @click="onEmergencyWithdraw">EMERGENCY WITHDRAW</div>
            </div>
        </div> 
    </div>
</template>
<script>


var wallet_balance = 0, user_invested = 0, profit_5x = 0, remaining_5x = 0, daily_user_roi = 0;

async function get_deposit_data(){
    var data = await get_msg_deposit();
    wallet_balance = data[0];
    user_invested = data[1];
    profit_5x = data[2];
    remaining_5x = data[3];
    daily_user_roi = data[4];
}


export default {
    data() {
        return {
            investment_portal:{},
            approved_amount: 50
        }
    },
    mounted: async function(){
        this.investment_portal = {
            "WB":{left: "<span>Wallet Balance</span>", right: `<span>${wallet_balance}BUSD</span>`},
            "UI":{left: "<span>User Invested</span>", right: `<span>${user_invested}BUSD</span>`},
            "P5X":{left: "<span>5x Profit</span>", right: `<span>${profit_5x}BUSD</span>`},
            "R5X":{left: "<span>5x Remaining</span>", right: `<span>${remaining_5x}BUSD</span>`},
            "DUR":{left: "<span>Daily User ROI</span>", right: `<span>${daily_user_roi}BUSD</span>`},
            "APR":{left: "<input type='text' class='inputBlock' placeholder='BUSD' v-model='approved_amount'>", right: `<div class='button' @click="onStake">APPROVE</div>`}
        }
        emitter.on("accountChanged", ()=>{
            get_deposit_data();
        });
    },
    methods:{
        onEmergencyWithdraw: async function(){
            await unstake();
            await get_statistics_data();
            await get_deposit_data();
            this.investment_portal = {
                "WB":{left: "<span>Wallet Balance</span>", right: `<span>${wallet_balance}BUSD</span>`},
                "UI":{left: "<span>User Invested</span>", right: `<span>${user_invested}BUSD</span>`},
                "P5X":{left: "<span>5x Profit</span>", right: `<span>${profit_5x}BUSD</span>`},
                "R5X":{left: "<span>5x Remaining</span>", right: `<span>${remaining_5x}BUSD</span>`},
                "DUR":{left: "<span>Daily User ROI</span>", right: `<span>${daily_user_roi}BUSD</span>`},
                "APR":{left: "<input type='text' class='inputBlock' placeholder='BUSD' value='50'>", right: `<div class='button'>APPROVE</div>`}
            }
        },
        onStake: async function(){
            console.log("stake");
            await stake(referral_address, this.approved_amount);
            await get_statistics_data();
            await get_deposit_data();
            this.investment_portal = {
                "WB":{left: "<span>Wallet Balance</span>", right: `<span>${wallet_balance}BUSD</span>`},
                "UI":{left: "<span>User Invested</span>", right: `<span>${user_invested}BUSD</span>`},
                "P5X":{left: "<span>5x Profit</span>", right: `<span>${profit_5x}BUSD</span>`},
                "R5X":{left: "<span>5x Remaining</span>", right: `<span>${remaining_5x}BUSD</span>`},
                "DUR":{left: "<span>Daily User ROI</span>", right: `<span>${daily_user_roi}BUSD</span>`},
                "APR":{left: "<input type='text' class='inputBlock' placeholder='BUSD' value='50'>", right: `<div class='button'>APPROVE</div>`}
            }
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