import { server } from "../../../lib/util/server";
import { fetchTyped } from "../client";

const createExperience = async (createExperienceData, token) => {
  try {
    const response = await fetchTyped(`${server}/create-experience`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(createExperienceData),
    });
    return response;
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
};

const updateExperience = async (updateExperienceData, token, id) => {
  try {
    const response = await fetch(`${server}/update-experience/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateExperienceData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update Experience: ${response.statusText}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
};

const deleteExperience = async (id, token) => {
  try {
    const response = await fetchTyped(`${server}/delete-experience/${id}`, {
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

const getAllExperiences = async () => {
  try {
    const response = await fetchTyped(`${server}/get-all-experiences`, {
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
const Experience = {
  createExperience,
  updateExperience,
  deleteExperience,
  getAllExperiences,
};

export default Experience;
