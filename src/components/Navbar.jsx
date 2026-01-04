import { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";

import AuthContext from "../contexts/AuthContext";
import logo from "../assets/logo-2.png";

import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import ThemeToggle from "../contexts/ThemeToggle";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const { user, logoutUser, loading } = useContext(AuthContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Reviews", path: "/all-reviews" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav className=" bg-gradient-to-r from-primary to-secondary lg:py-2">
      <div className="w-[90dvw] mx-auto ">
        <div className="flex justify-between items-center h-16">
          <Link to="/">
            {/* -------------------------------------------logo--------------- */}
            <img src={logo} className="lg:h-15 h-10 md:h-12 w-auto " alt="" />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-background hover:text-background/80 transition-colors duration-200 font-medium"
              >
                {link.name}
              </Link>
            ))}

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none group"
                >
                  {user.photoURL ? (
                    <div className="flex items-center gap-1">
                      <img
                        src={user.photoURL}
                        alt="User"
                        className="w-10 h-10 rounded-full border-2 border-background hover:border-background/80 transition-all duration-300 object-cover transform group-hover:scale-110 group-hover:shadow-lg"
                      />
                      <div className="text-background">
                        {isDropdownOpen ? (
                          <RiArrowDropUpLine size={32}></RiArrowDropUpLine>
                        ) : (
                          <RiArrowDropDownLine size={32}></RiArrowDropDownLine>
                        )}
                      </div>
                    </div>
                  ) : (
                    <FaUserCircle className="text-background text-4xl hover:text-background/80 transition-all duration-300 transform group-hover:scale-110" />
                  )}
                </button>

                <div
                  className={`absolute right-0 mt-2 w-64 bg-background rounded-xl shadow-2xl overflow-hidden z-50 transition-all duration-300 origin-top-right ${
                    isDropdownOpen
                      ? "opacity-100 scale-100 visible"
                      : "opacity-0 scale-95 invisible"
                  }`}
                >
                  {/* User profile  ---------------------*/}
                  <div className="px-4 py-4 transform transition-all duration-300 bg-gradient-to-br from-primary to-secondary">
                    <div className="flex items-center space-x-3">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt="User"
                          className="w-12 h-12 rounded-full border-2 border-background object-cover shadow-md"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center shadow-md">
                          <FaUserCircle className="text-4xl text-primary" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-background font-semibold text-sm truncate">
                          {user.displayName || "Food Lover"}
                        </p>
                        <p className="text-background/90 text-xs truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* profile menu----------------- */}
                  <div className="py-2 bg-background">
                    <Link
                      to="/dashboard"
                      onClick={closeMenu}
                      className="w-full text-left px-4 py-3 text-text hover:bg-primary/5 transition-all duration-200 font-medium transform hover:translate-x-1"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/my-profile"
                      onClick={closeMenu}
                      className="w-full text-left px-4 py-3 text-text hover:bg-primary/5 transition-all duration-200 font-medium transform hover:translate-x-1"
                    >
                      My Profile
                    </Link>
                  </div>

                  <div className="border-t border-text/10 bg-background">
                    <button
                      onClick={async () => {
                        await logoutUser();
                        setIsDropdownOpen(false);
                        navigate("/");
                      }}
                      className="w-full text-left px-4 py-3 text-primary hover:bg-primary/5 transition-all duration-200 font-medium transform hover:translate-x-1"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-background px-6 py-2 rounded-full font-semibold hover:opacity-90 text-primary transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Login
              </Link>
            )}
            <ThemeToggle></ThemeToggle>
          </div>

          <button
            onClick={toggleMenu}
            className="md:hidden text-background text-2xl focus:outline-none"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4 animate-slideDown">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={closeMenu}
                  className="text-background hover:text-background/80 transition-colors duration-200 font-medium py-2"
                >
                  {link.name}
                </Link>
              ))}

              {user ? (
                <>
                  <hr className="border-background/30" />

                  {/* Mobile User Profile----------------- */}
                  <div className="flex items-center space-x-3 py-2">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="User"
                        className="w-10 h-10 rounded-full border-2 border-background object-cover"
                      />
                    ) : (
                      <FaUserCircle className="text-background text-4xl" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-background font-semibold text-sm truncate">
                        {user.displayName || "Food Lover"}
                      </p>
                      <p className="text-background/90 text-xs truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <hr className="border-background/30" />

                  <Link
                    to="/dashboard"
                    onClick={closeMenu}
                    className="text-background hover:text-background/80 transition-colors duration-200 font-medium py-2"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/my-profile"
                    onClick={closeMenu}
                    className="w-full text-background text-left px-4 py-3   hover:bg-primary/5 transition-all duration-200 font-medium transform hover:translate-x-1"
                  >
                    My Profile
                  </Link>

                  <ThemeToggle>Toggle Dark / Light mode</ThemeToggle>
                  <button
                    onClick={async () => {
                      await logoutUser();
                      closeMenu();
                      navigate("/");
                    }}
                    className="text-left text-background hover:opacity-80 transition-colors duration-200 font-medium py-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="bg-background px-6 py-2 rounded-full font-semibold hover:opacity-90 text-primary transition-all duration-200 shadow-md text-center"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
