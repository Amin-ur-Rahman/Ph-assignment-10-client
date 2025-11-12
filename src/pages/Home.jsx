import React from "react";
import { toast } from "react-toastify";
import Hero from "../components/Hero";
import FeaturedReviews from "../components/FeaturedReviews";

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <FeaturedReviews></FeaturedReviews>
    </div>
  );
};

export default Home;
