import axios from "axios";

let BASE_URL = "/api/login";

if (BACKEND_URL) {
  BASE_URL = `${BACKEND_URL}${BASE_URL}`;
}

const login = async credentials => {
  const response = await axios.post(BASE_URL, credentials);
  return response.data;
};

export default { login };
