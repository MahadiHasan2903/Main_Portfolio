import { server } from "../../../lib/util/server";
import { fetchTyped } from "../client";

const createSkill = async (createSkillData, token) => {
  try {
    const response = await fetchTyped(`${server}/create-skill`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(createSkillData),
    });
    return response;
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
};

const updateSkill = async (updateSkillData, token, id) => {
  try {
    const response = await fetch(`${server}/update-skill/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateSkillData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update Skill: ${response.statusText}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
};

const deleteSkill = async (id, token) => {
  try {
    const response = await fetchTyped(`${server}/delete-skill/${id}`, {
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

const getAllSkills = async () => {
  try {
    const response = await fetchTyped(`${server}/get-all-skills`, {
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
const Skill = { createSkill, updateSkill, deleteSkill, getAllSkills };

export default Skill;
