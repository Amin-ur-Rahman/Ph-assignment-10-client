import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { FaCrown, FaMedal, FaStar, FaTrophy } from "react-icons/fa";
import { MdRateReview, MdRestaurant, MdTrendingUp } from "react-icons/md";
import { Link } from "react-router-dom";

const TopUser = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["topUser"],
    queryFn: async () => {
      const res = await axios.get(
        "https://local-food-lovers.onrender.com/top-user"
      );
      return res.data.topUser;
    },
  });

  const topUser = data;
  console.log(topUser);

  if (isLoading) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-64 bg-gray-200 rounded-2xl"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!topUser) return null;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-base-main">
      <div className="w-[90dvw] mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <FaTrophy className="text-5xl text-secondary animate-bounce" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
            Top Food Critic of the Month
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Celebrating our most active community member who's sharing amazing
            food discoveries
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
            <div className="bg-linear-mix p-6 relative">
              <div className="absolute top-4 right-4">
                <FaCrown className="text-5xl text-yellow-300 animate-pulse" />
              </div>
              <div className="text-white text-center">
                <p className="text-sm font-semibold uppercase tracking-wide mb-1">
                  🏆 Food Champion 🏆
                </p>
                <p className="text-2xl font-bold">Most Valuable Reviewer</p>
              </div>
            </div>

            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative flex-shrink-0">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-primary shadow-xl overflow-hidden">
                    <img
                      src={topUser.photo}
                      alt={topUser.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-secondary p-3 rounded-full shadow-lg">
                    <FaMedal className="text-2xl text-white" />
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                    {topUser.name}
                  </h3>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-4 border-2 border-orange-100 flex items-center flex-col">
                      <MdRateReview className="text-3xl text-primary mx-auto mb-2" />
                      <p className="text-2xl font-bold text-primary">
                        {topUser.reviewCount}
                      </p>
                      <p className="text-xs text-gray-600">Reviews</p>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-4 border-2 border-orange-100 flex items-center flex-col">
                      <FaStar className="text-3xl text-secondary mx-auto mb-2" />
                      <p className="text-2xl font-bold text-primary">
                        {topUser.averageRating.toFixed(1)}
                      </p>
                      <p className="text-xs text-gray-600">Avg Rating</p>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-4 border-2 border-orange-100 flex items-center flex-col">
                      <MdRestaurant className="text-3xl text-primary mx-auto mb-2" />
                      <p className="text-xs font-bold text-primary truncate">
                        {topUser.favoriteRestaurant}
                      </p>
                      <p className="text-xs text-gray-600">Favorite Spot</p>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-4 border-2 border-orange-100 flex items-center flex-col">
                      <MdTrendingUp className="text-3xl text-green-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-primary">🔥</p>
                      <p className="text-xs text-gray-600">Top Rank</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl border-2 border-orange-100">
                <p className="text-center text-gray-700 italic">
                  "Thank you for being an amazing part of our food community!
                  Your reviews help thousands discover incredible food
                  experiences. Keep inspiring! 🍽️❤️"
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-600 mb-4">
            Want to be our next featured food critic?
          </p>
          <Link
            to="/add-review"
            className="inline-block bg-linear-mix text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Start Reviewing Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopUser;
