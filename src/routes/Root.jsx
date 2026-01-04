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
import ReviewDetails from "../pages/ReviewDetails";
import ErrorPage from "../components/ErrorPage";
import About from "../pages/About";
import DashboardLayout from "../mainLayout/dashboardLayout/DashboardLayout";
import DashboardLandingPage from "../pages/DashboardLandingPage";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsOfService from "../pages/TermsOfService";
import MyProfile from "../pages/MyProfile";

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
        path: "my-profile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },

      {
        path: "all-reviews",
        element: <AllReviews></AllReviews>,
      },

      {
        path: "edit-review/:reviewId",
        element: (
          <PrivateRoute>
            <EditReview></EditReview>,
          </PrivateRoute>
        ),
      },

      {
        path: "review-details/:reviewId",
        element: <ReviewDetails></ReviewDetails>,
      },
      {
        path: "about",
        element: <About></About>,
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicy></PrivacyPolicy>,
      },
      {
        path: "terms-of-service",
        element: <TermsOfService></TermsOfService>,
      },
    ],
  },
  // ------------dashboard routes------------
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        index: true,

        element: <DashboardLandingPage></DashboardLandingPage>,
      },
      {
        path: "add-review",
        element: (
          <PrivateRoute>
            <AddReview></AddReview>
          </PrivateRoute>
        ),
      },
      {
        path: "my-favorites",
        element: (
          <PrivateRoute>
            <MyFavorites></MyFavorites>
          </PrivateRoute>
        ),
      },
      {
        path: "my-reviews",
        element: (
          <PrivateRoute>
            <MyReviews></MyReviews>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
]);

export default router;
