import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

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
      buttonText: "Join Now",
      buttonAction: "/register",
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
      buttonText: "Start Exploring",
      buttonAction: "/explore",
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
      buttonText: "Share Now",
      buttonAction: "/create",
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

  //   const handleButtonClick = (action) => {
  //
  //   };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 50 },
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -5 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  };

  const statsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const statItemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <div className="min-h-[85vh] flex items-center relative overflow-hidden bg-base-main">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="absolute inset-0 bg-cover bg-center opacity-[0.08]"
          style={{
            backgroundImage: `url(${slides[currentSlide].bgImage})`,
          }}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.08 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* --------------slide container------------- */}
      <div className="container mx-auto px-4 py-8 lg:py-12 relative z-10">
        <div className="relative">
          {/* -------------slides---------- */}
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
                className="space-y-4 lg:space-y-6"
              >
                <motion.h1
                  variants={itemVariants}
                  className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
                >
                  <motion.span
                    className="block text-color-primary"
                    variants={itemVariants}
                  >
                    {slides[currentSlide].title}
                  </motion.span>
                  <motion.span
                    className="block text-color-secondary"
                    variants={itemVariants}
                  >
                    {slides[currentSlide].subtitle}
                  </motion.span>
                  <motion.span
                    className="block text-gray-800"
                    variants={itemVariants}
                  >
                    {slides[currentSlide].highlight}
                  </motion.span>
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="text-base lg:text-lg text-gray-700 max-w-xl leading-relaxed"
                >
                  {slides[currentSlide].description}
                </motion.p>

                <motion.div
                  variants={itemVariants}
                  className="flex flex-wrap gap-3 pt-2"
                >
                  <motion.div
                    className="px-4 py-2 rounded-full bg-white shadow-md flex items-center gap-2"
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <span className="text-2xl">⭐</span>
                    <span className="font-semibold text-gray-700">
                      Top Rated Reviews
                    </span>
                  </motion.div>

                  <motion.div
                    className="px-4 py-2 rounded-full bg-white shadow-md flex items-center gap-2"
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <span className="text-2xl">🍽️</span>
                    <span className="font-semibold text-gray-700">
                      Local Favorites
                    </span>
                  </motion.div>

                  <motion.div
                    className="px-4 py-2 rounded-full bg-white shadow-md flex items-center gap-2"
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <span className="text-2xl">📸</span>
                    <span className="font-semibold text-gray-700">
                      Photo Verified
                    </span>
                  </motion.div>
                </motion.div>

                <motion.div
                  variants={statsVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-wrap gap-6 lg:gap-8 pt-4"
                >
                  <motion.div variants={statItemVariants}>
                    <motion.div className="text-2xl lg:text-3xl font-bold text-color-primary">
                      10K+
                    </motion.div>
                    <div className="text-gray-600 text-xs lg:text-sm">
                      Food Posts
                    </div>
                  </motion.div>
                  <motion.div variants={statItemVariants}>
                    <motion.div className="text-2xl lg:text-3xl font-bold text-color-secondary">
                      5K+
                    </motion.div>
                    <div className="text-gray-600 text-xs lg:text-sm">
                      Food Lovers
                    </div>
                  </motion.div>
                  <motion.div variants={statItemVariants}>
                    <motion.div className="text-2xl lg:text-3xl font-bold text-color-primary">
                      500+
                    </motion.div>
                    <div className="text-gray-600 text-xs lg:text-sm">
                      Local Spots
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.div
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                className="relative"
              >
                <motion.div
                  className="relative rounded-2xl overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.02, rotate: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <img
                    src={slides[currentSlide].image}
                    alt={slides[currentSlide].title}
                    className="w-full h-[350px] lg:h-[450px] object-cover"
                  />

                  <motion.div
                    className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-20 bg-linear-mix"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <motion.div
                    className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full opacity-20 bg-linear-mix"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [360, 180, 0],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <motion.button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center z-20 text-color-primary"
            whileHover={{
              scale: 1.1,
              boxShadow: "0 10px 20px rgba(211, 84, 0, 0.2)",
            }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
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
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center z-20 text-color-primary"
            whileHover={{
              scale: 1.1,
              boxShadow: "0 10px 20px rgba(211, 84, 0, 0.2)",
            }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
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

        <div className="flex justify-center gap-3 mt-8">
          {slides.map((uselessParameter, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full ${
                index === currentSlide ? "bg-linear-mix" : "color-primary"
              }`}
              style={{
                width: index === currentSlide ? "32px" : "12px",
                height: "12px",
                opacity: index === currentSlide ? 1 : 0.5,
              }}
              whileHover={{ opacity: 1, scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              animate={{
                width: index === currentSlide ? "32px" : "12px",
                opacity: index === currentSlide ? 1 : 0.5,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
