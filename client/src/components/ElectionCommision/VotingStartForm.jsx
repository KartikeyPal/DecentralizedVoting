import { useWeb3Context } from "../../context/useWeb3Context";
import { useRef } from "react";
const VotingStartForm = () => {
    const {web3State}=useWeb3Context();
    const {contractInstance}=web3State;
    const startRef = useRef();
    const endRef=useRef()

    const timeInSeconds = (time) =>{
      const date = new Date(time);
       return Math.floor(date.getTime()/1000)

    }

    const handleVotingTime = async(e)=>{
      e.preventDefault();
      const startTime = startRef.current.value;
      const endTime = endRef.current.value;
      const startTimeInSec = timeInSeconds(startTime);
      const endTimeInSec = timeInSeconds
      console.log(startTime,endTime);
      // await contractInstance.voteTime(startTime,endTime)
      // alert("Voting Started")
    }
    return (
    <>
      <form onSubmit={handleVotingTime}>
        <label htmlFor="start" >Start Time</label>
        <input type="date" ref={startRef}></input>
        <label htmlFor="end">End Time</label>
        <input type="date" ref={endRef}></input>
        <button>Voting Start</button>
      </form>
    </>);
}
 
export default VotingStartForm;