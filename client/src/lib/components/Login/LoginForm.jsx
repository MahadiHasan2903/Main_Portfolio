"use client";

import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { RouteOff, MailIcon, ArrowRightIcon } from "lucide-react";

const LoginForm = () => {
  return (
    <form className="flex flex-col gap-y-8">
      <div className="relative flex items-center">
        <Input type="emaili" id="email" placeholder="Email" />
        <MailIcon className="absolute right-6" size={20} />
      </div>
      <div className="relative flex items-center">
        <Input type="password" id="password" placeholder="Password" />
        <RouteOff className="absolute right-6" size={20} />
      </div>

      <Button className="flex gap-x-1 items-center max-w-[166px]">
        Login
        <ArrowRightIcon size={20} />
      </Button>
    </form>
  );
};

export default LoginForm;
