"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

type MovieCard = {
  data: any;
};

export const MovieCard: React.FC<MovieCard> = ({ data }) => {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  return (
    <div className="w-[200px] h-[400px] flex items-center">
      <button
        onClick={() => router.push(`/reviews?content_uri=${data.uri}`)}
        className={`${hovered ? "scale-105" : "scale-100"} cursor-pointer`}
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
      </button>
    </div>
  );
};
