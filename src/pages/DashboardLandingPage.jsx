import React, { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  MdRestaurant,
  MdStar,
  MdLocationOn,
  MdAdd,
  MdEdit,
  MdTrendingUp,
} from "react-icons/md";
import { FaSpinner } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import AuthContext from "../contexts/AuthContext";
import { axiosInstance } from "../contexts/axiosInstance";

const DashboardLandingPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    document.title = "DASHBOARD - Local Food Lovers";
  }, []);

  const { data: reviews, isLoading } = useQuery({
    queryKey: ["myReviews", user?.email],
    queryFn: async () => {
      const response = await axiosInstance.get(`/my-reviews/${user?.email}`);
      return response.data;
    },
    enabled: !!user?.email,
  });

  const totalReviews = reviews?.length || 0;
  const avgRating = reviews?.length
    ? (
        reviews.reduce((sum, r) => sum + parseFloat(r.rating), 0) /
        reviews.length
      ).toFixed(1)
    : "0.0";

  const uniqueRestaurants = reviews?.length
    ? new Set(reviews.map((r) => r.restaurantName)).size
    : 0;

  const getRestaurantRatings = () => {
    if (!reviews?.length) return [];

    const restaurantMap = new Map();

    reviews.forEach((review) => {
      const name = review.restaurantName;
      const rating = parseFloat(review.rating);
      const date = new Date(review.created_at);

      if (!restaurantMap.has(name) || restaurantMap.get(name).date < date) {
        restaurantMap.set(name, { rating, date });
      }
    });

    return Array.from(restaurantMap.entries())
      .map(([name, data]) => ({
        restaurant: name.length > 15 ? name.substring(0, 15) + "..." : name,
        fullName: name,
        rating: data.rating,
      }))
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 8);
  };

  const chartData = getRestaurantRatings();

  const getBarColor = (rating) => {
    if (rating >= 4.5) return "#d35400";
    if (rating >= 3.5) return "#f1c40f";
    if (rating >= 2.5) return "#f39c12";
    return "#e67e22";
  };

  const recentReviews = reviews?.slice(0, 3) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="text-5xl text-primary animate-spin mx-auto mb-4" />
          <p className="text-text text-lg font-bold">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="bg-gradient-to-br from-primary to-secondary rounded-md shadow-xl p-8 md:p-12 text-background">
          <div className="flex items-center gap-6 mb-4">
            {user?.photoURL && (
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-20 h-20 rounded-full border-4 border-background shadow-lg"
              />
            )}
            <div>
              <h1 className="text-2xl font-black mb-2">
                Welcome back, {user?.displayName?.split(" ")[0]}! 👋
              </h1>
              <p className="text-background/90 text-base font-medium">
                Here's your food journey at a glance
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-background/20 backdrop-blur-sm rounded-md p-6 border border-background/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-background/80 text-sm font-bold uppercase tracking-wide">
                  Total Reviews
                </span>
                <MdRestaurant className="text-2xl text-background/60" />
              </div>
              <p className="text-2xl font-black text-background">
                {totalReviews}
              </p>
            </div>

            <div className="bg-background/20 backdrop-blur-sm rounded-md p-6 border border-background/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-background/80 text-sm font-bold uppercase tracking-wide">
                  Avg Rating
                </span>
                <MdStar className="text-2xl text-background/60" />
              </div>
              <p className="text-2xl font-black text-background">
                {avgRating} ★
              </p>
            </div>

            <div className="bg-background/20 backdrop-blur-sm rounded-md p-6 border border-background/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-background/80 text-sm font-bold uppercase tracking-wide">
                  Restaurants
                </span>
                <MdLocationOn className="text-2xl text-background/60" />
              </div>
              <p className="text-2xl font-black text-background">
                {uniqueRestaurants}
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate("/dashboard/add-review")}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-secondary text-background px-8 py-4 rounded-md font-bold uppercase tracking-wide text-base shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all"
          >
            <MdAdd className="text-2xl" />
            Add New Review
          </button>
        </div>

        <div className="bg-background rounded-md shadow-xl border-2 border-neutral/20 overflow-hidden">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 border-b-2 border-neutral/20">
            <h2 className="text-xl font-black text-text uppercase tracking-wide flex items-center gap-2">
              <MdTrendingUp className="text-primary" />
              Recent Reviews
            </h2>
          </div>

          <div className="p-6">
            {recentReviews.length === 0 ? (
              <div className="text-center py-12">
                <MdRestaurant className="text-6xl text-neutral/30 mx-auto mb-4" />
                <p className="text-neutral text-base font-medium mb-4">
                  No reviews yet. Start sharing your food experiences!
                </p>
                <button
                  onClick={() => navigate("/dashboard/add-review")}
                  className="bg-primary text-background px-6 py-2 rounded-md font-bold text-sm hover:opacity-90 transition-all"
                >
                  Write Your First Review
                </button>
              </div>
            ) : (
              <div className="grid gap-6">
                {recentReviews.map((review) => (
                  <div
                    key={review._id}
                    className="flex flex-col md:flex-row gap-4 p-4 bg-neutral/5 rounded-md border border-neutral/20 hover:border-primary/50 transition-all group"
                  >
                    {review.foodImage && (
                      <img
                        src={review.foodImage}
                        alt={review.foodName}
                        className="w-full md:w-32 h-32 object-cover rounded-md border-2 border-neutral/20 group-hover:scale-105 transition-transform"
                      />
                    )}

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-text mb-1">
                            {review.foodName}
                          </h3>
                          <p className="text-sm text-neutral font-medium flex items-center gap-2">
                            <MdRestaurant className="text-primary" />
                            {review.restaurantName}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 bg-secondary/20 px-3 py-1 rounded-md">
                          <MdStar className="text-secondary" />
                          <span className="text-text font-bold">
                            {review.rating}
                          </span>
                        </div>
                      </div>

                      <p className="text-neutral text-sm mb-3 line-clamp-2">
                        {review.shortReview}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-neutral font-medium flex items-center gap-1">
                          <MdLocationOn className="text-primary" />
                          {review.location}
                        </span>
                        <button
                          onClick={() => navigate(`/edit-review/${review._id}`)}
                          className="flex items-center gap-1 text-primary hover:text-secondary text-sm font-bold transition-colors"
                        >
                          <MdEdit />
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {recentReviews.length > 0 && (
            <div className="p-4 bg-neutral/5 border-t-2 border-neutral/20 text-center">
              <button
                onClick={() => navigate("/dashboard/my-reviews")}
                className="text-primary hover:text-secondary font-bold text-sm uppercase tracking-wide transition-colors"
              >
                View All Reviews →
              </button>
            </div>
          )}
        </div>

        <div className="bg-background rounded-md shadow-xl border-2 border-neutral/20 overflow-hidden">
          <div className="bg-gradient-to-r from-secondary/10 to-primary/10 p-6 border-b-2 border-neutral/20">
            <h2 className="text-xl font-black text-text uppercase tracking-wide flex items-center gap-2">
              <MdStar className="text-secondary" />
              Restaurant Ratings
            </h2>
          </div>

          <div className="p-8">
            {totalReviews === 0 ? (
              <div className="text-center py-12">
                <p className="text-neutral text-base">
                  No data yet. Add reviews to see your restaurant ratings.
                </p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={chartData} margin={{ bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#78716c20" />
                  <XAxis
                    dataKey="restaurant"
                    angle={-45}
                    textAnchor="end"
                    tick={{ fill: "#78716c", fontSize: 12, fontWeight: 600 }}
                    height={80}
                  />
                  <YAxis
                    domain={[0, 5]}
                    ticks={[0, 1, 2, 3, 4, 5]}
                    tick={{ fill: "#78716c", fontSize: 14, fontWeight: 600 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff8f0",
                      border: "2px solid #d35400",
                      borderRadius: "6px",
                      fontWeight: "bold",
                    }}
                    cursor={{ fill: "#d3540020" }}
                    formatter={(value, name, props) => [
                      `${value} ★`,
                      props.payload.fullName,
                    ]}
                  />
                  <Bar dataKey="rating" radius={[8, 8, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={getBarColor(entry.rating)}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLandingPage;
