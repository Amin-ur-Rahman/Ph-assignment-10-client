import React, { useEffect } from "react";
import { FaUtensils, FaHeart, FaUsers, FaMapMarkerAlt } from "react-icons/fa";
import { MdRestaurant, MdRateReview, MdStar } from "react-icons/md";

const About = () => {
  useEffect(() => {
    document.title = "ABOUT - local food lovers";
  }, []);
  return (
    <div className="min-h-screen bg-base-main">
      <section className="relative py-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="p-5 bg-linear-mix rounded-full shadow-xl">
              <FaUtensils className="text-6xl text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-color-primary mb-6">
            About Local Food Lovers Network
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            A passionate community connecting food enthusiasts who love
            exploring local restaurants, street food, and home-cooked meals.
          </p>
        </div>
      </section>

      {/* Our Story section----------- */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="h-3 bg-linear-mix"></div>

            <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
              {/* text block---------- */}
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl font-bold text-color-primary mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Local Food Lovers Network was born from a simple idea: great
                    food deserves to be shared. We believe that every meal tells
                    a story, and every restaurant has something unique to offer.
                  </p>
                  <p>
                    Our platform brings together food enthusiasts from all walks
                    of life to discover, review, and celebrate the incredible
                    culinary diversity in our local communities.
                  </p>
                  <p>
                    Whether it's a hidden gem serving authentic street food or a
                    cozy café with the perfect ambiance, we're here to help you
                    find your next favorite meal.
                  </p>
                </div>
              </div>

              {/* img block----------- */}
              <div className="flex items-center justify-center">
                <div className="relative rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300">
                  <img
                    src="https://i.ibb.co.com/Nd4yHptk/8159cc1bb0ddd8808dbd1a1becaa4bbd.jpg"
                    alt="Food lovers sharing a meal"
                    className="w-[590px] h-[395px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* -------------our mission---------------- */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-primary hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full">
                <MdRateReview className="text-4xl text-color-primary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-color-primary">
                Our Mission
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              To create an authentic, community-driven platform where food
              lovers can share honest reviews, discover amazing local eateries,
              and connect over their shared passion for great food. We celebrate
              local flavor and support small businesses by amplifying real
              voices and genuine experiences.
            </p>
          </div>

          {/* ---------our vision--------------- */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-secondary hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full">
                <MdStar className="text-4xl text-secondary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-color-primary">
                Our Vision
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              To become the most trusted food discovery platform that empowers
              communities to explore and celebrate their local culinary scenes.
              We envision a world where every great meal gets the recognition it
              deserves and every food lover finds their perfect dining
              experience.
            </p>
          </div>
        </div>
      </section>

      {/* ------------feature we provide-------------------- 3 */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-color-primary mb-4">
              What We Offer
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Everything you need to discover and share amazing food experiences
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* ------------feature--------1 */}
            <div className="text-center p-6 rounded-2xl hover:bg-gradient-to-br hover:from-orange-50 hover:to-yellow-50 transition-all duration-300 group">
              <div className="inline-block p-4 bg-linear-mix rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                <FaHeart className="text-4xl text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">
                Honest Reviews
              </h4>
              <p className="text-gray-600">
                Share and read authentic reviews from real food lovers, not
                corporate promotions. Every opinion matters.
              </p>
            </div>

            {/* ---------feature2 -------------- */}
            <div className="text-center p-6 rounded-2xl hover:bg-gradient-to-br hover:from-orange-50 hover:to-yellow-50 transition-all duration-300 group">
              <div className="inline-block p-4 bg-linear-mix rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                <MdRestaurant className="text-4xl text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">
                Local Discoveries
              </h4>
              <p className="text-gray-600">
                Find hidden gems and popular spots in your neighborhood. Support
                local businesses and explore new flavors.
              </p>
            </div>

            {/* ---------feature 3------ */}
            <div className="text-center p-6 rounded-2xl hover:bg-gradient-to-br hover:from-orange-50 hover:to-yellow-50 transition-all duration-300 group">
              <div className="inline-block p-4 bg-linear-mix rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                <FaUsers className="text-4xl text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">
                Community Connection
              </h4>
              <p className="text-gray-600">
                Connect with fellow food enthusiasts, share experiences, and
                build a network of trusted recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --------------community values-------------- */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="h-3 bg-linear-mix"></div>

            <div className="p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-color-primary mb-8 text-center">
                Our Community Values
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex gap-4 p-4 rounded-xl hover:bg-orange-50 transition-colors duration-300">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white text-xl font-bold">1</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">
                      Authenticity
                    </h4>
                    <p className="text-gray-600 text-sm">
                      We value honest opinions and genuine experiences over paid
                      promotions and fake reviews.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl hover:bg-orange-50 transition-colors duration-300">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white text-xl font-bold">2</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">Respect</h4>
                    <p className="text-gray-600 text-sm">
                      We treat restaurants, reviewers, and readers with respect,
                      fostering constructive feedback.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl hover:bg-orange-50 transition-colors duration-300">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white text-xl font-bold">3</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">Diversity</h4>
                    <p className="text-gray-600 text-sm">
                      We celebrate all types of food - from street vendors to
                      fine dining, every cuisine has a place here.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl hover:bg-orange-50 transition-colors duration-300">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white text-xl font-bold">4</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">
                      Community First
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Our platform exists to serve food lovers, not advertisers.
                      Your experience is our priority.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------newsletter section-------------- */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-3xl p-8 md:p-12 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-color-primary mb-4">
              Ready to Join Our Community?
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Start sharing your favorite food experiences and discover amazing
              meals recommended by fellow food lovers in your area!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/register"
                className="bg-linear-mix text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Get Started
              </a>
              <a
                href="/reviews"
                className="bg-white text-color-primary border-2 border-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-primary hover:text-white shadow-md hover:shadow-lg transition-all duration-300"
              >
                Explore Reviews
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
