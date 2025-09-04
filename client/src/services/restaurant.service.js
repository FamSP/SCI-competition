import api from "./api.js";
const RES_API = import.meta.env.VITE_RES_API;

//get all restataurant
const getAllRestaurant = async () => {
  return await api.get(RES_API);
};

//get restaurant by ID
const getRestaurantById = async (id) => {
  return await api.get(`${RES_API}/${id}`);
};
//update restaurant by ID
const editRestaurantById = async (id, restaurant) => {
  return await api.put(`${RES_API}/${id}`, restaurant);
};

//add restaurant
const insertRestaurant = async (restaurant) => {
  return await api.post(`${RES_API}`, restaurant);
};
//delete restaurant
const deleteRestaurant = async (id) => {
  return await api.delete(`${RES_API}/${id}`);
};

const RestaurantService = {
  getAllRestaurant,
  getRestaurantById,
  editRestaurantById,
  deleteRestaurant,
  insertRestaurant,
};

export default RestaurantService;
