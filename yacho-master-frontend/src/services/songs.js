import axios from "axios";
const baseUrl = "http://localhost:3001/";

//wait I don't even need this?
const getSong = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}.mp3`);
  return response.data;
};

export default { getSong };
