import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import {
  MdRestaurant,
  MdLocationOn,
  MdImage,
  MdRateReview,
  MdStar,
  MdFastfood,
  MdEdit,
  MdArrowBack,
  MdCheckCircle,
} from "react-icons/md";
import { FaSpinner } from "react-icons/fa";
import Swal from "sweetalert2";
import { axiosInstance } from "../contexts/axiosInstance";

const EditReview = () => {
  useEffect(() => {
    document.title = "EDIT REVIEW - Local Food Lovers";
  }, []);

  const { reviewId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm();

  const watchRating = watch("rating", "");
  const watchFoodImage = watch("foodImage", "");

  const {
    data: review,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["review", reviewId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/user-review/${reviewId}`);
      if (!response.data.success) throw new Error(response.data.message);
      return response.data.review;
    },
  });

  useEffect(() => {
    if (review) {
      reset({
        foodName: review.foodName,
        restaurantName: review.restaurantName,
        location: review.location,
        foodImage: review.foodImage,
        rating: review.rating,
        shortReview: review.shortReview,
        detailedReview: review.detailedReview,
      });
    }
  }, [review, reset]);

  const mutation = useMutation({
    mutationFn: async (data) => {
      const result = await axiosInstance.patch(
        `/edit-user-review/${reviewId}`,
        data
      );
      if (!result.data.success) throw new Error(result.data.message);
      return result.data;
    },
    onSuccess: async () => {
      queryClient.invalidateQueries(["review", reviewId]);
      queryClient.invalidateQueries(["allReviews"]);
      queryClient.invalidateQueries(["myReviews"]);
      await Swal.fire({
        title: "Review updated successfully",
        icon: "success",
        confirmButtonColor: "var(--color-primary)",
      });
      navigate("/dashboard/my-reviews");
    },
    onError: (error) => {
      Swal.fire({ title: error.message, icon: "error" });
    },
  });

  const onSubmit = async (data) => {
    mutation.mutate(data);
  };

  const renderStars = (rating) => {
    const numRating = parseFloat(rating) || 0;
    return [...Array(5)].map((_, i) => (
      <MdStar
        key={i}
        className={`text-2xl transition-colors ${
          i < Math.floor(numRating)
            ? "text-secondary fill-secondary"
            : "text-neutral/30"
        }`}
      />
    ));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-xl opacity-30"></div>
            <FaSpinner className="relative text-5xl text-primary animate-spin" />
          </div>
          <p className="text-text text-lg font-bold">Loading your review...</p>
          <p className="text-neutral text-sm mt-2">Please wait a moment</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center bg-background p-10 rounded-md shadow-2xl border-2 border-accent/20 max-w-md">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <MdEdit className="text-3xl text-accent" />
          </div>
          <h2 className="text-accent text-xl font-black uppercase mb-3">
            Error Loading Review
          </h2>
          <p className="text-neutral text-base mb-8 leading-relaxed">
            {error.message}
          </p>
          <button
            onClick={() => navigate("/my-reviews")}
            className="bg-gradient-to-r from-primary to-secondary text-background py-3 px-8 rounded-md font-bold uppercase tracking-wide text-sm hover:opacity-90 transition-all inline-flex items-center gap-2"
          >
            <MdArrowBack />
            Back to My Reviews
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="text-center mb-8">
          <div className="inline-block relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-md blur-xl opacity-40"></div>
            <div className="relative p-6 bg-gradient-to-br from-primary to-secondary rounded-md shadow-xl">
              <MdEdit className="text-5xl text-background" />
            </div>
          </div>
          <h1 className="text-2xl font-black text-text mb-3 tracking-tight">
            Edit Your Review
          </h1>
          <p className="text-neutral text-base font-medium max-w-xl mx-auto leading-relaxed">
            Update your dining experience and keep the community informed with
            your latest thoughts.
          </p>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center justify-center gap-2 text-sm text-neutral">
          <button
            onClick={() => navigate("/my-reviews")}
            className="hover:text-primary transition-colors font-medium"
          >
            My Reviews
          </button>
          <span>/</span>
          <span className="text-text font-semibold">Edit Review</span>
        </div>
      </div>

      {/* Form Container */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-background rounded-md shadow-2xl overflow-hidden border border-neutral/20">
          {/* Top Accent Bar */}
          <div className="h-1.5 bg-gradient-to-r from-primary via-secondary to-primary"></div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-8 md:p-12 space-y-10"
          >
            {/* Food & Restaurant Info */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Food Name */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-text">
                  <div className="p-1.5 bg-primary/10 rounded-md">
                    <MdFastfood className="text-primary text-base" />
                  </div>
                  Food Name
                </label>
                <input
                  type="text"
                  {...register("foodName", {
                    required: "Food name is required",
                  })}
                  className="w-full px-4 py-3.5 bg-neutral/5 border-2 border-neutral/20 rounded-md focus:outline-none focus:border-primary focus:bg-background transition-all text-text font-medium placeholder:text-neutral/50"
                  placeholder="Enter food name"
                />
                {errors.foodName && (
                  <p className="text-accent text-xs font-medium mt-1">
                    {errors.foodName.message}
                  </p>
                )}
              </div>

              {/* Restaurant Name */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-text">
                  <div className="p-1.5 bg-secondary/10 rounded-md">
                    <MdRestaurant className="text-secondary text-base" />
                  </div>
                  Restaurant
                </label>
                <input
                  type="text"
                  {...register("restaurantName", {
                    required: "Restaurant name is required",
                  })}
                  className="w-full px-4 py-3.5 bg-neutral/5 border-2 border-neutral/20 rounded-md focus:outline-none focus:border-secondary focus:bg-background transition-all text-text font-medium placeholder:text-neutral/50"
                  placeholder="Enter restaurant name"
                />
                {errors.restaurantName && (
                  <p className="text-accent text-xs font-medium mt-1">
                    {errors.restaurantName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-text">
                <div className="p-1.5 bg-primary/10 rounded-md">
                  <MdLocationOn className="text-primary text-base" />
                </div>
                Location
              </label>
              <input
                type="text"
                {...register("location", { required: "Location is required" })}
                className="w-full px-4 py-3.5 bg-neutral/5 border-2 border-neutral/20 rounded-md focus:outline-none focus:border-primary focus:bg-background transition-all text-text font-medium placeholder:text-neutral/50"
                placeholder="City, Area or Address"
              />
              {errors.location && (
                <p className="text-accent text-xs font-medium mt-1">
                  {errors.location.message}
                </p>
              )}
            </div>

            {/* Image Section */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-text">
                <div className="p-1.5 bg-secondary/10 rounded-md">
                  <MdImage className="text-secondary text-base" />
                </div>
                Food Image URL
              </label>
              <input
                type="url"
                {...register("foodImage", {
                  required: "Image URL is required",
                })}
                className="w-full px-4 py-3.5 bg-neutral/5 border-2 border-neutral/20 rounded-md focus:outline-none focus:border-secondary focus:bg-background transition-all text-text font-medium placeholder:text-neutral/50"
                placeholder="https://example.com/image.jpg"
              />
              {errors.foodImage && (
                <p className="text-accent text-xs font-medium mt-1">
                  {errors.foodImage.message}
                </p>
              )}

              {/* Live Preview */}
              {watchFoodImage && (
                <div className="relative mt-5 rounded-md overflow-hidden border-2 border-neutral/20 bg-neutral/5 group">
                  <img
                    src={watchFoodImage}
                    alt="Preview"
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400x300?text=Invalid+Image+URL";
                    }}
                  />
                  <div className="absolute top-3 right-3 px-3 py-1.5 bg-gradient-to-r from-primary to-secondary text-background text-xs font-bold uppercase rounded-md shadow-lg">
                    Live Preview
                  </div>
                </div>
              )}
            </div>

            {/* Rating Section */}
            <div className="p-8 bg-gradient-to-br from-neutral/5 to-neutral/10 rounded-md border-2 border-neutral/20">
              <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-text mb-6">
                <div className="p-1.5 bg-secondary/20 rounded-md">
                  <MdStar className="text-secondary text-base" />
                </div>
                Your Rating
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <input
                  type="number"
                  step="0.5"
                  {...register("rating", {
                    required: "Rating is required",
                    min: { value: 1, message: "Minimum 1" },
                    max: { value: 5, message: "Maximum 5" },
                  })}
                  className="w-28 px-6 py-4 bg-background border-3 border-secondary rounded-md text-center font-black text-secondary text-2xl shadow-inner focus:outline-none focus:ring-4 focus:ring-secondary/30 transition-all"
                />
                <div className="flex gap-1.5">{renderStars(watchRating)}</div>
                <span className="text-neutral text-sm font-medium ml-auto">
                  Out of 5 stars
                </span>
              </div>
              {errors.rating && (
                <p className="text-accent text-xs font-medium mt-3">
                  {errors.rating.message}
                </p>
              )}
            </div>

            {/* Review Texts */}
            <div className="space-y-8">
              {/* Short Review */}
              <div className="space-y-3">
                <label className="flex items-center justify-between text-sm font-bold uppercase tracking-wide text-text">
                  <span className="flex items-center gap-2">
                    <div className="p-1.5 bg-primary/10 rounded-md">
                      <MdRateReview className="text-primary text-base" />
                    </div>
                    Quick Summary
                  </span>
                  <span className="text-xs text-neutral font-medium normal-case">
                    Max 150 characters
                  </span>
                </label>
                <input
                  {...register("shortReview", {
                    required: "Summary is required",
                    maxLength: {
                      value: 150,
                      message: "Maximum 150 characters",
                    },
                  })}
                  className="w-full px-4 py-3.5 bg-neutral/5 border-2 border-neutral/20 rounded-md focus:outline-none focus:border-primary focus:bg-background transition-all text-text font-medium placeholder:text-neutral/50"
                  placeholder="Sum up your experience in one line..."
                />
                {errors.shortReview && (
                  <p className="text-accent text-xs font-medium mt-1">
                    {errors.shortReview.message}
                  </p>
                )}
              </div>

              {/* Detailed Review */}
              <div className="space-y-3">
                <label className="flex items-center justify-between text-sm font-bold uppercase tracking-wide text-text">
                  <span className="flex items-center gap-2">
                    <div className="p-1.5 bg-secondary/10 rounded-md">
                      <MdRateReview className="text-secondary text-base" />
                    </div>
                    Detailed Review
                  </span>
                  <span className="text-xs text-neutral font-medium normal-case">
                    Min 50 characters
                  </span>
                </label>
                <textarea
                  {...register("detailedReview", {
                    required: "Detailed review is required",
                    minLength: {
                      value: 50,
                      message: "Minimum 50 characters required",
                    },
                  })}
                  rows="6"
                  className="w-full px-4 py-3.5 bg-neutral/5 border-2 border-neutral/20 rounded-md focus:outline-none focus:border-secondary focus:bg-background transition-all text-text font-medium resize-none leading-relaxed placeholder:text-neutral/50"
                  placeholder="Share your full experience... How was the taste, presentation, service, ambiance?"
                ></textarea>
                {errors.detailedReview && (
                  <p className="text-accent text-xs font-medium mt-1">
                    {errors.detailedReview.message}
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t-2 border-neutral/10">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 py-4 bg-neutral/10 hover:bg-neutral/20 text-neutral hover:text-text font-bold uppercase tracking-wide text-sm rounded-md transition-all flex items-center justify-center gap-2 border-2 border-neutral/20"
              >
                <MdArrowBack className="text-lg" />
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || mutation.isPending}
                className="flex-1 py-4 bg-gradient-to-r from-primary to-secondary text-background rounded-md font-bold uppercase tracking-wide text-sm shadow-xl hover:shadow-2xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {mutation.isPending ? (
                  <>
                    <FaSpinner className="animate-spin text-lg" />
                    Updating...
                  </>
                ) : (
                  <>
                    <MdCheckCircle className="text-lg" />
                    Update Review
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Info Note */}
        <div className="mt-8 p-6 bg-background border-2 border-primary/20 rounded-md">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-primary/10 rounded-md shrink-0">
              <MdCheckCircle className="text-primary text-xl" />
            </div>
            <div>
              <h3 className="text-text font-bold text-sm mb-1 uppercase tracking-wide">
                Instant Update
              </h3>
              <p className="text-neutral text-sm leading-relaxed">
                Your changes will be visible to the community immediately after
                updating. Make sure all information is accurate before
                submitting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditReview;
