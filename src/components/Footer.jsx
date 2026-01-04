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
    <footer className="bg-background border-t-4 border-primary">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section - Using Primary Background for contrast */}
          <div className="space-y-4 bg-primary px-4 py-6 rounded-md">
            <div className="flex items-center gap-2">
              <div>
                <Link to="/">
                  <img
                    src={logo}
                    className="lg:h-15 h-10 md:h-12 w-auto"
                    alt="Logo"
                  />
                </Link>
                <p className="text-xs text-background">Network</p>
              </div>
            </div>
            <p className="text-background text-sm leading-relaxed">
              Connecting food enthusiasts and celebrating local flavors. Share
              your culinary adventures and discover amazing food experiences.
            </p>

            <div className="flex gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 bg-gradient-to-r from-primary to-secondary shadow-md"
              >
                <FaFacebook className="w-5 h-5 text-background" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 bg-secondary"
              >
                <FaXTwitter className="w-5 h-5 text-background" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 bg-secondary"
              >
                <FaInstagram className="w-5 h-5 text-background" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 bg-secondary"
              >
                <FaYoutubeSquare className="w-5 h-5 text-background" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg md:text-xl font-bold mb-4 text-primary">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-neutral hover:text-text transition-colors duration-200 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/all-reviews"
                  className="text-neutral hover:text-text transition-colors duration-200 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  All Reviews
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg md:text-xl font-bold mb-4 text-primary">
              Account
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Login", to: "/login" },
                { label: "Register", to: "/register" },
                { label: "Privacy Policy", to: "/privacy-policy" },
                { label: "Terms of Service", to: "/terms-of-service" },
                { label: "About Us", to: "/about" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-neutral hover:text-text transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg md:text-xl font-bold mb-4 text-primary">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-neutral">
                <MdMap className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary" />
                <span className="text-sm">
                  123 Food Street, Culinary District, Disney Land
                </span>
              </li>
              <li className="flex items-center gap-3 text-neutral">
                <MdPhone className="w-5 h-5 flex-shrink-0 text-primary" />
                <span className="text-sm">+1 666 0616</span>
              </li>
              <li className="flex items-center gap-3 text-neutral">
                <MdMail className="w-5 h-5 flex-shrink-0 text-primary" />
                <span className="text-sm">hello@localfoodlovers.com</span>
              </li>
            </ul>

            {/* <div className="mt-6">
              <h5 className="font-semibold text-text mb-2">Stay Updated</h5>
              <p className="text-xs text-neutral mb-3">
                Get the latest food reviews in your inbox
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 text-sm border border-neutral/30 rounded-md focus:outline-none focus:border-primary bg-background text-text"
                />
                <button
                  onClick={() => console.log("Subscribe clicked")}
                  className="px-4 py-2 text-background text-sm font-semibold rounded-md transition-all duration-300 hover:shadow-lg bg-gradient-to-r from-primary to-secondary"
                >
                  Subscribe
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <div className="border-t border-neutral/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral text-sm text-center md:text-left">
              © {currentYear} Local Food Lovers Network. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-neutral">
              <button className="hover:text-text transition-colors">
                Cookie Policy
              </button>
              <span className="text-neutral/30">|</span>
              <button className="hover:text-text transition-colors">
                Sitemap
              </button>
              <span className="text-neutral/30">|</span>
              <button className="hover:text-text transition-colors">
                Help Center
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
