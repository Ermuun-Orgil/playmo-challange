"use client";
import { Alert } from "@/components";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  const submitButton = () => {
    axios
      .post("http://localhost:3000/api/signup", {
        email: email,
        password: password,
      })
      .then(function (response) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col items-center px-[35vw] justify-center h-[100vh] gap-10">
      <div className="w-full">
        <p className="text-4xl">Sign up with your email</p>
      </div>
      <input
        onChange={(e) => setEmail(e.target.value)}
        className="w-full h-[45px] bg-[#31333f] px-2 rounded border-[1px] border-[#5a5a62]"
        placeholder="Email"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        className="w-full h-[45px] bg-[#31333f] px-2 rounded border-[1px] border-[#5a5a62]"
        placeholder="Password"
        type="password"
      />
      <button
        onClick={submitButton}
        className="w-full bg-[#0072d2] hover:bg-[#4d9ce0] rounded h-[45px] font-semibold"
      >
        CONTINUE
      </button>
      <button
        onClick={() => router.push("/login")}
        className="w-full hover:bg-[#2b2b2b] border-[#31333f] border-[2px] rounded h-[45px] font-semibold"
      >
        Go to Login
      </button>
      <Alert
        open={success}
        setOpen={setSuccess}
        type="success"
        title="Амжилттай бүртгэл үүслээ."
      />
    </div>
  );
};
