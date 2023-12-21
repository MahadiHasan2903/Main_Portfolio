"use client";

import React, { useEffect, useState } from "react";
import UpdateSkill from "./UpdateSkill";
import { skillData } from "../../../util/data";
import { ChevronLeft, ChevronRight, PenSquare, Trash2 } from "lucide-react";
import Image from "next/image";
import api from "../../../../app/api";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const AllSkills = () => {
  const { data: session } = useSession();
  const token = session?.token;
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [fetchedSkills, setFetchedSkills] = useState([]);

  const skillsData = skillData.find((data) => data.title === "skills");
  const skills = skillsData ? skillsData.data : [];
  const indexOfLastSkill = currentPage * rowsPerPage;
  const indexOfFirstSkill = indexOfLastSkill - rowsPerPage;
  const currentSkills = fetchedSkills.slice(
    indexOfFirstSkill,
    indexOfLastSkill
  );

  const totalPages = Math.ceil(fetchedSkills.length / rowsPerPage);

  const handleEdit = (skill) => {
    setSelectedSkill(skill);
    setOpen(true);
  };

  const closeUpdateSkill = () => {
    setOpen(false);
    setSelectedSkill(null);
  };

  const handleDelete = async (id) => {
    try {
      await api.skill.deleteSkill(id, token);

      setFetchedSkills((prevSkills) =>
        prevSkills.filter((skill) => skill._id !== id)
      );

      toast.success("Project deleted successfully");
    } catch (error) {
      toast.error(`Error deleting project: ${error}`);
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetchAllSkills = async () => {
      try {
        const response = await api.skill.getAllSkills();
        console.log(response);
        if (response && response.data) {
          setFetchedSkills(response.data);
        }
        console.log("Response:", fetchedSkills);
      } catch (error) {
        console.error("Error occurred while fetching user data:", error);
      }
    };

    fetchAllSkills();
  }, []);
  return (
    <div className="md:w-[80%] w-[full] bg-tertiary dark:bg-secondary/40 shadow h-[85vh] rounded-[4px] flex flex-col items-center text-center overflow-hidden overflow-y-scroll">
      <h1 className="pt-5 md:h2 h3">All Skills List</h1>
      <div className="flex flex-col items-start justify-center w-full m-5 lg:items-center">
        <div className="w-[100%] h-[70%] md:h-full overflow-scroll md:overflow-hidden">
          <table className="w-[90%] m-5 border-collapse border-gray-600 dark:bg-transparent ">
            <thead>
              <tr>
                <th className="py-2 border">Skill Id</th>
                <th className="py-2 border">Skill Name</th>
                <th className="py-2 border">Skill logo</th>
                <th className="py-2 border">Edit</th>
                <th className="py-2 border">Delete</th>
              </tr>
            </thead>
            <tbody>
              {currentSkills.map((skill) => (
                <tr key={skill._id}>
                  <td className="py-2 border">{skill._id}</td>
                  <td className="py-2 border">{skill.name}</td>
                  <td className="py-2 text-center border">
                    <div className="flex items-center justify-center">
                      <Image
                        src={skill.imgPath}
                        alt={skill.name}
                        width={40}
                        height={40}
                      />
                    </div>
                  </td>

                  <td className="py-2 border">
                    <button onClick={() => handleEdit(skill)}>
                      <PenSquare size={20} className="text-primary" />
                    </button>
                  </td>
                  <td className="py-2 border">
                    <button onClick={() => handleDelete(skill._id)}>
                      <Trash2 size={20} className="text-primary" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between w-[80%] mt-4 flex-col md:flex-row">
          <div className="w-[80%] text-left mb-5 md:mb-0">
            <span>Show:</span>
            <select
              className="p-1 mx-2 mt-1 border rounded cursor-pointer"
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
              value={rowsPerPage}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span>rows per page</span>
          </div>
          <div className="w-[20%] flex items-center justify-around">
            <button
              className="cursor-pointer"
              onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center justify-center ">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`mx-1 px-3 py-1 rounded ${
                      currentPage === number ? "bg-primary text-white" : ""
                    }`}
                  >
                    {number}
                  </button>
                )
              )}
            </div>
            <button
              className="cursor-pointer"
              onClick={() =>
                paginate(
                  currentPage < Math.ceil(skills.length / rowsPerPage)
                    ? currentPage + 1
                    : currentPage
                )
              }
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
      {open && selectedSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <UpdateSkill skill={selectedSkill} onClose={closeUpdateSkill} />
        </div>
      )}
    </div>
  );
};

export default AllSkills;
