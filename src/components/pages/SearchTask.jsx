import React, { useContext, useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BsPlus } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { TaskViewer } from "..";
import { StateContext } from "../../context/StatesRun";
import HomeHead from "./HomeHead";

const SearchTask = () => {
  const [isClicked, setIsClicked] = useState(true);
  const [isData, setIsData] = useState();
  
  const {isSearching,
    data,
    setIsSearching,
    setIsSidebar
  } = useContext(StateContext);

  useEffect(() => {
    const dataSearched = data?.filter((i) => i.taskText.toLowerCase().includes(isSearching.toLowerCase()))

    setIsData(dataSearched)

  }, [isSearching]);
  

  console.log(isData);
  
  return (
    <div className="homeContainer">
    <div className="homeHead">
        <div className="homeHead_title" style={{color:'blue', justifyContent:'space-between', display:"flex", width:'100%',}}>
          <h4 style={{alignItems:'center', display:'flex', gap:'10px'}}><AiOutlineMenu onClick={() => setIsSidebar(true)} /> {`Searching for "${isSearching}"`}</h4>
          <p onClick={() => setIsSearching('')} style={{color:'blue', fontSize:"12px", fontWeight:'300'}}>Options</p>
        </div>
    </div>
    <div className="home_Contents">
    
      <ul className="addA-task">
       
        <div
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            overflowY: "scroll",
            paddingBottom: "20px",
            marginBottom: "20px",
            paddingRight: "10px",
            transition: "all .5s ease",
          }}
        >
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
            <p>Task</p>
            <span>{isData?.length}</span>
          </div>
            {isClicked &&
            <>
              {isData?.map((item) => (
                <TaskViewer key={item.id} {...item} />
                ))}
            </>
              }
        </div>
      </ul>
    </div>
    <div className="createTodoButton_at-bottom">
      <BsPlus />
    </div>
  </div>
    )
};

export default SearchTask;
