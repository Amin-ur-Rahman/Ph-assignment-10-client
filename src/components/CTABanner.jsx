import React, { useContext } from "react";
import { FaHeart, FaSpinner, FaUtensils } from "react-icons/fa";
import { MdRateReview, MdRestaurant } from "react-icons/md";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const CTABanner = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="text-6xl text-primary animate-spin mx-auto mb-4" />
          <p className="text-neutral text-lg">Loading delicious reviews...</p>
        </div>
      </div>
    );

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="w-[90dvw] mx-auto">
        <div className="relative bg-background rounded-md shadow-md overflow-hidden border border-neutral/20">
          <div className="absolute top-0 left-0 right-0 h-2 bg-primary"></div>

          <div className="absolute inset-0 bg-secondary/10 opacity-50"></div>

          <div className="relative px-6 py-12 md:px-12 md:py-16 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-5 bg-primary rounded-full shadow-xl transform hover:scale-110 transition-transform duration-300">
                <FaUtensils className="text-5xl text-background" />
              </div>
            </div>

            <h2 className="text-xl md:text-2xl font-bold mb-4 text-primary">
              Join Our Food Community
            </h2>

            <p className="text-neutral text-base md:text-lg mb-8 max-w-3xl mx-auto">
              Discover amazing food experiences, share your favorite meals, and
              connect with fellow food lovers across the city!
            </p>

            <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto mb-10">
              <div className="bg-background rounded-md p-4 shadow-md hover:shadow-lg transition-shadow duration-300 border border-neutral/10">
                <MdRateReview className="text-3xl md:text-4xl text-primary mx-auto mb-2" />
                <p className="text-lg md:text-xl font-bold text-primary">
                  500+
                </p>
                <p className="text-xs md:text-sm text-neutral">Reviews</p>
              </div>

              <div className="bg-background rounded-md p-4 shadow-md hover:shadow-lg transition-shadow duration-300 border border-neutral/10">
                <MdRestaurant className="text-3xl md:text-4xl text-secondary mx-auto mb-2" />
                <p className="text-lg md:text-xl font-bold text-primary">
                  200+
                </p>
                <p className="text-xs md:text-sm text-neutral">Restaurants</p>
              </div>

              <div className="bg-background rounded-md p-4 shadow-md hover:shadow-lg transition-shadow duration-300 border border-neutral/10">
                <FaHeart className="text-3xl md:text-4xl text-accent mx-auto mb-2" />
                <p className="text-lg md:text-xl font-bold text-primary">
                  100+
                </p>
                <p className="text-xs md:text-sm text-neutral">Food Lovers</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to={user ? "/dashboard/add-review" : "/register"}
                className="group bg-primary text-background px-8 py-4 rounded-md font-bold text-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
              >
                <MdRateReview className="text-2xl group-hover:rotate-12 transition-transform duration-300" />
                Share Your Review
              </Link>

              <Link
                to="/all-reviews"
                className="bg-background text-primary border-2 border-secondary px-8 py-4 rounded-md font-bold text-lg hover:bg-secondary hover:text-background shadow-md hover:shadow-lg transition-all duration-300"
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
