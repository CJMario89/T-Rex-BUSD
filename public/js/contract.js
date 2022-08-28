

async function stake(contract, account, referral_address, amount){
    var allowance = await checkAllowance();
    if(allowance){
        try{
            var estimateGas = await contract.methods.stake(referral_address, web3.utils.toWei(amount, "wei")).estimateGas({from: account});// wei to ether later
            var stake = await contract.methods.stake(referral_address, web3.utils.toWei(amount, "wei")).send({from:account, gas:estimateGas});
            console.log(stake);
        }catch{
            alert("stake failed");
        }
    }else{
        alert("allowance is not enough");
    }
}

async function unstake(contract, account){
    try{
        var estimateGas = await contract.methods.unstake().estimateGas({from: account});
        var unstake = await contract.methods.unstake().send({from:account, gas:estimateGas});
        console.log(unstake);
    }catch{
        alert("unstake failed");
    }
}

async function weekly_withdraw(contract, account){
    try{
        var estimateGas = await contract.methods.weekly_withdraw().estimateGas({from: account});
        var weekly_withdraw = await contract.methods.weekly_withdraw().send({from:account, gas:estimateGas});
        console.log(weekly_withdraw);
    }catch{
        alert("weekly withdraw failed");
    }
}

async function daily_claim(contract, account){
    try{
        var estimateGas = await contract.methods.daily_claim().estimateGas({from: account});
        var daily_claim = await contract.methods.daily_claim().send({from:account, gas:estimateGas});
        console.log(daily_claim);
    }catch{
        alert("daily claim failed");
    }
}

async function withdraw_referral(contract, account){
    try{
        var estimateGas = await contract.methods.withdraw_referral().estimateGas({from: account});
        var withdraw_referral = await contract.methods.withdraw_referral().send({from:account, gas:estimateGas});
        console.log(withdraw_referral);
    }catch{
        alert("withdraw referral failed");
    }
}


async function get_msg_dailyClaim(contract){
    var data = await contract.methods.get_msg_dailyClaim().call();
    return data;
}

async function get_msg_weeklywithdraw(contract){
    var data = await contract.methods.get_msg_weeklyWithdraw().call();
    return data;
}

async function get_msg_deposit(contract){
    var data = await contract.methods.get_msg_deposit().call();
    return data;
}

async function get_msg_referral(contract){
    var data = await contract.methods.get_msg_referral().call();
    return data;
}

async function get_msg_status(contract){
    var data = await contract.methods.get_msg_status().call();
    return data;
}

async function get_trexbusd_data(contract){
    var data = await contract.methods.trexbusd_data().call();
    return data;
}


async function checkAllowance(token, account, contract_addrress){
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

export {stake, unstake, daily_claim, weekly_withdraw, withdraw_referral, get_msg_dailyClaim, get_msg_deposit, get_msg_referral, get_msg_status, get_msg_weeklywithdraw, get_trexbusd_data};