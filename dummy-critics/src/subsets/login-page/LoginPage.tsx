"use client";
import axios from "axios";
import { useState } from "react";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { Alert } from "@/components";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const submitButton = () => {
    axios({
      method: "post",
      url: "http://localhost:3000/api/login",
      data: {
        email: email,
        password: password,
      },
    })
      .then(function (response) {
        setCookie("user", response.data.token);
        setSuccess(true);
        setTimeout(() => {
          router.push("/");
        }, 700);
      })
      .catch(function (error) {
        setError(true);
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col items-center px-[35vw] justify-center h-[100vh] gap-10">
      <div className="w-full">
        <p className="text-4xl">Log in with your email</p>
      </div>
      <input
        onKeyDown={(e) => {
          if (e.key === "Enter") submitButton();
        }}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full h-[45px] bg-[#31333f] px-2 rounded border-[1px] border-[#5a5a62]"
        placeholder="Email"
        type="email"
      />
      <input
        onKeyDown={(e) => {
          if (e.key === "Enter") submitButton();
        }}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full h-[45px] bg-[#31333f] px-2 rounded border-[1px] border-[#5a5a62]"
        placeholder="Password"
        type="password"
      />
      <button
        onClick={submitButton}
        className="w-full hover:bg-[#4d9ce0] bg-[#0072d2] rounded h-[45px] font-semibold"
      >
        Continue
      </button>
      <button
        onClick={() => router.push("/signup")}
        className="w-full border-[#31333f] hover:bg-[#2b2b2b] border-[2px] rounded h-[45px] font-semibold"
      >
        Sign Up
      </button>
      <Alert
        open={success}
        setOpen={setSuccess}
        title="Амжилттай нэвтэрлээ"
        type="success"
      />
      <Alert
        open={error}
        setOpen={setError}
        title="И-майл хаяг эсвэл нууц үг буруу байна."
        type="error"
      />
    </div>
  );
};
