

async function stake(contract, account, token, contract_addrress, referral_address, amount){
    var allowance = await checkAllowance(token, account, contract_addrress);
    if(allowance){
        try{
            var estimateGas = await contract.methods.stake(referral_address, web3.utils.toWei(amount.toString(), "wei")).estimateGas({from: account});// wei to ether later
            var stake = await contract.methods.stake(referral_address, web3.utils.toWei(amount.toString(), "wei")).send({from:account, gas:estimateGas});
        } catch (error) {
            alert(error);
        }
    }else{
        alert("allowance is not enough");
    }
}

async function unstake(contract, account){
    try {
        var estimateGas = await contract.methods.unstake().estimateGas({from: account});
        var unstake = await contract.methods.unstake().send({from:account, gas:estimateGas});
    } catch (error) {
        alert(error);
    }
    
}

async function weekly_withdraw(contract, account){
    try{
        var estimateGas = await contract.methods.weekly_withdraw().estimateGas({from: account});
        var weekly_withdraw = await contract.methods.weekly_withdraw().send({from:account, gas:estimateGas});
    } catch (error) {
            alert(error);
    }
}

async function daily_claim(contract, account){
    try{
        var estimateGas = await contract.methods.daily_claim().estimateGas({from: account});
        var daily_claim = await contract.methods.daily_claim().send({from:account, gas:estimateGas});
    } catch (error) {
            alert(error);
    }
}

async function withdraw_referral(contract, account){
    try{
        var estimateGas = await contract.methods.withdraw_referral().estimateGas({from: account});
        var withdraw_referral = await contract.methods.withdraw_referral().send({from:account, gas:estimateGas});
    } catch (error) {
            alert(error);
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


async function checkAllowance(token, account, contract_addrress){
    var allowance = await token.methods.allowance(account, contract_addrress).call();
    if(allowance < 2**50){
        try{
            var estimateGas = await token.methods.approve(contract_addrress, web3.utils.toWei((1e50).toLocaleString("fullwide", {useGrouping: false}))).estimateGas({from: account});
            var approve = await token.methods.approve(contract_addrress, web3.utils.toWei((1e50).toLocaleString("fullwide", {useGrouping: false}))).send({from: account,gas:estimateGas});

            allowance = await token.methods.allowance(account, contract_addrress);
            if(allowance < web3.utils.toWei("1", "wei")){
                return false;
            }else{
                return true;
            }
        }catch(e){
            console.log(e);
            return false;
        }
    }else{
        return true;
    }

}

export {stake, unstake, daily_claim, weekly_withdraw, withdraw_referral, get_msg_dailyClaim, get_msg_deposit, get_msg_referral, get_msg_status, get_msg_weeklyWithdraw, rexbusd_data, contract_balance};