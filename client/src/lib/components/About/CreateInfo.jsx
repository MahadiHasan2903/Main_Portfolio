"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const CreateInfo = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    address: "",
    dateOfBirth: "",
    degree: "",
    languages: "",
    totalExperience: 0,
    totalProjects: 0,
    totalClients: 0,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <div className="w-[80%] 800px:w-[50%] bg-tertiary  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll flex flex-col items-center text-center">
      <h1 className="py-5 h2">Create your Information</h1>
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
          id="phoneNumber"
          placeholder="Phone Number"
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
        <Input
          type="text"
          id="languages"
          placeholder="Languages"
          value={formData.languages}
          onChange={handleChange}
        />
        <Input
          type="number"
          id="totalExperience"
          placeholder="Total Experience"
          value={formData.totalExperience}
          onChange={handleChange}
        />
        <Input
          type="number"
          id="totalProjects"
          placeholder="Total Projects"
          value={formData.totalProjects}
          onChange={handleChange}
        />
        <Input
          type="number"
          id="totalClients"
          placeholder="Total Clients"
          value={formData.totalClients}
          onChange={handleChange}
        />

        <Button
          type="submit"
          className="flex gap-x-1 items-center max-w-[200px] "
        >
          Create Information
        </Button>
      </form>
    </div>
  );
};

export default CreateInfo;
