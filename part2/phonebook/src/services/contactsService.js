import axios from "axios";

const BASE_URL = "/api/persons";

const getAll = () => {
  return axios.get(BASE_URL).then(response => response.data);
};

const saveContact = newContact => {
  return axios.post(BASE_URL, newContact).then(response => response.data);
};

const deleteContact = id => {
  return axios.delete(`${BASE_URL}/${id}`);
};

const updateContact = (id, contact) => {
  return axios
    .put(`${BASE_URL}/${id}`, contact)
    .then(response => response.data);
};

export default { getAll, saveContact, deleteContact, updateContact };
