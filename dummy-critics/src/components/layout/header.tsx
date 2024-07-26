"use client";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();

  return (
    <div className="fixed flex justify-between items-center h-[80px] w-[100vw] px-[5vw] z-40 bg-[#2b2b2b]">
      <button
        onClick={() => router.push("/")}
        className="text-[16px] md:text-[20px] font-semibold"
      >
        Movie Review
      </button>
      <div className="flex gap-8">
        <button
          className="text-[16px] md:text-[20px] font-semibold cursor-pointer hover:scale-105"
          onClick={() => router.push("/")}
        >
          Home
        </button>
        <button
          className="text-[16px] md:text-[20px] font-semibold cursor-pointer hover:scale-105"
          onClick={() => router.push("/history")}
        >
          History
        </button>
        <button
          className="text-[16px] md:text-[20px] font-semibold cursor-pointer hover:scale-105"
          onClick={() => {
            deleteCookie("user");
            router.push("login");
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};
