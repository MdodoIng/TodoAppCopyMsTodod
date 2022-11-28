import { MdClose } from "react-icons/md";
import {FiCheckCircle} from "react-icons/fi";
import { useContext } from "react";
import { StateContext } from "../context/StatesRun";


const Suggestion = () => {
  const {
    setIsSuggestion
  } = useContext(StateContext)
  const empty = 1
  return (
  <div className="suggestionContainer">
    <h1>Suggestion <span onClick={() => setIsSuggestion((prev) => !prev)}
    ><MdClose /></span></h1>
    <div className="sugContents">
      {empty ? (
        <div className="sugEmpty">
          
        <FiCheckCircle/>
        </div>
       ):(
        <div>

        </div>
      )}
    </div>
  </div>
  )
};

export default Suggestion;
