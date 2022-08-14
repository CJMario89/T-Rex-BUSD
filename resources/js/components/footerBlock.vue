<template>
    <div class="footerBlock">
        <div class="f1">
            <div class="f1Img1">
                <img src="/images/T1.png">
            </div>
            <div>
                <span class="f1Text">
                    LET’S JOIN
                    T-REX MINER
                </span>
            </div>
            <div class="f1Img2">
                <img src="/images/T2.png">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
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
        width: 25vw;
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
        width: 25vw;
        img{
            width: 100%;
            height: auto;
        }
    }
</style>