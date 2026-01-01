import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaUtensils,
  FaYoutubeSquare,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdMail, MdMap, MdPhone } from "react-icons/md";
import logo from "../assets/logo-2.png";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t-4 border-[#d35400]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4 bg-linear-mix px-4 py-6 rounded-2xl">
            <div className="flex items-center gap-2">
              <div>
                <Link to="/">
                  {/* -------------------------------------------logo--------------- */}
                  <img
                    src={logo}
                    className="lg:h-15 h-10 md:h-12 w-auto "
                    alt=""
                  />
                </Link>
                <p className="text-xs text-white">Network</p>
              </div>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Connecting food enthusiasts and celebrating local flavors. Share
              your culinary adventures and discover amazing food experiences.
            </p>

            <div className="flex gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{
                  background: "linear-gradient(to right, #d35400, #f1c40f)",
                }}
              >
                <FaFacebook className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 bg-linear-mix"
              >
                <FaXTwitter className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 bg-linear-mix"
              >
                <FaInstagram className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 bg-linear-mix"
              >
                <FaYoutubeSquare className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4" style={{ color: "#d35400" }}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full color-secondary" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/all-reviews"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full color-secondary" />
                  All Reviews
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4" style={{ color: "#d35400" }}>
              Account
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full color-secondary" />
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full color-secondary" />
                  Register
                </Link>
              </li>
              <li>
                <button className="text-gray-600 hover:text-gray-900 transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full color-secondary" />
                  Privacy Policy
                </button>
              </li>
              <li>
                <button className="text-gray-600 hover:text-gray-900 transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full color-secondary" />
                  Terms of Service
                </button>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full color-secondary" />
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-color-primary">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-600">
                <MdMap className="w-5 h-5 flex-shrink-0 mt-0.5 text-color-primary" />
                <span className="text-sm">
                  123 Food Street, Culinary District, Disney Land
                </span>
              </li>
              <li className="flex items-center gap-3 text-gray-600 text-color-primary">
                <MdPhone className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">+1 666 0616</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600 text-color-primary">
                <MdMail className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">hello@localfoodlovers.com</span>
              </li>
            </ul>

            <div className="mt-6">
              <h5 className="font-semibold text-gray-800 mb-2">Stay Updated</h5>
              <p className="text-xs text-gray-600 mb-3">
                Get the latest food reviews in your inbox
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                />
                <button
                  onClick={() => console.log("Subscribe clicked")}
                  className="px-4 py-2 text-white text-sm font-semibold rounded-lg transition-all duration-300 hover:shadow-lg"
                  style={{
                    background: "linear-gradient(to right, #d35400, #f1c40f)",
                  }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm text-center md:text-left">
              © {currentYear} Local Food Lovers Network. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <button className="hover:text-gray-900 transition-colors">
                Cookie Policy
              </button>
              <span>|</span>
              <button className="hover:text-gray-900 transition-colors">
                Sitemap
              </button>
              <span>|</span>
              <button className="hover:text-gray-900 transition-colors">
                Help Center
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
