import React from "react";
import { Home, Search } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-base-main">
      <div className="max-w-4xl w-full text-center">
        <div className="mb-8 space-y-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
            Oops! This Page Went on a Food Break
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Looks like this page is as hard to find as a secret family recipe!
            The food you're looking for might have been eaten, moved, or never
            existed.
          </p>
        </div>
        <div className="mb-8 flex justify-center">
          <img
            src="https://i.ibb.co.com/mrHRjRzP/make-me-an-404-error-image-for-my-food-review-website-it-should-look-funny-and-give-a-foody-vibe.jpg"
            alt="Lost food"
            className="rounded-3xl shadow-2xl w-full max-w-2xl"
          />
        </div>

        <div className="mb-10 max-w-xl mx-auto">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-color-primary">
              What You Can Do:
            </h3>
            <ul className="space-y-2 text-left text-gray-700">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full color-secondary mt-2" />
                <span>Check if the URL is spelled correctly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full color-secondary mt-2" />
                <span>Go back to the home page and start fresh</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full color-secondary mt-2" />
                <span>Explore our delicious food reviews instead</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-center">
          <NavLink
            to="/"
            className="flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 bg-linear-mix"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </NavLink>
        </div>

        <div className="mt-12">
          <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
            <Search className="w-4 h-4" />
            <span>Don't worry, the best dishes are still waiting for you!</span>
          </p>
        </div>
      </div>
    </div>
  );
}
