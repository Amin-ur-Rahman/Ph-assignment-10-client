import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaImage,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { MdRestaurant } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { toast } from "react-toastify";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [passError, setPassError] = useState("");
  const { createUser, updateUserInfo, googleSignUp } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  //   console.log(location);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm();

  // const pwd = watch("password", "");
  const handleRegister = async (data) => {
    const { email, password, name, url, matching_password } = data;

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const isMinLength = password.length >= 6;

    setPassError("");

    if (!isMinLength) {
      setPassError("Password must contain at least 6 characters!");
      toast.error("❌ Invalid password! Must be 6 characters!", {});
      return;
    }
    if (!hasUpperCase) {
      setPassError("Password must contain one uppercase letter!");
      toast.error("❌ Invalid password! Include uppercase letter!", {});
      return;
    }
    if (!hasLowerCase) {
      setPassError("Password must contain one lowercase letter!");
      toast.error("❌ Invalid password! Include lowercase letter!", {});
      return;
    }
    if (!hasNumber) {
      setPassError("Password must contain a number!");
      toast.error("❌ Invalid password! Include a number!", {});
      return;
    }

    if (password !== matching_password) {
      setPassError("passwords do not match");
      toast.error("passwords do not match!");
      return;
    }

    toast.success("✅ Password is valid!", {});

    const res = await createUser(email, password);
    await updateUserInfo(name, url);

    if (res.success === true) {
      navigate(`${location.state ? location.state : "/"}`);
      reset();
    } else {
      setError(res.errorMessage.includes("auth/email-already-in-use"));
      toast.error(res.errorMessage || "Signup failed!");
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
            <div className="p-4 rounded-full bg-linear-to-r from-[#d35400] to-[#f1c40f]">
              <MdRestaurant className="text-5xl text-white" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Join Our Community
          </h2>
          <p className="text-gray-600">
            Share your love for local food with others
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form className="space-y-6" onSubmit={handleSubmit(handleRegister)}>
            {/* Name  */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  {...register("name")}
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-opacity-100 transition-colors"
                  style={{ borderColor: "#d35400", borderOpacity: 0.3 }}
                  onFocus={(e) => (e.target.style.borderColor = "#d35400")}
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(211, 84, 0, 0.3)")
                  }
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Photo URL  */}
            <div>
              <label
                htmlFor="photoURL"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Photo URL
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaImage className="text-gray-400" />
                </div>
                <input
                  {...register("url")}
                  type="url"
                  id="photoURL"
                  name="url"
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none transition-colors"
                  style={{ borderColor: "rgba(211, 84, 0, 0.3)" }}
                  onFocus={(e) => (e.target.style.borderColor = "#d35400")}
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(211, 84, 0, 0.3)")
                  }
                  placeholder="Enter your photo URL (optional)"
                />
              </div>
            </div>

            {/* Email  */}
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
            </div>

            {/* Password  */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Password
              </label>
              {/* password 1 */}
              <div className="relative my-5">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  {...register("password", {
                    required: "password is required!",
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

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 -translate-y-1/2 right-0 pr-4 flex items-center"
                  style={{ color: "#d35400" }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  {...register("matching_password", {
                    required: "password is required!",
                  })}
                  type={showPassword ? "text" : "password"}
                  id="matching_password"
                  name="matching_password"
                  required
                  className="w-full pl-11 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:outline-none transition-colors"
                  style={{ borderColor: "rgba(211, 84, 0, 0.3)" }}
                  onFocus={(e) => (e.target.style.borderColor = "#d35400")}
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(211, 84, 0, 0.3)")
                  }
                  placeholder="Re-enter your password"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 -translate-y-1/2 right-0 pr-4 flex items-center"
                  style={{ color: "#d35400" }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {passError && (
                <p className="text-red-500 text-sm mt-1">{passError}</p>
              )}
              {/* {errors.matching_password && (
                <p>{errors.matching_password.message}</p>
              )} */}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(to right, #d35400, #f1c40f)",
              }}
            >
              {isSubmitting ? "Processing..." : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold hover:underline"
                style={{ color: "#d35400" }}
              >
                Login here
              </Link>
            </p>
            <p className="text-red-500 my-5 font-semibold">
              {error &&
                "This email is already registered, please login your account"}
            </p>
          </div>

          <div className="mt-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* google button */}
          <div className="mt-6">
            <button
              onClick={async () => {
                const res = await googleSignUp();

                if (res.success) {
                  console.log("signup with google successful", res.user);
                  navigate(`${location.state ? location.state : "/"}`);
                } else {
                  console.log("google signup error", res.errorMessage);
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
          By creating an account, you agree to our Terms of Service and Privacy
          Policy
        </p>
      </div>
    </div>
  );
}
