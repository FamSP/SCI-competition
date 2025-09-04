import React, { useState, useEffect } from "react";
import Restaurants from "../components/Restaurants";
import Swal from "sweetalert2";
import RestaurantService from "../services/restaurant.service";
const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filetedRestaurants, setFilterRestaurants] = useState([]);
  const handleSearch = (keyword) => {
    if (keyword === "") {
      setFilterRestaurants(restaurants);
      return;
    }
    const result = restaurants.filter((restaurant) => {
      return (
        restaurant.title.toLowerCase().includes(keyword.toLowerCase()) ||
        restaurant.type.toLowerCase().includes(keyword.toLowerCase())
      );
    });

    setFilterRestaurants(result);
  };
  useEffect(() => {
    const getAllRestaurant = async () => {
      try {
        const response = await RestaurantService.getAllRestaurant();

        if (response.status === 200) {
          setRestaurants(response.data);
          setFilterRestaurants(response.data); // use camelCase
        }
      } catch (error) {
        Swal.fire({
          title: "Get All Restaurants",
          icon: "error",
          text: error?.response?.data?.message || error.message,
        });
      }
    };

    getAllRestaurant(); // Call the async function
  }, []);
  return (
    <div className="container mx-auto">
      {
        //Header
      }
      <div>
        <h1 className="title justify-center text-3xl text-center m-5 p-5">
          Grab Restaurantasdasdasdasdsadadfsdgfsd
        </h1>
      </div>
      {
        //Search Box
      }
      <div className="mb-5 flex justify-center items-center">
        <label className="input flex items-center gap-2 w-2xl">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            name="keyword"
            onChange={(e) => handleSearch(e.target.value)}
            required
            placeholder="Search"
          />
        </label>
      </div>
      {
        //Result
      }

      <Restaurants restaurants={filetedRestaurants} />
    </div>
  );
};

export default Home;
