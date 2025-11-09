import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { MdRestaurant } from "react-icons/md";
import AuthContext from "../contexts/AuthContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const { user, logoutUser, loading } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Reviews", path: "/reviews" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav className="bg-linear-mix shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="flex items-center space-x-2 text-white font-bold text-xl"
          >
            <MdRestaurant className="text-3xl" />
            <span className="hidden sm:block">Local Food Lovers</span>
            <span className="sm:hidden">Food Lovers</span>
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
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="User"
                      className="w-10 h-10 rounded-full border-2 border-white hover:border-yellow-200 transition-colors duration-200"
                    />
                  ) : (
                    <FaUserCircle className="text-white text-4xl hover:text-yellow-200 transition-colors duration-200" />
                  )}
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
                    <Link
                      to="/add-review"
                      onClick={() => setIsDropdownOpen(false)}
                      className="block px-4 py-2 text-gray-800 hover:bg-orange-100 transition-colors duration-200"
                    >
                      Add Review
                    </Link>
                    <Link
                      to="/my-reviews"
                      onClick={() => setIsDropdownOpen(false)}
                      className="block px-4 py-2 text-gray-800 hover:bg-orange-100 transition-colors duration-200"
                    >
                      My Reviews
                    </Link>
                    <hr className="my-2" />
                    <button
                      onClick={async () => {
                        await logoutUser();
                        navigate("/");
                      }}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-white text-orange-500 px-6 py-2 rounded-full font-semibold hover:bg-yellow-200 hover:text-orange-600 transition-all duration-200 shadow-md"
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
          <div className="md:hidden pb-4">
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
                    className="text-white hover:text-yellow-200 transition-colors duration-200 font-semibold py-2"
                  >
                    My Reviews
                  </Link>
                  <button
                    onClick={async () => {
                      await logoutUser();
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
                  className="bg-white text-orange-500 px-6 py-2 rounded-full font-semibold hover:bg-yellow-200 hover:text-orange-600 transition-all duration-200 shadow-md text-center"
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
