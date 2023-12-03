import React, { useEffect, useState } from "react";
import api from "../../../app/api";
import {
  GraduationCap,
  Briefcase,
  User2,
  PhoneCall,
  MailIcon,
  Calendar,
  HomeIcon,
} from "lucide-react";

const Information = () => {
  const [personalInfo, setPersonalInfo] = useState({});

  useEffect(() => {
    const fetchInformation = async () => {
      try {
        const response = await api.info.getInfo();
        setPersonalInfo(response);
      } catch (error) {
        console.error("Error fetching information:", error);
      }
    };

    fetchInformation();
  }, []);

  const formatDate = (inputDate) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    const date = new Date(inputDate);
    return date.toLocaleDateString("en-US", options);
  };

  const renderPersonalInfo = () => {
    if (!personalInfo) return null;

    const formattedDateOfBirth = formatDate(personalInfo.dateOfBirth);

    const personalData = [
      { icon: <User2 size={20} />, value: personalInfo.name, label: "Name" },
      {
        icon: <PhoneCall size={20} />,
        value: personalInfo.phoneNumber,
      },
      {
        icon: <MailIcon size={20} />,
        value: personalInfo.email,
      },
      {
        icon: <Calendar size={20} />,
        value: `Born on ${formattedDateOfBirth}`,
      },
      {
        icon: <GraduationCap size={20} />,
        value: personalInfo.degree,
      },
      {
        icon: <HomeIcon size={20} />,
        value: personalInfo.address,
      },
    ];

    return (
      <div className="grid gap-4 mb-12 xl:grid-cols-2">
        {personalData.map((item, index) => (
          <div
            key={index}
            className="flex items-center mx-auto gap-x-4 xl:mx-0"
          >
            <div className="text-primary">{item.icon}</div>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="text-center xl:text-left">
      <div className="flex flex-col justify-center xl:text-left">
        <h3 className="mb-4 h3">Unmatched Service Quality for over 1 year</h3>
        <p className="max-w-xl subtitle max-auto xl:mx-0">
          I specialize in crafting intuitive websites with cutting-edge
          technology, delivering dynamic and engaging user experiences.
        </p>
      </div>

      {renderPersonalInfo()}

      <div className="flex flex-col gap-y-2 ">
        <div className="text-primary">Language Skill</div>
        <div className="border-b border-border"></div>
        <div>{personalInfo.languages}</div>
      </div>
    </div>
  );
};

export default Information;
