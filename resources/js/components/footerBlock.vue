<template>
    <div class="footerBlock">
        <div class="f1">
            <div class="f1Img1">
                <img src="/images/T1.png">
            </div>
            <div>
                <span class="f1Text">
                    LET’S JOIN<br>
                    T-REX MINER
                </span>
            </div>
            <div class="f1Img2">
                <img src="/images/T2.png">
            </div>
        </div>
        <div class="f2">
            <div class="f2Text" v-for="(items, key) in f2Text" :key="key">
                <div class="f2TextTitle">
                    {{items.title}}
                </div>
                <div class="f2TextContent">
                    {{items.content}}
                </div>
            </div>
        </div>
        <div class="warning">
            <span style="color:#F3B515">WARNING:</span> High-reward products mean high risk. Please evaluate your own financial situation and fund allocation before investing<br>
            The funds invested in StarStone are irretrievable, and the recovery channel is the daily interest bonus income. Please DYOR and Follow us to make money.
        </div>
        <div class="copyright">
            © Copyright StarStone BUSD Miner 2022 . All Rights Reserved 
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            f2Text: {
                "VPC":{title:"Verified Public Contract", content: "StarStone Miner contract is public, verified and can be viewed here on BscScan."},
                "MI":{title:"Miner info", content: "T-REX Miner pays 10% daily, according to the current mining efficiency rate. The mining efficiency rate rises and falls as you and other players hire miners, compound earnings and pocket BUSD."},
                "SS":{title:"Sustainability", content: "T-REX Miner pays a modest 10% daily, allowing investors to rest easy knowing that their investments have unlimited growth potential and a maximum, improbable risk of less than 10%."}
            }
        }
    }
}
</script>
<style lang="scss">
    .f1{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        width: 80vw;
        margin: 0 auto;
        margin-top: 6vw;
    }
    .f1Img1{
        width: 22vw;
        img{
            width: 100%;
            height: auto;
        }
    }
    .f1Text{
        color: #FFF7FF;
        font-weight: 900;
        font-size: 2vw;
        white-space: pre-line;
    }
    .f1Img2{
        width: 22vw;
        img{
            width: 100%;
            height: auto;
        }
    }
    .f2{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: flex-start;
        width: 85vw;
        margin: 0 auto;
        // margin-top: 6vw;
    }
    .f2Text{
        width: 25.4vw;
    }
    .f2TextTitle{
        color: #FB68FB;
        font-size: 1.2vw;
        font-weight: 700;
        padding: 1vw;
        padding-left: 0vw;
    }
    .f2TextContent{
        color: #FFFBFF;;
        font-size: 1vw;   
        font-weight: 300;
        line-height: 1.3vw;
    }
    .warning{
        color:#FFFBFF;
        display: block;
        background-color: #232549;
        font-size: 0.9vw;
        line-height: 1.2vw;
        padding: 0.5vw 2vw;
        width: fit-content;
        margin: 0 auto;
        margin-top: 8vw;
        opacity: 0.8;
        border-radius: 0.6vw;
    }
    .copyright{
        color:#D335E4;
        display: block;
        margin: 0 auto;
        text-align: center;
        margin-top: 1vw;
        opacity: 0.7;
        font-size: 0.9vw;
        padding-bottom: 6vw;
    }

    @media screen and (max-width:821px) {
        .f1{
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            width: 80vw;
            margin: 0 auto;
            margin-top: 6vw;
        }
        .f1Img1{
            width: 45vw;
            img{
                width: 100%;
                height: auto;
            }
        }
        .f1Text{
            color: #FFF7FF;
            font-weight: 900;
            font-size: 4.8vw;
            white-space: pre-line;
            padding-top: 25vw
        }
        .f1Img2{
            width: 0vw;
            img{
                width: 100%;
                height: auto;
            }
        }
        .f2{
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: flex-start;
            width: 85vw;
            margin: 0 auto;
            // margin-top: 6vw;
        }
        .f2Text{
            width: 100%;
        }
        .f2TextTitle{
            color: #FB68FB;
            font-size: 4vw;
            font-weight: 700;
            padding: 1vw;
            padding-left: 0vw;
        }
        .f2TextContent{
            color: #FFFBFF;;
            font-size: 3vw;   
            font-weight: 300;
            line-height: 4vw;
            padding-top: 4vw;
            padding-bottom: 10vw;
        }
        .warning{
            color:#FFFBFF;
            display: block;
            background-color: #1B1C2D;
            font-size: 3vw;
            line-height: 4vw;
            padding: 0.5vw 2vw;
            width: fit-content;
            margin: 6vw;
            margin-top: 8vw;
            opacity: 0.8;
            border-radius: 0.6vw;
        }
        .copyright{
            color:#D335E4;
            display: block;
            margin: 0 auto;
            text-align: center;
            margin-top: 1vw;
            opacity: 0.7;
            font-size: 2.2vw;
            padding-bottom: 6vw;
        }
    }
</style>