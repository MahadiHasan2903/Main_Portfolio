import React from "react";
import Socials from "../Hero/Socials";

const Footer = () => {
  return (
    <footer className="py-12 bg-secondary">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-between">
          <Socials
            containerStyles="flex gap-x-6 mx-auto xl:mx-0 mb-4"
            iconStyles="text-primary dark:text-white/70 hover:text-white dark:hover:text-primary transition-all text-[20px]"
          />
          <div className="text-muted-foreground">
            Copyright &copy; Md. Mahadi Hasan. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
