import React, { useEffect } from "react";
import {
  HiOutlineHeart,
  HiOutlineUsers,
  HiOutlineStar,
  HiOutlineChatAlt2,
  HiOutlineLightBulb,
  HiOutlineGlobe,
  HiOutlineShieldCheck,
} from "react-icons/hi";
import {
  IoRestaurantOutline,
  IoMapOutline,
  IoFastFoodOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";

const About = () => {
  useEffect(() => {
    document.title = "ABOUT - Local Food Lovers";
  }, []);

  return (
    <div className="min-h-screen bg-background text-text">
      {/* --- Hero Section --- */}
      <section className="relative py-16 px-4">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-tr from-primary to-secondary rounded-md shadow-lg">
              <IoFastFoodOutline className="text-4xl text-background" />
            </div>
          </div>
          <h1 className="text-2xl font-black mb-4 tracking-tighter uppercase italic">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Local Food Lovers
            </span>
          </h1>
          <p className="text-base text-neutral font-medium leading-relaxed max-w-2xl mx-auto">
            A passionate community connecting food enthusiasts who love
            exploring local restaurants, street food, and home-cooked meals.
          </p>
        </div>
      </section>

      {/* --- Our Story Section --- */}
      <section className="py-8 px-4">
        <div className="w-[90dvw] mx-auto">
          <div className="bg-background rounded-md shadow-xl overflow-hidden border border-neutral/10">
            <div className="h-2 bg-gradient-to-r from-primary to-secondary"></div>

            <div className="grid md:grid-cols-2 gap-10 p-8 md:p-12 items-center">
              <div>
                <h2 className="text-xl font-black mb-6 tracking-tight uppercase">
                  Our Story
                </h2>
                <div className="space-y-4 text-base text-neutral leading-relaxed">
                  <p>
                    Local Food Lovers Network was born from a simple idea:
                    <span className="text-text font-bold">
                      {" "}
                      great food deserves to be shared.
                    </span>{" "}
                    Every meal tells a story, and every restaurant has something
                    unique to offer.
                  </p>
                  <p>
                    Our platform brings together food enthusiasts to discover,
                    review, and celebrate the incredible culinary diversity in
                    our local communities.
                  </p>
                  <div className="p-4 bg-neutral/5 border-l-4 border-secondary rounded-md italic text-base">
                    "Helping you find your next favorite meal, one bite at a
                    time."
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-md rotate-2"></div>
                <div className="relative rounded-md overflow-hidden shadow-lg border-2 border-background">
                  <img
                    src="https://i.ibb.co.com/Nd4yHptk/8159cc1bb0ddd8808dbd1a1becaa4bbd.jpg"
                    alt="Food lovers sharing a meal"
                    className="w-full h-72 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Mission & Vision Grid --- */}
      <section className="py-12 px-4 bg-neutral/5">
        <div className="w-[90dvw] mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-background rounded-md shadow-md p-8 border-b-4 border-primary">
            <div className="flex items-center gap-4 mb-4">
              <HiOutlineChatAlt2 className="text-3xl text-primary" />
              <h3 className="text-xl font-black uppercase">Our Mission</h3>
            </div>
            <p className="text-base text-neutral leading-relaxed">
              To create an authentic, community-driven platform where food
              lovers share honest reviews, discover amazing eateries, and
              support small businesses.
            </p>
          </div>

          <div className="bg-background rounded-md shadow-md p-8 border-b-4 border-secondary">
            <div className="flex items-center gap-4 mb-4">
              <HiOutlineLightBulb className="text-3xl text-secondary" />
              <h3 className="text-xl font-black uppercase">Our Vision</h3>
            </div>
            <p className="text-base text-neutral leading-relaxed">
              To become the most trusted food discovery platform that empowers
              communities to explore and celebrate their local culinary scenes.
            </p>
          </div>
        </div>
      </section>

      {/* --- Features Section --- */}
      <section className="py-16 px-4">
        <div className="w-[90dvw] mx-auto text-center">
          <h2 className="text-2xl font-black mb-10 uppercase tracking-widest">
            What We <span className="text-primary">Offer</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <HiOutlineHeart />,
                title: "Honest Reviews",
                desc: "Authentic feedback from real food lovers.",
              },
              {
                icon: <IoRestaurantOutline />,
                title: "Local Discovery",
                desc: "Find the best hidden gems near you.",
              },
              {
                icon: <HiOutlineUsers />,
                title: "Community",
                desc: "Connect with fellow food enthusiasts.",
              },
            ].map((feat, i) => (
              <div
                key={i}
                className="p-8 rounded-md border border-neutral/10 hover:border-primary/40 transition-all group"
              >
                <div className="text-4xl text-primary flex justify-center mb-4 group-hover:scale-110 transition-transform">
                  {feat.icon}
                </div>
                <h4 className="text-lg font-black mb-2 uppercase">
                  {feat.title}
                </h4>
                <p className="text-base text-neutral leading-snug">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Community Values --- */}
      <section className="py-12 px-4 bg-neutral/5">
        <div className="w-[90dvw] mx-auto bg-background rounded-md shadow-lg p-8 md:p-12 border border-neutral/10">
          <h2 className="text-2xl font-black mb-10 text-center uppercase italic">
            Community Values
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            {[
              {
                icon: <HiOutlineShieldCheck />,
                title: "Authenticity",
                text: "We value genuine experiences over paid promotions.",
              },
              {
                icon: <HiOutlineStar />,
                title: "Respect",
                text: "Fostering constructive and respectful feedback.",
              },
              {
                icon: <HiOutlineGlobe />,
                title: "Diversity",
                text: "Celebrating every cuisine from street to fine dining.",
              },
              {
                icon: <IoMapOutline />,
                title: "Local First",
                text: "Always supporting our neighborhood businesses.",
              },
            ].map((val, i) => (
              <div key={i} className="flex gap-5">
                <div className="text-2xl text-secondary mt-1">{val.icon}</div>
                <div>
                  <h4 className="font-black uppercase tracking-wider text-base mb-1">
                    {val.title}
                  </h4>
                  <p className="text-base text-neutral leading-relaxed">
                    {val.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Final CTA --- */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-md p-10 md:p-14 text-center shadow-xl">
            <h2 className="text-2xl font-black text-background mb-6 uppercase tracking-tighter">
              Ready to Join Our Community?
            </h2>
            <p className="text-background/90 text-base mb-10 font-medium">
              Start sharing your experiences and discovering incredible meals
              today.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/register"
                className="bg-background text-primary px-10 py-3 rounded-md font-black uppercase text-sm tracking-widest hover:scale-105 transition-transform"
              >
                Get Started
              </Link>
              <Link
                to="/all-reviews"
                className="bg-transparent border-2 border-background text-background px-10 py-3 rounded-md font-black uppercase text-sm tracking-widest hover:bg-background hover:text-secondary transition-all"
              >
                Explore
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
