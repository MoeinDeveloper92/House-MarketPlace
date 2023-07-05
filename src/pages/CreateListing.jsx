import React, { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

function CreateListing() {
  //we need to have access to userRef to get the logged in user
  const [loading, setLoading] = useState(false);
  const [geolocationEnabled, setGeolocationEnabled] = useState(true);
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    images: {},
    latitude: 0,
    longitude: 0,
  });

  const auth = getAuth();

  const anvigate = useNavigate();
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid });
        } else {
          navigator("/sign-in");
        }
      });
    }

    return () => {
      isMounted.current = false;
    };
    //keep in mind that, if you add add formData as depdencny, uif the form data changes, you get stuck in a never ending loop
    //eslint-disabled-nex-line react-hooks/exhaustive-deps
  }, [isMounted]);

  if (loading) {
    return <Spinner />;
  }
  return <div>CreateListing</div>;
}

export default CreateListing;
//we need to have component level state
