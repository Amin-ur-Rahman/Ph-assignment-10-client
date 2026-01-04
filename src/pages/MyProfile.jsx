import React, { useContext, useEffect, useState } from "react";
// Using the most standard Hi icons to avoid "export not found" errors
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineCalendar,
  HiOutlinePencilAlt,
  HiOutlineCamera,
  HiOutlineBadgeCheck,
  HiOutlineKey,
  HiOutlineGlobe,
  HiOutlineHeart,
  HiOutlineChatAlt,
} from "react-icons/hi";
import AuthContext from "../contexts/AuthContext";

export default function MyProfile() {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    document.title = "MY PROFILE | LOCAL FOOD LOVERS";
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center md:text-left border-b border-neutral/10 pb-6">
          <h1 className="text-xl md:text-2xl font-bold text-text uppercase tracking-tight">
            Account Overview
          </h1>
          <p className="text-neutral text-sm mt-1 uppercase tracking-widest font-medium">
            your local food profile
          </p>
        </div>

        <div className="bg-background border border-neutral/10 rounded-md shadow-sm overflow-hidden mb-8">
          <div className="h-24 md:h-32 bg-primary/5 border-b border-neutral/10" />

          <div className="px-6 pb-8 relative">
            {/* Avatar Section */}
            <div className="flex flex-col md:flex-row items-center md:items-end justify-between -mt-12 md:-mt-16 mb-8 gap-6">
              <div className="relative">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-md border-4 border-background bg-background shadow-md overflow-hidden ring-1 ring-neutral/10">
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-neutral/5">
                      <span className="text-2xl font-bold text-primary">
                        {getInitials(user?.displayName || user?.email)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Information Grid */}
            <div className="grid md:grid-cols-2 gap-4 mt-10">
              <div className="p-4 border border-neutral/10 rounded-md bg-neutral/5 flex items-center gap-4">
                <HiOutlineUser className="text-xl text-primary" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-neutral tracking-widest">
                    Name
                  </p>
                  <p className="text-sm font-bold text-text">
                    {user?.displayName || "Not set"}
                  </p>
                </div>
              </div>

              <div className="p-4 border border-neutral/10 rounded-md bg-neutral/5 flex items-center gap-4">
                <HiOutlineMail className="text-xl text-secondary" />
                <div className="overflow-hidden">
                  <p className="text-[10px] uppercase font-bold text-neutral tracking-widest flex items-center gap-1">
                    Email{" "}
                    {user?.emailVerified && (
                      <HiOutlineBadgeCheck className="text-secondary" />
                    )}
                  </p>
                  <p className="text-sm font-bold text-text truncate">
                    {user?.email}
                  </p>
                </div>
              </div>

              <div className="p-4 border border-neutral/10 rounded-md bg-neutral/5 flex items-center gap-4">
                <HiOutlineCalendar className="text-xl text-primary" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-neutral tracking-widest">
                    Joined
                  </p>
                  <p className="text-sm font-bold text-text">
                    {formatDate(user?.metadata?.creationTime)}
                  </p>
                </div>
              </div>

              <div className="p-4 border border-neutral/10 rounded-md bg-neutral/5 flex items-center gap-4">
                <HiOutlineKey className="text-xl text-neutral" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-neutral tracking-widest">
                    Auth Provider
                  </p>
                  <p className="text-sm font-bold text-text capitalize">
                    {user?.providerData?.[0]?.providerId?.replace(".com", "") ||
                      "Email"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
