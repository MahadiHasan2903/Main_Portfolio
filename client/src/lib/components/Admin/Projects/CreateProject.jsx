"use client";

import React, { useState } from "react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Paperclip } from "lucide-react";
import uploadImageOnCloudinary from "../../../util/uploadCloudinary";

const CreateProjet = () => {
  const [formData, setFormData] = useState({
    name: "",
    technologies: "",
    category: "",
    github: "",
    preview: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        setSelectedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    if (selectedImage) {
      try {
        const uploadedImage = await uploadImageOnCloudinary(selectedImage);
        console.log("Image uploaded successfully:", uploadedImage.secure_url);
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error.message);
      }
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

          {selectedImage ? (
            <div className="flex flex-wrap items-center w-full">
              <img
                src={selectedImage}
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
