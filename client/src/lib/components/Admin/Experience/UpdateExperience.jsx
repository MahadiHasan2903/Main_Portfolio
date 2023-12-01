"use client";

import React, { useEffect, useState } from "react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { X } from "lucide-react";

const UpdateExperience = ({ experience, onClose }) => {
  const [formData, setFormData] = useState({
    organization: "",
    designation: "",
    years: "",
  });

  useEffect(() => {
    if (experience) {
      setFormData({
        organization: experience.organization,
        designation: experience.designation,
        years: experience.years,
      });
    }
  }, [experience]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <div className="w-[50%] 800px:w-[50%] bg-tertiary dark:bg-secondary/40  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll flex flex-col items-center text-center relative">
      <h1 className="py-5 h3 ">Update your Experience</h1>
      <div className="absolute cursor-pointer right-5 top-2" onClick={onClose}>
        <X size={30} />
      </div>
      <form
        className="flex flex-col w-full md:w-[80%] gap-y-4 xl:w-[50%] my-10"
        onSubmit={handleSubmit}
      >
        <Input
          type="text"
          id="organization"
          placeholder="Organization Name"
          value={formData.organization}
          onChange={handleChange}
        />
        <Input
          type="text"
          id="designation"
          placeholder="Designation"
          value={formData.designation}
          onChange={handleChange}
        />
        <Input
          type="text"
          id="years"
          placeholder="Years"
          value={formData.years}
          onChange={handleChange}
        />

        <Button type="submit" className="flex  items-center max-w-[100px] ">
          Update
        </Button>
      </form>
    </div>
  );
};

export default UpdateExperience;
