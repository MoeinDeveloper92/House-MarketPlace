import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArroRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visiblity from "../assets/svg/visibilityIcon.svg";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { toast } from "react-toastify";
//serverTimestam allows us to add a timestamp field
import { setDoc, doc, serverTimestamp } from "firebase/firestore";

import { db } from "../firebase.config";

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
    setFormData((preState) => ({
      ...preState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const userCreadential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCreadential.user;
      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const formDataCopy = { ...formData };
      //needless to say, we dont want the password to be set in the databse
      delete formDataCopy.password;
      //bellow we are adding timestamp propert to form datcopy
      formDataCopy.timestamp = serverTimestamp();
      //setDoc returns a promise, thas's why we use await
      await setDoc(doc(db, "users", user.uid), formDataCopy);

      navigate("/");
    } catch (error) {
      toast.error("Something went wrong with regitration...");
    }
  };

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>
        <main>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="name"
              value={name}
              id="name"
              onChange={handleChange}
              className="nameInput"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              id="email"
              onChange={handleChange}
              className="emailInput"
            />
            <div className="passwordInputDiv">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handleChange}
                id="password"
                className="passwordInput"
                placeholder="Password"
              />
              <img
                src={visiblity}
                className="showPassword"
                alt="Show password"
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            </div>
            <Link to={"/forgot-password"} className="forgotPasswordLink">
              Forgot Password
            </Link>

            <div className="signInBar">
              <p className="signInText">Sign Up</p>
              <button className="signInButton">
                <ArroRightIcon fill="#fff" width={"34px"} height={"34px"} />
              </button>
            </div>
          </form>
          {/* Google OAth */}

          <Link to={"/sign-in"} className="registerLink">
            Sign In instead?
          </Link>
        </main>
      </div>
    </>
  );
}

export default SignUp;
