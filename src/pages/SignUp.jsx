import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";

// we have visiblity icond if you want to show actual icons
import visiblityIcon from "../assets/svg/visibilityIcon.svg";
function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((preState) => ({
      ...preState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // we are getting auth from getAuth
      const auth = getAuth();
      // we are registerign the user with this function
      // below function return a promise
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // bellow we can get the actual use information
      const user = userCredential.user;
      updateProfile(auth.currentUser, {
        displayName: name,
      });

      // we copying everythin inside the statem since we dont want ot change the state

      const formDataCopy = { ...formData };
      // i dont want the form password to be submitted in the database
      delete formDataCopy.password;
      // once it has been submitted the server timespamp will be added to it.
      formDataCopy.timestamp = serverTimestamp();

      // set doc is a function which updates the database
      await setDoc(doc(db, "users", user.uid), formDataCopy);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <motion.div
      initial={{
        x: "-100%",
      }}
      animate={{
        x: 0,
      }}
    >
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            id="name"
            value={name}
            onChange={onChange}
            className="nameInput"
          />
          <input
            type="email"
            placeholder="Email"
            id="email"
            value={email}
            onChange={onChange}
            className="emailInput"
          />
          <div className="passwordInputDiv">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="passwordInput"
              id="password"
              value={password}
              onChange={onChange}
            />
            <img
              src={visiblityIcon}
              alt="Show Password"
              className="showPassword"
              onClick={() => setShowPassword((pre) => !pre)}
            />
          </div>
          <Link to={"/forgot-password"} className="forgotPasswordLink">
            Forgot Password
          </Link>
          <div className="signUpBar">
            <p className="signUpText">Sign Up</p>
            <button className="signUpButton">
              <ArrowRightIcon fill="#fff" width={"34px"} height={"34px"} />
            </button>
          </div>
        </form>

        {/* Google OAth */}

        <Link to={"/sign-in"} className="registerLink">
          Sign In Instead
        </Link>
      </div>
    </motion.div>
  );
}

export default SignUp;
