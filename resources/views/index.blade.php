@extends('layouts.app')
@section('style')
    <style>
        #navbar{
            display: block;
            width: 100%;
            position: relative;
            height: 7vw;
        }
        #navbar-l{
            display: inline-block;
            top: 2vw;
            left: 2%;
            position: absolute;
        }
        #navbar-r{
            display: inline-block;
            top: 2vw;
            right: 2%;
            position: absolute;
        }
        #infobar{
            display: block;
            position: relative;
            width: 100%;
        }
        #middleBlock{
            display: flex;
            position: relative;
            flex-direction: row;
            justify-content: space-around;
            margin: 5%;
            width: 90%;
            height: 44vw;
            margin-bottom: 1%;
            margin-top: 1%;
        }
        #investment-portal{
            display: block;
            position: relative;
            margin: 1%;
            width: 32%;
        }
        #statistics{
            display: block;
            position: relative;
            margin: 1%;
            width: 30%;
        }
        #referral{
            display: block;
            position: relative;
            margin: 1%;
            width: 30%;
        }
        #investment-calculator{
            display: block;
            position: relative;
            margin: 5%;
            width: 90%;
            margin-top: 1%;
        }
        #alert-message{
            position: fixed;
            display: block;
            width: 10vw;
            padding: 2vw;
            padding-left: 10vw;
            padding-right: 10vw;
            height: auto;
            font-size: 2vw;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            background-color: black;
            opacity: 0.8;
            right: 0px;
            bottom: 0px;
            transform: translate(100%, 0%);
            transition: all 1s ease-in-out;
            z-index: 100;
        }
        .showAlertMessage{
            transform: translateX(0%) !important;
        }

        @media screen and (max-width:821px){
            #navbar{
                display: block;
                width: 100%;
                position: relative;
                height: 63vw;
                padding-bottom: 6vw;
                margin-top: 24vw;
            }
            #navbar-l{
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                top: 2vw;
                left: 2%;
                position: absolute;
            }
            #navbar-r{
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                top: 2vw;
                right: 2%;
                position: absolute;
            }
            #infobar{
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                position: relative;
                width: 100%;
                padding-bottom: 6vw;
                padding-top: 6vw;
            }
            #infobar::before{
                content: "";
                height: 2px;
                width: 87%;
                left: 7%;
                background-color: white;
                opacity: 0.3;
                display: block;
                position: absolute;
                top: 0px;
            }
            #infobar::after{
                content: "";
                height: 2px;
                width: 87%;
                left: 7%;
                background-color: white;
                opacity: 0.3;
                display: block;
                position: absolute;
                bottom: 0px;
            }
            #middleBlock{
                display: flex;
                position: relative;
                flex-direction: column;
                justify-content: space-around;
                margin: 3vw;
                margin-top: 5vw;
                width: 90vw;
                height: auto;
                padding: 2vw;
            }
            #investment-portal{
                display: block;
                position: relative;
                margin: 1%;
                width: 100%;
                padding-bottom: 0.5vw;
            }
            #statistics{
                display: block;
                position: relative;
                margin: 1%;
                width: 100%;
                padding-bottom: 0.5vw;
                padding-top: 0.5vw;
            }
            #referral{
                display: block;
                position: relative;
                margin: 1%;
                width: 100%;
                padding-bottom: 0.5vw;
                padding-top: 0.5vw;
            }
            #investment-calculator{
                display: block;
                position: relative;
                margin: -2vw;
                margin-left: 5vw;
                width: 92vw;
                padding-bottom: 2vw;
            }
            #alert-message{
                width: 10vw;
            }
            
        }
    </style>
@endsection

@section('body')
    <div id="alert-message"></div>
    <div id="contract">
        <contract></contract>
    </div>
    <div id="web3-connector">
        <web3-connector></web3-connector>
    </div>
    <div id="navbar">
        <div id= "navbar-l">
            <navbar-l></navbar-l>
        </div>
        <div id= "navbar-r">
            <navbar-r></navbar-r>
        </div>
    </div>
    <div id= "infobar">
        <infobar></infobar>
    </div>
    <div id= "middleBlock">
        <div id="investment-portal">
            <investment-portal referral_address="{{isset($referral_address) ? $referral_address : '0x5120378D83A455dB9DC7b5F22874eC26e56FC768'}}"></investment-portal>
        </div>
        <div id="statistics">
            <statistics></statistics>
        </div>
        <div id="referral">
            <referral referral_address="{{isset($referral_address) ? "https://rex-busd.finance/?".$referral_address : 'https://rex-busd.finance/?0x5120378D83A455dB9DC7b5F22874eC26e56FC768'}}"></referral>
        </div>
    </div>
    <div id="investment-calculator">
        <investment-calculator></investment-calculator>
    </div>
    <div id="footer-block">
        <footer-block></footer-block>
    </div>
@endsection

@section('script')
    <script>
        var web3;
        var account;
        var token;
        var contract;
        
    </script>
@endsection
