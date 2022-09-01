

async function stake(contract, account, token, contract_address, referral_address, amount){
    var allowance = await token.methods.allowance(account, contract_address).call();
    if(allowance >= amount){
        try{
            var estimateGas = await contract.methods.stake(referral_address, web3.utils.toWei(amount.toString(), "wei")).estimateGas({from: account});// wei to ether later
            var stake = await contract.methods.stake(referral_address, web3.utils.toWei(amount.toString(), "wei")).send({from:account, gas:estimateGas});
        } catch (error) {
            throw error;
        }
    }else{
        throw "allowance is not enough";
    }
}

async function unstake(contract, account){
    try {
        var estimateGas = await contract.methods.unstake().estimateGas({from: account});
        var unstake = await contract.methods.unstake().send({from:account, gas:estimateGas});
    } catch (error) {
        throw error;
    }
    
}

async function weekly_withdraw(contract, account){
    try{
        var estimateGas = await contract.methods.weekly_withdraw().estimateGas({from: account});
        var weekly_withdraw = await contract.methods.weekly_withdraw().send({from:account, gas:estimateGas});
    } catch (error) {
        throw error;
    }
}

async function daily_claim(contract, account){
    try{
        var estimateGas = await contract.methods.daily_claim().estimateGas({from: account});
        var daily_claim = await contract.methods.daily_claim().send({from:account, gas:estimateGas});
    } catch (error) {
        throw error;
    }
}

async function withdraw_referral(contract, account){
    try{
        var estimateGas = await contract.methods.withdraw_referral().estimateGas({from: account});
        var withdraw_referral = await contract.methods.withdraw_referral().send({from:account, gas:estimateGas});
    } catch (error) {
        throw error;
    }
}


async function get_msg_dailyClaim(contract, account){
    var data = await contract.methods.get_msg_dailyClaim(account).call();
    return data;
}

async function get_msg_weeklyWithdraw(contract, account){
    var data = await contract.methods.get_msg_weeklyWithdraw(account).call();
    return data;
}

async function get_msg_deposit(contract, account){
    var data = await contract.methods.get_msg_deposit(account).call();
    return data;
}

async function get_msg_referral(contract, account){
    var data = await contract.methods.get_msg_referral(account).call();
    return data;
}

async function get_msg_status(contract, account){
    var data = await contract.methods.get_msg_status(account).call();
    return data;
}

async function rexbusd_data(contract){
    var data = await contract.methods.rexbusd_data().call();
    return data;
}

async function contract_balance(contract){
    var data = await contract.methods.contract_balance().call();
    return data;
} 


async function approve(token, account, contract_address, amount){
    try{
        var estimateGas = await token.methods.approve(contract_address, web3.utils.toWei((amount).toLocaleString("fullwide", {useGrouping: false}))).estimateGas({from: account});
        var approve = await token.methods.approve(contract_address, web3.utils.toWei((amount).toLocaleString("fullwide", {useGrouping: false}))).send({from: account,gas:estimateGas});
    }catch(e){
        throw e;
    }
}

async function allowance(token, account, contract_address){
    var allowance = await token.methods.allowance(account, contract_address).call();
    return allowance;
}

async function get_msg_wallet_balance(account, token){
    var balance = await token.methods.balanceOf(account).call();
    return balance;
}



export {stake, approve, allowance, unstake, daily_claim, weekly_withdraw, withdraw_referral, get_msg_dailyClaim, get_msg_deposit, get_msg_referral, get_msg_status, get_msg_weeklyWithdraw, rexbusd_data, contract_balance, get_msg_wallet_balance};