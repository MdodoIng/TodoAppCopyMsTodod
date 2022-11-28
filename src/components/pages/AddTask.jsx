import { useContext, useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsBell, BsCircle } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import { TbRepeat } from "react-icons/tb";
import { StateContext } from "../../context/StatesRun";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../Firebase";

const AddTask = () => {
  const [justFun, setJustFun] = useState(false);

  const {
    isAddTask,
    setIsAddTask,
    addTaskValue,
    setAddTaskValue,
    currentUser,
  } = useContext(StateContext);

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    const taskText = e.target[0].value;
    if (taskText.length > 0 && currentUser) {
      try {
        await addDoc(collection(db, `todo_${currentUser.email}`), {
          id: "id" + new Date().getTime(),
          taskText: taskText,
          user: currentUser.uid,
          date: new Date().toISOString(),
          important: false,
          dueDate: false,
          remained: false,
          repeat: false,
          completed: false,
        });
        console.log("oke set");
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (isAddTask === false) {
      setTimeout(() => {
        setJustFun(true);
      }, 500);
    }
    setJustFun(false);
  }, [isAddTask]);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        paddingRight: "20px",
      }}
    >
      <li onClick={() => setIsAddTask(true)}>
        {isAddTask ? <AiOutlinePlus /> : <BsCircle />}
        <form onSubmit={handleTaskSubmit} style={{ width: "100%" }}>
          <input
            type="text"
            placeholder="Add a task"
            value={addTaskValue.taskText}
            onChange={(e) =>
              setAddTaskValue({ ...addTaskValue, taskText: e.target.value })
            }
          />
        </form>
      </li>

      <li
        style={{ display: justFun ? "none" : "" }}
        className={
          isAddTask ? "taskFilterBox" : "taskFilterBox closeTaskFilter"
        }
      >
        <div className="taskBtnOp">
          <button>
            <SlCalender />
          </button>
          <button>
            <BsBell />
          </button>
          <button>
            <TbRepeat />
          </button>
        </div>
        <button
          className={addTaskValue.taskText?.length > 0 ? "btnActive" : ""}
        >
          Add
        </button>
      </li>
    </div>
  );
};

export default AddTask;
