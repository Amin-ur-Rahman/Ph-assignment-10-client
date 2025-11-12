import React from "react";
import { MapPin, Store, Star, StarHalf } from "lucide-react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { FaSpinner } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function FeaturedReviews() {
  const navigate = useNavigate();

  const {
    data: allReviews,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["allReviews"],
    queryFn: async () => {
      const response = await axios.get(
        "https://local-food-lovers.onrender.com/reviews"
      );
      return response.data;
    },

    keepPreviousData: true,
  });

  const handleViewDetails = (id) => {
    navigate(`/review-details/${id}`);
  };

  const handleShowAll = () => {
    navigate("/all-reviews");
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`full-${i}`} className="w-5 h-5" fill="currentColor" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf key="half" className="w-5 h-5" fill="currentColor" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />);
    }

    return stars;
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
  const featuredReviews = allReviews.slice(0, 6);

  return (
    <section className="py-12 lg:py-16" style={{ backgroundColor: "#fff8f0" }}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2
            className="text-3xl lg:text-4xl font-bold mb-3"
            style={{ color: "#d35400" }}
          >
            Featured Reviews
          </h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Discover what food lovers are raving about in their neighborhoods
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredReviews.map((review) => (
            <div
              key={review._id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Food Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={review.foodImage}
                  alt={review.foodName}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div
                  className="absolute top-3 right-3 px-3 py-1 rounded-full text-white text-sm font-semibold shadow-lg"
                  style={{
                    background: "linear-gradient(to right, #d35400, #f1c40f)",
                  }}
                >
                  {review.rating} ★
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5">
                {/* Food Name */}
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: "#d35400" }}
                >
                  {review.foodName}
                </h3>

                {/* Restaurant Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Store className="w-5 h-5" style={{ color: "#f1c40f" }} />
                    <span className="font-medium">{review.restaurantName}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-5 h-5" style={{ color: "#f1c40f" }} />
                    <span className="text-sm">{review.location}</span>
                  </div>
                </div>

                {/* Reviewer Info */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <img
                      src={review.user_photo}
                      alt={review.user_name}
                      className="w-10 h-10 rounded-full border-2 border-primary object-cover"
                    />
                    <span className="text-sm text-gray-700 font-medium">
                      {review.user_name}
                    </span>
                  </div>
                </div>

                {/* Star Rating */}
                <div
                  className="flex items-center gap-1 mb-4"
                  style={{ color: "#f1c40f" }}
                >
                  {renderStars(review.rating)}
                </div>

                {/* View Details Button */}
                <button
                  onClick={() => handleViewDetails(review._id)}
                  className="w-full py-2.5 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
                  style={{
                    background: "linear-gradient(to right, #d35400, #f1c40f)",
                    color: "white",
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Show All Button */}
        <div className="text-center">
          <button
            onClick={handleShowAll}
            className="px-8 py-3 font-semibold rounded-lg border-2 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 bg-white"
            style={{ borderColor: "#d35400", color: "#d35400" }}
          >
            Show All Reviews →
          </button>
        </div>
      </div>
    </section>
  );
}
