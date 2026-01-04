import React, { useEffect } from "react";

import Hero from "../components/Hero";
import FeaturedReviews from "../components/FeaturedReviews";
import CTABanner from "../components/CTABanner";
import TopUser from "../components/TopUser";
import HowItWorks from "../components/HowItWorks";
import OurJourney from "../components/OurJourney";

const Home = () => {
  useEffect(() => {
    document.title = "HOME - local food lovers";
  }, []);
  return (
    <div>
      <Hero></Hero>
      <FeaturedReviews></FeaturedReviews>
      <TopUser></TopUser>
      <CTABanner></CTABanner>
      <HowItWorks></HowItWorks>
      <OurJourney></OurJourney>
    </div>
  );
};

export default Home;
