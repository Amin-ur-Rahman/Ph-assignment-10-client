import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlinePhotograph,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi"; // Switched to Heroicons Outline
import { MdOutlineRestaurant } from "react-icons/md"; // Switched to MD Outline
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { axiosInstance } from "../contexts/axiosInstance";
import axios from "axios";

export default function Register() {
  useEffect(() => {
    document.title = "REGISTER NEW ACCOUNT";
  }, []);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [passError, setPassError] = useState("");
  const { createUser, updateUserInfo, googleSignUp } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const cloudName = import.meta.env.VITE_cloudinary_cloud;
  const preset = import.meta.env.VITE_preset;

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm();

  const handleRegister = async (data) => {
    const { email, password, name, matching_password } = data;

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const isMinLength = password.length >= 6;

    setPassError("");

    if (!isMinLength) {
      setPassError("Password must contain at least 6 characters!");
      toast.error(" Invalid password! Must be 6 characters!", {});
      return;
    }
    if (!hasUpperCase) {
      setPassError("Password must contain one uppercase letter!");
      toast.error(" Invalid password! Include uppercase letter!", {});
      return;
    }
    if (!hasLowerCase) {
      setPassError("Password must contain one lowercase letter!");
      toast.error(" Invalid password! Include lowercase letter!", {});
      return;
    }
    if (!hasNumber) {
      setPassError("Password must contain a number!");
      toast.error(" Invalid password! Include a number!", {});
      return;
    }

    if (password !== matching_password) {
      setPassError("passwords do not match");
      toast.error("passwords do not match!");
      return;
    }

    toast.success(" Password is valid!", {});

    const res = await createUser(email, password);

    const formData = new FormData();
    formData.append("file", data.photo[0]);
    formData.append("upload_preset", preset);

    const uploadRes = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );
    const url = await uploadRes.data.secure_url;
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
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full border-2 border-primary bg-transparent shadow-sm">
              <MdOutlineRestaurant className="text-4xl text-primary" />
            </div>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-text mb-2 uppercase">
            Join Our Community
          </h2>
          <p className="text-neutral text-sm md:text-base">
            Share your love for local food with others
          </p>
        </div>

        <div className="bg-background rounded-md shadow-lg p-8 border border-neutral/10">
          <form className="space-y-6" onSubmit={handleSubmit(handleRegister)}>
            {/* Name  */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-text mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <HiOutlineUser className="text-neutral/50 text-lg" />
                </div>
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  className="w-full pl-11 pr-4 py-3 border border-neutral/20 rounded-md focus:outline-none focus:border-primary transition-colors text-sm bg-transparent"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Photo URL  */}
            {/* <div>
              <label
                htmlFor="photoURL"
                className="block text-sm font-semibold text-text mb-2"
              >
                Photo URL
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <HiOutlinePhotograph className="text-neutral/50 text-lg" />
                </div>
                <input
                  {...register("url")}
                  type="url"
                  id="photoURL"
                  className="w-full pl-11 pr-4 py-3 border border-neutral/20 rounded-md focus:outline-none focus:border-primary transition-colors text-sm bg-transparent"
                  placeholder="Enter your photo URL (optional)"
                />
              </div>
            </div> */}

            {/* Email  */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-text mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <HiOutlineMail className="text-neutral/50 text-lg" />
                </div>
                <input
                  type="email"
                  id="email"
                  {...register("email", { required: "Email is required" })}
                  className="w-full pl-11 pr-4 py-3 border border-neutral/20 rounded-md focus:outline-none focus:border-primary transition-colors text-sm bg-transparent"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* photo */}
            <div className="w-full">
              <label
                htmlFor="photoURL"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Photo (Optional)
              </label>
              <div className="relative">
                <input
                  id="photoURL"
                  {...register("photo")}
                  type="file"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                 file:rounded-lg  file:text-sm
                 file:bg-white file:text-gray-700
                 hover:file:bg-primary hover:file:text-white
                  
                 transition-all duration-300"
                />
              </div>
            </div>

            {/* Password  */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-text -mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <HiOutlineLockClosed className="text-neutral/50 text-lg" />
                </div>
                <input
                  {...register("password", {
                    required: "password is required!",
                  })}
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-11 pr-12 py-3 border border-neutral/20 rounded-md focus:outline-none focus:border-primary transition-colors text-sm bg-transparent"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 -translate-y-1/2 right-0 pr-4 flex items-center text-primary"
                >
                  {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <HiOutlineLockClosed className="text-neutral/50 text-lg" />
                </div>
                <input
                  {...register("matching_password", {
                    required: "password is required!",
                  })}
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-11 pr-12 py-3 border border-neutral/20 rounded-md focus:outline-none focus:border-primary transition-colors text-sm bg-transparent"
                  placeholder="Re-enter your password"
                />
              </div>
            </div>

            {passError && (
              <p className="text-secondary text-xs font-medium">{passError}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-background font-bold py-3 px-4 rounded-md shadow-md hover:bg-primary/90 transition-all text-sm uppercase"
            >
              {isSubmitting ? "Processing..." : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-neutral text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary font-bold hover:underline"
              >
                Login here
              </Link>
            </p>
          </div>

          <div className="mt-6 flex items-center">
            <div className="flex-1 border-t border-neutral/20"></div>
            <span className="px-4 text-xs text-neutral font-bold">OR</span>
            <div className="flex-1 border-t border-neutral/20"></div>
          </div>

          <div className="mt-6">
            <button
              onClick={async () => {
                await googleSignUp();
                navigate("/");
              }}
              type="button"
              className="w-full bg-transparent border border-neutral/20 text-text font-bold py-3 px-4 rounded-md hover:bg-neutral/5 transition-colors flex items-center justify-center gap-2 text-sm"
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
      </div>
    </div>
  );
}
