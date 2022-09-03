<template>
    <div class="navbarL">
        <a class="logo">
            <span>
                <img src="/images/logo.png">
            </span>
            <span>
                <img src="/images/T-REXBUSD.png">
            </span>
            <span>
                <img src="/images/T2.png">
            </span>
        </a>
        <a class="navbarC" href="#WHITEPAPER">WHITEPAPER</a>
        <a class="navbarC" href="https://bscscan.com/address/0x86f27ceabafb726cd69fabc92f63ff4b03bd6212">CONTRACT</a>
        <a class="navbarC" href="#FAQ">F & Q</a>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss">
    .navbarL{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }
    .logo{
        display: flex;
        flex-direction: row;
        align-content: space-between;
        align-items: center;
        width: 17vw;
        position: relative;
        span{
            position: relative;
            height: fit-content;
            margin: 0 auto;
            img{
                width: 100%;
                height: auto;
            }
        }
        span:nth-child(1){
            width: 25%;
        }
        span:nth-child(2){
            width: 70%;
        }
        span:nth-child(3){
            width: 0%;
        }
        .logoT2{
            display: none;
        }
    }
    @media screen and (max-width:821px) {
        .navbarL{
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            width: 50vw;
            left: 15vw;
        }
        .logo{
            display: flex;
            flex-direction: row;
            align-content: space-between;
            align-items: center;
            width: 168.3%;
            position: relative;
            margin-left: 47vw;
            span{
                position: relative;
                height: fit-content;
                margin: 0 auto;
                img{
                    width: 100%;
                    height: auto;
                }
            }
            span:nth-child(1){
                width: 20%;
            }
            span:nth-child(2){
                width: 50%;
            }
            span:nth-child(3){
                width: 22%;
            }
            .logoT2{
                display: block;
            }
        }
    }
    
</style>