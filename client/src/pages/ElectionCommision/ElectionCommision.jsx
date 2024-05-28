import AnnounceResult from "../../components/ElectionCommision/AnnounceResult";
import DisplayWinner from "../../components/ElectionCommision/DisplayWinner";
import VotingStartForm from "../../components/ElectionCommision/VotingStartForm";
import VotingStatus from "../../components/ElectionCommision/VotingStatus";
import EmergencyDeclare from "../../components/ElectionCommision/EmergencyDeclare";
const ElectionCommision = () => {
    return ( <>
     <VotingStatus/>
     <br></br>
     <DisplayWinner/>
     <br></br>
     <VotingStartForm/> 
     <br></br>
     <AnnounceResult/>
     <br></br>
     <EmergencyDeclare/>
    </>);
}
 
export default ElectionCommision;