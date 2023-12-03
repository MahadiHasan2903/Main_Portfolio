"use client";

import React, { useEffect, useState } from "react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { X, Paperclip } from "lucide-react";
import uploadImageOnCloudinary from "../../../util/uploadCloudinary";
import api from "../../../../app/api";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const UpdateSkill = ({ skill, onClose }) => {
  const { data: session } = useSession();
  const token = session?.token;
  const [name, setName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (skill) {
      setName(skill.name);
    }
  }, [skill]);

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

      const updateSkillData = {
        name,
        imgPath,
      };

      console.log(updateSkillData);

      const response = await api.skill.updateSkill(
        updateSkillData,
        token,
        skill._id
      );
      console.log("Skill updated:", response);

      toast.success("Skill updated successfully!");
      setName("");
      setSelectedImage(null);
    } catch (error) {
      toast.error("Error updating skill");
    }
  };

  return (
    <div className="w-[50%] 800px:w-[50%] bg-tertiary relative dark:bg-secondary/40  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll flex flex-col items-center text-center">
      <h1 className="py-5 h2">Update your Skill</h1>
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
          Update
        </Button>
      </form>
    </div>
  );
};

export default UpdateSkill;
