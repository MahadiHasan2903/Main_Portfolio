import { server } from "../../../lib/util/server";
import { fetchTyped } from "../client";

const createEducation = async (createEducationData, token) => {
  try {
    const response = await fetchTyped(`${server}/create-education`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(createEducationData),
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
};

const updateEducation = async (updateEducationData, token, id) => {
  try {
    const response = await fetch(`${server}/update-education/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateEducationData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update Education: ${response.statusText}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
};

const deleteEducation = async (id, token) => {
  try {
    const response = await fetchTyped(`${server}/delete-education/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
};

const getAllEducations = async () => {
  try {
    const response = await fetchTyped(`${server}/get-all-educations`, {
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
const education = {
  createEducation,
  updateEducation,
  deleteEducation,
  getAllEducations,
};

export default education;
