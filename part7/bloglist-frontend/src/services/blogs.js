import axios from "axios";

let BASE_URL = "/api/blogs";

if (BACKEND_URL) {
  BASE_URL = `${BACKEND_URL}${BASE_URL}`;
}

let token = null;

const setToken = newToken => (token = `bearer ${newToken}`);

const getAll = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

const create = async blog => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.post(BASE_URL, blog, config);
  return response.data;
};

const updateLikes = async blog => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.put(`${BASE_URL}/${blog.id}`, blog, config);
  return response.data;
};

const deleteBlog = blog => {
  const config = {
    headers: { Authorization: token }
  };
  return axios.delete(`${BASE_URL}/${blog.id}`, config);
};

const addComment = async (id, comment) => {
  return axios.post(`${BASE_URL}/${id}/comments`, { comment });
};

export default {
  getAll,
  setToken,
  create,
  updateLikes,
  deleteBlog,
  addComment
};
