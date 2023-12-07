"use client";

import React, { useEffect, useState } from "react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { X } from "lucide-react";
import api from "../../../../app/api";

import uploadImageOnCloudinary from "../../../util/uploadCloudinary";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const UpdateUser = ({ user, onClose }) => {
  const { data: session } = useSession();
  const token = session?.token;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
      };

      const response = await api.users.updateUser(user._id, updatedUser, token);
      console.log(response);

      toast.success("User profile updated successfully");
    } catch (error) {
      toast.error("Errors:", error);
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
          placeholder="User Name"
          value={formData.name}
          onChange={handleChange}
        />
        <Input
          type="email"
          id="email"
          placeholder="User Email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          type="text"
          id="role"
          placeholder="User Role"
          value={formData.role}
          onChange={handleChange}
        />
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

export default UpdateUser;
