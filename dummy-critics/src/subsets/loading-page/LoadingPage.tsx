"use client";

import { motion } from "framer-motion";

export const LoadingPage = () => {
  return (
    <div className="w-full h-[85vh] flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, type: "miscellaneous" }}
        className="text-[32px]"
      >
        Movie Review
      </motion.div>
    </div>
  );
};
