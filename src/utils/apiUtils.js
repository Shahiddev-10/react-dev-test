import axios from "axios";
const token = process.env.REACT_APP_BEARER_TOKEN;
const API_URL = process.env.REACT_APP_BASE_URL;

export const ApiCall = async (method = "GET", path, data = {}) => {
  try {
    const res = await axios({
      method,
      url: API_URL + path,
      data,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};