<template>
    <div class="navbarL">
        <a class="logo">
            <span style="width:20%">
                <img src="/images/logo.png">
            </span>
            <span style="width:50%">
                <img src="/images/T-REXBUSD.png">
            </span>
            <span style="width:22%" class="logoT2">
                <img src="/images/T2.png">
            </span>
        </a>
        <a class="navbarC">WHITEPAPER</a>
        <a class="navbarC">AUDIT</a>
        <a class="navbarC">F & Q</a>
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
            .logoT2{
                display: block;
            }
        }
    }
    
</style>