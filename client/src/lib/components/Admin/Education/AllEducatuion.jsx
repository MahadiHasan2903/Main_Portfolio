"use client";

import React, { useEffect, useState } from "react";
import UpdateEducation from "./UpdateEducation";
import { PenSquare, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import api from "../../../../app/api";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const AllEducation = () => {
  const { data: session } = useSession();
  const token = session?.token;
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState(null);
  const [fetchedEducations, setFetchedEducations] = useState([]);

  const indexOfLastEducation = currentPage * rowsPerPage;
  const indexOfFirstEducation = indexOfLastEducation - rowsPerPage;
  const currentEducation = fetchedEducations.slice(
    indexOfFirstEducation,
    indexOfLastEducation
  );

  const totalPages = Math.ceil(fetchedEducations?.length / rowsPerPage);

  useEffect(() => {
    const fetchAllEducations = async () => {
      try {
        const response = await api.education.getAllEducations();
        setFetchedEducations(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error occurred while fetching user data:", error);
      }
    };

    fetchAllEducations();
  }, []);

  const handleEdit = (education) => {
    setSelectedEducation(education);
    setOpen(true);
  };
  const closeUpdateEducation = () => {
    setOpen(false);
    setSelectedEducation(null);
  };

  const handleDelete = async (id) => {
    try {
      await api.education.deleteEducation(id, token);

      setSelectedEducation((prevEducations) =>
        prevEducations?.filter((education) => education._id !== id)
      );

      toast.success("Education deleted successfully");
    } catch (error) {
      toast.error(`Error deleting Education: ${error}`);
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="md:w-[80%] w-[full] bg-tertiary dark:bg-secondary/40 shadow h-[85vh] rounded-[4px] flex flex-col items-center text-center overflow-hidden">
      <h1 className="pt-5 md:h2 h3">All Education List</h1>
      <div className="flex flex-col items-start justify-center w-full m-5 lg:items-center">
        <div className="w-[100%] h-[100%] md:h-full overflow-scroll md:overflow-hidden">
          <table className="w-[90%] m-5 border-collapse border-gray-600 dark:bg-transparent ">
            <thead>
              <tr className="">
                <th className="py-3 border">Institution</th>
                <th className="py-3 border">Degree</th>
                <th className="py-3 border">Session</th>
                <th className="px-2 py-3 border">Edit</th>
                <th className="px-2 py-3 border">Delete</th>
              </tr>
            </thead>
            <tbody>
              {currentEducation?.map((education) => (
                <tr key={education._id} className="">
                  <td className="py-3 border">{education.institution}</td>
                  <td className="py-3 border">{education.degree}</td>
                  <td className="py-3 border">{education.session}</td>
                  <td className="py-3 border">
                    <button onClick={() => handleEdit(education)}>
                      <PenSquare size={20} className="text-primary" />
                    </button>
                  </td>
                  <td className="py-3 border">
                    <button onClick={() => handleDelete(education._id)}>
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
      {open && selectedEducation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <UpdateEducation
            education={selectedEducation}
            onClose={closeUpdateEducation}
          />
        </div>
      )}
    </div>
  );
};

export default AllEducation;
