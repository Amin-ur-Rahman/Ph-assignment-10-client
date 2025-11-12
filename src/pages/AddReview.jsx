import React, { useContext, useEffect, useState } from "react";
import {
  MdRestaurant,
  MdLocationOn,
  MdImage,
  MdRateReview,
  MdStar,
  MdFastfood,
} from "react-icons/md";
import { FaUtensils } from "react-icons/fa";
import { useForm } from "react-hook-form";
import AuthContext from "../contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import axios from "axios";

const AddReview = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm();

  const { user } = useContext(AuthContext);
  const [imagePreview, setImagePreview] = useState(null);

  const watchRating = watch("rating", "");
  const watchFoodImage = watch("foodImage", "");

  const addReview = async (formData) => {
    const res = await axios.post(
      "https://local-food-lovers.onrender.com/insert-new-review",
      formData
    );
    if (!res.data.success) {
      throw new Error("Post request error");
    }
    return res.data;
  };

  const { mutate } = useMutation({
    mutationFn: addReview,
    onSuccess: (res) => {
      console.log(res.message);
      Swal.fire({
        title: "Review added ",
        icon: "success",
        draggable: true,
      });
      reset();
    },
    onError: (error) => {
      console.log("Error: ", error.message);
      Swal.fire({
        title: "Failed to add review",
        text: error.message,
        icon: "error",
        draggable: true,
      });
    },
  });

  useEffect(() => {
    setImagePreview(watchFoodImage);
  }, [watchFoodImage]);

  const onSubmit = (data) => {
    const finalData = {
      ...data,
      user_email: user?.email,
      user_name: user?.displayName,
      user_photo: user?.photoURL || "",
      created_at: new Date().toISOString(),
    };
    console.log("Final Data:", finalData);

    // try {
    //   const response = await fetch("http://localhost:5000/insert-new-review", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(finalData),
    //   });
    //   const result = await response.json();
    //   console.log("Success:", result);
    //   reset();
    // } catch (error) {
    //   console.error("Error:", error);
    // }

    mutate(finalData);
  };

  const renderStars = (rating) => {
    const stars = [];
    const numRating = parseFloat(rating) || 0;
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <MdStar
          key={i}
          className={`text-2xl ${
            i <= numRating ? "text-[#f1c40f]" : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#fff8f0] via-[#fffdf5] to-[#fff4e1]">
      <div className="max-w-4xl mx-auto mb-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-4 rounded-full shadow-lg bg-gradient-to-r from-[#d35400] to-[#f1c40f]">
            <FaUtensils className="text-5xl text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-[#d35400]">
          Share Your Food Experience
        </h1>
        <p className="text-gray-700 text-lg">
          Help fellow food lovers discover amazing dishes and restaurants
        </p>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* gradient edge bar */}
          <div className="h-3 bg-gradient-to-r from-[#d35400] to-[#f1c40f]"></div>

          <div className="p-8 md:p-12">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Food Name */}
                <div className="group">
                  <label className="flex items-center gap-2 font-semibold mb-2 text-gray-800">
                    <MdFastfood className="text-xl text-[#d35400]" />
                    Food Name
                  </label>
                  <input
                    type="text"
                    {...register("foodName", {
                      required: "Food name is required",
                    })}
                    placeholder="e.g. Chicken Biryani"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#d35400] transition-all duration-200"
                  />
                  {errors.foodName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.foodName.message}
                    </p>
                  )}
                </div>

                {/* Restaurant Name */}
                <div className="group">
                  <label className="flex items-center gap-2 font-semibold mb-2 text-gray-800">
                    <MdRestaurant className="text-xl text-[#d35400]" />
                    Restaurant Name
                  </label>
                  <input
                    type="text"
                    {...register("restaurantName", {
                      required: "Restaurant name is required",
                    })}
                    placeholder="e.g. Spice Garden"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#d35400] transition-all duration-200"
                  />
                  {errors.restaurantName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.restaurantName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Location */}
              <div className="group">
                <label className="flex items-center gap-2 font-semibold mb-2 text-gray-800">
                  <MdLocationOn className="text-xl text-[#d35400]" />
                  Location
                </label>
                <input
                  type="text"
                  {...register("location", {
                    required: "Location is required",
                  })}
                  placeholder="e.g. Dhanmondi, Dhaka"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#d35400] transition-all duration-200"
                />
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.location.message}
                  </p>
                )}
              </div>

              {/* Food Image URL */}
              <div className="group">
                <label className="flex items-center gap-2 font-semibold mb-2 text-gray-800">
                  <MdImage className="text-xl text-[#d35400]" />
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
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#f1c40f] transition-all duration-200"
                />
                {errors.foodImage && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.foodImage.message}
                  </p>
                )}
                {watchFoodImage && !errors.foodImage && (
                  <div className="mt-4 rounded-xl overflow-hidden border-2 border-gray-200">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  </div>
                )}
              </div>

              {/* Star Rating */}
              <div className="bg-gradient-to-br from-[#fff3e0] to-[#fff9e6] p-6 rounded-2xl border-2 border-[#fbe7c6]">
                <label className="flex items-center gap-2 font-semibold mb-3 text-gray-800">
                  <MdStar className="text-xl text-[#f1c40f]" />
                  Rate Your Experience (1–5)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    {...register("rating", {
                      required: "Rating is required",
                      min: { value: 1, message: "Min rating is 1" },
                      max: { value: 5, message: "Max rating is 5" },
                    })}
                    min="1"
                    max="5"
                    step="0.5"
                    className="w-24 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#f1c40f] transition-all duration-200 text-center text-lg font-bold text-[#d35400]"
                  />
                  <div className="flex gap-1">{renderStars(watchRating)}</div>
                </div>
                {errors.rating && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.rating.message}
                  </p>
                )}
              </div>

              {/* Short Review */}
              <div className="group">
                <label className="flex items-center gap-2 font-semibold mb-2 text-gray-800">
                  <MdRateReview className="text-xl text-[#d35400]" />
                  Quick Review{" "}
                  <span className="text-sm font-normal text-gray-500">
                    (One-liner)
                  </span>
                </label>
                <textarea
                  {...register("shortReview", {
                    required: "Short review is required",
                    maxLength: {
                      value: 150,
                      message: "Keep it under 150 characters",
                    },
                  })}
                  rows="2"
                  placeholder="e.g. Absolutely delicious! Best biryani in town."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#d35400] transition-all duration-200 resize-none"
                ></textarea>
                {errors.shortReview && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.shortReview.message}
                  </p>
                )}
              </div>

              {/* Detailed Review */}
              <div className="bg-gradient-to-br from-[#fff3e0] to-[#fff9e6] p-6 rounded-2xl border-2 border-[#fbe7c6]">
                <label className="flex items-center gap-2 font-semibold mb-3 text-gray-800">
                  <MdRateReview className="text-xl text-[#d35400]" />
                  Detailed Review{" "}
                  <span className="text-sm font-normal text-gray-500">
                    (Share your full experience)
                  </span>
                </label>
                <textarea
                  {...register("detailedReview", {
                    minLength: {
                      value: 50,
                      message: "Should be at least 50 characters",
                    },
                  })}
                  rows="6"
                  placeholder="Tell us about the taste, service, presentation, and what made it special..."
                  className="w-full px-4 py-3 border-2 border-white rounded-xl focus:outline-none focus:border-[#f1c40f] transition-all duration-200 resize-none shadow-sm"
                ></textarea>
                {errors.detailedReview && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.detailedReview.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#d35400] to-[#f1c40f] text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <FaUtensils className="text-xl" />
                  {isSubmitting ? "Submitting..." : "Share Your Review"}
                </button>
              </div>
            </form>
          </div>
        </div>

        <p className="text-center text-gray-600 mt-6 text-sm">
          🍽️ Thank you for contributing to our food-loving community!
        </p>
      </div>
    </div>
  );
};

export default AddReview;
