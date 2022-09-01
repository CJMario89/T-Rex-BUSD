<template>
    <div class="referral">
        <div class="referralR">
            <div class="MBTitle referralTitle">
                REFERRAL REWARDS 12%
            </div>
            <div class="MBContent referralContent" v-for="(items, key) in referral" :key="key">
                <div v-html="items.left"></div>
                <div v-html="items.right"></div>
            </div>
            <div class="MBContent referralContent" style="justify-content:center;">
                <div class="button" @click="onWithdrawRewards">
                    WITHDRAW REWARDS
                </div>
            </div>
        </div>
        <div class="referralL">
            <div class="referralHint">
                EARN<span style="color:#F0BF13;">12%</span>!!
            </div>
            <div class="MBTitle referralTitle">
                REFERRAL LINK
            </div>
            <div class="MBContent referralContent" style="padding-top:1vw;padding-bottom: 0vw;">
                <input class="inputBlock referralLink" type="text" v-bind:value="referral_address" style="width:100%;" disabled>
            </div>
            <div class="MBContent referralContent" style="justify-content:center;padding-top:1vw;padding-bottom: 0vw;">
                <div class="button" @click="copyLink">
                    COPY LINK
                </div>
            </div>
            <div class="referralDes">
                You Can Earn BUSD Tokens for inviting new users to join us.
                The StarStone Miner contract has a direct, 
                one-level referral system.
                Promote your referral link and Earn <span style="color:#F0BF13;">12%</span> Referral Rewards.
            </div>
        </div>
    </div>
</template>
<script>
import {withdraw_referral, get_msg_referral} from '/js/contract';

var contract;
var account = "";



export default {
    data() {
        return {
            referral:{},
            referral_reward: 0,
            total_referral_withdrawn: 0,
            referral_address: ''
        }
    },
    mounted: async function(){
        await this.get_referral_data();
        this.update_referral_address();

        this.referral = [
            {left: "Referral Reward", right: `${this.referral_reward}&ensp;BUSD`},
            {left: "Total Withdrawn", right: `${this.total_referral_withdrawn}&ensp;BUSD`}
        ]

        emitter.on("accountChanged", (obj)=>{
            contract = obj.contract;
            account = obj.account;
            this.get_referral_data();
            this.update_referral_address();
        });
    },
    methods: {
        onWithdrawRewards: async function(){
            if(account == ""){
                alert("Connect wallet first")
                return;
            }
            emitter.emit("request", {"action": "Reward Withdrawing"});
            await withdraw_referral(contract, account);
            await this.get_referral_data(account);
            emitter.emit("requestDone");
            emitter.emit("info");
            emitter.emit("alert",{"message":"Withdrawed"});
        },
        get_referral_data: async function(){
            if(account == ""){
                return;
            }
            var data = await get_msg_referral(contract, account);
            this.referral_reward = data[0];
            this.total_referral_withdrawn = data[1];
            this.referral = [
                {left: "Referral Reward", right: `${this.referral_reward}&ensp;BUSD`},
                {left: "Total Withdrawn", right: `${this.total_referral_withdrawn}&ensp;BUSD`}
            ]
        },
        copyLink: async function(e){
            var referral_link = document.querySelector(".referralLink").value;
            await navigator.clipboard.writeText(referral_link);
            emitter.emit("alert", {"message": "copied"});
        }, 
        update_referral_address: function(){
            this.referral_address = "https://" + window.location.hostname + "/?referral=" + (account == "" ? "0x0000000000000000000000000000000000000000" : account);
        }
    }
}
</script>
<style lang="scss">
    .referral{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        height: 100%;
    }
    .referralR{
        display: block;
        width: calc(100% - 2vw);
        height: 38%;
        border-radius: 0.6vw;
        padding: 2vw 1vw;
        background: #794DFD;
    }
    .referralL{
        display: block;
        position: relative;
        width: calc(100% - 2vw);
        height: 37%;
        border-radius: 0.6vw;
        padding: 2vw 1vw;
        background: #794DFD;
    }
    .referralHint{
        display: block;
        position: absolute;
        top: 2vw;
        right: 1vw;
        color: white;
        font-size: 1.3vw;
        font-weight: 700;
    }
    .referralTitle{
        position: relative;
        padding-bottom: 1vw;
    }
    .referralTitle::after{
        display: block;
        position: absolute;
        content: "";
        bottom: 0px;
        left: -1vw;
        height: 1px;
        width: calc(100% + 1vw);
        opacity: 0.5;
        background-color: #FAF1F1;
    }
    .referralContent{
        padding-bottom: 1vw;
    }
    .referralContent::before{
        display: none !important;
    }
    .referralDes{
        color: #F2EAEA;
        font-size: 0.7vw;
        font-weight: 700;
        margin-top: 1vw;
        line-height: 1.1vw;
    }

    @media screen and (max-width:821px) {
        .referral{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 100%;
            height: 100%;
        }
        .referralR{
            display: block;
            width: calc(100% - 12vw);
            height: calc(100% - 4vw);
            border-radius: 0.6vw;
            padding: 2vw 4vw;
            background: #794DFD;
            border: 1px white solid;
            margin-bottom: 4vw;
        }
        .referralL{
            display: block;
            width: calc(100% - 12vw);
            height: calc(100% - 4vw);
            border-radius: 0.6vw;
            padding: 2vw 4vw;
            background: #794DFD;
            border: 1px white solid;
        }
        .referralHint{
            display: block;
            position: absolute;
            top: 4vw;
            right: 5vw;
            color: white;
            font-size: 4vw;
            font-weight: 700;
        }
        .referralTitle{
            position: relative;
            padding-bottom: 3vw;
            margin-bottom: 2vw;
            margin-top: 2vw;
        }
        .referralTitle::after{
            display: block;
            position: absolute;
            content: "";
            bottom: 0px;
            left: -1vw;
            height: 1px;
            width: calc(100% + 1vw);
            opacity: 0.5;
            background-color: #FAF1F1;
        }
        .referralContent{
            padding-bottom: 1vw;
        }
        .referralContent::before{
            display: none !important;
        }
        .referralDes{
            color: #F2EAEA;
            font-size: 3vw;
            font-weight: 700;
            margin-top: 1vw;
            line-height: 5vw;
        }
    }
</style>