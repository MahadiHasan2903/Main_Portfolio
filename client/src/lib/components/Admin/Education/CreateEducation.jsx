"use client";

import React, { useState } from "react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useSession } from "next-auth/react";
import api from "../../../../app/api";
import { toast } from "react-toastify";

const CreateEducation = () => {
  const { data: session } = useSession();
  const token = session?.token;
  const [formData, setFormData] = useState({
    institution: "",
    degree: "",
    session: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const createEducationData = {
        institution: formData.institution,
        degree: formData.degree,
        session: formData.session,
      };

      const response = await api.education.createEducation(
        createEducationData,
        token
      );

      setFormData({
        institution: "",
        degree: "",
        session: "",
      });

      toast.success("Education created successfully!");
    } catch (error) {
      console.error("Error creating education:", error);
      toast.error("Error creating education");
    }
  };

  return (
    <div className="w-[80%] 800px:w-[50%] bg-tertiary dark:bg-secondary/40  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll flex flex-col items-center text-center">
      <h1 className="py-5 h2">Create your Education</h1>
      <form
        className="flex flex-col w-full md:w-[80%] gap-y-4 xl:w-[50%] my-10"
        onSubmit={handleSubmit}
      >
        <Input
          type="text"
          id="institution"
          placeholder="Institution Name"
          value={formData.institution}
          onChange={handleChange}
        />
        <Input
          type="text"
          id="degree"
          placeholder="Degree Name"
          value={formData.degree}
          onChange={handleChange}
        />
        <Input
          type="text"
          id="session"
          placeholder="Session"
          value={formData.session}
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

export default CreateEducation;
