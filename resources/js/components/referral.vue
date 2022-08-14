<template>
    <div class="referral">
        <div class="referralR">
            <div class="MBTitle referralTitle">
                REFERRAL REWARDS 12%
            </div>
        </div>
        <div class="referralL">
            <div class="MBTitle referralTitle">
                REFERRAL LINK
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
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
        height: 40%;
        border-radius: 0.6vw;
        padding: 2vw 1vw;
        background: #794DFD;
    }
    .referralL{
        display: block;
        width: calc(100% - 2vw);
        height: 39%;
        border-radius: 0.6vw;
        padding: 2vw 1vw;
        background: #794DFD;
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
</style>