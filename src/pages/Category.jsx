import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  getDoc,
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
  const [loading, setLoading] = useState(false);
  const { categoryName } = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Get a refrence to the collection
        const listingsRef = collection(db, "listings");

        //create a query
        const q = query(
          listingsRef,
          where("type", "==", categoryName),
          orderBy("timeStamp", "desc"),
          limit(10)
        );

        //Execute query
        const querySnap = await getDocs(q);
        console.log(q);
        const listings = [];

        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error("Could not fetch listings");
      }
    };

    fetchListings();
  }, [categoryName]);

  return (
    <div className="category">
      <header>
        <p className="pageHeader">
          {categoryName === "rent" ? "places for rent" : "places for sale"}
        </p>
      </header>

      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="categoryListings">
              {listings.map((listing) => (
                <h3>{listing.data.name}</h3>
              ))}
            </ul>
          </main>
        </>
      ) : (
        <p>No Listings for {categoryName}</p>
      )}
    </div>
  );
}

export default Category;

// we want to fetch collection listing from the firestore
