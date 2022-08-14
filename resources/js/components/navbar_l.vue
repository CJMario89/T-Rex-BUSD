<template>
    <div class="navbarL">
        <a class="logo">
            <span style="width:25%">
                <img src="/images/logo.png">
            </span>
            <span style="width:70%">
                <img src="/images/T-REXBUSD.png">
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
    }
</style>