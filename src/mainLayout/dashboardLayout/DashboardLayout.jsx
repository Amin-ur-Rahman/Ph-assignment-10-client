import React, { useContext, useEffect, useRef, useState } from "react";
import logo from "../../assets/logo-2.png";
import { IoMdArrowBack } from "react-icons/io";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import Footer from "../../components/Footer";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { MdRateReview, MdFavorite } from "react-icons/md";
import { BiSolidAddToQueue } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";
import ThemeToggle from "../../contexts/ThemeToggle";
import { FiHome } from "react-icons/fi";
import AuthContext from "../../contexts/AuthContext";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  const navItems = [
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: <FiHome className="text-xl" />,
    },
    {
      to: "/dashboard/add-review",
      label: "Add Review",
      icon: <BiSolidAddToQueue className="text-xl" />,
    },
    {
      to: "/dashboard/my-reviews",
      label: "My Reviews",
      icon: <MdRateReview className="text-xl" />,
    },
    {
      to: "/dashboard/my-favorites",
      label: "My Favorite Reviews",
      icon: <MdFavorite className="text-xl" />,
    },
  ];

  const isActive = (path) => location.pathname === path;
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!user)
    return (
      <section className="py-20 px-4 bg-background">
        <div className="max-w-4xl mx-auto animate-pulse">
          <div className="h-12 bg-neutral/10 rounded-md w-3/4 mx-auto mb-8"></div>
          <div className="h-[400px] bg-neutral/5 rounded-md border border-neutral/10"></div>
        </div>
      </section>
    );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div
        id="dashboardHeading"
        className="py-3 bg-gradient-to-r from-primary to-secondary text-white sticky top-0 z-50 shadow-lg"
      >
        <div
          id="navbar"
          className="w-[90dvw] mx-auto flex justify-between items-center"
        >
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 hover:bg-white/20 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isSidebarOpen ? (
                <IoClose className="text-2xl" />
              ) : (
                <HiMenuAlt3 className="text-2xl" />
              )}
            </button>

            <button
              onClick={() => navigate(-1)}
              type="button"
              className="p-2 flex items-center gap-3 hover:cursor-pointer hover:scale-105 rounded-lg transition-all ease-linear duration-200 hover:font-semibold"
            >
              <IoMdArrowBack className="text-xl" />
              <span className="hidden sm:inline">Go back</span>
            </button>
          </div>

          <div className="flex items-center gap-8">
            <a href="/">
              <img
                src={logo}
                alt="foodLovers"
                className="lg:h-12 h-8 md:h-10 w-auto"
              />
            </a>
            <ThemeToggle />

            {/* Profile Dropdown */}
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
                        <RiArrowDropUpLine size={32} />
                      ) : (
                        <RiArrowDropDownLine size={32} />
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <FaUserCircle className="text-background text-4xl hover:text-background/80 transition-all duration-300 transform group-hover:scale-110" />
                    <div className="text-background">
                      {isDropdownOpen ? (
                        <RiArrowDropUpLine size={32} />
                      ) : (
                        <RiArrowDropDownLine size={32} />
                      )}
                    </div>
                  </div>
                )}
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-background rounded-lg shadow-xl border border-neutral/20 overflow-hidden z-50">
                  {/* User Info Section */}
                  <div className="px-4 py-4 bg-gradient-to-br from-primary/10 to-secondary/10 border-b border-neutral/20">
                    <div className="flex items-center space-x-3">
                      {user?.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt="User"
                          className="w-12 h-12 rounded-full border-2 border-primary object-cover shadow-md"
                        />
                      ) : (
                        <FaUserCircle className="text-primary text-5xl" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-text font-semibold text-sm truncate">
                          {user?.displayName || "Food Lover"}
                        </p>
                        <p className="text-text/70 text-xs truncate">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <Link
                      to="/my-profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-primary/10 transition-colors text-text"
                    >
                      <CgProfile className="text-xl text-primary" />
                      <span className="font-medium">My Profile</span>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-red-600"
                    >
                      <BiLogOut className="text-xl" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:block w-64 bg-background border-r border-neutral/20 sticky top-[72px] h-[calc(100vh-72px)] overflow-y-auto">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                  isActive(item.to)
                    ? "bg-primary/10 text-text shadow-md"
                    : "text-text hover:bg-primary/10 hover:translate-x-1"
                }`}
              >
                <span
                  className={`${
                    isActive(item.to)
                      ? "text-primary"
                      : "text-primary group-hover:text-primary"
                  }`}
                >
                  {item.icon}
                </span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Sidebar - mobile  */}
        <aside
          className={`lg:hidden fixed inset-y-0 left-0 z-40 w-64 bg-background shadow-2xl transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{ top: "72px" }}
        >
          <nav className="p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                  isActive(item.to)
                    ? "bg-primary text-white shadow-md"
                    : "text-text hover:bg-primary/10 hover:translate-x-1"
                }`}
              >
                <span
                  className={`${
                    isActive(item.to)
                      ? "text-white"
                      : "text-primary group-hover:text-primary"
                  }`}
                >
                  {item.icon}
                </span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Mobile Overlay Background */}
        {isSidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-30"
            style={{ top: "72px" }}
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 bg-background">
          <div className="min-h-[calc(100vh-72px)]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
