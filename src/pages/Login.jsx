import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
} from "react-icons/fa";
import { MdRestaurant } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { toast, Zoom } from "react-toastify";

export default function Login() {
  useEffect(() => {
    document.title = "LOGIN";
  }, []);

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
    setValue,
  } = useForm();

  const handleLogin = async (data) => {
    const { email, password } = data;
    const res = await loginUser(email, password);

    if (res.success === true) {
      toast.success("Login Successful!", {
        transition: Zoom,
        hideProgressBar: true,
        closeOnClick: true,
        autoClose: 2500,
        icon: <FaCheckCircle color="#d35400" size={20} />,
        style: {
          background: "#fff8f0",
          color: "#d35400",
        },
        position: "bottom-right",
      });
      navigate(`${location.state ? location.state : "/"}`);
      reset();
    } else {
      toast.error("Login Error!", {
        transition: Zoom,
        hideProgressBar: true,
        closeOnClick: true,
        autoClose: 2500,
        style: {
          background: "#fff8f0",
          color: "#d35400",
        },
        position: "bottom-right",
      });
      setError(res.errorMessage.includes("auth/invalid-credential"));
    }
  };

  const fillDemoAccount = (email, password) => {
    setValue("email", email, { shouldValidate: true });
    setValue("password", password, { shouldValidate: true });
    setError(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-background">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-md bg-gradient-to-r from-primary to-secondary">
              <MdRestaurant className="text-4xl text-background" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-text mb-2">Welcome Back</h2>
          <p className="text-base text-neutral">
            Log in to continue sharing your food experiences
          </p>
        </div>

        <div className="bg-background rounded-md shadow-lg p-8 border border-neutral/10">
          <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
            {/* Email */}
            <div>
              <label className="block text-sm text-text mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaEnvelope className="text-neutral/40" />
                </div>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="w-full pl-11 pr-4 py-3 bg-neutral/5 border border-neutral/20 rounded-md focus:outline-none focus:border-primary text-base transition-colors"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="text-primary text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-text mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className="text-neutral/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required!",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters",
                    },
                  })}
                  className="w-full pl-11 pr-12 py-3 bg-neutral/5 border border-neutral/20 rounded-md focus:outline-none focus:border-primary text-base transition-colors"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-neutral/40 hover:text-secondary"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-primary text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              {error && (
                <p className="text-primary text-sm">
                  Invalid Email or Password!
                </p>
              )}
              <Link
                to="/forgot-password"
                className="text-sm text-primary hover:underline inline-block"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-primary to-secondary text-background py-3 rounded-md font-semibold shadow hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-neutral">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary hover:underline">
                Register here
              </Link>
            </p>
          </div>

          <div className="mt-6 flex items-center">
            <div className="flex-1 border-t border-neutral/10"></div>
            <span className="px-4 text-xs text-neutral/40">OR</span>
            <div className="flex-1 border-t border-neutral/10"></div>
          </div>

          <div className="mt-6">
            <button
              onClick={async () => {
                const res = await googleSignUp();
                if (res.success) {
                  navigate(`${location.state ? location.state : "/"}`);
                }
              }}
              type="button"
              className="w-full bg-background border border-neutral/20 text-text py-3 rounded-md hover:bg-neutral/5 transition-colors flex items-center justify-center gap-2"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="w-4 h-4"
              />
              Continue with Google
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-neutral/40">
          By logging in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>

      <div>
        <div className="hidden lg:flex items-center">
          <div className="mx-20 w-64">
            <div className="border border-amber-500/60 bg-amber-50/40 rounded-md p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-amber-700 mb-3">
                Demo Accounts
              </h3>

              <div
                onClick={() =>
                  fillDemoAccount("kentaro@kamado.com", "ABcd1234@")
                }
                className="group flex items-center justify-between p-3 rounded-md border border-amber-200 bg-background cursor-pointer transition-all hover:bg-amber-50 hover:border-amber-400"
              >
                <div>
                  <p className="text-sm font-medium text-text">User Account</p>
                  <p className="text-xs text-neutral/60">kentaro@kamado.com</p>
                </div>

                <span className="text-xs text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to fill
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
