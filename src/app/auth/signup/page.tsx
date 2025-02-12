"use client";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import authApi from "@/services/auth-service-apis";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const [formdata, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    verifyPassword: "",
    rememberMe: false,
  });

  const [error, setError] = useState("");

  const areFormsFilled = () => {
    return (
      formdata.email.length > 0 &&
      formdata.password.length > 0 &&
      formdata.verifyPassword.length > 0 &&
      formdata.name.length > 0
    );
  };

  const handleConfirmPasswordInput = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const confirmInput = event.currentTarget;
    const passwordInput = formdata.password;

    confirmInput.setCustomValidity(
      confirmInput.value !== passwordInput ? "Passwords do not match." : ""
    );
    confirmInput.reportValidity();
  };

  const handleSignupSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    const signupCredentials = {
      email: formdata.email,
      username: formdata.name,
      password: formdata.password,
    };

    try {
      const signupData = await authApi.signup(signupCredentials);
      const loginCredentials = {
        email: formdata.email,
        password: formdata.password,
      };
      const loginData = await authApi.login(
        loginCredentials,
        formdata.rememberMe
      );
      router.push("/");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleGoogleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    setError("");
    try {
      const data = await authApi.oauth(true);
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
      <p className="text-2xl">Sign Up</p>
      <form
        onSubmit={handleSignupSubmit}
        className="flex flex-col my-5 gap-5 text-sm"
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
            onInput={(event) => {
              event.currentTarget.reportValidity();
            }}
          ></input>
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-medium text-gray-500">Name</label>
          <input
            type="name"
            className="p-2 border rounded-lg font-thin focus:border-blue-600 focus:outline-none transition"
            value={formdata.name}
            onChange={(event) =>
              setFormData({ ...formdata, name: event.target.value })
            }
            onInput={(event) => {
              event.currentTarget.reportValidity();
            }}
          ></input>
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-medium text-gray-500">Password</label>
          <input
            type="password"
            required
            pattern="^(?=.*[A-Za-z])(?=.*\d).+$"
            title="Password must be at least 6 characters long and contain at least one letter and one number."
            className="p-2 border rounded-lg font-thin focus:border-blue-600 focus:outline-none transition"
            value={formdata.password}
            onChange={(event) =>
              setFormData({ ...formdata, password: event.target.value })
            }
            onInput={(event) => {
              event.currentTarget.reportValidity();
            }}
          ></input>
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-medium text-gray-500">Re-enter Password</label>
          <input
            required
            type="password"
            id="confirmPassword"
            className="p-2 border rounded-lg font-thin focus:border-blue-600 focus:outline-none transition"
            value={formdata.verifyPassword}
            onChange={(event) => {
              setFormData({ ...formdata, verifyPassword: event.target.value });
            }}
            onInput={handleConfirmPasswordInput}
          />
          <div className="flex justify-between text-gray-500 font-extralight text-sm my-1">
            <label className="flex justify-center items-center gap-1 hover:text-blue-600 cursor-pointer">
              <input
                id="remember"
                type="checkbox"
                name="remember"
                checked={formdata.rememberMe}
                onChange={(event) =>
                  setFormData({ ...formdata, rememberMe: event.target.checked })
                }
              />
              Remember Me
            </label>
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
          Sign up
        </button>
        <div className="flex justify-center items-center gap-1 text-sm font-thin text-slate-500">
          <p>Already have an account?</p>
          <Link
            href="/auth/login"
            className="hover:text-blue-600 cursor-pointer"
          >
            Log In
          </Link>
        </div>
      </form>
    </div>
  );
}
