import React from "react";
import { GanttChart, Blocks, Gem } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const servicesData = [
  {
    icon: <GanttChart size={72} strokeWidth={0.8} />,
    title: "Web Design",
    description:
      "Crafting captivating digital experiences through innovative web design. We specialize in creating visually stunning, user-centric websites that blend creativity with functionality.",
  },
  {
    icon: <Blocks size={72} strokeWidth={0.8} />,
    title: "Web Development",
    description:
      " Full Stack Development services encompass both frontend and backend expertise, ensuring seamless integration, robust functionality, and optimal performance for your digital ecosystem.",
  },
  {
    icon: <Gem size={72} strokeWidth={0.8} />,
    title: "App Development",
    description:
      "Elevate your business with bespoke app solutions that resonate and drive success in today's dynamic digital landscape.",
  },
];

const Services = () => {
  return (
    <section className="mb-24 xl:mb-36 ">
      <div className="container mx-auto ">
        <h2 className="mx-auto mb-12 text-center section-title xl:mb-24">
          My Services
        </h2>
        <div className="grid justify-center xl:grid-cols-3 gap-y-12 xl:gap-y-24 xl:gap-x-8">
          {servicesData?.map((item, index) => {
            return (
              <Card
                className="w-full max-w-[424px] h-[300px] flex flex-col pt-16 pb-10 justify-center items-center relative"
                key={index}
              >
                <CardHeader className="text-primary absolute -top-[60px]">
                  <div className="w-[140px] h-[80px] bg-white dark:bg-background flex justify-center items-center">
                    {item.icon}
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <CardTitle className="mb-4">{item.title}</CardTitle>
                  <CardDescription className="text-lg">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
