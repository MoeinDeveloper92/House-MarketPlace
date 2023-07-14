import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import ListingItem from "../components/ListingItem";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

function Category() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        //Get a reference
        const listingRef = collection(db, "listings");

        //Create a query
        const q = query(
          listingRef,
          where("type", "==", params.categoryName),
          orderBy("timestamp", "desc"),
          limit(10)
        );

        //Execute query
        const querySnap = await getDocs(q);

        // we need to loop through the snapshot
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
        toast.error("Could not fetch listings");
      }
    };

    fetchListings();
  }, [params.categoryName]); // <-- Add an empty dependency array here

  return (
    <div className="category">
      <header>
        <p className="pageHeader">
          {params.categoryName === "rent"
            ? "Places for rent"
            : "places for sale"}
        </p>
      </header>

      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="categoryListings">
              {listings.map((listing) => (
                <ListingItem
                  listing={listing.data}
                  id={listing.id}
                  key={listing.id}
                />
              ))}
            </ul>
          </main>
        </>
      ) : (
        <p>No Listings for {params.categoryName} </p>
      )}
    </div>
  );
}

export default Category;

// `doc.data()` is a method provided by the Firebase Firestore library that returns the data of a specific document in a collection. In the provided code snippet, `doc.data()` is used to retrieve the data of each document returned by the query and create an array of objects with the `id` and `data` properties.

// The `forEach` loop iterates through the `querySnap` object, which is a `QuerySnapshot` containing the documents returned by the query. For each document, the loop pushes an object with the document ID and the data returned by `doc.data()` into the `listings` array.

// By doing this, the `listings` array contains an array of objects, where each object represents a document in the `listings` collection. The `id` property represents the ID of the document, and the `data` property contains an object with the data of the document.
