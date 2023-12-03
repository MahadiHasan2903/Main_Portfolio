"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import ProjectCard from "./ProjectCard";
import api from "../../../app/api";

const Work = () => {
  const [fetchedProjects, setFetchedProjects] = useState([]);

  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        const response = await api.project.getAllProjects();
        console.log(response);
        if (response && response.data) {
          setFetchedProjects(response.data);
        }
        console.log("Response:", fetchedProjects);
      } catch (error) {
        console.error("Error occurred while fetching user data:", error);
      }
    };

    fetchAllProjects();
  }, []);

  return (
    <section className="relative mb-24 xl:mb-48">
      <div className="container mx-auto">
        <div className=" max-w-[400px] mx-auto xl:mx-0 text-center xl:text-left mb-12 xl:h-[400px] flex flex-col justify-center items-center xl:items-start">
          <h2 className="mb-4 section-title">Latest Project</h2>
          <p className="mb-8 subtitle">
            Here are some of my latest works.
            <br />
            To check out all of my projects here.
          </p>
          <Link href="/projects">
            <Button>All Projects</Button>
          </Link>
        </div>
        <div className="xl:absolute right-0 top-0 xl:max-w-[1000px]">
          <Swiper
            className="h-[500px] "
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
            }}
            spaceBetween={30}
            modules={[Pagination]}
            pagination={{ clickable: true }}
          >
            {fetchedProjects?.slice(0, 4).map((project, index) => {
              return (
                <SwiperSlide key={index}>
                  <ProjectCard project={project} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Work;
