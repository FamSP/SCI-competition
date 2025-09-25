import api from "./api";
const Act_URL = import.meta.env.VITE_ACT_URL;

const insertActivity = async (data) => {
  return await api.post(`${Act_URL}/`, data);
};

const getAllActivity = async () => {
  return await api.get(Act_URL);
};

const getActivityById = async (id) => {
  return await api.get(`${Act_URL}/${id}`);
};

const editActivityById = async (id, actvitity) => {
  return await api.put(`${Act_URL}/${id}`, actvitity);
};

const deleteActivity = async (id) => {
  return await api.delete(`${Act_URL}/${id}`);
};

const ActivityService = {
  getAllActivity,
  getActivityById,
  editActivityById,
  deleteActivity,
  insertActivity,
};

export default ActivityService;
