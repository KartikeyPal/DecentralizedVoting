import { useWeb3Context } from '../../context/useWeb3Context'
import erc20abi from '../../constants/erc20abi.json'
import {ethers} from 'ethers'
import { useEffect, useState } from 'react';
const TokenBalance = () => {
  const [userTokenBalance,setuserTokenBalance]=useState("0");
    const {web3State}=useWeb3Context();
    const {selectedAccount,provider}=web3State;
    useEffect(()=>{
      const fetchTokenBalance = async()=>{
        const constractAddress = "0x0f2E1968d11515664f5ce84FFeB1de0c2F198FC7";
        console.log(selectedAccount);
        const erc20ContractInstance = new ethers.Contract(constractAddress,erc20abi,provider);
        const tokenBalanceWei = await erc20ContractInstance.balanceOf(selectedAccount);
        const tokenBalanceEth = ethers.formatEther(tokenBalanceWei);
        setuserTokenBalance(tokenBalanceEth);
        
      }
      provider && fetchTokenBalance();
    },[selectedAccount,provider]);

    
  return (
    <div>
      <h1>Token  balance: {userTokenBalance}</h1>
        
    </div>
  )
}

export default TokenBalance
