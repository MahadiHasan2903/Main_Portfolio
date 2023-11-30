"use client";

import React, { useState } from "react";
import { projectData } from "../../util/data";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "../ui/tabs";
import ProjectCard from "./ProjectCard";

const uniqueCategories = [
  "all projects",
  ...new Set(projectData?.map((item) => item.category)),
];

const ProjectComponent = () => {
  const [categories, setCategories] = useState(uniqueCategories);
  const [category, setCategory] = useState("all projects");
  const filteredProjects = projectData.filter((project) => {
    return category === "all projects"
      ? project
      : project.category === category;
  });

  console.log(filteredProjects);

  return (
    <Tabs defaultValue={category} className="mb-24 xl:mb-48">
      <TabsList className="w-full grid h-full md:grid-cols-4 mb-12 mx-auto md:border  lg:max-w-[640px]">
        {categories?.map((category, index) => {
          return (
            <TabsTrigger
              onClick={() => setCategory(category)}
              key={index}
              value={category}
              className="capitalize w-[162px] md:w-auto"
            >
              {category}
            </TabsTrigger>
          );
        })}
      </TabsList>
      <div className="grid grid-cols-1 gap-4 text-lg xl:mt-8 lg:grid-cols-3">
        {filteredProjects?.map((project, index) => {
          return (
            <TabsContent value={category} key={index}>
              <ProjectCard project={project} />
            </TabsContent>
          );
        })}
      </div>
    </Tabs>
  );
};

export default ProjectComponent;
