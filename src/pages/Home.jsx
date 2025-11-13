import React from "react";
import { toast } from "react-toastify";
import Hero from "../components/Hero";
import FeaturedReviews from "../components/FeaturedReviews";
import CTABanner from "../components/CTABanner";
import TopUser from "../components/TopUser";

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <FeaturedReviews></FeaturedReviews>
      <TopUser></TopUser>
      <CTABanner></CTABanner>
    </div>
  );
};

export default Home;
