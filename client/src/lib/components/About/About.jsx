import React from "react";
import DevImg from "../Hero/DevImg";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { GraduationCap, Briefcase } from "lucide-react";
import { infoData, qualificationData, skillData } from "../../data";
import { Card, CardDescription, CardTitle } from "../../components/ui/card";

const About = () => {
  const getData = (arr, title) => {
    return arr.find((item) => item.title === title);
  };

  return (
    <section className="min-h-screen pb-12 mb-20 xl:py-24">
      <div className="container mx-auto">
        <h2 className="mx-auto mb-8 text-center section-title xl:mb-16">
          About me
        </h2>
        <div className="flex flex-col xl:flex-row">
          <div className="relative flex-1 hidden xl:flex">
            <DevImg
              containerStyles="bg-about_shape_light dark:bg-about_shape_dark w-[505px] h-[505px] bg-no-repeat relative"
              imgSrc="/about/developer.png"
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
                  <div className="text-center xl:text-left">
                    <div className="flex flex-col justify-center xl:text-left">
                      <h3 className="mb-4 h3">
                        Unmatched Service Quality for over 1 year
                      </h3>
                      <p className="max-w-xl subtitle max-auto xl:mx-0">
                        I specialize in crafting intuitive websites with
                        cutting-edge technology, delivering dynamic and engaging
                        user experiences.
                      </p>
                    </div>
                    <div className="grid gap-4 mb-12 xl:grid-cols-2">
                      {infoData?.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center mx-auto gap-x-4 xl:mx-0"
                        >
                          <div className="text-primary"> {item.icon}</div>
                          <span>{item.text}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col gap-y-2 ">
                      <div className="text-primary">Language Skill</div>
                      <div className="border-b border-border"></div>
                      <div>English, Bangla</div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="quaqlification">
                  <div>
                    <h3 className="mb-8 text-center h3 xl:text-left">
                      My Awesome Journey
                    </h3>

                    <div className="grid md:grid-cols-2 gap-y-8">
                      <div className="flex flex-col gap-y-6">
                        <div className="flex gap-x-4 items-center text-[22px] text-primary ">
                          <Briefcase />
                          <h4 className="font-medium capitalize">
                            {getData(qualificationData, "experience").title}
                          </h4>
                        </div>
                        <div className="flex flex-col gap-y-8">
                          {getData(qualificationData, "experience").data?.map(
                            (item, index) => {
                              const { organization, designation, years } = item;
                              return (
                                <div key={index} className="flex gap-x-8 group">
                                  <div className="h-[84px] w-[1px] bg-border relative ml-2">
                                    <div className="w-[11px] h-[11px] rounded-full bg-primary absolute -left-[5px] group-hover:translate-y-[84px] transition-all duration-500"></div>
                                  </div>
                                  <div>
                                    <div className="mb-2 text-xl font-semibold leading-none">
                                      {organization}
                                    </div>
                                    <div className="mb-4 text-lg leading-none text-muted-foreground">
                                      {designation}
                                    </div>
                                    <div className="text-base font-medium">
                                      {years}
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-y-6">
                        <div className="flex gap-x-4 items-center text-[22px] text-primary mb-5">
                          <GraduationCap />
                          <h4 className="font-medium capitalize">
                            {getData(qualificationData, "education").title}
                          </h4>
                        </div>
                        <div className="flex flex-col gap-y-8">
                          {getData(qualificationData, "education").data.map(
                            (item, index) => {
                              const { institution, degree, session } = item;
                              return (
                                <div key={index} className="flex gap-x-8 group">
                                  <div className="h-[84px] w-[1px] bg-border relative ml-2">
                                    <div className="w-[11px] h-[11px] rounded-full bg-primary absolute -left-[5px] group-hover:translate-y-[84px] transition-all duration-500"></div>
                                  </div>
                                  <div>
                                    <div className="mb-2 text-xl font-semibold leading-none">
                                      {institution}
                                    </div>
                                    <div className="mb-4 text-lg leading-none text-muted-foreground">
                                      {degree}
                                    </div>
                                    <div className="text-base font-medium">
                                      {session}
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="skills">
                  <div className="text-center xl:text-left">
                    <h3 className="mb-8 h3">What I use everyday</h3>
                    <div className="mb-16">
                      <h4 className="mb-2 text-2xl font-semibold ">Skills</h4>
                      <div className="border-b border-border"></div>
                      <div className="mt-5">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-7">
                          {getData(skillData, "skills").data?.map(
                            (item, index) => {
                              const { name, imgPath } = item;
                              return (
                                <Card className="bg-tertiary dark:bg-secondary/40 p-1 min-h-[50px] mx-4">
                                  <CardDescription className="">
                                    <div className="flex items-center justify-between px-3 py-1">
                                      <Image
                                        src={imgPath}
                                        alt={name}
                                        width={40}
                                        height={40}
                                        priority="true"
                                      />
                                      <CardTitle className="ml-2 text-lg">
                                        {name}
                                      </CardTitle>
                                    </div>
                                  </CardDescription>
                                </Card>
                              );
                            }
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="mb-2 text-xl font-semibold xl:text-left">
                        Tools
                      </h4>
                      <div className="mb-4 border-b border-border"></div>
                      <div className="flex justify-center gap-x-8 ">
                        {getData(skillData, "tools").data?.map(
                          (item, index) => {
                            const { imgPath } = item;
                            return (
                              <div
                                key={index}
                                className="w-2/4 mx-auto text-center xl:text-left xl:mx-0"
                              >
                                <Image
                                  src={imgPath}
                                  alt="tool"
                                  width={48}
                                  height={48}
                                  priority="true"
                                />
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
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
