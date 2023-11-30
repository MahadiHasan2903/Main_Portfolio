import React from "react";
import Link from "next/link";
import { Card, CardHeader } from "../ui/card";
import { Github, Link2Icon } from "lucide-react";
import { Badge } from "../ui/badge";
import Image from "next/image";

const ProjectCard = ({ project }) => {
  const { name, category, technologies, image, github, preview } = project;

  return (
    <Card className="relative overflow-hidden group">
      <CardHeader className="p-0">
        <div className="relative w-full h-[300px] flex items-center overflow-hidden xl:bg-no-repeat bg-tertiary dark:bg-secondary/40 xl:bg-work_project_bg_light xl:dark:bg-work_project_bg_dark xl:bg-[110%] justify-center">
          <Image
            className="absolute bottom-0 shadow-2xl"
            src={image}
            width={247}
            height={250}
            alt="Project"
            priortiy="true"
          />
          <div className="flex gap-x-4">
            <Link
              href={preview}
              className=" cursor-pointer bg-secondary w-[54px] h-[54px] rounded-full flex justify-center items-center scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200"
            >
              <Link2Icon className="text-white" />
            </Link>
            <Link
              href={github}
              className="cursor-pointer bg-secondary w-[54px] h-[54px] rounded-full flex justify-center items-center scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200"
            >
              <Github className="text-white" />
            </Link>
          </div>
        </div>
      </CardHeader>
      <div className="h-full px-8 py-6">
        <Badge className="absolute mb-2 text-sm font-medium uppercase top-4 left-5">
          {category}
        </Badge>
        <h4 className="mb-1 h4">{name}</h4>
        <div className="flex ">
          <p className="mr-2 text-[18px] text-[700]">Technologies: </p>
          <p className="text-[16px] text-muted-foreground">{technologies}</p>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
