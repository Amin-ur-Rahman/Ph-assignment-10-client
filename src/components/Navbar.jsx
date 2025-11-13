import { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { MdRestaurant } from "react-icons/md";
import AuthContext from "../contexts/AuthContext";
import logo from "../assets/logo-2.png";

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
    <nav className="shadow-lg sticky top-0 z-50 bg-linear-mix lg:py-2">
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
                className="text-white hover:text-yellow-200 transition-colors duration-200 font-medium"
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
                    <img
                      src={user.photoURL}
                      alt="User"
                      className="w-10 h-10 rounded-full border-2 border-white hover:border-yellow-200 transition-all duration-300 object-cover transform group-hover:scale-110 group-hover:shadow-lg"
                    />
                  ) : (
                    <FaUserCircle className="text-white text-4xl hover:text-yellow-200 transition-all duration-300 transform group-hover:scale-110" />
                  )}
                </button>

                <div
                  className={`absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl overflow-hidden z-50 transition-all duration-300 origin-top-right ${
                    isDropdownOpen
                      ? "opacity-100 scale-100 visible"
                      : "opacity-0 scale-95 invisible"
                  }`}
                >
                  {/* User profile  ---------------------*/}
                  <div
                    className="px-4 py-4 transform transition-all duration-300"
                    style={{
                      background: "linear-gradient(135deg, #d35400, #f1c40f)",
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt="User"
                          className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-md"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md">
                          <FaUserCircle
                            className="text-4xl"
                            style={{ color: "#d35400" }}
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-sm truncate">
                          {user.displayName || "Food Lover"}
                        </p>
                        <p className="text-white/90 text-xs truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* profile menu----------------- */}
                  <div className="py-2">
                    <Link
                      to="/add-review"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-orange-50 transition-all duration-200 group transform hover:translate-x-1"
                    >
                      <span className="font-medium group-hover:text-orange-600 transition-colors duration-200">
                        Add Review
                      </span>
                    </Link>
                    <Link
                      to="/my-reviews"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-orange-50 transition-all duration-200 group transform hover:translate-x-1"
                    >
                      <span className="font-medium group-hover:text-orange-600 transition-colors duration-200">
                        My Reviews
                      </span>
                    </Link>
                    <Link
                      to="/my-favorites"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-orange-50 transition-all duration-200 group transform hover:translate-x-1"
                    >
                      <span className="font-medium group-hover:text-orange-600 transition-colors duration-200">
                        My Favorite Reviews
                      </span>
                    </Link>
                  </div>

                  <div className="border-t border-gray-200">
                    <button
                      onClick={async () => {
                        await logoutUser();
                        setIsDropdownOpen(false);
                        navigate("/");
                      }}
                      className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-all duration-200 font-medium transform hover:translate-x-1"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-white px-6 py-2 rounded-full font-semibold hover:bg-yellow-200 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                style={{ color: "#d35400" }}
              >
                Login
              </Link>
            )}
          </div>

          <button
            onClick={toggleMenu}
            className="md:hidden text-white text-2xl focus:outline-none"
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
                  className="text-white hover:text-yellow-200 transition-colors duration-200 font-medium py-2"
                >
                  {link.name}
                </Link>
              ))}

              {user ? (
                <>
                  <hr className="border-white/30" />

                  {/* Mobile User Profile----------------- */}
                  <div className="flex items-center space-x-3 py-2">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="User"
                        className="w-10 h-10 rounded-full border-2 border-white object-cover"
                      />
                    ) : (
                      <FaUserCircle className="text-white text-4xl" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-sm truncate">
                        {user.displayName || "Food Lover"}
                      </p>
                      <p className="text-white/90 text-xs truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <hr className="border-white/30" />

                  <Link
                    to="/add-review"
                    onClick={closeMenu}
                    className="text-white hover:text-yellow-200 transition-colors duration-200 font-medium py-2"
                  >
                    Add Review
                  </Link>
                  <Link
                    to="/my-reviews"
                    onClick={closeMenu}
                    className="text-white hover:text-yellow-200 transition-colors duration-200 font-medium py-2"
                  >
                    My Reviews
                  </Link>
                  <Link
                    to="/my-favorites"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center  py-3 text-white hover:bg-orange-50 transition-all duration-200 group transform hover:translate-x-1"
                  >
                    <span className="text-white hover:text-yellow-200 transition-colors duration-200 font-medium py-2">
                      My Favorite Reviews
                    </span>
                  </Link>
                  <button
                    onClick={async () => {
                      await logoutUser();
                      closeMenu();
                      navigate("/");
                    }}
                    className="text-left text-white hover:text-red-200 transition-colors duration-200 font-medium py-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="bg-white px-6 py-2 rounded-full font-semibold hover:bg-yellow-200 transition-all duration-200 shadow-md text-center"
                  style={{ color: "#d35400" }}
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
