import React, { useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Store,
  Star,
  StarHalf,
  Calendar,
  ThumbsUp,
  MessageCircle,
  Share2,
} from "lucide-react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FaSpinner } from "react-icons/fa6";

export default function ReviewDetails() {
  const navigate = useNavigate();
  const { reviewId } = useParams();
  const [liked, setLiked] = useState(false);

  const getSelectedReview = async () => {
    const result = await axios.get(
      `https://local-food-lovers.onrender.com/user-review/${reviewId}`
    );
    return result.data.review;
  };

  const {
    data: review,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["detailed-review"],
    queryFn: getSelectedReview,
  });

  const relatedReviews = [
    {
      id: 2,
      foodName: "Tonkotsu Ramen",
      restaurantName: "Tokyo Ramen House",
      rating: 4.5,
      photoUrl:
        "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      foodName: "Miso Ramen",
      restaurantName: "Tokyo Ramen House",
      rating: 5,
      photoUrl:
        "https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=400&h=300&fit=crop",
    },
  ];

  const location = useLocation();
  const handleBack = () => {
    navigate(`${location.state ? location.state : "/"}`);
  };

  const handleLike = () => {
    setLiked(!liked);
    console.log("Like toggled");
  };

  const handleShare = () => {
    console.log("Share review");
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
  console.log(review);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fff8f0" }}>
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 mb-6 px-4 py-2 rounded-lg hover:bg-white transition-all duration-300"
          style={{ color: "#d35400" }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">Back to Reviews</span>
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
              <div className="relative h-96">
                <img
                  src={review.foodImage}
                  alt={review.foodName}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute top-4 right-4 px-4 py-2 rounded-full text-white font-bold shadow-lg flex items-center gap-1"
                  style={{
                    background: "linear-gradient(to right, #d35400, #f1c40f)",
                  }}
                >
                  <Star className="w-5 h-5" fill="currentColor" />
                  {review.rating}
                </div>
              </div>

              {/* --------------review container-------------- */}
              <div className="p-6 lg:p-8">
                <div className="mb-6">
                  <h1
                    className="text-3xl lg:text-4xl font-bold mb-3"
                    style={{ color: "#d35400" }}
                  >
                    {review.foodName}
                  </h1>

                  <div className="flex flex-wrap gap-4 text-gray-700">
                    <div className="flex items-center gap-2">
                      <Store className="w-5 h-5" style={{ color: "#f1c40f" }} />
                      <span className="font-medium">
                        {review.restaurantName}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin
                        className="w-5 h-5"
                        style={{ color: "#f1c40f" }}
                      />
                      <span>{review.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    <span
                      className="px-3 py-1 rounded-full text-sm font-semibold text-white"
                      style={{
                        background:
                          "linear-gradient(to right, #d35400, #f1c40f)",
                      }}
                    >
                      {review.category}
                    </span>
                  </div>
                </div>

                <div
                  className="flex items-center gap-2 mb-6"
                  style={{ color: "#f1c40f" }}
                >
                  {renderStars(review.rating)}
                  <span className="text-gray-600 ml-2">
                    ({review.rating}/5)
                  </span>
                </div>

                {/* review rext block */}
                <div className="mb-6">
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ color: "#d35400" }}
                  >
                    Review
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {review.detailedReview}
                  </p>
                </div>

                {/* review owners info block */}
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
                  <img
                    src={review.user_photo}
                    alt={review.user_name}
                    className="w-10 h-10 rounded-full border-2 border-primary object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {review.reviewerName}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(review.created_at).toLocaleDateString(
                          "en-US",
                          { year: "numeric", month: "long", day: "numeric" }
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* like and share button------------------------ */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 ${
                      liked
                        ? "text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                    style={
                      liked
                        ? {
                            background:
                              "linear-gradient(to right, #d35400, #f1c40f)",
                          }
                        : { border: "2px solid #e5e7eb" }
                    }
                  >
                    <ThumbsUp
                      className="w-5 h-5"
                      fill={liked ? "currentColor" : "none"}
                    />
                    <span>
                      {liked
                        ? Math.ceil(review.rating) + 1
                        : Math.ceil(review.rating)}
                    </span>
                  </button>

                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold bg-white hover:bg-gray-50 transition-all duration-300"
                    style={{ border: "2px solid #e5e7eb", color: "#d35400" }}
                  >
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* right block-------------- */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h3
                className="text-xl font-bold mb-4"
                style={{ color: "#d35400" }}
              >
                More from {review.restaurantName}
              </h3>
              <div className="space-y-4">
                {relatedReviews.map((relatedReview) => (
                  <div
                    key={relatedReview.id}
                    className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all cursor-pointer"
                  >
                    <img
                      src={relatedReview.photoUrl}
                      alt={relatedReview.foodName}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">
                        {relatedReview.foodName}
                      </h4>
                      <div
                        className="flex items-center gap-1"
                        style={{ color: "#f1c40f" }}
                      >
                        {renderStars(relatedReview.rating)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* restaurant card right----------- */}
            <div
              className="rounded-2xl p-6 shadow-xl text-white"
              style={{
                background: "linear-gradient(135deg, #d35400, #f1c40f)",
              }}
            >
              <h3 className="text-xl font-bold mb-2">Visit this Restaurant</h3>
              <p className="mb-4 opacity-90">
                Experience this amazing food yourself!
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <Store className="w-5 h-5" />
                  <span className="font-medium">{review.restaurantName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{review.location}</span>
                </div>
              </div>
              <button
                className="w-full py-2.5 rounded-lg font-semibold bg-white hover:bg-gray-100 transition-all"
                style={{ color: "#d35400" }}
              >
                Get Directions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
