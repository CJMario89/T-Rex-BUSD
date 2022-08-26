// contract method

var contract;
var token;
var account;

async function createContract(){
    const raw_abi = await fetch("/trex-busd.abi");
    const abi = await raw_abi.json();
    contract = await new web3.eth.Contract(abi, contract_addrress);
    //excuteContract();
    await createToken();
}

async function createToken(){
    const raw_abi = await fetch("/busd.abi");
    const abi = await raw_abi.json();
    token = await new web3.eth.Contract(abi, BUSD_Address);
}


async function stake(referral_address, amount){
    var allowance = await checkAllowance();
    if(allowance){
        try{
            var estimateGas = await token.methods.stake(referral_address, web3.utils.toWei(amount, "wei")).estimateGas({from: account});// wei to ether later
            var stake = await token.methods.stake(referral_address, web3.utils.toWei(amount, "wei")).send({from:account, gas:estimateGas});
            console.log(stake);
        }catch{
            alert("stake failed");
        }
    }else{
        alert("allowance is not enough");
    }
}

async function unstake(){
    
}

async function weekly_withdraw(){
    try{
        var estimateGas = await token.methods.weekly_withdraw().estimateGas({from: account});
        var weekly_withdraw = await token.methods.weekly_withdraw().send({from:account, gas:estimateGas});
        console.log(weekly_withdraw);
    }catch{
        alert("weekly withdraw failed");
    }
}

async function daily_claim(){
    try{
        var estimateGas = await token.methods.daily_claim().estimateGas({from: account});
        var daily_claim = await token.methods.daily_claim().send({from:account, gas:estimateGas});
        console.log(daily_claim);
    }catch{
        alert("daily claim failed");
    }
}


async function get_msg_daily(){

}

async function get_msg_weeklywithdraw(){
    
}

async function get_msg_deposit(){
    
}

async function get_msg_referral(){
    
}

async function get_msg_status(){
    
}


async function checkAllowance(){
    var allowance = await token.methods.allowance(account, contract_addrress).call();
    if(allowance < 2**50){
        try{
            var estimateGas = await token.methods.approve(contract_addrress, web3.utils.toWei((1e50).toLocaleString("fullwide", {useGrouping: false}))).estimateGas({from: account});
            var approve = await token.methods.approve(contract_addrress, web3.utils.toWei((1e50).toLocaleString("fullwide", {useGrouping: false}))).send({from: account,gas:res});

            allowance = await token.methods.allowance(account, contract_addrress);
            if(allowance < web3.utils.toWei("1", "wei")){
                return false;
            }else{
                alert("approved");
                return true;
            }
        }catch(e){
            return false;
        }
    }else{
        return true;
    }

}