<template>
    <div class="investmentCalculator">
        <div class="ICTitle">
            INVESTMENT CALCULATOR
        </div>
        <div class="ICContent">
            <div>
                <div class="ICInputTitle">
                    BUSD AMOUNT
                </div>
                <input class="ICInput inputBlock" type="number" placeholder="50" v-on:input="onChangeICInput" v-model="ICInput">
                <div class="ICInputDes">
                    Amount of returns calculated on the basis of investment amount.<br>
                    Note: Min investment is 50 BUSD & max amount of investment in 100k BUSD.
                </div>
            </div>
            <div style="padding-right:5vw">
                <div class="ICOutputTitle">
                    RETURN OF INVESTMENT
                </div>
                <div class="ICOutput" v-for="(item, key) in returns" :key="key">
                    {{key}} Return: {{item}} BUSD
                </div>
            </div>
        </div>
    </div>
</template>
<script>
var daily_return = 5, weekly_return = 35, monthly_return = 150;
export default {
    data() {
        return {
            returns:{},
            ICInput: 50
        }
    },
    created() {
        this.returns = {
            "Daily": daily_return,
            "Weekly": weekly_return,
            "Monthly": monthly_return
        }
    },
    methods: {
        onChangeICInput: function(){
            var amount = 50;
            if(this.ICInput != ""){
                amount = this.ICInput;
            }
            daily_return = parseFloat(parseFloat(amount / 10).toPrecision(12));
            weekly_return = parseFloat(parseFloat(amount / 10 * 7).toPrecision(12));
            monthly_return = parseFloat(parseFloat(amount / 10 * 30).toPrecision(12));
            this.returns = {
                Daily: daily_return,
                Weekly: weekly_return,
                Monthly: monthly_return
            }
        }
    },
}
</script>
<style lang="scss">
    .investmentCalculator{
        display: block;
        width: calc(100% - 4vw);
        height: calc(100% - 4vw);
        border-radius: 0.6vw;
        padding: 2vw 1vw;
        background: #794DFD;
        margin: 1vw;
    }
    .ICTitle{
        display: block;
        position: relative;
        font-size: 1.3vw;
        font-weight: 600;
        color: #FFFBFF;;
        width: calc(100% - 1vw);
        margin-left: 1vw;
        padding-bottom: 1vw;
    }
    .ICTitle::after{
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
    .ICContent{
        display: flex;
        color: #FFF7FF;
        flex-direction: row;
        justify-content: space-between;
        padding-top: 1vw;
    }
    .ICInputTitle{
        font-size: 1.55vw;
        font-weight: 700;
        padding: 1vw;
        padding-top: 0.5vw;
        padding-bottom: 0.5vw;
    }
    .ICInput{
        width: 42vw;
        margin: 1vw;
        margin-top: 0.5vw;
        margin-bottom: 0.5vw;
    }
    .ICInputDes{
        font-size: 1.1vw;
        font-weight: 700;
        padding: 1vw;
        padding-top: 0.5vw;
        padding-bottom: 0.5vw;
        line-height: 1.5vw;
    }
    .ICOutputTitle{
        font-size: 1.5vw;
        font-weight: 700;
        padding: 1vw;
        padding-left: 0vw;
        margin-top: 0.25vw;
        margin-bottom: 0.25vw;
    }
    .ICOutput{
        font-size: 1.1vw;
        font-weight: 700;
        padding: 0.5vw;
        padding-left: 0vw;
    }
    @media screen and (max-width:821px){
        .investmentCalculator{
            display: block;
            width: calc(100% - 14vw);
            height: calc(100% - 4vw);
            border-radius: 0.6vw;
            padding: 4vw 4vw;
            background: #794DFD;
            border: 1px white solid;
            margin-bottom: 4vw;
        }
        .ICTitle{
            display: block;
            position: relative;
            font-size: 4vw;
            font-weight: 600;
            color: #FFFBFF;;
            width: calc(100% - 1vw);
            margin-left: 1vw;
            padding-bottom: 2vw;
            margin-bottom: 1vw;
        }
        .ICTitle::after{
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
        .ICContent{
            display: flex;
            color: #FFF7FF;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            padding-top: 1vw;
        }
        .ICInputTitle{
            font-size: 4vw;
            font-weight: 700;
            padding: 1vw;
            padding-top: 2vw;
            padding-bottom: 3vw;
        }
        .ICInput{
            width: 42vw;
            margin: 1vw;
            margin-top: 0.5vw;
            margin-bottom: 0.5vw;
        }
        .ICInputDes{
            font-size: 3vw;
            font-weight: 700;
            padding: 1vw;
            padding-top: 4vw;
            padding-bottom: 2vw;
            line-height: 4vw;
        }
        .ICOutputTitle{
            font-size: 4vw;
            font-weight: 700;
            padding: 1vw;
            padding-left: 1vw;
            margin-top: 2vw;
            margin-bottom: 4vw;
            margin-top: 7vw;
        }
        .ICOutput{
            font-size: 3.2vw;
            font-weight: 700;
            padding: 0.5vw;
            padding-left: 1vw;
            padding-bottom: 2vw;
        }
    }
</style>