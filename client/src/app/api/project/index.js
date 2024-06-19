import { server } from "../../../lib/util/server";
import { fetchTyped } from "../client";

const createProject = async (createProjectData, token) => {
  try {
    const response = await fetchTyped(`${server}/create-project`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(createProjectData),
    });
    return response;
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
};

const updateProject = async (updateProjectData, token, id) => {
  try {
    const response = await fetch(`${server}/update-project/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateProjectData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update project: ${response.statusText}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
};

const deleteProject = async (id, token) => {
  try {
    const response = await fetchTyped(`${server}/delete-project/${id}`, {
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

const getAllProjects = async () => {
  try {
    const response = await fetchTyped(`${server}/get-all-projects`, {
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
const project = { createProject, updateProject, deleteProject, getAllProjects };

export default project;
