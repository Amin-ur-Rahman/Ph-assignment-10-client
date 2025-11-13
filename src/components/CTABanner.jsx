import React, { useContext } from "react";
import { FaHeart, FaSpinner, FaUtensils } from "react-icons/fa";
import { MdRateReview, MdRestaurant } from "react-icons/md";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const CTABanner = () => {
  const { user, loading } = useContext(AuthContext);

  if (!user || loading)
    return (
      <div className="min-h-screen bg-base-main flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="text-6xl text-color-primary animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading delicious reviews...</p>
        </div>
      </div>
    );
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-base-main">
      <div className="w-[90dvw] mx-auto">
        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-linear-mix"></div>

          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-yellow-50 opacity-50"></div>

          <div className="relative px-6 py-12 md:px-12 md:py-16 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-5 bg-linear-mix rounded-full shadow-xl transform hover:scale-110 transition-transform duration-300">
                <FaUtensils className="text-5xl text-white" />
              </div>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-color-primary">
              Join Our Food Community
            </h2>

            <p className="text-gray-600 text-lg md:text-xl mb-8 max-w-3xl mx-auto">
              Discover amazing food experiences, share your favorite meals, and
              connect with fellow food lovers across the city!
            </p>

            <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto mb-10">
              <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
                <MdRateReview className="text-3xl md:text-4xl text-color-primary mx-auto mb-2" />
                <p className="text-2xl md:text-3xl font-bold text-color-primary">
                  500+
                </p>
                <p className="text-xs md:text-sm text-gray-600">Reviews</p>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
                <MdRestaurant className="text-3xl md:text-4xl text-secondary mx-auto mb-2" />
                <p className="text-2xl md:text-3xl font-bold text-color-primary">
                  200+
                </p>
                <p className="text-xs md:text-sm text-gray-600">Restaurants</p>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
                <FaHeart className="text-3xl md:text-4xl text-red-500 mx-auto mb-2" />
                <p className="text-2xl md:text-3xl font-bold text-color-primary">
                  100+
                </p>
                <p className="text-xs md:text-sm text-gray-600">Food Lovers</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to={user ? "/add-review" : "/register"}
                className="group bg-linear-mix text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
              >
                <MdRateReview className="text-2xl group-hover:rotate-12 transition-transform duration-300" />
                Share Your Review
              </Link>

              <Link
                to="/reviews"
                className="bg-white text-color-primary border-2 border-amber-500 px-8 py-4 rounded-full font-bold text-lg   hover:text-white shadow-md hover:shadow-lg transition-all duration-300"
              >
                Explore Reviews
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
