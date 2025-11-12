import React, { useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  MdRestaurant,
  MdLocationOn,
  MdStar,
  MdStarHalf,
  MdStarOutline,
  MdAccessTime,
  MdSearch,
} from "react-icons/md";
import { FaUtensils, FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";
import axios from "axios";
import { toast } from "react-toastify";
import AuthContext from "../contexts/AuthContext";

const AllReviews = () => {
  const [searchValue, setSearchValue] = useState("");
  const [finalValue, setFinalValue] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFinalValue(searchValue);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [searchValue]);

  const {
    data: reviews,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["allReviews", finalValue],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:5000/reviews?search=${finalValue}`
      );
      return response.data;
    },

    keepPreviousData: true,
  });

  const addFavorite = async (favReview) => {
    const result = await axios.post(
      "http://localhost:5000/add-to-favorite",
      favReview
    );

    if (!result.data.success) {
      throw new Error(result.data.message);
    }
    return result.data;
  };

  const mutation = useMutation({
    mutationFn: addFavorite,
    onSuccess: (res) => {
      toast.success(res.message);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleClickFavorite = async (favReview) => {
    mutation.mutate({
      favorite_of: user.email,
      review_id: favReview._id,
      added_at: new Date().toISOString(),
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    const numRating = parseFloat(rating);
    const fullStars = Math.floor(numRating);
    const hasHalfStar = numRating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<MdStar key={i} className="text-color-secondary text-xl" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <MdStarHalf key={i} className="text-color-secondary text-xl" />
        );
      } else {
        stars.push(<MdStarOutline key={i} className="text-gray-300 text-xl" />);
      }
    }
    return stars;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-main flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="text-6xl text-color-primary animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading delicious reviews...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-base-main flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md">
          <p className="text-red-500 text-xl font-semibold mb-2">
            Oops! Something went wrong
          </p>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-base-main py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-4 rounded-full shadow-lg bg-linear-mix">
            <FaUtensils className="text-5xl text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-linear-to-r from-orange-600 to-yellow-400 text-transparent bg-clip-text">
          Community Food Reviews
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover what fellow food lovers are enjoying across the city. From
          street food to fine dining, find your next delicious adventure!
        </p>

        {/* search bar ---------------------- */}

        <div className="mt-8 max-w-2xl mx-auto">
          <div className="relative">
            <input
              onChange={(e) => setSearchValue(e.target.value)}
              type="text"
              value={searchValue}
              // onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by food name, restaurant, or location..."
              className="w-full px-6 py-4 pr-12 text-gray-700 bg-white border-2 border-gray-200 rounded-full shadow-md focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all duration-300"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <MdSearch className="text-2xl text-gray-400" />
            </div>
          </div>
        </div>

        <div className="mt-6 inline-block bg-white px-6 py-3 rounded-full shadow-md">
          <p className="text-gray-700 font-semibold">
            <span className="text-color-primary text-xl">
              {reviews?.length || 0}
            </span>{" "}
            Reviews Shared
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {reviews && reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={review.foodImage}
                    alt={review.foodName}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 shadow-lg flex items-center gap-1">
                    <MdStar className="text-secondary text-lg" />
                    <span className="font-bold text-gray-800">
                      {review.rating}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-color-primary transition-colors duration-300">
                    {review.foodName}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MdRestaurant className="text-color-primary text-lg" />
                      <span className="font-medium">
                        {review.restaurantName}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2 text-gray-500 text-sm">
                      <div className="flex items-center gap-3">
                        <MdLocationOn className="text-gray-500" />
                        <span>{review.location}</span>
                      </div>
                      {/* favorite buttonnnnnnnnnnnn -------------------*/}

                      <button
                        type="button"
                        onClick={() => handleClickFavorite(review)}
                      >
                        <FaHeart size={24} className="text-red-500"></FaHeart>
                      </button>
                    </div>
                  </div>

                  {/* star ratingggggggg-------------- */}
                  <div className="flex items-center gap-1 mb-3">
                    {renderStars(review.rating)}
                  </div>

                  <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                    "{review.shortReview}"
                  </p>

                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            review.user_photo ||
                            "https://via.placeholder.com/40"
                          }
                          alt={review.user_name}
                          className="w-10 h-10 rounded-full border-2 border-primary object-cover"
                        />
                        <div>
                          <p className="text-sm font-semibold text-gray-800">
                            {review.user_name}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <MdAccessTime />
                            <span>{formatDate(review.created_at)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Link
                    to={`/review/${review._id}`}
                    className="mt-4 w-full bg-linear-mix text-white py-2 px-4 rounded-lg font-semibold text-center block transition-all duration-300 hover:shadow-lg transform hover:translate-y-[-2px]"
                  >
                    View Full Review
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <FaUtensils className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">
              No Reviews Yet
            </h3>
            <p className="text-gray-500 mb-6">
              Be the first to share a food review with the community!
            </p>
            <Link
              to="/add-review"
              className="inline-block bg-linear-mix text-white py-3 px-8 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Add Your First Review
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllReviews;
