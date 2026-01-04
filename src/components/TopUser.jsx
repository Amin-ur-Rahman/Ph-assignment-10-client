import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  HiOutlineBadgeCheck,
  HiOutlineTrendingUp,
  HiOutlineStar,
} from "react-icons/hi";
import {
  IoDiamondOutline,
  IoRestaurantOutline,
  IoChatbubbleEllipsesOutline,
  IoSparklesOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import { axiosInstance } from "../contexts/axiosInstance";
import { GrTrophy } from "react-icons/gr";
import AuthContext from "../contexts/AuthContext";

const TopUser = () => {
  const { user } = useContext(AuthContext);
  const { data: topUser, isLoading } = useQuery({
    queryKey: ["topUser"],
    queryFn: async () => {
      const res = await axiosInstance.get("/top-user");
      return res.data.topUser;
    },
  });

  if (isLoading) {
    return (
      <section className="py-20 px-4 bg-background">
        <div className="max-w-4xl mx-auto animate-pulse">
          <div className="h-12 bg-neutral/10 rounded-md w-3/4 mx-auto mb-8"></div>
          <div className="h-[400px] bg-neutral/5 rounded-md border border-neutral/10"></div>
        </div>
      </section>
    );
  }

  if (!topUser) return null;

  return (
    <section className="py-20 px-4 bg-background relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      <div className="w-[90dvw] mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 rounded-md bg-secondary/10 mb-6">
            <GrTrophy className="text-5xl text-secondary animate-bounce" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-text mb-4 tracking-tight uppercase">
            Critic of the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Month
            </span>
          </h2>
          <p className="text-neutral text-lg max-w-xl mx-auto font-medium leading-relaxed">
            Honoring the palate that leads the way. Our most dedicated
            contributor sharing the pulse of the food scene.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Main Card */}
          <div className="bg-background rounded-md shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden border border-neutral/10 relative">
            {/* Elite Badge Ribbon */}
            <div className="absolute top-0 left-0 bg-primary text-background px-6 py-2 font-black text-[10px] tracking-[0.3em] uppercase z-20 rounded-br-md flex items-center gap-2">
              <IoSparklesOutline /> Featured Critic
            </div>

            {/* Top Gradient Bar */}
            <div className="h-2 bg-gradient-to-r from-primary via-secondary to-primary"></div>

            <div className="p-8 md:p-14">
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
                {/* Profile Section */}
                <div className="relative group">
                  <div className="w-44 h-44 md:w-56 md:h-56 p-1.5 rounded-md bg-gradient-to-tr from-primary to-secondary rotate-3 group-hover:rotate-0 transition-transform duration-500 shadow-2xl">
                    <div className="w-full h-full bg-background rounded-md overflow-hidden border-2 border-background">
                      <img
                        src={topUser.photo}
                        alt={topUser.name}
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                      />
                    </div>
                  </div>
                  {/* Verified Badge */}
                  <div className="absolute -bottom-4 -right-4 bg-background p-2 rounded-md shadow-xl border border-neutral/10">
                    <div className="bg-secondary p-2 rounded-md">
                      <HiOutlineBadgeCheck className="text-3xl text-background" />
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 text-center lg:text-left pt-4">
                  <div className="mb-8">
                    <h3 className="text-4xl md:text-5xl font-black text-text mb-2 tracking-tighter uppercase italic">
                      {topUser.name}
                    </h3>
                    <div className="flex items-center justify-center lg:justify-start gap-2 text-primary font-bold tracking-widest text-xs uppercase">
                      <IoDiamondOutline /> Elite Tier Community Member
                    </div>
                  </div>

                  {/* Stats Grid - Glassmorphism style */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      {
                        label: "Reviews",
                        val: topUser.reviewCount,
                        color: "primary",
                      },
                      {
                        label: "Avg Rating",
                        val: topUser.averageRating.toFixed(1),
                        color: "secondary",
                      },
                      {
                        label: "Fav Spot",
                        val: topUser.favoriteRestaurant,
                        color: "primary",
                        truncate: true,
                      },
                      {
                        label: "Rank",
                        val: "#1",
                        color: "secondary",
                      },
                    ].map((stat, i) => (
                      <div
                        key={i}
                        className="bg-neutral/5 hover:bg-neutral/10 transition-colors border border-neutral/10 rounded-md p-4 flex flex-col items-center justify-center text-center"
                      >
                        <span className={`text-2xl text-${stat.color} mb-2`}>
                          {stat.icon}
                        </span>
                        <p
                          className={`text-xl font-black text-text ${
                            stat.truncate ? "truncate w-full px-2" : ""
                          }`}
                        >
                          {stat.val}
                        </p>
                        <p className="text-[9px] uppercase font-bold text-neutral tracking-widest mt-1">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quote Section */}
              <div className="mt-12 group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-md -rotate-1 group-hover:rotate-0 transition-transform"></div>
                <div className="relative p-8 border border-primary/20 rounded-md bg-background/50 backdrop-blur-sm">
                  <span className="absolute top-4 left-4 text-4xl text-primary/20 font-serif">
                    "
                  </span>
                  <p className="text-center text-text italic font-semibold text-lg leading-relaxed px-6">
                    Looking for your next culinary adventure? This month's top
                    critic has curated the best hidden gems just for you. Their
                    contribution makes our community the home of great taste.
                  </p>
                  <span className="absolute bottom-4 right-4 text-4xl text-secondary/20 font-serif">
                    "
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <p className="text-neutral font-bold text-sm uppercase tracking-[0.2em] mb-8">
            Think you have what it takes?
          </p>
          <Link
            to={`${user ? "/dashboard" : "/login"}`}
            className="group relative inline-flex items-center justify-center px-12 py-5 overflow-hidden font-black text-background transition-all bg-gradient-to-r from-primary to-secondary rounded-md hover:bg-gradient-to-l shadow-[0_10px_30px_-10px_rgba(var(--primary-rgb),0.5)]"
          >
            <span className="relative tracking-[0.15em] uppercase text-sm">
              Join the Elite
            </span>
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
              <div className="relative h-full w-10 bg-white/20"></div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopUser;
