import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
function Profile() {
  const [user, setUser] = useState(null);
  const auth = getAuth();
  console.log(auth.currentUser);
  useEffect(() => {
    setUser(auth.currentUser);
  }, []);

  return user ? (
    <div>
      <h1>{user.displayName}</h1>
    </div>
  ) : (
    "Not Logged In"
  );
}

export default Profile;
