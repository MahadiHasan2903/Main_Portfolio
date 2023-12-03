"use client";

import React, { useState } from "react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Paperclip } from "lucide-react";
import uploadImageOnCloudinary from "../../../util/uploadCloudinary";
import api from "../../../../app/api";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const CreateProjet = () => {
  const { data: session } = useSession();
  const token = session?.token;
  const [formData, setFormData] = useState({
    name: "",
    technologies: "",
    category: "",
    github: "",
    preview: "",
    image: null,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        setFormData({ ...formData, image: event.target.result });
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, image: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    if (formData.image) {
      try {
        console.log("Uploading image to Cloudinary...");
        const uploadedImage = await uploadImageOnCloudinary(formData.image);
        console.log("Uploaded Image URL:", uploadedImage.url);

        const createProjectData = {
          name: formData.name,
          technologies: formData.technologies,
          category: formData.category,
          github: formData.github,
          preview: formData.preview,
          image: uploadedImage.url,
        };

        console.log("Create Project Data:", createProjectData);
        console.log("Sending request...");

        const createProjectResponse = await api.project.createProject(
          createProjectData,
          token
        );

        console.log("Create Project Response:", createProjectResponse);
        setFormData({
          name: "",
          technologies: "",
          category: "",
          github: "",
          preview: "",
          image: null,
        });
        toast.success("Project created successfully!");
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error.message);
        toast.error("Failed to create project. Please try again.");
      }
    } else {
      console.log("No selected image found.");
    }
  };

  return (
    <div className="w-[80%] 800px:w-[50%] bg-tertiary dark:bg-secondary/40  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll flex flex-col items-center text-center">
      <h1 className="py-5 h2">Create your Project</h1>
      <form
        className="flex flex-col w-full md:w-[80%] gap-y-4 xl:w-[50%] my-10"
        onSubmit={handleSubmit}
      >
        <Input
          type="text"
          id="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <Input
          type="text"
          id="technologies"
          placeholder="Technologies"
          value={formData.technologies}
          onChange={handleChange}
        />
        <Input
          type="text"
          id="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />

        <Input
          type="text"
          id="github"
          placeholder="Github link"
          value={formData.github}
          onChange={handleChange}
        />
        <Input
          type="text"
          id="preview"
          placeholder="Live link"
          value={formData.preview}
          onChange={handleChange}
        />
        <div className="flex">
          <Input
            type="file"
            id="image"
            placeholder="Image"
            className="hidden"
            onChange={handleImageChange}
          />

          {formData.image ? (
            <div className="flex flex-wrap items-center w-full">
              <img
                src={formData.image}
                alt="Selected"
                className="h-[120px] w-[120px] object-cover m-2"
              />
            </div>
          ) : (
            <label htmlFor="image">
              <div className="flex items-center justify-center w-full px-5 py-3 text-white transition-all rounded-full cursor-pointer bg-secondary/40 hover:bg-primary">
                <Paperclip size={20} color="#fff" />
                <p className="ml-3">Upload Image</p>
              </div>
            </label>
          )}
        </div>
        <Button
          type="submit"
          className="flex gap-x-1 items-center justify-center max-w-[350px] mt-10"
        >
          Create
        </Button>
      </form>
    </div>
  );
};

export default CreateProjet;
