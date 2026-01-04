import {
  HiOutlineSearch,
  HiOutlineCamera,
  HiOutlineChatAlt2,
} from "react-icons/hi";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const steps = [
    {
      title: "Discover",
      desc: "Browse authentic reviews from local food enthusiasts.",
      icon: <HiOutlineSearch />,
    },
    {
      title: "Experience",
      desc: "Visit the restaurant and enjoy your culinary journey.",
      icon: <HiOutlineCamera />,
    },
    {
      title: "Share",
      desc: "Write a review and upload photos to help others eat better.",
      icon: <HiOutlineChatAlt2 />,
    },
  ];

  return (
    <motion.div
      className="py-16 bg-background"
      initial={{
        opacity: 0,
        scale: 0.75,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
      }}
      viewport={{
        amount: 0.45,
        once: true,
      }}
      transition={{
        duration: 0.25,
        ease: "linear",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-xl md:text-2xl font-bold text-text uppercase tracking-tight mb-12">
          How it Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion
              key={i}
              className="p-8 border border-neutral/10 rounded-md bg-white hover:border-primary/30 transition-colors"
            >
              <div className="text-4xl text-primary flex justify-center mb-6">
                {step.icon}
              </div>
              <h3 className="text-lg font-bold text-text uppercase mb-3">
                {step.title}
              </h3>
              <p className="text-neutral text-sm leading-relaxed">
                {step.desc}
              </p>
            </motion>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default HowItWorks;
