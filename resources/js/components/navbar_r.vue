<template>
    <div class="navbarR">
        <div class="language" v-on:click="toggleLanguage" style="display:none;">
            <span>{{language}}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="1vw" height="1vw" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
            </svg>
        </div>
        <div class="langContainer" style="display:none;">
            <label>
                EN<input type="radio" value="EN" v-model="language">
            </label>
            <!-- <label>
                中文<input type="radio" value="中文" v-model="language">
            </label> -->
        </div>
        <a class="navbarC">Telegram</a>
        <a class="navbarC connectWallet" v-on:click="connect_wallet">CONNECT WALLET</a>
    </div>
</template>
<script>
    var listenFlag = 0;

export default {
    data: function(){
        return{
            language: "EN",
            langFlag: 0
        }
    },
    methods: {
        connect_wallet: async function(){
            document.querySelector(".providerContainer").style.display = "flex";
            if(!listenFlag){
                window.addEventListener("click", function(e){
                    if(e.target.closest(".navbarC") == null){
                        document.querySelector(".providerContainer").style.display = "none";
                    }
                });
                listenFlag = 1;
            }

        },

        toggleLanguage: function(){
            document.querySelector(".langContainer").classList.toggle("visible");
            document.querySelector(".language").querySelector(".bi-chevron-down").classList.toggle("spin180");
            if(this.langFlag == 0){
                window.addEventListener("click", function(e){
                    if(e.target.closest(".langContainer") == null && e.target.closest(".language") == null){
                        document.querySelector(".langContainer").classList.remove("visible");
                        document.querySelector(".language").querySelector(".bi-chevron-down").classList.remove("spin180");
                    }
                });
                this.langFlag = 1;
            }
        }
    }
}
</script>
<style lang="scss">
    .navbarR{
        display: flex;
        flex-direction: row;
        position: relative;
        justify-content: flex-start;
        align-items: center;
    }
    .language{
        display: inline-block;
        position: relative;
        color: white;
        font-size: 0.9vw;
        width: fit-content;
        height: fit-content;
        padding: 1vw;
        margin-right: 1vw;
        cursor: pointer;
        transition: all 1s;
    }
    .language *{
        margin: 0.5vw;
        vertical-align: middle;
        cursor: pointer;
        left: -1vw;
        text-align: center;
    }
    .langContainer{
        position: absolute;
        display: block;
        width: fit-content;
        height: fit-content;
        opacity: 0;
        visibility: hidden;
        transition: all 1s;
        font-size: 0.9vw;
        width: 8vw;
        color: white;
        left: -1.8vw;
        top: 3.6vw;
        label{
            display: block;
            padding: 0.5vw;
            margin: 0 auto;
            text-align: center;
            input{
                display: none;
            }
        }
    }
    @media screen and (max-width:800px) {
        .navbarR{
            display: flex;
            flex-direction: column-reverse;
            position: relative;
            justify-content: flex-start;
            align-items: center;
            margin-top: 20vw;
        }
        .language{
            display: inline-block;
            position: relative;
            color: white;
            font-size: 4.5vw;
            width: fit-content;
            height: fit-content;
            padding: 1vw;
            margin-right: 1vw;
            cursor: pointer;
            transition: all 1s;
        }
        .language *{
            margin: 0.5vw;
            vertical-align: middle;
            cursor: pointer;
            left: -1vw;
            text-align: center;
        }
        .langContainer{
            position: absolute;
            display: block;
            width: fit-content;
            height: fit-content;
            opacity: 0;
            visibility: hidden;
            transition: all 1s;
            font-size: 4.5vw;
            width: 8vw;
            color: white;
            left: -1.8vw;
            top: 3.6vw;
            label{
                display: block;
                padding: 0.5vw;
                margin: 0 auto;
                text-align: center;
                input{
                    display: none;
                }
            }
        }
        .connectWallet{
            height: 18.5vw;
            background-color: #794DFD;
            text-align: center;
            border: 1px white solid;
        }
    }
    
</style>