import React, { useEffect, useState, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// whenevr the state changes, this function firesoff

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const isMounted = useRef(true);
  //   we check to see if we are logged in
  //right after we get the response we chekc chagen the state

  useEffect(() => {
    if (isMounted) {
      const auth = getAuth();
      // this hook listens to the current state of the user
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setLoggedIn(true);
        }
        setCheckingStatus(false);
        //we only want to render, only check stastu is false
      });
    }

    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);
  return { loggedIn, checkingStatus };
};
// bellow is the source in order to check whther the use logged in or not
//https://stackoverflow.com/questions/65505665/protected-route-with-firebase
