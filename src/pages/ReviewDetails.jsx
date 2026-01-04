import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Store,
  Star,
  Calendar,
  ThumbsUp,
  MessageSquare,
  Share2,
  Clock,
  Utensils,
} from "lucide-react";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FaSpinner } from "react-icons/fa6";
import { axiosInstance } from "../contexts/axiosInstance";

export default function ReviewDetails() {
  useEffect(() => {
    document.title = "REVIEW DETAILS";
  }, []);

  const navigate = useNavigate();
  const { reviewId } = useParams();
  const [liked, setLiked] = useState(false);

  const getSelectedReview = async () => {
    const result = await axiosInstance.get(`/user-review/${reviewId}`);
    return result.data.review;
  };

  const {
    data: review,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["detailed-review", reviewId],
    queryFn: getSelectedReview,
  });

  const location = useLocation();
  const handleBack = () => {
    navigate(`${location.state ? location.state : "/"}`);
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1 text-secondary">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(rating) ? "fill-secondary" : ""
            }`}
          />
        ))}
        <span className="text-neutral text-sm ml-1">({rating}/5)</span>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="text-4xl text-primary animate-spin mx-auto mb-4" />
          <p className="text-neutral text-sm">Loading details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Navigation */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 mb-6 text-primary hover:underline font-bold text-sm uppercase"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Feed
        </button>

        {/* TOP SECTION: IMAGE LEFT | DETAILS RIGHT */}
        <div className="bg-background border border-neutral/10 rounded-md shadow-lg overflow-hidden mb-8">
          <div className="grid md:grid-cols-2">
            {/* Left: Image */}
            <div className="h-80 md:h-[450px] relative">
              <img
                src={review.foodImage}
                alt={review.foodName}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-primary text-background px-3 py-1 rounded-md text-xs font-bold shadow-md">
                {review.category}
              </div>
            </div>

            {/* Right: Details */}
            <div className="p-6 md:p-10 flex flex-col justify-center">
              <div className="mb-4">
                <h1 className="text-xl md:text-2xl font-bold text-primary uppercase mb-2">
                  {review.foodName}
                </h1>
                <div className="flex flex-wrap gap-4 text-neutral text-sm">
                  <div className="flex items-center gap-1">
                    <Store className="w-4 h-4 text-secondary" />
                    <span className="font-bold">{review.restaurantName}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-secondary" />
                    <span>{review.location}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">{renderStars(review.rating)}</div>

              <div className="space-y-4 mb-8">
                <h3 className="text-sm font-bold text-text uppercase tracking-wider border-b border-neutral/10 pb-2">
                  The Experience
                </h3>
                <p className="text-neutral text-base leading-relaxed italic">
                  "{review.detailedReview}"
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-neutral/10">
                <div className="flex items-center gap-3">
                  <img
                    src={review.user_photo}
                    alt={review.reviewerName}
                    className="w-10 h-10 rounded-full border border-primary p-0.5 object-cover"
                  />
                  <div>
                    <p className="text-sm font-bold text-text">
                      {review.reviewerName}
                    </p>
                    <p className="text-xs text-neutral flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setLiked(!liked)}
                    className={`p-2 rounded-md border transition-all ${
                      liked
                        ? "bg-primary text-background"
                        : "border-neutral/20 text-neutral"
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-md border border-neutral/20 text-neutral">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: ADDITIONAL CONTENT */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Comments/Interaction Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-background border border-neutral/10 rounded-md p-6 shadow-sm">
              <h3 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Discussion
              </h3>
              <div className="border-2 border-dashed border-neutral/10 rounded-md p-8 text-center">
                <p className="text-neutral text-sm">
                  Comments are loading or currently disabled for this review.
                </p>
              </div>
            </div>
          </div>

          {/* More Info / Sidebar Bottom */}
          <div className="space-y-6">
            <div className="bg-primary text-background rounded-md p-6 shadow-md">
              <h3 className="text-lg font-bold mb-3 uppercase flex items-center gap-2">
                <Utensils className="w-5 h-5" />
                Visit Today
              </h3>
              <p className="text-sm opacity-90 mb-4">
                Want to try the {review.foodName}? Head over to{" "}
                {review.restaurantName} in {review.location}.
              </p>
              <button className="w-full py-3 bg-background text-primary font-bold rounded-md text-xs uppercase transition-transform hover:scale-105">
                View on Map
              </button>
            </div>

            <div className="bg-background border border-neutral/10 rounded-md p-6 shadow-sm">
              <h3 className="text-sm font-bold text-text uppercase mb-4">
                Safety Note
              </h3>
              <p className="text-xs text-neutral leading-relaxed">
                Food experiences vary by season and chef. Always check the
                restaurant's current menu before visiting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
