import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import googleIcon from "../assets/svg/googleIcon.svg";

function OAuth() {
  const location = useLocation();
  const navigate = useNavigate();

  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      //bellow we need to check to see if the user already exist or not
      //   the abvoe code will sign uo the user with google account
      // check fo user
      const docRef = doc(db, "users", user.uid);
      //   we get an snapshot of the document
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        // if it Does not exist we need to get there and create a user in the database
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
        navigate("/");
      }
    } catch (error) {
      toast.error("Could not authorize with google.");
    }
  };

  return (
    <div className="socialLogin">
      <p>Sign {location.pathname === "/sign-up" ? "Up" : "In"} with </p>
      <button className="socialIconDiv" onClick={onGoogleClick}>
        <img className="socialIconImg" src={googleIcon} alt="Google " />
      </button>
    </div>
  );
}

export default OAuth;
