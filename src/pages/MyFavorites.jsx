import React, { useContext, useEffect } from "react";
import {
  MdRestaurant,
  MdLocationOn,
  MdStar,
  MdDelete,
  MdVisibility,
  MdStarHalf,
  MdStarOutline,
} from "react-icons/md";
import { FaHeart, FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { axiosInstance } from "../contexts/axiosInstance";

const MyFavorites = () => {
  useEffect(() => {
    document.title = "MY FAVORITE REVIEWS";
  }, []);
  const { user } = useContext(AuthContext);
  const email = user.email;
  const queryClient = useQueryClient();

  const fetchFavorites = async () => {
    const res = await axiosInstance.get(`/get-favorite?email=${email}`);
    return res.data;
  };

  const { isLoading, data: favorites } = useQuery({
    queryKey: ["favorite-reviews"], // Reverted to your original key
    queryFn: fetchFavorites,
    onError: (error) => {
      console.log(error);
    },
  });

  const mutation = useMutation({
    mutationFn: async (favoriteId) => {
      const res = await axiosInstance.delete(`/delete-favorite/${favoriteId}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        title: "Review deleted from favorite list",
        text: "this action cannot be undone!",
        icon: "success",
      });
      queryClient.invalidateQueries(["favorite-reviews"]);
    },
    onError: () => {
      Swal.fire({
        title: "Request failed!",
        text: "try again later",
        icon: "error",
      });
    },
  });

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
        stars.push(
          <MdStarOutline key={i} className="text-neutral/20 text-lg" />
        );
      }
    }
    return stars;
  };

  const handleRemoveFavorite = (reviewId) => {
    mutation.mutate(reviewId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="text-4xl text-primary animate-spin mx-auto mb-4" />
          <p className="text-neutral text-base">Loading your favorites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-4 rounded-md bg-gradient-to-r from-primary to-secondary relative">
            <FaHeart className="text-4xl text-background" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-text rounded-full flex items-center justify-center">
              <span className="text-background text-xs font-bold">
                {favorites?.length || 0}
              </span>
            </div>
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-3 text-primary uppercase">
          My Favorite Reviews
        </h1>
        <p className="text-neutral text-base max-w-2xl mx-auto">
          Your personal collection of the most delicious food experiences
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        {favorites && favorites.length > 0 ? (
          <div className="bg-background rounded-md shadow-lg overflow-hidden border border-neutral/10">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead className="bg-neutral/5 text-text border-b border-neutral/10">
                  <tr>
                    <th className="px-6 py-4 text-left font-bold text-sm">
                      Food
                    </th>
                    <th className="px-6 py-4 text-left font-bold text-sm">
                      Restaurant
                    </th>
                    <th className="px-6 py-4 text-left font-bold text-sm hidden md:table-cell">
                      Location
                    </th>
                    <th className="px-6 py-4 text-left font-bold text-sm">
                      Rating
                    </th>
                    <th className="px-6 py-4 text-left font-bold text-sm hidden lg:table-cell">
                      Review
                    </th>
                    <th className="px-6 py-4 text-center font-bold text-sm">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral/10">
                  {favorites.map((favorite) => (
                    <tr
                      key={favorite._id}
                      className="hover:bg-neutral/5 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={favorite.foodImage}
                            alt={favorite.foodName}
                            className="w-12 h-12 rounded-md object-cover shadow-sm"
                          />
                          <div>
                            <p className="font-semibold text-text text-sm">
                              {favorite.foodName}
                            </p>
                            <p className="text-xs text-neutral md:hidden flex items-center gap-1 mt-1">
                              <MdLocationOn className="text-primary" />
                              {favorite.location}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-neutral text-sm">
                          <MdRestaurant className="text-primary" />
                          {favorite.restaurantName}
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <div className="flex items-center gap-2 text-neutral text-sm">
                          <MdLocationOn className="text-primary" />
                          {favorite.location}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex">
                            {renderStars(favorite.rating)}
                          </div>
                          <span className="font-bold text-text text-sm">
                            {favorite.rating}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 max-w-xs hidden lg:table-cell">
                        <p className="text-neutral text-sm line-clamp-2">
                          "{favorite.shortReview}"
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-3">
                          <Link
                            to={`/review-details/${favorite._id}`}
                            className="text-neutral hover:text-primary transition-colors"
                            title="View Full Review"
                          >
                            <MdVisibility className="text-xl" />
                          </Link>
                          <button
                            onClick={() => handleRemoveFavorite(favorite._id)}
                            className="text-neutral hover:text-primary transition-colors"
                            title="Remove from Favorites"
                          >
                            <MdDelete className="text-xl" />
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
          <div className="text-center py-20 bg-background rounded-md border border-dashed border-neutral/20">
            <FaHeart className="text-6xl text-neutral/20 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-text mb-2">
              No Favorites Yet
            </h3>
            <p className="text-neutral text-sm mb-8">
              Start exploring and save the reviews you love!
            </p>
            <Link
              to="/reviews"
              className="bg-primary text-background py-2 px-6 rounded-md text-sm font-semibold"
            >
              Explore Reviews
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFavorites;
