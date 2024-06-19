import React, { useEffect, useState } from "react";
import { skillData } from "../../util/data";
import { Card, CardDescription, CardTitle } from "../../components/ui/card";
import Image from "next/image";
import api from "../../../app/api";

const Skill = () => {
  const getData = (arr, title) => {
    return arr.find((item) => item.title === title);
  };

  const [fetchedSkills, setFetchedSkills] = useState([]);

  useEffect(() => {
    const fetchAllSkills = async () => {
      try {
        const response = await api.skill.getAllSkills();
        if (response && response.data) {
          setFetchedSkills(response.data);
        }
      } catch (error) {
        console.error("Error occurred while fetching user data:", error);
      }
    };

    fetchAllSkills();
  }, []);
  return (
    <div className="text-center xl:text-left">
      <h3 className="mb-8 h3">What I use everyday</h3>
      <div className="mb-16">
        <h4 className="mb-2 text-2xl font-semibold ">Skills</h4>
        <div className="border-b border-border"></div>
        <div className="mt-5">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-7">
            {fetchedSkills.map((item, index) => {
              const { name, imgPath } = item;
              return (
                <Card
                  key={index}
                  className="bg-tertiary dark:bg-secondary/40 p-1 min-h-[50px] mx-4"
                >
                  <CardDescription className="">
                    <div className="flex items-center justify-center px-3 py-1">
                      <Image
                        src={imgPath}
                        alt={name}
                        width={40}
                        height={40}
                        priority="true"
                      />
                      <CardTitle className="ml-2 text-lg">{name}</CardTitle>
                    </div>
                  </CardDescription>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
      <div>
        <h4 className="mb-2 text-xl font-semibold xl:text-left">Tools</h4>
        <div className="mb-4 border-b border-border"></div>
        <div className="flex justify-center gap-x-8 ">
          {getData(skillData, "tools").data?.map((item, index) => {
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
          })}
        </div>
      </div>
    </div>
  );
};

export default Skill;
