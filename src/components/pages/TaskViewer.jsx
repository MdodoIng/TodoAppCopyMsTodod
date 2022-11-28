import { doc, updateDoc } from "firebase/firestore";
import { useContext } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsBell, BsCheckCircle, BsCheckCircleFill, BsCircle, BsDot } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import { TbRepeat } from "react-icons/tb";
import { StateContext } from "../../context/StatesRun";
import { db } from "../../Firebase";

const TaskUncompleted = ({dueDate, id, important,remained
  ,repeat  , taskText , completed }) => {
   const { currentUser, isActive, setIsActive } = useContext(StateContext);


    const handelComplete = async () => {
      if ( completed === false) {

        try {
          await updateDoc(doc(db, `todo_${currentUser.email}`, id), {
            completed: true
          })
        } catch (error) {
          console.log(error);
          
        }
      } else if (completed === true) {
        try {
          await updateDoc(doc(db, `todo_${currentUser.email}`, id), {
            completed: false
          })
        } catch (error) {
          console.log(error);
          
        }

      }
      
    }
    
    const handleImportance = async () => {
      if ( important === false) {
        try {
          await updateDoc(doc(db, `todo_${currentUser.email}`, id), {
            important: true
          })
        } catch (error) {
          console.log(error);
          
        }
      } else if (important === true) {
        try {
          await updateDoc(doc(db, `todo_${currentUser.email}`, id), {
            important: false
          })
        } catch (error) {
          console.log(error);
          
        }
  
      }

    }

  return (
    <li
      className={
        completed === true ? isActive === id ? 'activelyTass completedTask selected': 'activelyTass completedTask' :
        isActive === id
          ? "activelyTass selected"
          : "activelyTass"
      }
      onClick={() => setIsActive(id)}
    >
      <div className="tickC" onClick={handelComplete}>
        {completed === false ? (<>
          <BsCircle className="tick" />
          <BsCheckCircle className="tickCircle" />
        </>
          ) : <BsCheckCircleFill/>}
      </div>
      <div>
        <p>{taskText}</p>
        <span>
          <small>Tasks</small>
          <BsDot />
          {dueDate && (
            <>
              <SlCalender />
              {dueDate}
              {repeat && (
                <>
                  <TbRepeat />
                </>
              )}
            </>
          )}

          {remained && (
            <>
              <BsDot />
              <BsBell />
              {remained}
            </>
          )}
        </span>
      </div>
      <span onClick={handleImportance}>
        {important ? 
         <AiFillStar />:<AiOutlineStar />
      }
      </span>
    </li>
  )
};

export default TaskUncompleted;
