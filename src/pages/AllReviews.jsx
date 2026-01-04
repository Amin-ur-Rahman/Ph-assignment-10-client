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
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";
import { FaUtensils, FaSpinner, FaHeart } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../contexts/AuthContext";
import { axiosInstance } from "../contexts/axiosInstance";
import { motion } from "framer-motion";

const AllReviews = () => {
  useEffect(() => {
    document.title = "ALL REVIEWS";
  }, []);

  const [searchValue, setSearchValue] = useState("");
  const [finalValue, setFinalValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const REVIEWS_PER_PAGE = 8;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFinalValue(searchValue);
      setCurrentPage(1);
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
      const response = await axiosInstance.get(`/reviews?search=${finalValue}`);
      return response.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (favReview) => {
      const result = await axiosInstance.post("/add-to-favorite", favReview);
      if (!result.data.success) throw new Error(result.data.message);
      return result.data;
    },
    onSuccess: (res) => toast.success(res.message),
  });

  const handleClickFavorite = (favReview) => {
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
        stars.push(<MdStar key={i} className="text-secondary text-xl" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<MdStarHalf key={i} className="text-secondary text-xl" />);
      } else {
        stars.push(
          <MdStarOutline key={i} className="text-neutral/20 text-xl" />
        );
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

  const totalReviews = reviews?.length || 0;
  const totalPages = Math.ceil(totalReviews / REVIEWS_PER_PAGE);
  const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
  const endIndex = startIndex + REVIEWS_PER_PAGE;
  const currentReviews = reviews?.slice(startIndex, endIndex) || [];

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="text-4xl text-primary animate-spin mx-auto mb-4" />
          <p className="text-neutral text-base font-medium">
            Loading delicious reviews...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center bg-background p-8 rounded-md shadow-lg border border-neutral/10 max-w-md">
          <p className="text-primary text-xl font-black uppercase mb-2">
            Oops! Something went wrong
          </p>
          <p className="text-neutral text-base">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-md shadow-xl bg-gradient-to-r from-primary to-secondary rotate-3">
            <FaUtensils className="text-4xl text-background" />
          </div>
        </div>

        <h1 className="text-2xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary uppercase italic tracking-tighter">
          Community Food Reviews
        </h1>

        <p className="text-neutral text-base font-medium max-w-2xl mx-auto leading-relaxed">
          Discover what fellow food lovers are enjoying across the city. From
          street food to fine dining, find your next delicious adventure!
        </p>

        <div className="mt-8 max-w-2xl mx-auto relative">
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            type="text"
            value={searchValue}
            placeholder="Search by food name, restaurant, or location..."
            className="w-full px-6 py-4 text-text bg-background border-2 border-neutral/10 rounded-md focus:outline-none focus:border-primary transition-all text-base font-medium shadow-sm"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <MdSearch className="text-2xl text-neutral/40" />
          </div>
        </div>

        <div className="mt-6 inline-block bg-neutral/5 border border-neutral/10 px-6 py-2 rounded-md">
          <p className="text-neutral font-black uppercase tracking-widest text-[10px]">
            <span className="text-primary text-base mr-1">{totalReviews}</span>
            Reviews Shared
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {currentReviews && currentReviews.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentReviews.map((review, index) => (
                <motion.div
                  key={review._id}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-background rounded-md shadow-lg overflow-hidden border border-neutral/5 flex flex-col group"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={review.foodImage}
                      alt={review.foodName}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-background/90 rounded-md px-2 py-1 shadow-md flex items-center gap-1">
                      <MdStar className="text-secondary text-base" />
                      <span className="font-black text-text text-sm">
                        {review.rating}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleClickFavorite(review)}
                      className="absolute top-4 left-4 p-2 bg-background/20 backdrop-blur-md rounded-md hover:text-primary transition-colors"
                    >
                      <FaHeart
                        size={20}
                        className="text-background hover:text-primary"
                      />
                    </button>
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-black text-text mb-3 uppercase tracking-tight line-clamp-1">
                      {review.foodName}
                    </h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-neutral">
                        <MdRestaurant className="text-primary text-lg" />
                        <span className="font-black uppercase text-[11px] tracking-wider">
                          {review.restaurantName}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-neutral/60 text-xs font-medium">
                        <MdLocationOn className="text-lg" />
                        <span>{review.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 mb-3">
                      {renderStars(review.rating)}
                    </div>

                    <p className="text-neutral text-sm mb-6 line-clamp-1 italic font-medium">
                      "{review.shortReview}"
                    </p>

                    <div className="border-t border-neutral/10 pt-4 mt-auto">
                      <div className="flex items-center gap-3">
                        <img
                          src={review.user_photo}
                          alt={review.user_name}
                          className="w-9 h-9 rounded-md border-2 border-primary object-cover"
                        />
                        <div>
                          <p className="text-xs font-black uppercase text-text">
                            {review.user_name}
                          </p>
                          <div className="flex items-center gap-1 text-[10px] text-neutral/50 font-bold uppercase">
                            <MdAccessTime />
                            <span>{formatDate(review.created_at)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Link
                      to={`/review-details/${review._id}`}
                      state={location.pathname}
                      className="mt-5 w-full bg-gradient-to-r from-primary to-secondary text-background py-3 rounded-md font-black uppercase text-[11px] tracking-widest text-center shadow-md hover:opacity-90 transition-all"
                    >
                      View Full Review
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-md bg-neutral/10 text-neutral hover:bg-primary hover:text-background disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-neutral/10 disabled:hover:text-neutral transition-all"
                >
                  <MdChevronLeft className="text-2xl" />
                </button>

                <div className="flex items-center gap-2">
                  {getPageNumbers().map((page, index) => (
                    <React.Fragment key={index}>
                      {page === "..." ? (
                        <span className="px-3 py-2 text-neutral font-bold">
                          ...
                        </span>
                      ) : (
                        <button
                          onClick={() => handlePageChange(page)}
                          className={`px-4 py-2 rounded-md font-bold text-sm transition-all ${
                            currentPage === page
                              ? "bg-gradient-to-r from-primary to-secondary text-background shadow-md"
                              : "bg-neutral/10 text-neutral hover:bg-neutral/20"
                          }`}
                        >
                          {page}
                        </button>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-md bg-neutral/10 text-neutral hover:bg-primary hover:text-background disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-neutral/10 disabled:hover:text-neutral transition-all"
                >
                  <MdChevronRight className="text-2xl" />
                </button>
              </div>
            )}

            <div className="mt-6 text-center">
              <p className="text-neutral text-sm font-medium">
                Showing {startIndex + 1} - {Math.min(endIndex, totalReviews)} of{" "}
                {totalReviews} reviews
              </p>
            </div>
          </>
        ) : (
          <div className="text-center py-20 bg-neutral/5 rounded-md border-2 border-dashed border-neutral/10">
            <FaUtensils className="text-5xl text-neutral/20 mx-auto mb-4" />
            <h3 className="text-xl font-black text-neutral uppercase">
              No Reviews Yet
            </h3>
            <p className="text-base text-neutral/60 mb-8 font-medium">
              Be the first to share a food review!
            </p>
            <Link
              to="/add-review"
              className="inline-block bg-gradient-to-r from-primary to-secondary text-background py-3 px-8 rounded-md font-black uppercase tracking-widest shadow-lg"
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
