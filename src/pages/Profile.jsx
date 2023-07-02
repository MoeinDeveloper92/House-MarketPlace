import React, { useEffect, useRef, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { db } from "../firebase.config";
import { updateDoc, doc } from "firebase/firestore";

function Profile() {
  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;
  const navigate = useNavigate();

  const onLogOut = () => {
    auth.signOut();
    toast.success("You get signed out");
    navigate("/");
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        //update dipsay name in fb
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        //update in firestre
        //we need to create a refrencce
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          name,
        });
        toast.success(`${name}'s account has been updated...`);
      }
    } catch (error) {
      toast.error("counld not update profile details...");
    }
  };

  const onChange = (e) => {
    setFormData((preState) => ({
      ...preState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">
          <span style={{ textDecoration: "capitalize" }}></span>Your Profile
        </p>
        <button type="button" onClick={onLogOut} className="logOut">
          Log Out
        </button>
      </header>

      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Personal Details</p>
          <p
            className="changePersonalDetails"
            onClick={() => {
              changeDetails && onSubmit();
              setChangeDetails((preState) => !preState);
            }}
          >
            {changeDetails ? "Done" : "Change"}
          </p>
        </div>

        <div className="profileCard">
          <form>
            <input
              type="text"
              id="name"
              className={!changeDetails ? "profileName" : "profileNameActive"}
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
            />

            <input
              type="email"
              id="email"
              className={!changeDetails ? "profileEmail" : "profileEmailActive"}
              disabled={!changeDetails}
              value={email}
              onChange={onChange}
            />
          </form>
        </div>
      </main>
    </div>
  );
}

export default Profile;
