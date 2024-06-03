import {ethers}  from "ethers";
import abi from "../constants/abi.json"
import axios from "axios"
// Voting address => 0xd6b0C9E2BB0bBD401C300254F45cE9a9aA37fFBc
// Token addrss => 0x4bAae3bf6F5e85d694D2b6F6fEE1540Ff4f98643
export const getWeb3State = async()=>{
  let [contractInstance,selectedAccount,chainId,electionCommissionStatus] = [null,null,null,null];
  try {
    if(!window.ethereum){
        throw new Error("Metamask is not installed");
      }
      const accounts = await window.ethereum.request({
        method:'eth_requestAccounts'
      })
      let chainIdHex = await window.ethereum.request({
        method:'eth_chainId'
      })
      chainId=parseInt(chainIdHex,16);
      selectedAccount = accounts[0];
      //read operation
      const provider = new ethers.BrowserProvider(window.ethereum);
      //write operation
      const signer = await provider.getSigner();
      
      const message = "You accept the terms and conditions of voting dapp"
      const signature = await signer.signMessage(message)

      const dataSignature ={
        signature
      }
      const res = await axios.post(`http://localhost:3000/api/authentication?accountAddress=${selectedAccount}`,dataSignature)
      electionCommissionStatus=res.data.electionCommissionStatus
      localStorage.setItem("token",res.data.token)

      const contractAddress = "0xd6b0C9E2BB0bBD401C300254F45cE9a9aA37fFBc";//use Dotenv in future
      contractInstance = new ethers.Contract(contractAddress,abi,signer);
      return {contractInstance,chainId,selectedAccount,electionCommissionStatus,provider,signer};
  } catch (error) {
    console.error("Not able to get the web3states",error.message);
    throw error;
  }
  
}