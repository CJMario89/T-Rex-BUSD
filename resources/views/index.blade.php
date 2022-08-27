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

        @media screen and (max-width:800px){
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
                margin: 5vw;
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
                margin: 5vw;
                width: 92vw;
                padding-bottom: 2vw;
            }
        }
    </style>
@endsection

@section('body')
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
            <investment-portal></investment-portal>
        </div>
        <div id="statistics">
            <statistics></statistics>
        </div>
        <div id="referral">
            <referral></referral>
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
        var accounts;
        var chainId;

        const BUSD_Address = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";

        
    </script>
@endsection
