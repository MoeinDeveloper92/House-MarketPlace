import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// instead of getting a single document, we want to get a collection
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

function Category() {
  const [listings, setListings] = useState(null);
  //  once we fetch the listing , we set the loading to false
  const [loading, setLoading] = useState(true);

  const { categoryName } = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        //Get a refrence
        const listingRef = collection(db, "listings");

        // Create a query
        const q = query(
          listingRef,
          where("type", "==", categoryName),
          orderBy("timestamp", "desc"),
          limit(10)
        );

        // Execute query
        // get the document for that specfic query

        const querySnap = await getDocs(q);

        let listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error("Could not fetch Listings");
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="category">
      <header>
        <p className="pageHeader">
          {categoryName === "rent" ? "Places for rent" : "places for sale"}
        </p>
      </header>
      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <></>
      ) : (
        <p>No Listings for {categoryName}</p>
      )}
    </div>
  );
}

export default Category;
// here we want to fetch the listing from fire base and dipaly them
