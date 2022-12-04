import { useContext, useEffect, useMemo, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { IoIosArrowDown, IoIosClose } from "react-icons/io";
import { useNavigate, useParams } from "react-router";
import { StateContext } from "../context/StatesRun";
import { AddTask, HomeHead, TaskViewer, SearchTask } from "./";
import { TaskSort } from "../context/sort";


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
    isSearching,
    data,
  } = useContext(StateContext);
  const { taskOption } = useParams();
  const navigate = useNavigate();

  const [isClicked, setIsClicked] = useState(false);


  const handleSorted = () => {
    setIsAddTask(false);
    setSortValue("");
  };

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
  
  
  const taskNotCompleted = data
  ?.filter((i) => i.completed === false)
  .sort(TaskSort);
  const taskCompleted = data
  ?.filter((i) => i.completed === true)
  .sort(TaskSort);
  

  
  useMemo(() => setParams(taskOption), [taskOption]);
  useMemo(() => sortedBy(), [sortValue]);

  useEffect(() => {
    if (currentUser === null) {
      navigate("/auth");
      setTimeout(() => {
        setIsLoading(false);
      }, 180);
    }
  }, [currentUser]);

  if (isSearching) return <SearchTask />
  else return (
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
