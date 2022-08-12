<template>
    <div class="navbarR">
        <div class="language"></div>
        <a class="navbarC">Telegram</a>
        <div class="navbarC" v-on:click="connect_wallet">Connect Wallet</div>
    </div>
</template>
<script>
export default {
    methods: {
        connect_wallet: function(){
            
        }
    },
}
</script>
<style lang="scss">
    .navbarR{
        display: block;
        position: absolute;
        top: 2vw;
        right: 2vw;
    }
</style>