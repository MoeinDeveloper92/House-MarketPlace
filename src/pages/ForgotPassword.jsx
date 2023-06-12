import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
// we need to have link to the sign-in page

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Email was sent");
      navigate("/sign-in");
    } catch (error) {
      toast.error("Could not send reset Email");
    }
  };

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Forgot Password</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="emailInput"
            id="email"
            value={email}
            onChange={onChange}
          />
          <Link to={"/sign-in"} className="forgotPasswordLink">
            Sign In
          </Link>
          <div className="signInBar">
            <div className="signInText">Send Reset Link</div>
            <button className="signInButton">
              <ArrowRightIcon fill="#fff" width={"34px"} height={"34px"} />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default ForgotPassword;
