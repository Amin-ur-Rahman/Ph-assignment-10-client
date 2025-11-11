import { useContext, useState } from "react";
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
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa6";
import AuthContext from "../contexts/AuthContext";
import Swal from "sweetalert2";
import axios from "axios";

const getReviews = async (email) => {
  const res = await fetch(`http://localhost:5000/reviews?email=${email}`);

  if (!res.ok) {
    throw new Error("Failed to fetch reviews");
  }
  return res.json();
};

export default function MyReviews() {
  const { user } = useContext(AuthContext);
  const email = user.email;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews", email],
    queryFn: () => getReviews(email),
  });

  const deleteReview = async (id) => {
    const res = await axios.delete(
      `http://localhost:5000/delete-user-review/${id}`
    );
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
    // console.log(selectedReview);
  };

  // const navigateToEdit = (reviewId) => {
  //   navigate(`edit-review/${reviewId}`);
  // };

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

  return (
    <div
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8"
      style={{
        background:
          "linear-gradient(135deg, #fff8f0 0%, #ffe8cc 50%, #fff3e0 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* table Header  */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div
              className="p-4 rounded-full shadow-lg"
              style={{
                background: "linear-gradient(135deg, #d35400 0%, #f1c40f 100%)",
              }}
            >
              <MdRestaurant className="text-5xl text-white" />
            </div>
          </div>
          <h1
            className="text-5xl font-bold mb-4"
            style={{
              background: "linear-gradient(135deg, #d35400 0%, #f1c40f 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            My Reviews
          </h1>
          <p className="text-gray-700 text-lg font-medium mb-4">
            Manage all your food reviews at Local Food Lovers
          </p>
          <div
            className="inline-block rounded-full px-8 py-3 shadow-lg transform hover:scale-105 transition-transform duration-300"
            style={{
              background: "linear-gradient(135deg, #d35400 0%, #f1c40f 100%)",
            }}
          >
            <span className="text-white font-bold text-lg">
              {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
            </span>
          </div>
        </div>

        {/* Review table */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-orange-100">
          {reviews.length === 0 ? (
            <div className="text-center py-20">
              <FaUtensils
                className="text-8xl mx-auto mb-6"
                style={{ color: "#d35400" }}
              />
              <h3 className="text-3xl font-bold text-gray-800 mb-3">
                No Reviews Yet
              </h3>
              <p className="text-gray-600 text-lg">
                Start reviewing your favorite local foods!
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr
                    className="text-white"
                    style={{
                      background:
                        "linear-gradient(135deg, #d35400 0%, #f1c40f 100%)",
                      backgroundSize: "200% 200%",
                      animation: "shimmer 6s ease infinite",
                    }}
                  >
                    <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">
                      Food Image
                    </th>
                    <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">
                      Food Name
                    </th>
                    <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">
                      Restaurant
                    </th>
                    <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">
                      Posted Date
                    </th>
                    <th className="px-6 py-5 text-center text-sm font-bold uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {reviews.map((review, index) => (
                    <tr
                      key={review._id}
                      className="group transition-all duration-300 ease-in-out hover:shadow-lg"
                      style={{
                        animation: `fadeInUp 0.6s ease-out ${
                          index * 0.1
                        }s both`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "linear-gradient(90deg, #fff8f0 0%, #ffe8cc 100%)";
                        e.currentTarget.style.transform = "scale(1.01)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    >
                      {/* Food image */}
                      <td className="px-6 py-5">
                        <div className="relative w-24 h-24 rounded-2xl overflow-hidden shadow-md group-hover:shadow-2xl transition-all duration-300">
                          <img
                            src={review.foodImage}
                            alt={review.foodName}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-125 group-hover:rotate-2"
                          />
                          <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                              background:
                                "linear-gradient(to top, rgba(211, 84, 0, 0.7), transparent)",
                            }}
                          />
                        </div>
                      </td>

                      {/* Food item */}
                      <td className="px-6 py-5">
                        <div className="font-bold text-gray-800 text-xl mb-2 group-hover:text-[#d35400] transition-colors duration-300">
                          {review.foodName}
                        </div>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={`text-base transition-all duration-300 ${
                                i < review.rating
                                  ? "text-[#f1c40f] group-hover:scale-125"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </td>

                      {/* Restaurant name */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <MdRestaurant className="text-[#d35400] text-xl" />
                          <span className="text-gray-700 font-semibold text-base">
                            {review.restaurantName}
                          </span>
                        </div>
                      </td>

                      {/* created_at ifo */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-gray-600">
                          <FaCalendar className="text-[#d35400]" />
                          <span className="font-medium">
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

                      <td className="px-6 py-5">
                        <div className="flex items-center justify-center gap-3">
                          <NavLink
                            to={`/edit-review/${review._id}`}
                            className="group/edit relative p-3 text-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-110 hover:rotate-6 transition-all duration-300"
                            style={{
                              background:
                                "linear-gradient(135deg, #3498db 0%, #2ecc71 100%)",
                            }}
                          >
                            <FaEdit className="text-xl" />
                            <span className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-xs font-bold opacity-0 group-hover/edit:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none shadow-lg">
                              Edit Review
                            </span>
                          </NavLink>

                          <button
                            onClick={() => {
                              handleDeleteClick(review);
                              // console.log(review._id);
                            }}
                            className="group/delete relative p-3 text-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-110 hover:-rotate-6 transition-all duration-300"
                            style={{
                              background:
                                "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)",
                            }}
                          >
                            <FaTrash className="text-xl" />
                            <span className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-xs font-bold opacity-0 group-hover/delete:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none shadow-lg">
                              Delete Review
                            </span>
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
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4"
          onClick={() => setShowDeleteModal(false)}
          style={{ animation: "fadeIn 0.3s ease-out" }}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-lg w-full transform"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: "scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <div
              className="text-white px-8 py-6 rounded-t-3xl"
              style={{
                background: "linear-gradient(135deg, #d35400 0%, #f1c40f 100%)",
              }}
            >
              <h3 className="text-3xl font-bold flex items-center gap-3">
                <FaTrash className="text-3xl" />
                Delete Review
              </h3>
            </div>

            <div className="p-8">
              <div className="bg-orange-50 border-l-4 border-[#d35400] p-4 rounded-lg mb-6">
                <p className="text-gray-800 text-lg font-medium">
                  Are you sure you want to delete your review for{" "}
                  <span className="font-bold text-[#d35400]">
                    {selectedReview?.foodName}
                  </span>{" "}
                  from{" "}
                  <span className="font-bold text-[#d35400]">
                    {selectedReview?.restaurantName}
                  </span>
                  ?
                </p>
              </div>
              <p className="text-gray-600 text-base flex items-center gap-2">
                <span className="text-2xl">⚠️</span>
                This action cannot be undone.
              </p>
            </div>

            <div className="flex gap-4 px-8 pb-8">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <FaTimes className="text-xl" />
                Cancel
              </button>
              <button
                onClick={() => {
                  mutate(selectedReview._id);
                }}
                className="flex-1 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg hover:shadow-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)",
                }}
              >
                <FaCheck className="text-xl" />
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
