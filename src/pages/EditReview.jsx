import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  MdRestaurant,
  MdLocationOn,
  MdImage,
  MdRateReview,
  MdStar,
  MdFastfood,
  MdEdit,
} from "react-icons/md";
import { FaUtensils, FaSpinner } from "react-icons/fa";
import Swal from "sweetalert2";

const EditReview = () => {
  const { reviewId } = useParams();
  const paramObj = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  console.log("params", paramObj);

  console.log(reviewId);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm();

  const watchRating = watch("rating", "");
  const watchFoodImage = watch("foodImage", "");

  const fetchData = async () => {
    const response = await axios.get(
      `https://local-food-lovers.onrender.com/user-review/${reviewId}`
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return response.data.review;
  };

  const {
    data: review,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["review", reviewId],
    queryFn: fetchData,
    onError: (error) => {
      console.log(error.message);
    },
  });

  console.log(review);

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

  const updateReview = async (data) => {
    const result = await axios.patch(
      `https://local-food-lovers.onrender.com/edit-user-review/${reviewId}`,
      data
    );
    if (!result.data.success) {
      throw new Error(result.data.message);
    }
    return result.data;
  };

  const mutation = useMutation({
    mutationFn: updateReview,
    onSuccess: async () => {
      queryClient.invalidateQueries(["review", reviewId]);
      queryClient.invalidateQueries(["allReviews"]);
      queryClient.invalidateQueries(["myReviews"]);
      await Swal.fire({
        title: "Review updated succesfully ",
        icon: "success",
        draggable: true,
      });
      setTimeout(() => {
        navigate("/my-reviews");
      }, 1000);
    },
    onError: (error) => {
      Swal.fire({
        title: error.message,
        icon: "error",
        draggable: true,
      });
    },
  });

  const onSubmit = async (data) => {
    mutation.mutate(data);
  };

  const renderStars = (rating) => {
    const stars = [];
    const numRating = parseFloat(rating) || 0;
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <MdStar
          key={i}
          className={`text-2xl ${
            i <= numRating ? "text-color-secondary" : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-main flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="text-6xl text-color-primary animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading review...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-base-main flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md">
          <p className="text-red-500 text-xl font-semibold mb-2">
            Error Loading Review
          </p>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <button
            onClick={() => navigate("/my-reviews")}
            className="bg-linear-mix text-white py-2 px-6 rounded-lg font-semibold"
          >
            Back to My Reviews
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-main py-12 px-4 sm:px-6 lg:px-8">
      {/* header  */}
      <div className="max-w-4xl mx-auto mb-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-4 rounded-full shadow-lg bg-linear-mix">
            <MdEdit className="text-5xl text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-color-primary">
          Edit Your Review
        </h1>
        <p className="text-gray-600 text-lg">
          Update your food experience and share the changes with the community
        </p>
      </div>

      {/* form main container */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* form outline */}
          <div className="h-3 bg-linear-mix"></div>

          <div className="p-8 md:p-12">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                {/* food */}
                <div className="group">
                  <label className="flex items-center gap-2 font-semibold mb-2 text-gray-700">
                    <MdFastfood className="text-xl text-color-primary" />
                    Food Name
                  </label>
                  <input
                    type="text"
                    {...register("foodName", {
                      required: "Food name is required",
                    })}
                    placeholder="e.g. Chicken Biryani"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#d35400] transition-all duration-200 group-hover:border-gray-300"
                  />
                  {errors.foodName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.foodName.message}
                    </p>
                  )}
                </div>

                {/* resturant */}
                <div className="group">
                  <label className="flex items-center gap-2 font-semibold mb-2 text-gray-700">
                    <MdRestaurant className="text-xl text-color-primary" />
                    Restaurant Name
                  </label>
                  <input
                    type="text"
                    {...register("restaurantName", {
                      required: "Restaurant name is required",
                    })}
                    placeholder="e.g. Spice Garden"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#d35400] transition-all duration-200 group-hover:border-gray-300"
                  />
                  {errors.restaurantName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.restaurantName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* location */}
              <div className="group">
                <label className="flex items-center gap-2 font-semibold mb-2 text-gray-700">
                  <MdLocationOn className="text-xl text-color-primary" />
                  Location
                </label>
                <input
                  type="text"
                  {...register("location", {
                    required: "Location is required",
                  })}
                  placeholder="e.g. Dhanmondi, Dhaka"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#d35400] transition-all duration-200 group-hover:border-gray-300"
                />
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.location.message}
                  </p>
                )}
              </div>

              {/* food image and url preview */}
              <div className="group">
                <label className="flex items-center gap-2 font-semibold mb-2 text-gray-700">
                  <MdImage className="text-xl text-color-primary" />
                  Food Image URL
                </label>
                <input
                  type="url"
                  {...register("foodImage", {
                    required: "Food image URL is required",
                    pattern: {
                      value: /^https?:\/\/.+/,
                      message: "Please enter a valid URL",
                    },
                  })}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#d35400] transition-all duration-200 group-hover:border-gray-300"
                />
                {errors.foodImage && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.foodImage.message}
                  </p>
                )}
                {watchFoodImage && !errors.foodImage && (
                  <div className="mt-4 rounded-xl overflow-hidden border-2 border-gray-200">
                    <img
                      src={watchFoodImage}
                      alt="Preview"
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>

              {/* rating stars */}
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-2xl border-2 border-orange-100">
                <label className="flex items-center gap-2 font-semibold mb-3 text-gray-700">
                  <MdStar className="text-xl text-color-secondary" />
                  Rate Your Experience (1-5)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    {...register("rating", {
                      required: "Rating is required",
                      min: {
                        value: 1,
                        message: "Rating must be at least 1",
                      },
                      max: {
                        value: 5,
                        message: "Rating cannot exceed 5",
                      },
                    })}
                    min="1"
                    max="5"
                    step="0.5"
                    className="w-24 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#f1c40f] transition-all duration-200 text-center text-lg font-bold text-color-primary"
                  />
                  <div className="flex gap-1">{renderStars(watchRating)}</div>
                </div>
                {errors.rating && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.rating.message}
                  </p>
                )}
              </div>

              {/* short review */}
              <div className="group">
                <label className="flex items-center gap-2 font-semibold mb-2 text-gray-700">
                  <MdRateReview className="text-xl text-color-primary" />
                  Quick Review
                  <span className="text-sm font-normal text-gray-500">
                    (One-liner)
                  </span>
                </label>
                <textarea
                  {...register("shortReview", {
                    required: "Short review is required",
                    maxLength: {
                      value: 150,
                      message: "Short review should not exceed 150 characters",
                    },
                  })}
                  rows="2"
                  placeholder="e.g., Absolutely delicious! Best biryani in town."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#d35400] transition-all duration-200 group-hover:border-gray-300 resize-none"
                ></textarea>
                {errors.shortReview && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.shortReview.message}
                  </p>
                )}
              </div>

              {/* detailed review */}
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-2xl border-2 border-orange-100">
                <label className="flex items-center gap-2 font-semibold mb-3 text-gray-700">
                  <MdRateReview className="text-xl text-color-primary" />
                  Detailed Review
                  <span className="text-sm font-normal text-gray-500">
                    (Share your full experience)
                  </span>
                </label>
                <textarea
                  {...register("detailedReview", {
                    required: "Detailed review is required",
                    minLength: {
                      value: 50,
                      message:
                        "Detailed review should be at least 50 characters",
                    },
                  })}
                  rows="6"
                  placeholder="Tell us about the taste, ambiance, service, presentation, and what made this experience special..."
                  className="w-full px-4 py-3 border-2 border-white rounded-xl focus:outline-none focus:border-[#f1c40f] transition-all duration-200 resize-none shadow-sm"
                ></textarea>
                {errors.detailedReview && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.detailedReview.message}
                  </p>
                )}
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => navigate("/my-reviews")}
                  className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-bold text-lg hover:bg-gray-300 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || mutation.isPending}
                  className="flex-1 bg-linear-mix text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting || mutation.isPending ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <MdEdit className="text-xl" />
                      Update Review
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Info Note */}
        <div className="mt-6 bg-white rounded-xl p-4 shadow-md">
          <p className="text-center text-gray-600 text-sm">
            <span className="font-semibold text-color-primary">Note:</span> Your
            changes will be visible to all users once updated. Make sure all
            information is accurate! 🍽️
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditReview;
