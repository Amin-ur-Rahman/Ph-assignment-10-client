import { useContext, useEffect, useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaTimes,
  FaCheck,
  FaStar,
  FaCalendar,
  FaUtensils,
} from "react-icons/fa";
import { MdRestaurant } from "react-icons/md";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import { FaSpinner } from "react-icons/fa6";
import AuthContext from "../contexts/AuthContext";
import Swal from "sweetalert2";

import { axiosInstance } from "../contexts/axiosInstance";

export default function MyReviews() {
  useEffect(() => {
    document.title = "MY REVIEWS";
  }, []);
  const { user } = useContext(AuthContext);
  const email = user.email;
  const queryClient = useQueryClient();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews", email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/reviews?email=${email}`);
      return res.data;
    },
  });

  const deleteReview = async (id) => {
    const res = await axiosInstance.delete(`/delete-user-review/${id}`);
    if (!res.data.success) {
      throw new Error("Deletion failed");
    }
    return res.data;
  };

  const { mutate } = useMutation({
    mutationFn: deleteReview,
    onSuccess: (res) => {
      queryClient.invalidateQueries(["reviews", email]);
      setShowDeleteModal(false);
      Swal.fire({
        title: `${res.message}`,
        icon: "success",
        draggable: true,
      });
    },
    onError: (error) => {
      setShowDeleteModal(false);
      console.log("Error:", error.message);
      Swal.fire({
        title: "Request failed! try again later ",
        icon: "error",
        draggable: true,
      });
    },
  });

  const handleDeleteClick = (review) => {
    setShowDeleteModal(true);
    setSelectedReview(review);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="text-4xl text-primary animate-spin mx-auto mb-4" />
          <p className="text-neutral text-base">Loading delicious reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* table Header  */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="p-4 rounded-full shadow-md bg-primary">
              <MdRestaurant className="text-xl md:text-2xl text-background" />
            </div>
          </div>
          {/* Max text size restricted to 2xl */}
          <h1 className="text-xl md:text-2xl font-bold mb-3 text-primary uppercase">
            My Reviews
          </h1>
          <p className="text-neutral text-sm md:text-base font-medium mb-4">
            Manage all your food reviews at Local Food Lovers
          </p>
          <div className="inline-block rounded-full px-6 py-2 shadow-sm bg-secondary">
            <span className="text-background font-bold text-sm md:text-base">
              {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
            </span>
          </div>
        </div>

        {/* Review table Container - Corrected to rounded-md */}
        <div className="bg-background rounded-md shadow-lg overflow-hidden border border-neutral/10">
          {reviews.length === 0 ? (
            <div className="text-center py-20">
              <FaUtensils className="text-5xl mx-auto mb-6 text-neutral/20" />
              <h3 className="text-lg md:text-xl font-bold text-text mb-3">
                No Reviews Yet
              </h3>
              <p className="text-neutral text-sm">
                Start reviewing your favorite local foods!
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-background bg-primary">
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                      Food Image
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                      Food Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                      Restaurant
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                      Posted Date
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral/10">
                  {reviews.map((review) => (
                    <tr
                      key={review._id}
                      className="group transition-colors hover:bg-neutral/5"
                    >
                      {/* Food image - Corrected to rounded-md */}
                      <td className="px-6 py-4">
                        <div className="relative w-16 h-16 rounded-md overflow-hidden shadow-sm border border-neutral/10">
                          <img
                            src={review.foodImage}
                            alt={review.foodName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="font-bold text-text text-sm md:text-base mb-1">
                          {review.foodName}
                        </div>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={`text-xs ${
                                i < review.rating
                                  ? "text-secondary"
                                  : "text-neutral/20"
                              }`}
                            />
                          ))}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <MdRestaurant className="text-primary text-sm" />
                          <span className="text-text font-medium text-sm">
                            {review.restaurantName}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-neutral">
                          <FaCalendar className="text-primary text-xs" />
                          <span className="text-xs font-medium">
                            {new Date(review.created_at).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-3">
                          <NavLink
                            to={`/edit-review/${review._id}`}
                            className="p-2 text-primary hover:bg-primary hover:text-background rounded-md transition-all shadow-sm border border-primary/20"
                          >
                            <FaEdit className="text-lg" />
                          </NavLink>

                          <button
                            onClick={() => handleDeleteClick(review)}
                            className="p-2 text-neutral hover:bg-text hover:text-background rounded-md transition-all shadow-sm border border-neutral/20"
                          >
                            <FaTrash className="text-lg" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 bg-text/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowDeleteModal(false)}
        >
          {/* Modal Container - Corrected to rounded-md */}
          <div
            className="bg-background rounded-md shadow-2xl max-w-md w-full transform overflow-hidden border border-neutral/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-background px-6 py-4 bg-primary">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <FaTrash />
                Delete Review
              </h3>
            </div>

            <div className="p-6">
              <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-md mb-4">
                <p className="text-text text-sm font-medium">
                  Delete review for{" "}
                  <span className="font-bold text-primary">
                    {selectedReview?.foodName}
                  </span>{" "}
                  at{" "}
                  <span className="font-bold text-primary">
                    {selectedReview?.restaurantName}
                  </span>
                  ?
                </p>
              </div>
              <p className="text-neutral text-xs flex items-center gap-1">
                <FaCheck className="text-secondary" />
                This action is permanent.
              </p>
            </div>

            <div className="flex gap-3 px-6 pb-6">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 bg-neutral/10 hover:bg-neutral/20 text-text text-sm font-bold py-3 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => mutate(selectedReview._id)}
                className="flex-1 bg-primary hover:bg-primary/90 text-background text-sm font-bold py-3 rounded-md transition-colors shadow-md"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
