import React from "react";
import { toast } from "react-toastify";

const Home = () => {
  return (
    <div>
      this is home
      <button
        type="button"
        onClick={() => {
          toast.error(
            "❌ Invalid password! Include uppercase, lowercase, number, special character & ≥ 6 chars.",
            {
              style: {
                background: "linear-gradient(to right, #f39c12, #e74c3c)",
                color: "#fff",
                fontWeight: "600",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              },
              icon: "⚠️",
            }
          );
        }}
      >
        toast
      </button>
    </div>
  );
};

export default Home;
