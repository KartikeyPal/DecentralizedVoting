import React from 'react'
import { useRef } from 'react'
import { ethers } from 'ethers';
const BuyToken = ({contractInstance}) => {
  const tokenAmountRef= useRef();
  const buyToken = async(e)=>{
    e.preventDefault();
    const tokenValueEth = tokenAmountRef.current.value;
    const tokenValueWei  =ethers.parseEther(tokenValueEth,18);
    console.log(tokenValueWei);
    // const tx = await contractInstance.buyGLDToken()
  }
  return (
    <div>
      <form onSubmit={buyToken}>
        <label>Token Amount to Buy (In Eth):</label>
        <input type='text' ref={tokenAmountRef}></input>
        <button type='submit'>Buy Token</button>
      </form>
    </div>
  )
}

export default BuyToken
