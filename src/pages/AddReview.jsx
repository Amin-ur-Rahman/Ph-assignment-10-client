import React, { useContext, useEffect, useState } from "react";
import {
  HiOutlinePhotograph,
  HiOutlineStar,
  HiOutlineLocationMarker,
  HiOutlineChatAlt2,
  HiOutlineOfficeBuilding,
} from "react-icons/hi";
import { IoFastFoodOutline } from "react-icons/io5";
import { FaUtensils } from "react-icons/fa";
import { useForm } from "react-hook-form";
import AuthContext from "../contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { axiosInstance } from "../contexts/axiosInstance";
import axios from "axios";

const AddReview = () => {
  const cloudName = import.meta.env.VITE_cloudinary_cloud;
  const preset = import.meta.env.VITE_preset;
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    document.title = "ADD REVIEW - Local Food Lovers";
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const { user } = useContext(AuthContext);

  const watchRating = watch("rating", "");
  const watchPhoto = watch("photo");

  // Preview image when file changes
  useEffect(() => {
    if (watchPhoto && watchPhoto.length > 0) {
      const file = watchPhoto[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  }, [watchPhoto]);

  // Mutation for uploading image to Cloudinary
  const uploadImageMutation = useMutation({
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", preset);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );

      return response.data.secure_url;
    },
    onError: (error) => {
      console.error("Image upload error:", error);
      Swal.fire({
        title: "Image Upload Failed",
        text: "Could not upload image. Please try again.",
        icon: "error",
        confirmButtonColor: "var(--primary)",
      });
    },
  });

  // Mutation for submitting review to backend
  const submitReviewMutation = useMutation({
    mutationFn: async (reviewData) => {
      console.log("Submitting review data:", reviewData);

      const response = await axiosInstance.post(
        "/insert-new-review",
        reviewData
      );

      console.log("Backend response:", response.data);

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to submit review");
      }

      return response.data;
    },
    onSuccess: () => {
      Swal.fire({
        title: "Review Served!",
        text: "Thanks for sharing your taste.",
        icon: "success",
        confirmButtonColor: "var(--primary)",
      });
      reset();
      setImagePreview(null);
    },
    onError: (error) => {
      console.error("Review submission error:", error);
      Swal.fire({
        title: "Submission Failed",
        text: error.message || "Could not submit review. Please try again.",
        icon: "error",
        confirmButtonColor: "var(--primary)",
      });
    },
  });

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      console.log("Form submitted with data:", data);

      let foodImage = "";

      // Step 1: Upload image to Cloudinary if photo exists
      if (data.photo && data.photo.length > 0) {
        console.log("Uploading image to Cloudinary...");
        foodImage = await uploadImageMutation.mutateAsync(data.photo[0]);
        console.log("Image uploaded successfully:", foodImage);
      }

      // Step 2: Prepare review data matching the exact structure
      const reviewData = {
        foodName: data.foodName,
        restaurantName: data.restaurantName,
        location: data.location,
        foodImage: foodImage, // Cloudinary URL or empty string
        rating: data.rating, // Keep as string to match structure
        shortReview: data.shortReview,
        detailedReview: data.detailedReview,
        user_email: user?.email || "",
        user_name: user?.displayName || "",
        user_photo: user?.photoURL || "",
        created_at: new Date().toISOString(),
      };

      console.log("Prepared review data:", reviewData);

      // Step 3: Submit review to backend
      await submitReviewMutation.mutateAsync(reviewData);
    } catch (error) {
      console.error("Error in submission process:", error);
      // Error handling is done in mutation's onError
    }
  };

  const renderStars = (rating) => {
    const numRating = parseFloat(rating) || 0;
    return [...Array(5)].map((_, i) => (
      <HiOutlineStar
        key={i}
        className={`text-xl ${
          i < numRating ? "text-secondary fill-secondary" : "text-neutral/30"
        }`}
      />
    ));
  };

  const isSubmitting =
    uploadImageMutation.isPending || submitReviewMutation.isPending;

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      {/* Header Section */}
      <div className="max-w-3xl mx-auto mb-10 text-center">
        <div className="flex justify-center mb-6">
          <div className="p-5 bg-gradient-to-tr from-primary to-secondary rounded-md shadow-2xl rotate-3">
            <FaUtensils className="text-4xl text-background" />
          </div>
        </div>
        <h1 className="text-2xl font-black text-text mb-2 tracking-tighter uppercase italic">
          Share Your <span className="text-primary">Experience</span>
        </h1>
        <p className="text-base text-neutral font-medium max-w-lg mx-auto leading-relaxed">
          Join the community in spotlighting the best local flavors and hidden
          gems.
        </p>
      </div>

      {/* Form Container */}
      <div className="max-w-3xl mx-auto">
        <div className="bg-background rounded-md shadow-2xl overflow-hidden border border-neutral/10">
          <div className="h-2 bg-gradient-to-r from-primary to-secondary"></div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-8 md:p-12 space-y-8"
          >
            <div className="grid md:grid-cols-2 gap-8">
              {/* Food Name */}
              <div>
                <label className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-text mb-2">
                  <IoFastFoodOutline className="text-primary text-lg" />
                  Food Name
                </label>
                <input
                  type="text"
                  {...register("foodName", {
                    required: "Food name is required",
                  })}
                  placeholder="e.g. Classic Beef Burger"
                  className="w-full px-4 py-3 bg-neutral/5 border border-neutral/20 rounded-md focus:outline-none focus:border-primary transition-all text-base font-medium"
                />
                {errors.foodName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.foodName.message}
                  </p>
                )}
              </div>

              {/* Restaurant Name */}
              <div>
                <label className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-text mb-2">
                  <HiOutlineOfficeBuilding className="text-primary text-lg" />
                  Restaurant
                </label>
                <input
                  type="text"
                  {...register("restaurantName", {
                    required: "Restaurant name is required",
                  })}
                  placeholder="e.g. The Gourmet Hub"
                  className="w-full px-4 py-3 bg-neutral/5 border border-neutral/20 rounded-md focus:outline-none focus:border-primary transition-all text-base font-medium"
                />
                {errors.restaurantName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.restaurantName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-text mb-2">
                <HiOutlineLocationMarker className="text-primary text-lg" />
                Location
              </label>
              <input
                type="text"
                {...register("location", { required: "Location is required" })}
                placeholder="e.g. Banani, Dhaka"
                className="w-full px-4 py-3 bg-neutral/5 border border-neutral/20 rounded-md focus:outline-none focus:border-primary transition-all text-base font-medium"
              />
              {errors.location && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.location.message}
                </p>
              )}
            </div>

            {/* Food Image Upload */}
            <div className="w-full">
              <label className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-text mb-2">
                <HiOutlinePhotograph className="text-primary text-lg" />
                Photo (Optional)
              </label>
              <div className="relative">
                <input
                  id="photo"
                  {...register("photo")}
                  type="file"
                  accept="image/*"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                 file:rounded-lg file:text-sm file:border-0
                 file:bg-white file:text-gray-700
                 hover:file:bg-primary hover:file:text-white
                 transition-all duration-300 cursor-pointer"
                />
              </div>
              {/* Image Preview */}
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-md border border-neutral/20"
                  />
                </div>
              )}
            </div>

            {/* Rating Section */}
            <div className="p-6 bg-neutral/5 rounded-md border border-neutral/10">
              <label className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-text mb-4">
                <HiOutlineStar className="text-secondary text-lg" />
                Your Rating (1-5)
              </label>
              <div className="flex items-center gap-8">
                <input
                  type="number"
                  step="0.5"
                  {...register("rating", {
                    required: "Rating is required",
                    min: { value: 1, message: "Minimum rating is 1" },
                    max: { value: 5, message: "Maximum rating is 5" },
                  })}
                  className="w-24 px-4 py-3 bg-background border-2 border-primary rounded-md text-center font-black text-primary text-lg shadow-inner"
                />
                <div className="flex gap-1">{renderStars(watchRating)}</div>
              </div>
              {errors.rating && (
                <p className="text-red-500 text-xs mt-2">
                  {errors.rating.message}
                </p>
              )}
            </div>

            {/* Review Text Areas */}
            <div className="space-y-8">
              <div>
                <label className="text-sm font-black uppercase tracking-widest text-text mb-2 block">
                  Quick Summary
                </label>
                <input
                  {...register("shortReview", {
                    required: "Short review is required",
                  })}
                  placeholder="Summarize the experience in one line..."
                  className="w-full px-4 py-3 bg-neutral/5 border border-neutral/20 rounded-md focus:outline-none focus:border-primary text-base font-medium italic"
                />
                {errors.shortReview && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.shortReview.message}
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-text mb-2">
                  <HiOutlineChatAlt2 className="text-primary text-lg" />
                  Full Experience
                </label>
                <textarea
                  {...register("detailedReview", {
                    required: "Detailed review is required",
                  })}
                  rows="5"
                  placeholder="How was the flavor? The service? The atmosphere? Be as detailed as possible..."
                  className="w-full px-4 py-3 bg-neutral/5 border border-neutral/20 rounded-md focus:outline-none focus:border-primary text-base font-medium resize-none leading-relaxed"
                ></textarea>
                {errors.detailedReview && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.detailedReview.message}
                  </p>
                )}
              </div>
            </div>

            {/* Final CTA */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-background rounded-md font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaUtensils className="text-lg" />
                {uploadImageMutation.isPending
                  ? "Uploading Image..."
                  : submitReviewMutation.isPending
                  ? "Submitting Review..."
                  : "Submit Review"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
