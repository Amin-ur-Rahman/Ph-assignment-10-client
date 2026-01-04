import React, { useEffect } from "react";
import {
  HiOutlineScale,
  HiOutlineUserCircle,
  HiOutlineBan,
  HiOutlineClipboardCheck,
  HiOutlineExclamationCircle,
  HiOutlineBadgeCheck,
} from "react-icons/hi";

export default function TermsOfService() {
  useEffect(() => {
    document.title = "TERMS OF SERVICE | LOCAL FOOD LOVERS";
  }, []);

  const policies = [
    {
      title: "User Eligibility",
      icon: <HiOutlineUserCircle className="w-6 h-6" />,
      content:
        "By using this platform, you represent that you are at least 13 years of age. You are responsible for maintaining the security of your account and password.",
    },
    {
      title: "Content Standards",
      icon: <HiOutlineClipboardCheck className="w-6 h-6" />,
      content:
        "All reviews must be based on actual experiences. We do not tolerate fake reviews, promotional spam, or content that is defamatory, offensive, or infringing on intellectual property.",
    },
    {
      title: "Prohibited Conduct",
      icon: <HiOutlineBan className="w-6 h-6" />,
      content:
        "Users may not use automated systems (bots) to scrape data, harass other community members, or attempt to bypass any security features of the Local Food Lovers application.",
    },
    {
      title: "Limitation of Liability",
      icon: <HiOutlineExclamationCircle className="w-6 h-6" />,
      content:
        "Local Food Lovers is a platform for sharing opinions. We are not responsible for the quality, safety, or legality of the food served at the restaurants featured in user reviews.",
    },
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block p-4 rounded-full border-2 border-primary mb-4">
            <HiOutlineScale className="text-4xl text-primary" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-text uppercase tracking-tight">
            Terms of Service
          </h1>
          <p className="text-neutral text-sm mt-2 font-medium">
            Effective Date: January 1, 2026
          </p>
        </div>

        {/* Introduction Card */}
        <div className="bg-background border border-neutral/10 rounded-md p-6 md:p-8 shadow-sm mb-8">
          <h2 className="text-base font-bold text-text uppercase mb-3">
            Agreement to Terms
          </h2>
          <p className="text-neutral text-sm md:text-base leading-relaxed">
            Welcome to **Local Food Lovers**. By accessing or using our website,
            you agree to be bound by these Terms of Service. If you do not agree
            to all of these terms, please do not use our application.
          </p>
        </div>

        {/* Policies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {policies.map((policy, index) => (
            <div
              key={index}
              className="bg-background border border-neutral/10 rounded-md p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4 text-primary">
                {policy.icon}
                <h3 className="font-bold text-sm uppercase tracking-wide">
                  {policy.title}
                </h3>
              </div>
              <p className="text-neutral text-sm leading-relaxed">
                {policy.content}
              </p>
            </div>
          ))}
        </div>

        {/* Ownership Section */}
        <div className="bg-background border border-neutral/10 rounded-md p-6 md:p-8 mb-12">
          <div className="flex items-center gap-2 mb-4">
            <HiOutlineBadgeCheck className="text-secondary w-6 h-6" />
            <h2 className="text-base font-bold text-text uppercase">
              Intellectual Property
            </h2>
          </div>
          <p className="text-neutral text-sm leading-relaxed">
            While you retain ownership of the photos and text you post, by
            sharing content on Local Food Lovers, you grant us a non-exclusive,
            royalty-free license to display and distribute that content within
            our platform ecosystem.
          </p>
        </div>

        {/* Acceptance Action */}
        <div className="border-t border-neutral/10 pt-10 text-center">
          <p className="text-neutral text-sm mb-6 max-w-lg mx-auto">
            We reserve the right to modify these terms at any time. Continued
            use of the platform constitutes your acceptance of the new terms.
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-10 py-3 bg-primary text-background font-bold rounded-md text-xs uppercase tracking-widest hover:bg-primary/90 transition-all shadow-md"
          >
            I Understand
          </button>
        </div>

        {/* Support Link */}
        <p className="mt-8 text-center text-xs text-neutral">
          Questions about our Terms?{" "}
          <a
            href="mailto:support@localfoodlovers.com"
            className="text-primary font-bold hover:underline"
          >
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
}
