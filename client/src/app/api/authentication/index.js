import { server } from "../../../lib/util/server";
import { fetchTyped } from "../client";

const loginResponse = async (loginData) => {
  try {
    const response = await fetchTyped(`${server}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const responseData = {
      message: response.message,
      success: response.success,
      token: response.token,
      user: response.user,
      id: response.id,
    };

    return responseData;
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
};

const authentication = { loginResponse };

export default authentication;
