import { server } from "../../../lib/util/server";
import { fetchTyped } from "../client";

const createInfo = async (createInformation, token) => {
  try {
    const response = await fetchTyped(`${server}/create-info`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(createInformation),
    });
    response;
    return response;
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
};
const updateInfo = async (updateInformation, token) => {
  try {
    const response = await fetchTyped(`${server}/update-info`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateInformation),
    });
    return response;
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
};

const getInfo = async () => {
  try {
    const response = await fetchTyped(`${server}/get-info`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    };

    const fetchedInformation = {
      id: response.information._id,
      name: response.information.name,
      email: response.information.email,
      phoneNumber: response.information.phoneNumber,
      address: response.information.address,
      degree: response.information.degree,
      dateOfBirth: formatDate(response.information.dateOfBirth),
      primaryImage: response.information.primaryImage,
      secondaryImage: response.information.secondaryImage,
      totalClients: response.information.totalClients,
      totalExperience: response.information.totalExperience,
      totalProjects: response.information.totalProjects,
      languages: response.information.languages.join(", "),
    };

    return fetchedInformation;
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
};

const info = { createInfo, updateInfo, getInfo };

export default info;
