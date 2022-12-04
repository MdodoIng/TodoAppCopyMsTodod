import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../context/StatesRun";
import { auth } from "../Firebase";

const Auth = () => {
  const navigate = useNavigate();
  const { currentUser, setIsLoading } = useContext(StateContext);
  const [isLogin, setIsLogin] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (email && password) {
      setIsLoading(true);
      if (!isLogin) {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          navigate("/task/myday");
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          switch (error.code) {
            case "auth/email-already-in-use":
              alert("The account already exists for that email.");
              break;
            case "auth/weak-password":
              alert("The password provided is too weak.");
              break;
          }
        }
      } else if (isLogin) {
        try {
          setIsLoading(true);
          await signInWithEmailAndPassword(auth, email, password);
          navigate("/task/myday");
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          console.log(error.code);
          switch (error.code) {
            case "auth/wrong-password":
              alert("The password is wrong.");
              break;
            case "auth/user-not-found":
              alert("user not found");
          }
        }
      }
    }
  };

  const signWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    try {
      await signInWithRedirect(auth, provider)
      
    } catch (error) {
      console.log(error);
      
    }

  }

  return (
    <div className="AuthContainer">
      <div className="authContent">
        <h3>{isLogin ? "Log in" : "Sign Up"}</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Email" />
          <input type="text" placeholder="Password" />
          {!isLogin && <input type="text" placeholder="Confirm Password" />}
          <button>{isLogin ? "Log in" : "Sign Up"}</button>
        </form>
        <button onClick={signWithGoogle} className="signWithGoogle" title="ഇത്  ചെലപ്പോ വർക്ക് ആവ്വോള്ളു അപ്പൊ നൂകിം കണ്ടൊക്കെയാ നടക്കാ ">Login with Google</button>

        <p>{isLogin ? " don't have any account?" : "already have an account?"} <span onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Sign In" : "Login"}</span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
