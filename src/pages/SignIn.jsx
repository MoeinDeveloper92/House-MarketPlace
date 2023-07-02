import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArroRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visiblity from "../assets/svg/visibilityIcon.svg";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
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

      const useCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (useCredential.user) {
        toast.success("You are signed...");
        navigate("/");
      }
    } catch (error) {
      toast.error("Bad User Credentials...");
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
              <p className="signInText">Sign In</p>
              <button className="signInButton">
                <ArroRightIcon fill="#fff" width={"34px"} height={"34px"} />
              </button>
            </div>
          </form>
          {/* Google OAth */}

          <Link to={"/sign-up"} className="registerLink">
            Sign Up instead?
          </Link>
        </main>
      </div>
    </>
  );
}

export default SignIn;
