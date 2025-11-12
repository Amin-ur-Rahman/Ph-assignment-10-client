import React, { useContext } from "react";
import {
  MdRestaurant,
  MdLocationOn,
  MdStar,
  MdDelete,
  MdVisibility,
  MdFavorite,
  MdStarHalf,
  MdStarOutline,
} from "react-icons/md";
import { FaHeart, FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const MyFavorites = () => {
  const { user } = useContext(AuthContext);
  const email = user.email;

  const fetchFavorites = async () => {
    const res = await axios.get(
      `http://localhost:5000/get-favorite?email=${email}`
    );

    return res.data;
  };

  const { isLoading, data: favorites } = useQuery({
    queryKey: ["favorite-reviews"],
    queryFn: fetchFavorites,
    onError: (error) => {
      console.log(error);
    },
  });

  console.log(favorites);

  const renderStars = (rating) => {
    const stars = [];
    const numRating = parseFloat(rating);
    const fullStars = Math.floor(numRating);
    const hasHalfStar = numRating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<MdStar key={i} className="text-secondary text-lg" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<MdStarHalf key={i} className="text-secondary text-lg" />);
      } else {
        stars.push(<MdStarOutline key={i} className="text-gray-300 text-lg" />);
      }
    }
    return stars;
  };

  const handleRemoveFavorite = (reviewId) => {
    console.log("Remove favorite:", reviewId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-main flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="text-6xl text-primary animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading your favorites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-main py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-4 rounded-full shadow-lg bg-linear-mix relative">
            <FaHeart className="text-5xl text-white" />
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {favorites?.length || 0}
              </span>
            </div>
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-primary">
          My Favorite Reviews
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Your personal collection of the most delicious food experiences
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        {favorites && favorites.length > 0 ? (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead className="bg-linear-mix text-white">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-bold text-sm sm:text-base">
                      Food
                    </th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-bold text-sm sm:text-base">
                      Restaurant
                    </th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-bold text-sm sm:text-base hidden md:table-cell">
                      Location
                    </th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-bold text-sm sm:text-base">
                      Rating
                    </th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-bold text-sm sm:text-base hidden lg:table-cell">
                      Review
                    </th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-center font-bold text-sm sm:text-base">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {favorites.map((favorite) => (
                    <tr
                      key={favorite._id}
                      className="hover:bg-orange-50 transition-colors duration-200"
                    >
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <div className="flex items-center gap-2 sm:gap-4">
                          <img
                            src={favorite.foodImage}
                            alt={favorite.foodName}
                            className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover shadow-md"
                          />
                          <div>
                            <p className="font-semibold text-gray-800 text-sm sm:text-base">
                              {favorite.foodName}
                            </p>

                            <p className="text-xs text-gray-500 md:hidden flex items-center gap-1 mt-1">
                              <MdLocationOn className="text-primary" />
                              {favorite.location}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <div className="flex items-center gap-2">
                          <MdRestaurant className="text-primary text-sm sm:text-base" />
                          <span className="text-gray-700 text-xs sm:text-sm">
                            {favorite.restaurantName}
                          </span>
                        </div>
                      </td>

                      <td className="px-3 sm:px-6 py-3 sm:py-4 hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          <MdLocationOn className="text-primary" />
                          <span className="text-gray-600 text-sm">
                            {favorite.location}
                          </span>
                        </div>
                      </td>

                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2">
                          <div className="flex text-xs sm:text-base">
                            {renderStars(favorite.rating)}
                          </div>
                          <span className="font-bold text-gray-800 text-sm sm:text-base">
                            {favorite.rating}
                          </span>
                        </div>
                      </td>

                      <td className="px-3 sm:px-6 py-3 sm:py-4 max-w-xs hidden lg:table-cell">
                        <p className="text-gray-600 text-sm line-clamp-2">
                          "{favorite.shortReview}"
                        </p>
                      </td>

                      {/* Actions */}
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <div className="flex items-center justify-center gap-1 sm:gap-2">
                          <Link
                            to={`/review/${favorite.reviewId || favorite._id}`}
                            className="p-1.5 sm:p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors duration-200"
                            title="View Full Review"
                          >
                            <MdVisibility className="text-base sm:text-xl" />
                          </Link>
                          <button
                            onClick={() => handleRemoveFavorite(favorite._id)}
                            className="p-1.5 sm:p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors duration-200"
                            title="Remove from Favorites"
                          >
                            <MdDelete className="text-base sm:text-xl" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
            <div className="mb-6">
              <FaHeart className="text-8xl text-gray-300 mx-auto mb-4" />
            </div>
            <h3 className="text-3xl font-bold text-gray-600 mb-3">
              No Favorites Yet
            </h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Start exploring delicious reviews and add your favorites to create
              your personal food collection!
            </p>
            <Link
              to="/reviews"
              className="inline-block bg-linear-mix text-white py-3 px-8 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Explore Reviews
            </Link>
          </div>
        )}
      </div>

      {favorites && favorites.length > 0 && (
        <div className="max-w-7xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <FaHeart className="text-4xl text-red-500 mx-auto mb-2" />
            <p className="text-3xl font-bold text-primary">
              {favorites.length}
            </p>
            <p className="text-gray-600">Total Favorites</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <MdRestaurant className="text-4xl text-primary mx-auto mb-2" />
            <p className="text-3xl font-bold text-primary">
              {new Set(favorites.map((f) => f.restaurantName)).size}
            </p>
            <p className="text-gray-600">Restaurants</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <MdStar className="text-4xl text-secondary mx-auto mb-2" />
            <p className="text-3xl font-bold text-primary">
              {(
                favorites.reduce((acc, f) => acc + parseFloat(f.rating), 0) /
                favorites.length
              ).toFixed(1)}
            </p>
            <p className="text-gray-600">Avg Rating</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyFavorites;
