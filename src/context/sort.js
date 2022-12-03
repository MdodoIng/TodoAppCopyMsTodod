import { useContext } from "react";
import { StateContext } from "./StatesRun";


export function TaskSort(a, b) {
  const {
    sortValue,
  } = useContext(StateContext);

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

