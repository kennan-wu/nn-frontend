"use client";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import authApi from "@/services/auth-service-apis";

export default function Login() {
  const [formdata, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState("");

  const areFormsFilled = () => {
    return formdata.email.length > 0 && formdata.password.length > 0;
  };

  const handleLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("login called");
    setError("");

    const credentials = {
      email: formdata.email,
      password: formdata.password,
    };

    try {
      const data = await authApi.login(credentials);
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data);
      } else {
        setError("An unexpected error occured");
      }
    }
  };

  const handleGoogleSubmit = async () => {
    console.log("google submit");
    setError("");
    try {
      const data = await authApi.oauth(formdata.rememberMe);
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data);
      } else {
        setError("An unexpected error occured");
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col font-bold text-black my-5">
      <p className="text-2xl">Log In</p>
      <form
        className="flex flex-col my-5 gap-5 text-sm"
        onSubmit={handleLoginSubmit}
      >
        <button
          onClick={handleGoogleSubmit}
          className="w-full h-fit p-2 rounded flex flex-row justify-center items-center gap-4 text-slate-400 border shadow font-normal hover:shadow-md transition"
        >
          <FcGoogle className="w-6 h-6" />
          Continue with Google
        </button>
        <div className="flex flex-row items-center">
          <div
            className="w-full bg-slate-200 flex justify-center items-center"
            style={{ height: "1px" }}
          ></div>
          <p className="text-slate-200 font-thin text-xs px-1">or</p>
          <div
            className="w-full bg-slate-200 flex justify-center items-center"
            style={{ height: "1px" }}
          ></div>
        </div>
        {error.length > 0 && (
          <p className="w-full flex justify-center text-red-500 font-medium">
            {error}
          </p>
        )}
        <div className="flex flex-col gap-1">
          <label className="font-medium text-gray-500">Email address</label>
          <input
            type="email"
            className="p-2 border rounded-lg font-thin focus:border-blue-600 focus:outline-none transition"
            value={formdata.email}
            onChange={(event) =>
              setFormData({ ...formdata, email: event.target.value })
            }
          ></input>
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-medium text-gray-500">Password</label>
          <input
            type="password"
            className="p-2 border rounded-lg font-thin focus:border-blue-600 focus:outline-none"
            value={formdata.password}
            onChange={(event) =>
              setFormData({ ...formdata, password: event.target.value })
            }
          ></input>
          <div className="flex justify-between text-gray-500 font-extralight text-sm my-1">
            <label className="flex justify-center items-center gap-1 hover:text-blue-600 cursor-pointer transition">
              <input
                type="checkbox"
                name="remember"
                checked={formdata.rememberMe}
                onChange={(event) =>
                  setFormData({ ...formdata, rememberMe: event.target.checked })
                }
              />
              Remember Me
            </label>
            <a className="hover:text-blue-600 cursor-pointer">
              Forgot Password?
            </a>
          </div>
        </div>
        <button
          type="submit"
          className={`transition w-full rounded-lg p-2 font-medium text-white cursor ${
            areFormsFilled()
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-200 hover:bg-slate-300"
          } `}
          disabled={!areFormsFilled()}
        >
          Log in
        </button>
        <div className="flex justify-center items-center gap-1 text-sm font-thin text-slate-500">
          <p>Don't have an account?</p>
          <Link
            href="/auth/signup"
            className="hover:text-blue-600 cursor-pointer"
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
