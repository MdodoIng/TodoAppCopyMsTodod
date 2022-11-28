import { useContext, useEffect, useMemo } from "react";
import { AiOutlineMenu, AiOutlineStar } from "react-icons/ai";
import { BsCalendar2Plus } from "react-icons/bs";
import { CiHome } from "react-icons/ci";
import { GoLightBulb } from "react-icons/go";
import { HiOutlineDotsHorizontal, HiOutlineSun } from "react-icons/hi";
import { MdOutlineAccountCircle } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { TbArrowsSort } from "react-icons/tb";
import { StateContext } from "../../context/StatesRun";


const sortList = [
  { id: 1, name: "Important", icon: <AiOutlineStar /> },
  { id: 2, name: "Due time", icon: <SlCalender /> },
  { id: 3, name: "Alphabetically", icon: <TbArrowsSort /> },
  { id: 4, name: "Creation Date", icon: <BsCalendar2Plus /> },
];
const HomeHead = () => {
  const { isSidebar, setIsSidebar, isSort,
    setIsSort,
    setSortValue,
    setIsSuggestion,
    setIsAddTask,
    params
  } = useContext(StateContext)

  const handleClick = () => {
    setIsAddTask(false)
    setIsSidebar(true)
    setIsSort(false)
  }


  const homeHeadName = () => {
    switch (params) {
      case "myday":
        return 'My Day'
      case "important":

        return "Important"
      case "planned":

        return "Planned"
      case "assign_to_me":

        return "Assigned to me"
      case "inbox":
        return "Tasks"

      default:
        return 'My Day'
    }
  }

  const homeHeadIcon = () => {
    switch (params) {
      case "myday":
        return <HiOutlineSun />
      case "important":

        return <AiOutlineStar />
      case "planned":

        return <SlCalender />
      case "assign_to_me":

        return <MdOutlineAccountCircle />
      case "inbox":
        return <CiHome />

      default:
        return <HiOutlineSun />
    }
  }

  const importanceSort = () => {
    if (params === "important") {
      setSortValue("Important")
    }
  }
  const SortButton = () => (
    <button onClick={() => setIsSort(!isSort)}>
      <TbArrowsSort />
      Sort
      {isSort && (
        <div className="sortCategory">
          <p>Sort by</p>
          <ul>
            {sortList.map((item) => (
              <li key={item.id} onClick={() => setSortValue(item.name)}>
                {item.icon}
                <p>{item.name}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </button>
  )
  useEffect(() => {
    homeHeadIcon()
    homeHeadName()
    importanceSort()
  }, [params]);

  return (
    <div className="homeHead">
      <div style={{ display: "inline-flex", width: "100%" }} className={params === "important" || params === "planned" || params === "inbox" ? 'importantHead' : '' || params === "assign_to_me" ? "assign_to_me" : ''}>
        <div className="homeHead_title">
          {isSidebar ?
            homeHeadIcon()
            :
            <AiOutlineMenu onClick={handleClick} />
          }
          <h4 className={params === "important" ? 'importantHead' : ''}>{homeHeadName()}</h4>
          <HiOutlineDotsHorizontal style={{ width: "17px" }} />
        </div>
        {params === "myday" &&
          <SortButton />
        }
        {params === "important" &&
          <SortButton />
        }
        {params === "inbox" &&
          <SortButton />
        }

        {params === "myday" &&
          <button onClick={() => setIsSuggestion((prev) => !prev)}>
            <GoLightBulb />
            Suggestion
          </button>
        }
      </div>
      {params === "myday" &&
        <p>monday, november 14 </p>
      }
    </div>
  );
};

export default HomeHead;
