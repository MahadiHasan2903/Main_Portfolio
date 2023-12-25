"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "../ui/tabs";
import ProjectCard from "./ProjectCard";
import api from "../../../app/api";

const ProjectComponent = () => {
  const [fetchedProjects, setFetchedProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("all projects");

  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        const response = await api.project.getAllProjects();
        console.log(response);
        if (response && response.data) {
          setFetchedProjects(response.data);

          const uniqueCategories = [
            "all projects",
            ...new Set(response.data.map((item) => item.category)),
          ];
          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error("Error occurred while fetching user data:", error);
      }
    };

    fetchAllProjects();
  }, []);

  return (
    <Tabs defaultValue={category} className="mb-24 xl:mb-48">
      <TabsList className="w-full grid h-full md:grid-cols-4 mb-12 mx-auto md:border  lg:max-w-[640px]">
        {categories?.map((category, index) => {
          return (
            <TabsTrigger
              onClick={() => setCategory(category)}
              key={index}
              value={category}
              className="capitalize w-[162px] md:w-auto mr-2"
            >
              {category}
            </TabsTrigger>
          );
        })}
      </TabsList>
      <div className="grid grid-cols-1 gap-4 text-lg xl:mt-8 lg:grid-cols-3">
        {fetchedProjects
          .filter(
            (project) =>
              category === "all projects" || project.category === category
          )
          .map((project, index) => (
            <TabsContent value={category} key={index}>
              <ProjectCard project={project} />
            </TabsContent>
          ))}
      </div>
    </Tabs>
  );
};

export default ProjectComponent;
