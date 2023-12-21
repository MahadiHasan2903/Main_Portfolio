"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Trash2, PenSquare } from "lucide-react";
import api from "../../../../app/api/index";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import UpdateUser from "./UpdateUser";

const AllUsers = () => {
  const { data: session } = useSession();
  const token = session?.token;

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);

  const indexOfLastUser = currentPage * rowsPerPage;
  const indexOfFirstUser = indexOfLastUser - rowsPerPage;
  const currentUser = fetchedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(fetchedUsers.length / rowsPerPage);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const closeUpdateUser = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const handleDelete = async (id, email) => {
    try {
      await api.users.deleteUser(id, token);

      setFetchedUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== id)
      );

      toast.success(`User with email: ${email} deleted successfully.`);
    } catch (error) {
      toast.error(`Error deleting user with email: ${email}:`, error);
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await api.users.getAllUsers();
        console.log(response);
        if (response && response.users) {
          setFetchedUsers(response.users);
        }
        console.log("Response:", fetchedUsers);
      } catch (error) {
        console.error("Error occurred while fetching user data:", error);
      }
    };

    fetchAllUsers();
  }, []);

  return (
    <div className="md:w-[80%] w-[full] bg-tertiary dark:bg-secondary/40 shadow h-[85vh] rounded-[4px] flex flex-col items-center text-center overflow-hidden">
      <h1 className="pt-5 md:h2 h3">All Users List</h1>
      <div className="flex flex-col items-start justify-center w-full m-5 lg:items-center">
        <div className="w-[100%] h-[100%] overflow-hidden">
          <div className="w-[100%] h-[100%] md:h-full overflow-scroll md:overflow-hidden">
            <table className="w-[90%] m-5 border-collapse border-gray-600 dark:bg-transparent overflow-hidden">
              <thead>
                <tr>
                  <th className="py-3 border">Name</th>
                  <th className="py-3 border">Email</th>
                  <th className="py-3 border">Role</th>
                  <th className="py-2 border">Edit</th>

                  <th className="px-2 py-3 border">Delete</th>
                </tr>
              </thead>
              <tbody>
                {currentUser.map((user) => (
                  <tr key={user._id}>
                    <td className="py-3 border">{user.name}</td>
                    <td className="py-3 border">{user.email}</td>
                    <td className="py-3 border">{user.role}</td>
                    <td className="py-2 border">
                      <button onClick={() => handleEdit(user)}>
                        <PenSquare size={20} className="text-primary" />
                      </button>
                    </td>
                    <td className="py-3 border">
                      <button
                        onClick={() => handleDelete(user._id, user.email)}
                      >
                        <Trash2 size={20} className="text-primary" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex items-center justify-between w-[80%] mt-4">
          <div className="w-[80%] text-left">
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
      {open && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <UpdateUser user={selectedUser} onClose={closeUpdateUser} />
        </div>
      )}
    </div>
  );
};

export default AllUsers;
