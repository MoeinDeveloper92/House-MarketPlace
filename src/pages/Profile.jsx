import { getAuth, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";

function Profile() {
  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);
  //we are going to set the user by the data we get back from the db
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((preState) => ({
      ...preState,
      [e.target.id]: e.target.value,
    }));
  };
  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };

  // since this functionr eturns a promise we need to make use of async await
  const onSubmit = async () => {
    // bellow we update the databas
    try {
      if (auth.currentUser.displayName !== name) {
        //update profile
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        //update in firestore
        //the id in teh fire store is the same as the id in the fire storage
        // in order to update a document we need to create a refrence
        const ueserRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(ueserRef, {
          name,
        });
        toast.success("User has been updated!");
      }
    } catch (error) {
      toast.error("Could not update profile details.");
    }
  };

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <button onClick={onLogout} className="logOut" type="button">
          Logout
        </button>
      </header>

      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Personal Details</p>
          <p
            className="changePersonalDetails"
            onClick={() => {
              changeDetails && onSubmit();
              setChangeDetails((pre) => !pre);
            }}
          >
            {changeDetails ? "Done" : "Change"}
          </p>
        </div>

        <div className="profileCard">
          <form>
            <input
              value={name}
              onChange={handleChange}
              disabled={!changeDetails}
              type="text"
              id="name"
              className={!changeDetails ? "profileName" : "profileNameActive"}
            />
            <input
              value={email}
              onChange={handleChange}
              disabled={!changeDetails}
              type="email"
              id="email"
              className={!changeDetails ? "profileEmail" : "profileEmailActive"}
            />
          </form>
        </div>
      </main>
    </div>
  );
}

export default Profile;
