import { MdCampaign, MdClose, MdOutlineApps } from "react-icons/md";
import { IoMdHelp, IoMdSearch, IoMdSettings } from "react-icons/io";
import { RiAccountCircleFill } from "react-icons/ri";
import { useContext } from "react";
import { StateContext } from "../context/StatesRun";
import {signOut} from "firebase/auth";
import { auth } from "../Firebase";
import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate()
  const {
    isNav, setIsNav
  } = useContext(StateContext);

  const isSignOut = () => {
    signOut(auth)
    setIsNav({feature: false})
    // navigate('/auth')
  }

  const Settings = () => (
    <>
      <h1>
        Settings
        <span onClick={() => setIsNav({settings: false})}>
          <MdClose />
        </span>
      </h1>
      <div className="sugContents">
        <h4>General</h4>
        <ul>
          <li>
            Conform before deleting
            <div style={{ display: "flex", gap: "8px" }}>
              <button className={toggleButton && "on"}>
                <span />
              </button>
              <p>{toggleButton ? "On" : "Off"}</p>
            </div>
          </li>
          <li>
            Conform before deleting
            <div
              style={{
                display: "flex",
                gap: "8px",
                alignItems: "center",
              }}
            >
              <button className={toggleButton && "on"}>
                <span />
              </button>
              <p>{toggleButton ? "On" : "Off"}</p>
            </div>
          </li>
        </ul>
      </div>
    </>
  );

  const Help = () => (
    <>
      <h1>
        Help
        <span  onClick={() => setIsNav({help: false})}>
          <MdClose />
        </span>
      </h1>
      <div className="sugContents help">
        <a href="">Get support</a>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <button>Sync</button>
          <p>Up to date</p>
        </div>
      </div>
    </>
  );

  const Feature = () => (
    <>
      <h1>
        What's new
        <span onClick={() => setIsNav({feature: false})}>
          <MdClose />
        </span>
      </h1>
      <div className="sugContents new">
        <img src="" alt="" />
        <p>Now you will get Darkmode from theme settings! </p>
        <button>try it</button>
      </div>
    </>
  );
  const User = () => (
    <>
      <h1>
      &nbsp;
        <span onClick={isSignOut}>
          Sign out
        </span>
      </h1>
      <div className="sugContents new">
        <img src="" alt="" />
      <div style={{display: 'grid'}}>
        <h4>username</h4>
        <p>email</p>
        <a href="">Edit</a>
      </div>
      </div>
    </>
  );

  const handleAccClick = () => {
    if (!isNav.user) {
      setIsNav({...isNav, user:true})
    }
    else if (isNav.user) {
      setIsNav({...isNav, user:false})
    }
  }
  const toggleButton = 0;
  return (
    <>
      <div className="navbar-container">
        <div className="navLogo">
          <button className="nav-buttons">
            <MdOutlineApps />
          </button>
          <p>To Do</p>
        </div>
        <form className="nav-search">
          <IoMdSearch color="#2564cf" />
          <input placeholder="Search" />
        </form>
        <div style={{ display: "inline-flex" }}>
          <button
            className="nav-buttons settings"
            onClick={() => setIsNav({settings: true})}
          >
            <IoMdSettings />
          </button>
          <button
            className="nav-buttons settings"
            onClick={() => setIsNav({help:true})}
          >
            <IoMdHelp />
          </button>
          <button
            className="nav-buttons settings"
            onClick={() => setIsNav({feature:true})}
          >
            <MdCampaign />
          </button>
          <button
            className="nav-buttons settings"
            onClick={handleAccClick}
          >
            <RiAccountCircleFill />
          </button>
        </div>
      </div>


      {
       isNav.settings &&
        <div className="suggestionContainer navSettings">
          <Settings />
        </div>
      }
      {
       isNav.help &&
        <div className="suggestionContainer navSettings">

          <Help />
        </div>

      }
      {
       isNav.feature &&
        <div className="suggestionContainer navSettings">

          <Feature />
        </div>

      }
      {
       isNav.user &&
        <div className="suggestionContainer userSetting">

          <User />
        </div>

      }

    </>
  );
};

export default Navbar;
