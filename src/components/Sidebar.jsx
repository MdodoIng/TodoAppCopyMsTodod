import { HiOutlineSun } from "react-icons/hi";
import { AiOutlineMenu, AiOutlineStar } from "react-icons/ai";
import { SlCalender } from "react-icons/sl";
import { MdOutlineAccountCircle } from "react-icons/md";
import { CiHome } from "react-icons/ci";
import { TfiPlus } from "react-icons/tfi";
import { BsJournalPlus } from "react-icons/bs";
import { useContext } from "react";
import { StateContext } from "../context/StatesRun";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { setIsSidebar, params, data } = useContext(StateContext);
  const sidebarLinks = [
    { id: 1, name: "My Day", icon: <HiOutlineSun />, to: "myday",
  tasks: data?.filter((i) => i.completed === false).length },
    { id: 2, name: "Important", icon: <AiOutlineStar />, to: "important",
    tasks: data?.filter((i) =>i.completed === false && i.important === true).length },
    { id: 3, name: "Planned", icon: <SlCalender />, to: "planned" },
    {
      id: 4,
      name: "Assign to me",
      icon: <MdOutlineAccountCircle />,
      to: "assign_to_me",
    },
    { id: 5, name: "Tasks", icon: <CiHome />, to: "inbox",  tasks: data?.filter((i) => i.completed === false).length},
  ];

  return (
    <>
    <div className="sidebar-containerBacMob"/>
    <div className="sidebar-container">
      <span className="sidebarMenuBtn">
        <AiOutlineMenu onClick={() => setIsSidebar(false)} />
      </span>
      {sidebarLinks.map((item) => (
        <Link
          to={`task/${item.to}`}
          key={item.id}
          className={params === item.to ? "sideCategory active" : "sideCategory"}
          onClick={() => setIsSidebar(false)}
        >
          {item.icon}
          <p>
            {item.name} <span>{item.tasks}</span>
          </p>
        </Link>
      ))}
      <span className="bottomBrick" />
      <div className="sideNewList">
        <div className="sideCategory">
          <TfiPlus />
          <p>New list</p>
        </div>
        <span>
          <BsJournalPlus />
        </span>
      </div>
    </div>
    </>
  );
};

export default Sidebar;
