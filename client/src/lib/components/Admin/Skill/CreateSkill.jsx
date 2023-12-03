"use client";

import React, { useState } from "react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Paperclip } from "lucide-react";
import api from "../../../../app/api";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import uploadImageOnCloudinary from "../../../util/uploadCloudinary";

const CreateSkill = () => {
  const { data: session } = useSession();
  const token = session?.token;
  const [name, setName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

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

    try {
      if (!name) {
        toast.error("Please provide a skill name");
        return;
      }

      let imgPath = null;

      if (selectedImage) {
        const uploadResponse = await uploadImageOnCloudinary(selectedImage);
        imgPath = uploadResponse.url;
      }

      const createSkillData = {
        name,
        imgPath,
      };

      console.log(createSkillData);

      const response = await api.skill.createSkill(createSkillData, token);
      console.log("Skill created:", response);

      toast.success("Skill created successfully!");
      setName("");
      setSelectedImage(null);
    } catch (error) {
      console.error("Error creating skill:", error);
      toast.error("Error creating skill");
    }
  };

  return (
    <div className="w-[80%] 800px:w-[50%] bg-tertiary dark:bg-secondary/40  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll flex flex-col items-center text-center">
      <h1 className="py-5 h2">Create your Skill</h1>
      <form
        className="flex flex-col w-full md:w-[80%] gap-y-4 xl:w-[50%] my-10"
        onSubmit={handleSubmit}
      >
        <Input
          type="text"
          id="name"
          placeholder="Skill Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex">
          <Input
            type="file"
            id="image"
            placeholder=" Image"
            className="hidden"
            onChange={handleImageChange}
          />

          {selectedImage ? (
            <div className="flex flex-wrap items-center w-full">
              <img
                src={selectedImage}
                alt="Selected"
                className="h-[80px] w-[80px] object-cover m-2"
              />
            </div>
          ) : (
            <label htmlFor="image">
              <div className="flex items-center justify-center w-full px-5 py-3 text-white transition-all rounded-full cursor-pointer bg-secondary/40 hover:bg-primary">
                <Paperclip size={20} color="#fff" />

                <p className="ml-3">Upload Skill Logo</p>
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

export default CreateSkill;
