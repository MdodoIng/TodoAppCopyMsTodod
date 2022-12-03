import { useContext, useState } from "react";
import { Routes, Route, BrowserRouter as Router, useParams, Navigate, useNavigate } from "react-router-dom";
import { Auth, Home, Loading, Navbar, Sidebar, Suggestion } from "./components";
import { StateContext } from "./context/StatesRun";

const App = () => {
  const { isSidebar, isSuggestion, isLoading, currentUser, selectedTask } = useContext(StateContext)
    

  if (isLoading) {
    return <Loading />
  } else if (!isLoading) return (
    <Router >
      <div className="app">
        <Navbar />
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {isSidebar &&
            <Sidebar />
          }
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/task/:taskOption" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
          {(isSuggestion || selectedTask) &&
            <Suggestion />
          }
        </div>
      </div>
    </Router>
  )
};

export default App;