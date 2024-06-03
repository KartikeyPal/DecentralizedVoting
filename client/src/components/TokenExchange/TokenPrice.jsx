import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers';
const TokenPrice = ({contractInstance}) => {
  const [tokenPrice, settokenPrice]=useState(null );
  useEffect(()=>{
    const fetchTokenPrice = async ()=>{
      
      const tokenPriceWei= await contractInstance.tokenPrice();
      const tokenPriceEth = ethers.formatEther(tokenPriceWei);
      settokenPrice(tokenPriceEth)
      console.log(tokenPriceEth);
    }
    contractInstance && fetchTokenPrice();
  })
  return (
    <div>
      <h1>Token Price: {tokenPrice}</h1>
      
    </div>
  )
}

export default TokenPrice
