"use client";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();

  return (
    <div className="fixed flex justify-between items-center h-[80px] w-[100vw] px-[15vw] z-40 bg-[#2b2b2b]">
      <p className="text-[20px] font-semibold">Movie review</p>
      <div className="flex gap-8">
        <div
          className="text-[20px] font-semibold cursor-pointer"
          onClick={() => router.push("/")}
        >
          Home
        </div>
        <div
          className="text-[20px] font-semibold cursor-pointer"
          onClick={() => router.push("/history")}
        >
          History
        </div>
        <div
          className="text-[20px] font-semibold cursor-pointer"
          onClick={() => {
            deleteCookie("user");
            router.push("login");
          }}
        >
          Logout
        </div>
      </div>
    </div>
  );
};
