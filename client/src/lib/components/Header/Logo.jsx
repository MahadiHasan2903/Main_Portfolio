import React from "react";
import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href="/">
      <p className="text-[40px] text-primary md:text-[60px]">𝓜𝓗</p>
    </Link>
  );
};

export default Logo;
