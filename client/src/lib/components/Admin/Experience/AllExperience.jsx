"use client";

import React, { useEffect, useState } from "react";
import { qualificationData } from "../../../util/data";
import { PenSquare, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import UpdateExperience from "./UpdateExperience";
import { useSession } from "next-auth/react";
import api from "../../../../app/api";
import { toast } from "react-toastify";

const AllExperience = () => {
  const { data: session } = useSession();
  const token = session?.token;

  const experienceData = qualificationData.find(
    (data) => data.title === "experience"
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [fetchedExperiences, setFetchedExperiences] = useState([]);

  const indexOfLastExperience = currentPage * rowsPerPage;
  const indexOfFirstExperience = indexOfLastExperience - rowsPerPage;
  const currentExperience = fetchedExperiences.slice(
    indexOfFirstExperience,
    indexOfLastExperience
  );

  const totalPages = Math.ceil(experienceData.data.length / rowsPerPage);

  useEffect(() => {
    const fetchAllExperiences = async () => {
      try {
        const response = await api.experience.getAllExperiences();
        setFetchedExperiences(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error occurred while fetching user data:", error);
      }
    };

    fetchAllExperiences();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.experience.deleteExperience(id, token);

      setFetchedExperiences((prevExperiences) =>
        prevExperiences.filter((experience) => experience._id !== id)
      );

      toast.success("Experience deleted successfully");
    } catch (error) {
      toast.error(`Error deleting experience: ${error}`);
    }
  };

  const handleEdit = (experience) => {
    setSelectedExperience(experience);
    setOpen(true);
  };
  const closeUpdateExperience = () => {
    setOpen(false);
    setSelectedExperience(null);
  };
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div
      className="w-[80%] 800px:w-[50%] bg-tertiary dark:bg-secondary/40 shadow h-[70vh] rounded-[4px] mt-10 
    flex flex-col items-center text-center overflow-auto overflow-y-auto lg:overflow-x-hidden"
    >
      <h1 className="pt-5 md:h2 h3">All Experience List</h1>
      <div className="flex flex-col items-center justify-center w-full m-5">
        <table className="w-[90%] m-5 border-collapse border-gray-600 dark:bg-transparent">
          <thead>
            <tr className="">
              <th className="py-3 border">Organization</th>
              <th className="py-3 border">Designation</th>
              <th className="py-3 border">Working period</th>
              <th className="px-2 py-3 border">Edit</th>
              <th className="px-2 py-3 border">Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentExperience.map((experience) => (
              <tr key={experience._id} className="">
                <td className="py-3 border">{experience.organization}</td>
                <td className="py-3 border">{experience.designation}</td>
                <td className="py-3 border">{experience.years}</td>
                <td className="py-3 border">
                  <button onClick={() => handleEdit(experience)}>
                    <PenSquare size={20} className="text-primary" />
                  </button>
                </td>
                <td className="py-3 border">
                  <button onClick={() => handleDelete(experience._id)}>
                    <Trash2 size={20} className="text-primary" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
            <div className="flex items-center justify-center">
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
                  currentPage < totalPages ? currentPage + 1 : currentPage
                )
              }
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
      {open && selectedExperience && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <UpdateExperience
            experience={selectedExperience}
            onClose={closeUpdateExperience}
          />
        </div>
      )}
    </div>
  );
};

export default AllExperience;
