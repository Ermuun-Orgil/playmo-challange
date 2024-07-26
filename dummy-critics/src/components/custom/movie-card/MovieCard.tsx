"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Variants, motion } from "framer-motion";

type MovieCard = {
  data: any;
};

export const MovieCard: React.FC<MovieCard> = ({ data }) => {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  const variantsScale: Variants = {
    unscale: {
      scale: 1,
    },
    scale: {
      scale: 1.05,
      transition: {
        type: "spring",
        duration: 0.2,
      },
    },
  };

  return (
    <div className="w-[150px] lg:w-[200px] h-[200px] lg:h-[400px] flex items-center">
      <motion.button
        variants={variantsScale}
        animate={hovered ? "scale" : "unscale"}
        onClick={() => router.push(`/reviews?content_uri=${data.uri}`)}
        className={` cursor-pointer`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          alt="poster"
          src={data.poster_url}
          className={`bg-contain rounded-t-lg ${hovered ? "" : "rounded-b-lg"}`}
        />
        <div
          className={`${
            hovered ? "block" : "hidden"
          } bg-[#0f0f0f] rounded-b-lg py-2 px-4`}
        >
          <p className="font-semibold text-[20px]">{data.title}</p>
        </div>
      </motion.button>
    </div>
  );
};
