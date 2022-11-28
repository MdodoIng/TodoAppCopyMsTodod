import { useContext, useEffect, useMemo, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { IoIosArrowDown, IoIosClose } from "react-icons/io";
import { useNavigate, useParams } from "react-router";
import { StateContext } from "../context/StatesRun";
import { AddTask, HomeHead, TaskViewer } from "./";

const Home = () => {
  const {
    isLoading,
    setIsLoading,
    isAddTask,
    setIsAddTask,
    addTaskValue,
    setParams,
    params,
    setSortValue,
    sortValue,
    currentUser,
    data,
  } = useContext(StateContext);
  const { taskOption } = useParams();
  const navigate = useNavigate();

  const [isClicked, setIsClicked] = useState(false);

  useMemo(() => setParams(taskOption), [taskOption]);

  const sortedBy = () => {
    switch (sortValue) {
      case "Important":
        return "by importance";
      case "Due time":
        return "by due time";
      case "Alphabetically":
        return "alphabetically";
      case "Creation Date":
        return "by created time";
    }
  };

  const handleSorted = () => {
    setIsAddTask(false);
    setSortValue("");
  };
  useMemo(() => sortedBy(), [sortValue]);

  useEffect(() => {
    if (currentUser === null) {
      navigate("/auth");
      setIsLoading(false);
    }
  }, [currentUser]);

  const taskNotCompleted = data
    ?.filter((i) => i.completed === false)
    .sort(taskSort);
  const taskCompleted = data
    ?.filter((i) => i.completed === true)
    .sort(taskSort);

  function taskSort(a, b) {
    if (sortValue === "") {
      return 0;
    }
    if (sortValue === "Important") {
      if (a.important < b.important) {
        return 1;
      }
      if (a.important > b.important) {
        return -1;
      }
      return 0;
    }
    if (sortValue === "Due time") {
      if (a.dueDate < b.dueDate) {
        return -1;
      }
      if (a.dueDate > b.dueDate) {
        return 1;
      }
      return 0;
    }
    if (sortValue === "Creation Date") {
      if (a.date < b.date) {
        return -1;
      }
      if (a.date > b.date) {
        return 1;
      }
      return 0;
    }
    if (sortValue === "Alphabetically") {
      if (a.taskText < b.taskText) {
        return -1;
      }
      if (a.taskText > b.taskText) {
        return 1;
      }
      return 0;
    }
  }

  return (
    <div className="homeContainer">
      <HomeHead />
      <div className="home_Contents">
        {sortedBy()?.length > 0 && (
          <span className="imp">
            <IoIosArrowDown />
            Sorted {sortedBy()}
            <IoIosClose onClick={handleSorted} />
          </span>
        )}

        <ul className="addA-task">
          <AddTask />
          <div
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              overflowY: "scroll",
              paddingTop: "16px",
              paddingBottom: "20px",
              marginBottom: "20px",
              paddingRight: "10px",
              transition: "all .5s ease",
            }}
          >
            {taskNotCompleted?.map((item) => (
              <TaskViewer key={item.id} {...item} />
            ))}

            <div
              className="taskCompleted"
              style={{ borderBottom: isClicked && 0 }}
              onClick={() => setIsClicked(!isClicked)}
            >
              <IoIosArrowDown
                style={{
                  transform: !isClicked ? "rotateZ(-90deg)" : "rotateZ(0)",
                  transition: "transform .3s ease",
                }}
              />
              <p>Completed</p>
              <span>{taskCompleted?.length}</span>
            </div>
            {isClicked && (
              <>
                {taskCompleted?.map((item) => (
                  <TaskViewer key={item.id} {...item} />
                ))}
              </>
            )}
          </div>
        </ul>
      </div>
      <div className="createTodoButton_at-bottom">
        <BsPlus />
      </div>
    </div>
  );
};

export default Home;
