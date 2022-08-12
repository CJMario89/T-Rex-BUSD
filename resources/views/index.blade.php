@extends('layouts.app')
@section('style')
    <style>
        #navbar{
            display: block;
            width: 100%;
        }
        #navbar-l{
            display: inline-block;
        }
        #navbar-r{
            display: inline-block;
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
@endsection

@section('script')
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

        window.addEventListener("load", async function(){
            await web3_init();
            await createContract();
            await createToken();
        });
    </script>
@endsection
