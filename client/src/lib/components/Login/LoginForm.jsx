"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { LogIn, MailIcon, ArrowRightIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    console.log("handleSubmit function started");
    try {
      const loginCredentials = {
        email,
        password,
      };
      setLoading(true);

      console.log("Data passing");

      const response = await signIn("credentials", {
        ...loginCredentials,
        redirect: false,
      });

      console.log("Response:", response);
      if (response && response.ok) {
        toast.success("Login Successful");
        router.push("/dashboard");
      } else {
        const errorMessage = response?.error || "Unknown error";
        setError(errorMessage);
        console.log("Error occurred:", errorMessage);
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      setError("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-y-8" onSubmit={handleSubmit}>
      <div className="relative flex items-center">
        <Input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <MailIcon className="absolute right-6" size={20} />
      </div>
      <div className="relative flex items-center">
        <Input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <LogIn className="absolute right-6" size={20} />
      </div>

      <Button
        className="flex gap-x-1 items-center max-w-[166px]"
        disabled={loading}
        onClick={handleSubmit}
      >
        {loading ? "Logging in..." : "Login"}
        <ArrowRightIcon size={20} />
      </Button>
    </form>
  );
};

export default LoginForm;
