import SellToken from '../../components/TokenExchange/SellToken'
import BuyToken from '../../components/TokenExchange/BuyToken'
import TokenBalance from '../../components/TokenExchange/TokenBalance'
import TokenPrice from '../../components/TokenExchange/TokenPrice'
import TokenExchangeabi from '../../constants/tokenExchangeabi.json'
import { ethers } from 'ethers'
import { useWeb3Context } from '../../context/useWeb3Context'
import { useState,useEffect } from 'react'

const TokenExchange = () => {
  const [tokenExchangeContractInstance,settokenExchangeContractInstance]=useState(null);
  const {web3State} = useWeb3Context();
  const {signer} = web3State;
  useEffect(()=>{
    const tokenExchangeInit = ()=>{
      const tokenExchangeContractAddress = "0xB01460004d093b11C840e81043B05e1cb90314a0";
      const tokenExchangeContractInstance = new ethers.Contract(tokenExchangeContractAddress,TokenExchangeabi,signer);
      settokenExchangeContractInstance(tokenExchangeContractInstance);
      console.log(tokenExchangeContractInstance);
    }
    signer && tokenExchangeInit();
  },[signer])
  return (
    <div>
        <TokenBalance/>
        <br/>
        <TokenPrice contractInstance = {tokenExchangeContractInstance}/>
        <br/>
        <BuyToken contractInstance = {tokenExchangeContractInstance}/>
        <br/>
        <SellToken contractInstance = {tokenExchangeContractInstance}/>
        <br/>
    </div>
  )
}

export default TokenExchange
