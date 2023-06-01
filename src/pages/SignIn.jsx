import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// we have visiblity icond if you want to show actual icons
import visiblityIcon from "../assets/svg/visibilityIcon.svg";
function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

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
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        navigate("/");
      }
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
          <div className="signInBar">
            <p className="signInText">Sign In</p>
            <button className="signInButton">
              <ArrowRightIcon fill="#fff" width={"34px"} height={"34px"} />
            </button>
          </div>
        </form>

        {/* Google OAth */}

        <Link to={"/sign-up"} className="registerLink">
          Sign Up Instead
        </Link>
      </div>
    </motion.div>
  );
}

export default SignIn;
