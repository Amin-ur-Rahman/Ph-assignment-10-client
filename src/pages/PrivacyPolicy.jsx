import React, { useEffect } from "react";
import {
  HiOutlineShieldCheck,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineUserGroup,
  HiOutlineMail,
  HiOutlineDocumentText,
} from "react-icons/hi";

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = "PRIVACY POLICY | LOCAL FOOD LOVERS";
  }, []);

  const sections = [
    {
      title: "Information We Collect",
      icon: <HiOutlineEye className="w-6 h-6" />,
      content:
        "We collect information you provide directly to us, such as when you create an account, post a food review, or contact us for support. This includes your name, email address, profile picture, and any food-related content you share.",
    },
    {
      title: "How We Use Data",
      icon: <HiOutlineUserGroup className="w-6 h-6" />,
      content:
        "Your data helps us personalize your experience. We use your reviews to help other 'Local Food Lovers' find great meals and use your contact info to send important updates about your account or our community guidelines.",
    },
    {
      title: "Data Security",
      icon: <HiOutlineLockClosed className="w-6 h-6" />,
      content:
        "We implement industry-standard security measures to protect your personal information. Your passwords and authentication are handled via secure Firebase protocols, ensuring your sensitive data remains private.",
    },
    {
      title: "Cookies & Tracking",
      icon: <HiOutlineDocumentText className="w-6 h-6" />,
      content:
        "Our application uses local storage and cookies to keep you logged in and remember your preferences. This allows for a seamless browsing experience as you navigate between different local food reviews.",
    },
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block p-4 rounded-full border-2 border-primary mb-4">
            <HiOutlineShieldCheck className="text-4xl text-primary" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-text uppercase tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-neutral text-sm mt-2">
            Last Updated: January 2026
          </p>
        </div>

        {/* Introduction Card */}
        <div className="bg-background border border-neutral/10 rounded-md p-6 md:p-8 shadow-sm mb-8">
          <p className="text-neutral text-sm md:text-base leading-relaxed">
            At **Local Food Lovers**, we value your trust and are committed to
            protecting your personal data. This policy outlines how we handle
            your information when you use our platform to discover and share
            local culinary experiences.
          </p>
        </div>

        {/* Policy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-background border border-neutral/10 rounded-md p-6 shadow-sm hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4 text-primary">
                {section.icon}
                <h3 className="font-bold text-sm md:text-base uppercase tracking-wide">
                  {section.title}
                </h3>
              </div>
              <p className="text-neutral text-sm leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="bg-primary text-background rounded-md p-8 text-center shadow-lg">
          <HiOutlineMail className="w-8 h-8 mx-auto mb-4" />
          <h2 className="text-lg font-bold uppercase mb-2">Have Questions?</h2>
          <p className="text-sm opacity-90 mb-6">
            If you have any concerns regarding your privacy or data, please
            reach out to our team.
          </p>
          <a
            href="mailto:privacy@localfoodlovers.com"
            className="inline-block px-8 py-3 bg-background text-text font-bold rounded-md text-xs uppercase hover:bg-neutral/5 transition-colors"
          >
            Contact Privacy Team
          </a>
        </div>

        {/* Footer Note */}
        <p className="mt-8 text-center text-xs text-neutral">
          By continuing to use Local Food Lovers, you agree to the terms
          outlined in this Privacy Policy.
        </p>
      </div>
    </div>
  );
}
