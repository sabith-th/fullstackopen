import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = newToken => (token = `bearer ${newToken}`);

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async blog => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

const updateLikes = async blog => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config);
  return response.data;
};

const deleteBlog = blog => {
  const config = {
    headers: { Authorization: token }
  };
  return axios.delete(`${baseUrl}/${blog.id}`, config);
};

export default { getAll, setToken, create, updateLikes, deleteBlog };
