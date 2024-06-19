"use client";

import React, { useEffect, useState } from "react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Paperclip, X } from "lucide-react";
import uploadImageOnCloudinary from "../../../util/uploadCloudinary";
import { useSession } from "next-auth/react";
import api from "../../../../app/api";
import { toast } from "react-toastify";

const UpdateProject = ({ project, onClose }) => {
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

  useEffect(() => {
    if (project) {
      setFormData({
        id: project._id,
        name: project.name,
        technologies: project.technologies,
        category: project.category,
        github: project.github,
        preview: project.preview,
      });
    }
  }, [project]);

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

    if (formData.image) {
      try {
        const uploadedImage = await uploadImageOnCloudinary(formData.image);

        const updateProjectData = {
          name: formData.name,
          technologies: formData.technologies,
          category: formData.category,
          github: formData.github,
          preview: formData.preview,
          image: uploadedImage.url,
        };

        const updateProjectResponse = await api.project.updateProject(
          updateProjectData,
          token,
          project._id
        );

        setFormData({
          name: "",
          technologies: "",
          category: "",
          github: "",
          preview: "",
          image: null,
        });
        toast.success("Project updated successfully!");
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error.message);
        toast.error("Failed to update project. Please try again.");
      }
    } else {
      toast.error("No selected image found.");
    }
  };

  return (
    <div className="w-[80%] 800px:w-[50%] relative bg-tertiary   shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll flex flex-col items-center text-center">
      <h1 className="py-5 h2">Update your Project</h1>
      <div className="absolute cursor-pointer right-5 top-2" onClick={onClose}>
        <X size={30} />
      </div>
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
          Update
        </Button>
      </form>
    </div>
  );
};

export default UpdateProject;
