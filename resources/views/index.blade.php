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
            margin: 2%;
            width: 96%;
            height: 44vw;
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
            margin: 2%;
            width: 96%;
        }
    </style>
@endsection

@section('body')
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
    <script src="/js/webInit.js"></script>
    <script>
        var web3;
        var accounts;
        var chainId;

        const BUSD_Address = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";

        async function web3_init(){
            web3 = await new Web3(window.ethereum);
            accounts = await window.ethereum.request({method: "eth_requestAccounts"});
            accounts = await web3.eth.getAccounts();
            chainId = await web3.eth.getChainId();
        }

        async function createContract(){
            const raw_abi = await fetch("/trex-busd.abi");
            const abi = await raw_abi.json();
            contract = await new web3.eth.Contract(abi, contract_addrress);
            //excuteContract();
            const account = accounts[0];

            var allowance = await token.methods.allowance(account, contract_addrress).call();
            console.log(allowance)
        }

        async function createToken(){
            const raw_abi = await fetch("/busd.abi");
            const abi = await raw_abi.json();
            token = await new web3.eth.Contract(abi, BUSD_Address);
        }
    </script>
@endsection
