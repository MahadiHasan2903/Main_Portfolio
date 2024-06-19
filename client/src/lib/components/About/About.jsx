"use client";

import React, { useEffect, useState } from "react";
import DevImg from "../Hero/DevImg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Information from "./Information";
import Qualification from "./Qualification";
import Skill from "./Skill";
import api from "../../../app/api";

const About = () => {
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

  return (
    <section className="min-h-screen pb-12 mb-20 xl:py-24 xl:mt-0 mt-[300px] ">
      <div className="container mx-auto">
        <h2 className="mx-auto mb-8 text-center section-title xl:mb-16">
          About me
        </h2>
        <div className="flex flex-col xl:flex-row">
          <div className="relative flex-1 hidden xl:flex">
            <DevImg
              containerStyles="bg-about_shape_light dark:bg-about_shape_dark w-[505px] h-[505px] bg-no-repeat relative"
              // imgSrc={personalInfo?.primaryImage}
              imgSrc={personalInfo?.secondaryImage}
            />
          </div>
          <div className="flex-1">
            <Tabs defaultValue="personal">
              <TabsList className="w-full grid xl:grid-cols-3 xl:max-w-[520px] xl:border ">
                <TabsTrigger value="personal" className="mx-1 my-2 xl:my-0">
                  Personal Info
                </TabsTrigger>
                <TabsTrigger
                  className="mx-1 my-2 xl:my-0"
                  value="quaqlification"
                >
                  Qualification
                </TabsTrigger>
                <TabsTrigger className="mx-1 my-2 xl:my-0" value="skills">
                  Skills
                </TabsTrigger>
              </TabsList>

              <div className="mt-12 text-lg xl:mt-8">
                <TabsContent value="personal">
                  <Information />
                </TabsContent>
                <TabsContent value="quaqlification">
                  <div>
                    <h3 className="mb-8 text-center h3 xl:text-left">
                      My Awesome Journey
                    </h3>

                    <Qualification />
                  </div>
                </TabsContent>
                <TabsContent value="skills">
                  <div>
                    <Skill />
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
