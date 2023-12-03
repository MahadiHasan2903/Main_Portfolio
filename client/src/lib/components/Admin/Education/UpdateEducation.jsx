"use client";

import React, { useEffect, useState } from "react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { X } from "lucide-react";
import { useSession } from "next-auth/react";
import api from "../../../../app/api";
import { toast } from "react-toastify";

const UpdateEducation = ({ education, onClose }) => {
  const { data: session } = useSession();
  const token = session?.token;
  const [formData, setFormData] = useState({
    institution: "",
    degree: "",
    session: "",
  });

  useEffect(() => {
    if (education) {
      setFormData({
        institution: education.institution,
        degree: education.degree,
        session: education.session,
      });
    }
  }, [education]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updateEducationData = {
        institution: formData.institution,
        degree: formData.degree,
        session: formData.session,
      };

      console.log("Update Education Data:", updateEducationData);
      console.log("Sending request...");

      const updateEducationResponse = await api.education.updateEducation(
        updateEducationData,
        token,
        education._id
      );

      console.log("Update Education Response:", updateEducationResponse);
      setFormData({
        institution: "",
        degree: "",
        session: "",
      });
      toast.success("Education updated successfully!");
    } catch (error) {
      console.error("Error updating education:", error.message);
      toast.error("Failed to update education. Please try again.");
    }
  };

  return (
    <div className="w-[50%] 800px:w-[50%] bg-tertiary dark:bg-secondary/40  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll flex flex-col items-center text-center relative">
      <h1 className="py-5 h2">Update your Education</h1>
      <div className="absolute cursor-pointer right-5 top-2" onClick={onClose}>
        <X size={30} />
      </div>
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
          Update
        </Button>
      </form>
    </div>
  );
};

export default UpdateEducation;
