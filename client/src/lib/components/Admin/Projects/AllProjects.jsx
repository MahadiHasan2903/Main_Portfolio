"use client";

import React, { useEffect, useState } from "react";
import UpdateProject from "./UpdateProject";
import {
  PenSquare,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Github,
  Link2Icon,
} from "lucide-react";
import api from "../../../../app/api";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const AllProjects = () => {
  const { data: session } = useSession();
  const token = session?.token;
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [fetchedProjects, setFetchedProjects] = useState([]);

  const indexOfLastProject = currentPage * rowsPerPage;
  const indexOfFirstProject = indexOfLastProject - rowsPerPage;
  const currentProjects = fetchedProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const totalPages = Math.ceil(fetchedProjects.length / rowsPerPage);

  const handleEdit = (project) => {
    setSelectedProject(project);
    setOpen(true);
  };

  const closeUpdateProject = () => {
    setOpen(false);
    setSelectedProject(null);
  };

  const handleDelete = async (id) => {
    try {
      await api.project.deleteProject(id, token);

      setFetchedProjects((prevProjects) =>
        prevProjects.filter((project) => project._id !== id)
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
    const fetchAllProjects = async () => {
      try {
        const response = await api.project.getAllProjects();
        console.log(response);
        if (response && response.data) {
          setFetchedProjects(response.data);
        }
        console.log("Response:", fetchedProjects);
      } catch (error) {
        console.error("Error occurred while fetching user data:", error);
      }
    };

    fetchAllProjects();
  }, []);

  return (
    <div className="md:w-[80%] w-[full] bg-tertiary dark:bg-secondary/40 shadow h-[85vh] rounded-[4px] flex flex-col items-center text-center overflow-y-scroll">
      <h1 className="pt-5 text-center md:h2 h3">All Projects List</h1>
      <div className="flex flex-col items-start justify-start w-full m-5 lg:items-center">
        <div className="w-[100%] h-[60%] md:h-full overflow-scroll md:overflow-hidden">
          <table className="w-[90%] m-5 border-collapse border-gray-600 dark:bg-transparent">
            <thead>
              <tr>
                <th className="py-3 border">Name</th>
                <th className="py-3 border">Category</th>
                <th className="py-3 border">Technologies</th>
                <th className="py-3 border">Source code</th>
                <th className="py-3 border">Live preview</th>
                <th className="px-2 py-3 border">Edit</th>
                <th className="px-2 py-3 border">Delete</th>
              </tr>
            </thead>
            <tbody>
              {currentProjects.map((project) => (
                <tr key={project._id}>
                  <td className="py-3 border">{project.name}</td>
                  <td className="py-3 border">{project.category}</td>
                  <td className="py-3 border">{project.technologies}</td>
                  <td className="py-3 border">
                    <div className="flex items-center justify-center">
                      <Link href={project.github} target="_blank">
                        <Github size={20} />
                      </Link>
                    </div>
                  </td>
                  <td className="py-3 border">
                    <div className="flex items-center justify-center">
                      <Link href={project.preview} target="_blank">
                        <Link2Icon size={20} />
                      </Link>
                    </div>
                  </td>
                  <td className="py-3 border">
                    <button onClick={() => handleEdit(project)}>
                      <PenSquare size={20} className="text-primary" />
                    </button>
                  </td>
                  <td className="py-3 border">
                    <button onClick={() => handleDelete(project._id)}>
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
      {open && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <UpdateProject
            project={selectedProject}
            onClose={closeUpdateProject}
          />
        </div>
      )}
    </div>
  );
};

export default AllProjects;
