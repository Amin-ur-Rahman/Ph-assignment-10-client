import { createBrowserRouter } from "react-router-dom";
import Layout from "../mainLayout/Layout";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import AddReview from "../pages/AddReview";
import AllReviews from "../pages/AllReviews";
import MyReviews from "../pages/MyReviews";
import EditReview from "../pages/EditReview";
import MyFavorites from "../pages/MyFavorites";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/add-review",
        element: (
          <PrivateRoute>
            <AddReview></AddReview>
          </PrivateRoute>
        ),
      },
      {
        path: "/all-reviews",
        element: <AllReviews></AllReviews>,
      },
      {
        path: "/my-reviews",
        element: (
          <PrivateRoute>
            <MyReviews></MyReviews>
          </PrivateRoute>
        ),
      },
      {
        path: "/edit-review/:reviewId",
        element: (
          <PrivateRoute>
            <EditReview></EditReview>,
          </PrivateRoute>
        ),
      },
      {
        path: "/my-favorites",
        element: (
          <PrivateRoute>
            <MyFavorites></MyFavorites>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
