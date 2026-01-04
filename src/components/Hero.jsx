import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar } from "react-icons/fa6";
import { FaCamera, FaHotel, FaStarAndCrescent } from "react-icons/fa";
import { IoIosStarOutline } from "react-icons/io";
import { MdFavoriteBorder } from "react-icons/md";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const { user } = useContext(AuthContext);

  const slides = [
    {
      id: 1,
      title: "Discover, Share &",
      subtitle: "Celebrate",
      highlight: "Local Flavors",
      description:
        "Join a vibrant community of food enthusiasts exploring the best local restaurants, street food gems, and home-cooked delights.",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=700&fit=crop",
      bgImage:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&h=1080&fit=crop",
    },
    {
      id: 2,
      title: "Explore Hidden",
      subtitle: "Food Gems",
      highlight: "Near You",
      description:
        "Discover authentic street food, cozy cafes, and family-run restaurants that locals love. Share your favorite spots with the community.",
      image:
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=700&fit=crop",
      bgImage:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&h=1080&fit=crop",
    },
    {
      id: 3,
      title: "Share Your",
      subtitle: "Culinary",
      highlight: "Adventures",
      description:
        "Post reviews, upload photos, and connect with fellow food lovers. Your next favorite meal is just a post away!",
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=700&fit=crop",
      bgImage:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slideVariants = {
    enter: (direction) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({ x: direction < 0 ? 1000 : -1000, opacity: 0 }),
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.05, 0.01, 0.9],
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-[65vh] flex items-center relative overflow-hidden bg-background">
      <AnimatePresence>
        <motion.div
          key={currentSlide}
          className="absolute inset-0 bg-cover bg-center opacity-[0.05]"
          style={{ backgroundImage: `url(${slides[currentSlide].bgImage})` }}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.05 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 1.2 }}
        />
      </AnimatePresence>

      <div className="container mx-auto w-[90dvw] lg:py-12 relative z-10">
        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
              }}
              className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
            >
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <motion.h1
                  variants={itemVariants}
                  className="text-2xl lg:text-3xl font-bold leading-tight"
                >
                  <span className="block text-primary">
                    {slides[currentSlide].title}
                  </span>
                  <span className="block text-secondary">
                    {slides[currentSlide].subtitle}
                  </span>
                  <span className="block text-text">
                    {slides[currentSlide].highlight}
                  </span>
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="text-base text-neutral max-w-xl leading-relaxed"
                >
                  {slides[currentSlide].description}
                </motion.p>

                <motion.div
                  variants={itemVariants}
                  className="flex flex-wrap gap-3"
                >
                  <motion.div
                    className="px-4 py-2 rounded-md bg-background border border-neutral/20 shadow-sm flex items-center gap-2"
                    whileHover={{ y: -2 }}
                  >
                    <IoIosStarOutline size={20} className="text-secondary" />
                    <span className="font-semibold text-neutral text-sm">
                      Top Rated
                    </span>
                  </motion.div>

                  <motion.div
                    className="px-4 py-2 rounded-md bg-background border border-neutral/20 shadow-sm flex items-center gap-2"
                    whileHover={{ y: -2 }}
                  >
                    <MdFavoriteBorder className="text-primary" size={20} />
                    <span className="font-semibold text-neutral text-sm">
                      Favorites
                    </span>
                  </motion.div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to={`${user ? "/dashboard/add-review" : "/register"}`}
                    className="inline-block px-8 py-3 rounded-md bg-gradient-to-r from-primary to-secondary text-background font-bold shadow-lg transition-all"
                  >
                    {user ? "Share Your experience" : "Connect With Us"}
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative hidden lg:block"
              >
                <div className="relative rounded-md overflow-hidden shadow-2xl border-4 border-background">
                  <img
                    src={slides[currentSlide].image}
                    alt={slides[currentSlide].title}
                    className="w-full h-[450px] object-cover"
                  />
                  {/* Decorative Elements */}
                  <motion.div
                    className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-20 bg-primary blur-xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows - Using rounded-md for standardized look */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between pointer-events-none px-2 lg:-px-4">
            <motion.button
              onClick={prevSlide}
              className="pointer-events-auto w-10 h-10 rounded-md bg-background shadow-xl flex items-center justify-center text-primary border border-neutral/10"
              whileHover={{ scale: 1.1, bg: "#fff" }}
              whileTap={{ scale: 0.9 }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </motion.button>

            <motion.button
              onClick={nextSlide}
              className="pointer-events-auto w-10 h-10 rounded-md bg-background shadow-xl flex items-center justify-center text-primary border border-neutral/10"
              whileHover={{ scale: 1.1, bg: "#fff" }}
              whileTap={{ scale: 0.9 }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-3 mt-12">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className="h-2 rounded-md transition-all"
              initial={false}
              animate={{
                width: index === currentSlide ? 32 : 12,
                backgroundColor:
                  index === currentSlide
                    ? "var(--color-secondary, #f1c40f)"
                    : "var(--color-primary, #d35400)",
                opacity: index === currentSlide ? 1 : 0.4,
              }}
              style={{
                backgroundColor: index === currentSlide ? "#f1c40f" : "#d35400",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
