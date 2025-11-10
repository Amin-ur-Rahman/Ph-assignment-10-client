import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showPasswordSuccessToast = () => {
  toast.success("Password looks great! 🍽️", {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: {
      background: "linear-gradient(135deg, #d35400, #f1c40f)",
      color: "white",
      fontWeight: "600",
      borderRadius: "12px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
    },
    icon: "✅",
  });
};

export const showPasswordErrorToast = () => {
  toast.error("Password must include uppercase, lowercase & ≥ 6 chars ❌", {
    position: "top-center",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: {
      background: "linear-gradient(135deg, #ff4d4f, #ff9966)",
      color: "white",
      fontWeight: "600",
      borderRadius: "12px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
    },
    icon: "⚠️",
  });
};
