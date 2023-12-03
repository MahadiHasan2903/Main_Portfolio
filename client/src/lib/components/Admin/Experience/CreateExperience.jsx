"use client";

import React, { useState } from "react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import api from "../../../../app/api";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const CreateExperience = () => {
  const { data: session } = useSession();
  const token = session?.token;
  const [formData, setFormData] = useState({
    organization: "",
    designation: "",
    years: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const createExperienceData = {
        organization: formData.organization,
        designation: formData.designation,
        years: formData.years,
      };

      const response = await api.experience.createExperience(
        createExperienceData,
        token
      );
      console.log("Experience created:", response);

      setFormData({
        organization: "",
        designation: "",
        years: "",
      });

      toast.success("Experience created successfully!");
    } catch (error) {
      console.error("Error creating experience:", error);
      toast.error("Error creating experience");
    }
  };
  return (
    <div className="w-[80%] 800px:w-[50%] bg-tertiary dark:bg-secondary/40  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll flex flex-col items-center text-center">
      <h1 className="py-5 h2">Create your Experience</h1>
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

        <Button
          type="submit"
          className="flex gap-x-1 items-center max-w-[200px] "
        >
          Create
        </Button>
      </form>
    </div>
  );
};

export default CreateExperience;
