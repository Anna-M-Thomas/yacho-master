import axios from "axios";
const baseUrl = "/api/getimage";

const getImage = async (birdname) => {
  const response = await axios.post(baseUrl, { birdname });
  return response.data;
};

const imageHandler = { getImage };
export default imageHandler;
