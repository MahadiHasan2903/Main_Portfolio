import React, { useEffect, useState } from "react";
import api from "../../../app/api";
import { Briefcase, GraduationCap } from "lucide-react";

const Qualification = () => {
  const [fetchedExperiences, setFetchedExperiences] = useState([]);
  const [fetchedEducations, setFetchedEducations] = useState([]);

  useEffect(() => {
    const fetchAllExperiences = async () => {
      try {
        const response = await api.experience.getAllExperiences();
        setFetchedExperiences(response.data);
      } catch (error) {
        console.error("Error occurred while fetching user data:", error);
      }
    };

    fetchAllExperiences();
  }, []);

  useEffect(() => {
    const fetchAllEducations = async () => {
      try {
        const response = await api.education.getAllEducations();
        setFetchedEducations(response.data);
      } catch (error) {
        console.error("Error occurred while fetching user data:", error);
      }
    };

    fetchAllEducations();
  }, []);
  return (
    <div className="grid md:grid-cols-2 gap-y-8">
      <div className="flex flex-col gap-y-6">
        <div className="flex gap-x-4 items-center text-[22px] text-primary ">
          <Briefcase />
          <h4 className="font-medium capitalize">Experience</h4>
        </div>
        <div className="flex flex-col gap-y-8">
          {fetchedExperiences?.map((item, index) => {
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
                  <div className="text-base font-medium">{years}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-y-6">
        <div className="flex gap-x-4 items-center text-[22px] text-primary mb-5">
          <GraduationCap />
          <h4 className="font-medium capitalize">Education</h4>
        </div>
        <div className="flex flex-col gap-y-8">
          {fetchedEducations?.map((item, index) => {
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
                  <div className="text-base font-medium">{session}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Qualification;
