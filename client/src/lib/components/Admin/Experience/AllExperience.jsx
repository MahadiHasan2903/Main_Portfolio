"use client";

import React from "react";
import { qualificationData } from "../../../util/data";
import { PenSquare, Trash2 } from "lucide-react";

const AllExperience = () => {
  const experienceData = qualificationData.find(
    (data) => data.title === "experience"
  );

  console.log(experienceData);

  const handleDelete = (id) => {};

  return (
    <div
      className="w-[80%] 800px:w-[50%] bg-tertiary dark:bg-secondary/40 shadow h-[70vh] rounded-[4px] mt-10
      flex flex-col items-center text-center overflow-auto lg:overflow-hidden"
    >
      <h1 className="pt-5 md:h2 h3">All Experience List</h1>
      <div className="flex flex-col items-center justify-center w-full m-5">
        <table className="w-[90%] m-5 border-collapse border-gray-600 dark:bg-transparent">
          <thead>
            <tr className="">
              <th className="px-2 py-3 border">Id</th>
              <th className="py-3 border">Organization</th>
              <th className="py-3 border">Designation</th>
              <th className="py-3 border">Working period</th>
              <th className="px-2 py-3 border">Edit</th>
              <th className="px-2 py-3 border">Delete</th>
            </tr>
          </thead>
          <tbody>
            {experienceData.data.map((experience) => (
              <tr key={experience.id} className="">
                <td className="py-3 border">{experience.id}</td>
                <td className="py-3 border">{experience.organization}</td>
                <td className="py-3 border">{experience.designation}</td>
                <td className="py-3 border">{experience.years}</td>
                <td className="py-3 border">
                  <button>
                    <PenSquare size={20} className="text-primary" />
                  </button>
                </td>
                <td className="py-3 border">
                  <button onClick={() => handleDelete(experience.id)}>
                    <Trash2 size={20} className="text-primary" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllExperience;
