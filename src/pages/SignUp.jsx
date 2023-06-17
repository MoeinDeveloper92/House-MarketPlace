import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { toast } from "react-toastify";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visiblityIcon from "../assets/svg/visibilityIcon.svg";
import OAuth from "../components/OAuth";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    // bellow we get the prevState and then update it
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // bellow we are getting an instance of the newly authenticated user
      const auth = getAuth();
      //bellow we're registering the user with this
      // it will return a user
      //create user with credentials like user,email,auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // we can get the user from that userCreadential
      const user = userCredential.user;
      updateProfile(auth.currentUser, {
        displayName: name,
      });

      // bellow we add documetn to the fire store
      const formDataCopy = { ...formData };
      // I dont want the password to get submitteed to the databse
      delete formDataCopy.password;
      // once th form submitted, a time stamp will be added.
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);
      navigate("/");
    } catch (error) {
      toast.error("Something wend wrong with registration");
    }
  };
  // id should be as the same as it is in the state
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
          <p className="pageHeader">Registration page</p>
        </header>
        <main>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="nameInput"
              placeholder="Name"
              id="name"
              value={name}
              onChange={handleChange}
            />
            <input
              type="email"
              className="emailInput"
              placeholder="Email"
              id="email"
              value={email}
              onChange={handleChange}
            />
            <div className="passwordInputDiv">
              <input
                type={showPassword ? "text" : "password"}
                className="passwordInput"
                placeholder="Password"
                id="password"
                value={password}
                onChange={handleChange}
              />
              <img
                src={visiblityIcon}
                className="showPassword"
                alt="Show Password"
                onClick={() => setShowPassword((pre) => !pre)}
              />
            </div>
            <Link to={"/forgot-password"} className="forgotPasswordLink">
              Forgot Password
            </Link>

            <div className="signUpBar">
              <p className="signUpText">Sign UP</p>
              <button type="submit" className="signUpButton">
                <ArrowRightIcon fill="#fff" width={"34px"} height={"34px"} />
              </button>
            </div>
          </form>
          <OAuth />
          <Link to={"/sign-in"} className="registerLink">
            Sign In Instead
          </Link>
        </main>
      </div>
    </motion.div>
  );
}

export default SignUp;
