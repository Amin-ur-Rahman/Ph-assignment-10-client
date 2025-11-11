import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdRestaurant } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const { loginUser, googleSignUp } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const handleLogin = async (data) => {
    const { email, password } = data;

    const res = await loginUser(email, password);

    if (res.success === true) {
      navigate(`${location.state ? location.state : "/"}`);
      console.log("user logged in", res.user);

      reset();
    } else {
      console.log("login failed!", res.errorMessage);
      toast.error("Login failed! please try again ");
      setError(res.errorMessage.includes("auth/invalid-credential"));
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "#fff8f0" }}
    >
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div
              className="p-4 rounded-full"
              style={{
                background: "linear-gradient(to right, #d35400, #f1c40f)",
              }}
            >
              <MdRestaurant className="text-5xl text-white" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600">
            Log in to continue sharing your food experiences
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  {...register("email", { required: "Email is required" })}
                  required
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none transition-colors"
                  style={{ borderColor: "rgba(211, 84, 0, 0.3)" }}
                  onFocus={(e) => (e.target.style.borderColor = "#d35400")}
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(211, 84, 0, 0.3)")
                  }
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  {...register("password", {
                    required: "Password is required!",
                    minLength: {
                      value: 6,
                      message: "Password should contain at least 6 characters",
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  className="w-full pl-11 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:outline-none transition-colors"
                  style={{ borderColor: "rgba(211, 84, 0, 0.3)" }}
                  onFocus={(e) => (e.target.style.borderColor = "#d35400")}
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(211, 84, 0, 0.3)")
                  }
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  style={{ color: "#d35400" }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="">
              {error && (
                <p className="text-red-500 font-semibold my-5">
                  Invalid Email or Password!
                </p>
              )}

              <Link
                to="/forgot-password"
                className="text-sm font-semibold hover:underline"
                style={{ color: "#d35400" }}
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(to right, #d35400, #f1c40f)",
              }}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold hover:underline"
                style={{ color: "#d35400" }}
              >
                Register here
              </Link>
            </p>
          </div>

          {/* Divider */}
          <div className="mt-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Google Button */}
          <div className="mt-6">
            <button
              onClick={async () => {
                const res = await googleSignUp();

                if (res.success) {
                  console.log("login with google successful", res.user);
                  navigate(`${location.state ? location.state : "/"}`);
                } else {
                  console.log("google login error", res.errorMessage);
                }
              }}
              type="button"
              className="w-full bg-white border-2 text-gray-700 font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2"
              style={{ borderColor: "#d35400" }}
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Continue with Google
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-6 text-center text-sm text-gray-500">
          By logging in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
