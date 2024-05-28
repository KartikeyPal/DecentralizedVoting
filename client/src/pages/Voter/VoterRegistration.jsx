import { useRef,useState} from "react";
import axios from "axios";
import { useWeb3Context } from "../../context/useWeb3Context";

const VoterRegistration = () => {
  const {web3State} = useWeb3Context();
  const {contractInstance,selectedAccount}=web3State; //const { contractInstance } = useContext(Web3Context);
  const [file,setFile]=useState("")
  const nameRef = useRef();
  const ageRef = useRef();
  const genderRef = useRef();
  const handleVoterRegistration = async (e) => {
    try {
      e.preventDefault();
      //Handling image upload
      const formData = new FormData()
      formData.append("file",file)
      const token  = localStorage.getItem("token");
      const config = {
          headers:{
              'x-access-token':token 
          }
        
      }
      await axios.post(`http://localhost:3000/api/postVoterImage`,formData,config)

      // Handling voter Registration
      const name = nameRef.current.value;
      const age = ageRef.current.value;
      const gender = genderRef.current.value;
      if(name===""|| age===""|| gender===""){
        throw new Error("Input field cannot be empty")
      }
      const tx=await contractInstance.voterRegister(name, age, gender);
      const receipt = await tx.wait();

      console.log(receipt);
      nameRef.current.value="";
      ageRef.current.value="";
      genderRef.current.value="";

      console.log("Voter Registration Successful!");
    } catch (error) {
        console.log("error in voterResgistration.js",error.message );
    }
    
  };
  return (
    <>
      <form onSubmit={handleVoterRegistration}>
        <label>Voter Name:</label>
        <input type="text" placeholder="Candidate Name" ref={nameRef} />

        <label>Voter Age:</label>
        <input type="text" placeholder="Candidate Age" ref={ageRef} />

        <label>Voter Gender:</label>
        <input type="text" placeholder="Candidate Gender" ref={genderRef} />
        <br />
        <button type="submit">Voter Register</button>
      </form>
      <br></br>
      <input type="file" onChange={(e)=>setFile(e.target.files[0])}></input>
    </>
  );
};

export default VoterRegistration;