import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { auth, db } from "../Firebase";

export const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [isSidebar, setIsSidebar] = useState(false);
  const [isSort, setIsSort] = useState(false);
  const [sortValue, setSortValue] = useState("");
  const [isSuggestion, setIsSuggestion] = useState(false);
  const [isNav, setIsNav] = useState({});
  const [isAddTask, setIsAddTask] = useState(false);
  const [addTaskValue, setAddTaskValue] = useState(null);
  const [params, setParams] = useState("myday");
  const [currentUser, setCurrentUser] = useState({});
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isActive, setIsActive] = useState(null);
  const [selectedTask, setSelectedTask] = useState('');

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log(user);
    });
    return () => {
      unSub();
    };
  }, []);

useEffect(() => {
  const q = query(
    collection(db, `todo_${currentUser?.email}`),
    orderBy("date", "desc"),
  );

  const unData = onSnapshot(q, (querySnapshot) => {
    let dataAll = [];
    querySnapshot.forEach((doc) => {
      dataAll.push({ ...doc.data(), id: doc.id });
    });
    setData(dataAll);
    if (dataAll) {
        setIsLoading(false);
    }
  });

  return () => {
    unData();
  };
}, [currentUser]);


  console.log(data);

  return (
    <StateContext.Provider
      value={{
        isNav,
        setIsNav,
        params,
        setParams,
        isAddTask,
        setIsAddTask,
        isSidebar,
        setIsSidebar,
        isSort,
        setIsSort,
        isSuggestion,
        setIsSuggestion,
        sortValue,
        setSortValue,
        addTaskValue,
        setAddTaskValue,
        isLoading,
        setIsLoading,
        data,
        currentUser,
        isActive,
        setIsActive,
        selectedTask,
        setSelectedTask,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
