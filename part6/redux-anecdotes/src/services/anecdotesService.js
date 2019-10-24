import axios from "axios";

const BASE_URL = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

const createNew = async content => {
  const object = { content, votes: 0 };
  const response = await axios.post(BASE_URL, object);
  return response.data;
};

const addVote = async (id, content) => {
  const response = await axios.put(`${BASE_URL}/${id}`, content);
  return response.data;
};

export default { getAll, createNew, addVote };
