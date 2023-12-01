"use client";

import React, { useState } from "react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Camera } from "lucide-react";
import Image from "next/image";

const UpdateInfo = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    address: "",
    dateOfBirth: "",
    degree: "",
    languages: "",
    primaryImage: null,
    secondaryImage: null,
    totalExperience: "",
    totalProjects: "",
    totalClients: "",
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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
                src="/hero/developer.png"
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
                src="/hero/developer.png"
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
        <div className="flex items-center justify-around w-full">
          <Input
            type="text"
            id="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            type="text"
            id="phoneNumber"
            placeholder="Phone Number"
            className="mx-2"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <Input
            type="text"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-around w-full">
          <Input
            type="text"
            id="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />
          <Input
            type="text"
            id="dateOfBirth"
            placeholder="Date of Birth"
            className="mx-2"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
          <Input
            type="text"
            id="degree"
            placeholder="Degree"
            value={formData.degree}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-around w-full">
          <Input
            type="text"
            id="totalExperience"
            placeholder="Total Experience"
            value={formData.totalExperience}
            onChange={handleChange}
          />
          <Input
            type="text"
            id="totalProjects"
            placeholder="Total Projects"
            className="mx-2"
            value={formData.totalProjects}
            onChange={handleChange}
          />
          <Input
            type="text"
            id="totalClients"
            placeholder="Total Clients"
            value={formData.totalClients}
            onChange={handleChange}
          />
        </div>

        <div className="w-[50%]">
          <Input
            type="text"
            id="languages"
            placeholder="Languages"
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
