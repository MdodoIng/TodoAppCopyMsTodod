import { MdClose } from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";
import { useContext } from "react";
import { StateContext } from "../context/StatesRun";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase";


const Suggestion = () => {
  const { currentUser, selectedTask, setSelectedTask, setIsSuggestion,
    isSuggestion, data } = useContext(StateContext)

  const empty = 1
  const clicked = 1

  const taskDelete = async () => {
    await deleteDoc(doc(db, `todo_${currentUser?.email}`, selectedTask))
    setSelectedTask('')
  }

  async function taskUpdate() {
    await updateDoc(doc(db, `todo_${currentUser?.email}`, selectedTask), {
      taskText: 'taskText',
      date: new Date().toISOString(),
      important: false,
      dueDate: false,
      remained: false,
      repeat: false,
      completed: false,

    })
  }

  const openedTask = data?.filter((task) => task.id === selectedTask)

  return (
    <>
    <div className="sidebar-containerBacMob" />
      {isSuggestion &&

        <div className="suggestionContainer">
          <h1>Suggestion <span onClick={() => setIsSuggestion((prev) => !prev)}
          ><MdClose /></span></h1>
          <div className="sugContents">
            {empty ? (
              <div className="sugEmpty">

                <FiCheckCircle />
              </div>
            ) : (
              <div>

              </div>
            )}
          </div>
        </div>
      }

{/* ivadunnn adeekullath tasknte ann */}

      {selectedTask &&
        <div className="suggestionContainer">
          <h1>Task <span onClick={() => setSelectedTask('')}
          ><MdClose /></span></h1>
          <div className="sugContents">
            <h4>General</h4>
            <div style={{display:'grid', border:'1px solid #cfc9c9', padding: '10px', borderRadius:'4px',  margin: '10px 0', background:'#d3d3d3', background: 'linear-gradient(121deg, #8ddfff5e, #4d8cff80)',filter: 'blur(1px)',
    fontFamily: 'monospace', lineHeight:'40px'}}>
            ee site woking 
            <ber />
            il annn seatta .... <br />

            korach kayijjit <br />
             varoondi 
             <br />
             ini atra ninbamdalnagil <b>DELETE</b> button work avum
             :)
            </div>
            <div className="task_last-buttons">
              <button disabled onClick={taskUpdate}>Update</button>
              <button onClick={taskDelete}>Delete</button>
            </div>
          </div>

        </div>

      }
    </>
  )
};

export default Suggestion;
