import React from "react";
import { MapPin, Store, Star, StarHalf } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { FaSpinner } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../contexts/axiosInstance";
import { motion } from "framer-motion";

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
      const response = await axiosInstance.get(`/get-top-rated-reviews`);
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
        <Star
          key={`full-${i}`}
          className="w-5 h-5 text-secondary"
          fill="currentColor"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half"
          className="w-5 h-5 text-secondary"
          fill="currentColor"
        />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-5 h-5 text-neutral/40" />
      );
    }

    return stars;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="text-6xl text-primary animate-spin mx-auto mb-4" />
          <p className="text-neutral text-lg">Loading delicious reviews...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center bg-background p-8 rounded-md shadow-lg max-w-md border border-neutral/20">
          <p className="text-accent text-xl font-semibold mb-2">
            Oops! Something went wrong
          </p>
          <p className="text-neutral">{error.message}</p>
        </div>
      </div>
    );
  }
  const featuredReviews = allReviews.slice(0, 4);

  return (
    <section className="py-12 lg:py-16 bg-background">
      <div className="container w-[90dvw] mx-auto ">
        <div className="text-center mb-10">
          <h2 className="text-xl lg:text-2xl font-bold mb-3 text-primary">
            Featured Reviews
          </h2>
          <p className="text-text text-base md:text-lg max-w-2xl mx-auto">
            Discover what food lovers are raving about in their neighborhoods
          </p>
        </div>

        <motion.div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {featuredReviews.map((review, index) => (
            <motion.div
              initial={{
                y: 60,
                opacity: 0,
                scale: 0.9,
              }}
              whileInView={{
                y: 0,
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: true,
                amount: 0.25,
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              key={review._id}
              className="bg-background rounded-md overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-neutral/10"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={review.foodImage}
                  alt={review.foodName}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                {/* Kept rounded-full for the badge as it's a round indicator */}
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-background text-sm font-semibold shadow-lg bg-gradient-to-r from-primary to-secondary">
                  {review.rating} ★
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-lg md:text-xl font-bold mb-2 text-primary">
                  {review.foodName}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-text">
                    <Store className="w-5 h-5 text-secondary" />
                    <span className="font-medium">{review.restaurantName}</span>
                  </div>

                  <div className="flex items-center gap-2 text-neutral">
                    <MapPin className="w-5 h-5 text-secondary" />
                    <span className="text-sm">{review.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4 pb-4 border-b border-neutral/20">
                  <div className="flex items-center gap-2">
                    <img
                      src={review.user_photo}
                      alt={review.user_name}
                      className="w-10 h-10 rounded-full border-2 border-primary object-cover"
                    />
                    <span className="text-sm text-text font-medium">
                      {review.user_name}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-4">
                  {renderStars(review.rating)}
                </div>

                <button
                  onClick={() => handleViewDetails(review._id)}
                  className="w-full py-2.5 rounded-md font-semibold transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5 bg-gradient-to-r from-primary to-secondary text-background"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center">
          <button
            onClick={handleShowAll}
            className="px-8 py-3 font-semibold rounded-md border-2 border-primary text-primary hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 bg-background"
          >
            Show All Reviews →
          </button>
        </div>
      </div>
    </section>
  );
}
