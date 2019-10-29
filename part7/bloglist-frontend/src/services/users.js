import axios from "axios";

let BASE_URL = "/api/users";

if (BACKEND_URL) {
  BASE_URL = `${BACKEND_URL}${BASE_URL}`;
}

const getAll = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

const signUp = async credentials => {
  const response = await axios.post(BASE_URL, credentials);
  return response.data;
};

export default { getAll, signUp };
