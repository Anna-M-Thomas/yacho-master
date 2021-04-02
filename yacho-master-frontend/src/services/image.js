import axios from "axios";
const baseUrl = "http://localhost:3001/api/getimage";

const getImage = async (birdname) => {
  const response = await axios.post(baseUrl, { birdname });
  return response.data;
};

export default { getImage };
