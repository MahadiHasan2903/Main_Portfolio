"use client";

import React, { useEffect, useState } from "react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Camera } from "lucide-react";
import Image from "next/image";
import api from "../../../../app/api";
import uploadImageOnCloudinary from "../../../util/uploadCloudinary";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const UpdateInfo = () => {
  const { data: session } = useSession();
  const token = session?.token;
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    dateOfBirth: "",
    degree: "",
    totalExperience: "",
    totalProjects: "",
    totalClients: "",
    languages: "",
    primaryImage: "",
    secondaryImage: "",
  });

  useEffect(() => {
    const fetchInformation = async () => {
      try {
        const response = await api.info.getInfo();

        const formattedDateOfBirth = response.dateOfBirth
          ? new Date(response.dateOfBirth).toISOString().split("T")[0]
          : "";

        setFormData({
          ...response,
          dateOfBirth: formattedDateOfBirth,
        });
      } catch (error) {
        console.error("Error fetching information:", error);
      }
    };

    fetchInformation();
  }, []);

  const handleImageChange = (e, imageType) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          [imageType]: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Ensure both primary and secondary images are uploaded
      if (!formData.primaryImage || !formData.secondaryImage) {
        throw new Error("Please upload both primary and secondary images.");
      }

      // Upload primary image to Cloudinary
      const primaryImage = await uploadImageOnCloudinary(formData.primaryImage);

      // Upload secondary image to Cloudinary
      const secondaryImage = await uploadImageOnCloudinary(
        formData.secondaryImage
      );

      // Prepare information for user creation
      const updateInformation = {
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        address: formData.address,
        dateOfBirth: formData.dateOfBirth,
        degree: formData.degree,
        languages: formData.languages,
        primaryImage: primaryImage.url,
        secondaryImage: secondaryImage.url,
        totalExperience: formData.totalExperience,
        totalProjects: formData.totalProjects,
        totalClients: formData.totalClients,
      };

      const updateUserResponse = await api.info.updateInfo(
        updateInformation,
        token
      );

      toast.success("User updated successfully!");
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="w-[80%] 800px:w-[50%] bg-tertiary dark:bg-secondary/40  shadow h-[90vh] rounded-[4px] p-3 overflow-y-scroll flex flex-col items-center text-center">
      <h1 className="py-5 h2">Update your Information</h1>

      <div className="flex flex-col items-center justify-between my-6 lg:flex-row">
        <div className="relative flex flex-col items-center justify-center w-full my-5 lg:mx-5">
          <label
            htmlFor="primaryImageInput"
            className="w-32 h-32 overflow-hidden rounded-full"
          >
            <input
              type="file"
              id="primaryImageInput"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageChange(e, "primaryImage")}
            />
            {formData.primaryImage ? (
              <img
                src={formData.primaryImage}
                alt="Primary Image"
                className="object-cover w-full h-full bg-gray-300"
              />
            ) : (
              <Image
                src="/about/person.png"
                alt="developer"
                width={500}
                height={500}
                className="object-cover bg-gray-300"
              />
            )}
            <div className="absolute right-0 rounded-full cursor-pointer bottom-12">
              <label htmlFor="primaryImageInput">
                <Camera size={20} className="cursor-pointer text-primary" />
              </label>
            </div>
          </label>
          <p>Primary Image</p>
        </div>

        <div className="relative flex flex-col items-center justify-center w-full my-5 lg:mx-5">
          <label
            htmlFor="secondaryImageInput"
            className="w-32 h-32 overflow-hidden rounded-full"
          >
            <input
              type="file"
              id="secondaryImageInput"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageChange(e, "secondaryImage")}
            />
            {formData.secondaryImage ? (
              <img
                src={formData.secondaryImage}
                alt="Secondary Image"
                className="object-cover w-full h-full bg-gray-300"
              />
            ) : (
              <Image
                src="/about/person.png"
                alt="developer"
                width={500}
                height={500}
                className="object-cover bg-gray-300"
              />
            )}
            <div className="absolute right-0 rounded-full cursor-pointer bottom-12">
              <label htmlFor="secondaryImageInput">
                <Camera size={20} className="cursor-pointer text-primary" />
              </label>
            </div>
          </label>
          <p>Secondary Image</p>
        </div>
      </div>
      <form
        className="flex flex-col w-full md:w-[80%] gap-y-4 xl:w-[70%] my-10"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center justify-around w-full ">
          <Input
            type="text"
            id="name"
            placeholder="Name"
            className="my-2 "
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            type="text"
            id="phoneNumber"
            placeholder="Phone Number"
            className="my-2 "
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <Input
            type="email"
            id="email"
            placeholder="Email"
            className="my-2 "
            value={formData.email}
            onChange={handleChange}
          />

          <Input
            type="text"
            id="address"
            placeholder="Address"
            className="my-2 "
            value={formData.address}
            onChange={handleChange}
          />
          <Input
            type="date"
            id="dateOfBirth"
            placeholder="Date of Birth"
            className="my-2 "
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
          <Input
            type="text"
            id="degree"
            placeholder="Degree"
            className="my-2 "
            value={formData.degree}
            onChange={handleChange}
          />

          <Input
            type="number"
            id="totalExperience"
            className="my-2 "
            placeholder="Total Experience"
            value={formData.totalExperience}
            onChange={handleChange}
          />
          <Input
            type="number"
            id="totalProjects"
            placeholder="Total Projects"
            className="my-2 "
            value={formData.totalProjects}
            onChange={handleChange}
          />
          <Input
            type="number"
            id="totalClients"
            placeholder="Total Clients"
            className="my-2 "
            value={formData.totalClients}
            onChange={handleChange}
          />

          <Input
            type="text"
            id="languages"
            placeholder="Languages"
            className="my-2 "
            value={formData.languages}
            onChange={handleChange}
          />
        </div>

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

export default UpdateInfo;
