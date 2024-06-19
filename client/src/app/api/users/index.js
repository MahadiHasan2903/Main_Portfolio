import { server } from "../../../lib/util/server";
import { fetchTyped } from "../client";

const getAllUsers = async () => {
  try {
    const response = await fetchTyped(`${server}/get-all-users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
};
const deleteUser = async (id, token) => {
  try {
    const response = await fetchTyped(`${server}/delete-user/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
};

const updateUser = async (id, updatedData, token) => {
  try {
    const response = await fetchTyped(`${server}/update-user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });
    return response;
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
};

const users = { getAllUsers, deleteUser, updateUser };

export default users;
