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
                <div class='button' v-on:click="onWalletBalanceChanged">EMERGENCY WITHDRAW</div>
            </div>
        </div> 
    </div>
</template>
<script>

var wallet_balance = 0, user_invested = 0, profit_5x = 0, remaining_5x = 0, daily_user_roi = 0;

export default {
    data() {
        return {
            investment_portal:{}
        }
    },
    created: async function(){
        
        this.investment_portal = {
            "wb": {"left": "<span>Wallet Balance</span>", "right": `<span>${wallet_balance}</span>`},
            "ui": {"left": "<span>User Invested</span>", "right": `<span>${user_invested}</span>`},
            "p5": {"left": "<span>5x Profit</span>", "right": `<span>${profit_5x}</span>`},
            "r5": {"left": "<span>5x Remaining</span>", "right": `<span>${remaining_5x}</span>`},
            "dur": {"left": "<span>Daily User ROI</span>", "right": `<span>${daily_user_roi}</span>`},
            "apr": {"left": "<input type='text' class='inputBlock' placeholder='BUSD' value='50'>", "right": `<div class='button'>APPROVE</div>`}

        };
    },
    methods:{
        onWalletBalanceChanged(){
            wallet_balance = 1, user_invested = 1, profit_5x = 1, remaining_5x = 0, daily_user_roi = 0;
            this.investment_portal = {
                "wb": {"left": "<span>Wallet Balance</span>", "right": `<span>${wallet_balance}</span>`},
                "ui": {"left": "<span>User Invested</span>", "right": `<span>${user_invested}</span>`},
                "p5": {"left": "<span>5x Profit</span>", "right": `<span>${profit_5x}</span>`},
                "r5": {"left": "<span>5x Remaining</span>", "right": `<span>${remaining_5x}</span>`},
                "dur": {"left": "<span>Daily User ROI</span>", "right": `<span>${daily_user_roi}</span>`},
                "apr": {"left": "<input type='number' class='inputBlock' placeholder='BUSD' value='50'>", "right": `<div class='button'>APPROVE</div>`}
            };
        }
    }
}
</script>
<style lang="scss">
    .investmentPortal{
        display: block;
        width: calc(100% - 2vw);
        height: calc(100% - 4vw);
        border-radius: 0.6vw;
        padding: 2vw 1vw;
        background: #794DFD;
    }

    
</style>