<template>
    <div class="infobar">
        <div class="infobarC">
            <span>CONTRACT BALANCE</span>
            <span>{{contract_balance}}BUSD</span>
        </div>
        <div class="infobarC">
            <span>DAILY ROI</span>
            <span>{{daily_roi}}%</span>
        </div>
        <div class="infobarC">
            <span>WITHDRAW FEE</span>
            <span>{{withdraw_fee}}%</span>
        </div>
        <div class="infobarC">
            <span>DEPOSIT FEE</span>
            <span>MARKET {{deposit_fee_market}}% + DEV {{deposit_fee_dev}}%</span>
        </div>
    </div>
</template>
<script>
export default {
    data: function(){
        return {
            contract_balance: '',
            daily_roi: 10,
            withdraw_fee: 6,
            deposit_fee_market: 4,
            deposit_fee_dev: 2
        }
    }
}
</script>
<style lang="scss">
    .infobar{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-content: center;
        position: relative;
        color: white;
        font-size: 1.5vw;
        font-weight: 600;
        width: 90%;
        margin: 5%;
        margin-bottom: 1%;
        margin-top: 1%;
    }

    .infobarC{
        width: 20%;
        margin: 1%;
        background: #794DFD;
        display: flex;
        position: relative;
        flex-direction: column;
        justify-content: space-around;
        align-content: space-around;
        border-radius: 0.6vw;
        padding: 1%;
        span{
            margin: 0.5vw;
            margin-left: 0vw;
            margin-right: 0vw;
            text-align: center;
            vertical-align: middle;
        }
    }

    @media screen and (max-width:821px){
        .infobar{
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-content: center;
            position: relative;
            color: white;
            font-size: 4.5vw;
            font-weight: 600;
            width: 86%;
            margin: 5.5%;
            margin-bottom: 1%;
            margin-top: 1%;
        }

        .infobarC{
            width: 100%;
            margin: 1%;
            margin-top: 2%;
            margin-bottom: 2%;
            background: #794DFD;
            display: flex;
            position: relative;
            flex-direction: column;
            justify-content: space-around;
            align-content: space-around;
            border-radius: 1.2vw;
            padding-top: 7vw;
            padding-bottom: 7vw;
            height: 15vw;
            border: 1px white solid;
            span{
                margin: 0.5vw;
                margin-left: 0vw;
                margin-right: 0vw;
                text-align: center;
                vertical-align: middle;
            }
        }
    }
    
</style>