"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Download, Send } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import {
  RiBriefcaseFill,
  RiTeamFill,
  RiTodoFill,
  RiArrowDownSLine,
} from "react-icons/ri";
import DevImg from "./DevImg";
import Badge from "./Badge";
import Socials from "./Socials";
import api from "../../../app/api";

const Hero = () => {
  const [personalInfo, setPersonalInfo] = useState({});

  useEffect(() => {
    const fetchInformation = async () => {
      try {
        const response = await api.info.getInfo();
        setPersonalInfo(response);
      } catch (error) {
        console.error("Error fetching information:", error);
      }
    };

    fetchInformation();
  }, []);
  const downloadCV = () => {
    const cvUrl = "/CV.pdf";
    const link = document.createElement("a");
    link.href = cvUrl;
    link.setAttribute("download", "CV.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <section className="py-12 xl:py-24 h-[84vh] xl:pt-28 bg-hero bg-no-repeat bg-bottom bg-cover dark:bg-none mt-10 xl:mt-0">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-between xl:flex-row gap-x-8">
          <div className="flex  max-w-[800px] flex-col justify-center mx-auto xl:mx-0 text-center xl:text-left">
            <div className="text-sm uppercase font-semibold mb-4 text-primary tracking-[4px]">
              Software Engineer
            </div>
            <h1 className="h1">
              <span> Hello,</span> <br />
              <TypeAnimation
                sequence={[
                  "I'm Md. Mahadi Hasan",
                  1000,
                  "I'm a Full Stack Developer",
                  1000,
                  "I'm a MERN  Developer",
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </h1>
            <p className="subtitle max-w-[490px] mx-auto xl:mx-0">
              Brief description with insights into myself, my vocational
              journey, and what I engage in professionally.
            </p>
            <div className="flex flex-col mx-auto mb-12 gap-y-3 md:flex-row gap-x-3 xl:mx-0">
              <Link href="/contact">
                <Button className="gap-x-2">
                  Contact me <Send size={18} />
                </Button>
              </Link>
              <Button
                variant="secondary"
                className="gap-x-2"
                onClick={downloadCV}
              >
                Download CV <Download size={18} />
              </Button>
            </div>
            <Socials
              containerStyles="flex gap-x-6 mx-auto xl:mx-0 mb-5 xl:mb-0"
              iconStyles="text-foreground text-[22px] hover:text-primary transition-all"
            />
          </div>
          <div className="relative xl:flex xl:ml-0">
            <Badge
              containerStyles={
                "absolute xl:top-[24%] top-[20%] t -left-[1.2rem]  xl:-left-[7rem] "
              }
              icon={<RiBriefcaseFill />}
              endCountNum={3}
              badgeText="Years of Experience"
            />
            <Badge
              containerStyles={
                "absolute top-[83%] -left-[1rem] xl:-left-[5rem]"
              }
              icon={<RiTodoFill />}
              endCountNum={20}
              endCountText="k"
              badgeText="Finished  projects"
            />

            <Badge
              containerStyles={
                "absolute xl:top-[50%] top-[65%] xl:-right-24 -right-[1rem]"
              }
              icon={<RiTeamFill />}
              endCountNum={25}
              endCountText="k"
              badgeText="Happy Clients"
            />
            <div className="hidden xl:block bg-hero_shape2_light dark:bg-hero_shape2_dark  w-[500px] h-[500px] bg-no-repeat absolute -top-1 -right-2 "></div>
            <DevImg
              imgSrc={personalInfo?.primaryImage}
              // imgSrc={personalInfo?.secondaryImage}
              containerStyles="bg-hero_shape w-[350px] xl:w-[510px] h-[300px] xl:h-[462px] bg-no-repeat relative bg-bottom] mt-[50px] sm:mt-0 bg-contain"
            />
          </div>
        </div>
        <div className="absolute hidden md:flex left-2/4 bottom-44 xl:bottom-12 animate-bounce">
          <RiArrowDownSLine className="text-3xl text-primary" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
