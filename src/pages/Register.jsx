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

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const { createUser, updateUserInfo, googleSignUp } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  //   console.log(location);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const handleRegister = async (data) => {
    const { email, password, name, url } = data;

    const res = await createUser(email, password);
    await updateUserInfo(name, url);

    if (res.success === true) {
      navigate(`${location.state ? location.state : "/"}`);
      console.log("user created", res.user);
      reset();
    } else {
      console.log("signup failed!", res.errorMessage);
      //   console.log(res.errorMessage.includes("auth/email-already-in-use"));
      setError(res.errorMessage.includes("auth/email-already-in-use"));
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
              className="p-4 rounded-full bg-linear-to-r from-[#d35400] to-[#f1c40f]"
              //   style={{
              //     background: "linear-gradient(to right, #d35400, #f1c40f)",
              //   }}
            >
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
                  //   required
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
                  placeholder="Enter your photo URL"
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
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  {...register("password", {
                    required: "password is required!",
                    minLength: {
                      value: 6,
                      message: "Password should contain at least 6 characters",
                    },
                    validate: {
                      hasUpperCase: (value) =>
                        /[A-Z]/.test(value) ||
                        "Password must contain at least one uppercase letter",
                      hasLowerCase: (value) =>
                        /[a-z]/.test(value) ||
                        "Password must contain at least one lowercase letter",
                      hasNumber: (value) =>
                        /[0-9]/.test(value) ||
                        "Password must contain at least one number",
                      hasSpecialChar: (value) =>
                        /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                        "Password must contain at least one special character (!@#$%^&*)",
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

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 -translate-y-1/2 right-0 pr-4 flex items-center"
                  style={{ color: "#d35400" }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
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
