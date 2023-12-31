"use client";

import React, { useEffect, useState } from "react";
import ThemeToggler from "../Theme/ThemeToggler";
import Logo from "./Logo";
import Navbar from "./Navbar";
import MobileNavbar from "./MobileNavbar";
import { usePathname } from "next/navigation";

const Header = () => {
  const [header, setHeader] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const scrollYPos = window.addEventListener("scroll", () => {
      window.scrollY > 50 ? setHeader(true) : setHeader(false);
    });
    return () => window.removeEventListener("scroll", scrollYPos);
  }, []);

  return (
    <header
      className={`${
        header
          ? " bg-white shadow-lg dark:bg-secondary"
          : " dark:bg-transparent"
      } sticky top-0 z-30 transition-all ${pathname === "/" && "bg-[#fef9f5]"}`}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Logo />
          {/* Navbar */}
          <div className="flex items-center gap-x-6">
            <Navbar
              containerStyles="hidden xl:flex gap-x-8 items-center"
              linkStyles="relative hover:text-primary transition-all text-lg"
              underlineStyles="absolute left-0 top-full h-[2px] bg-primary w-full"
            />
            <ThemeToggler />
            <div className=" xl:hidden">
              <MobileNavbar />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
