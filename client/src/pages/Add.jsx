import React, { useState, useEffect } from "react";
import { useAuthContext } from "../context/authContext";
import { useNavigate } from "react-router";

const Add = () => {
  const [restaurant, setRestaurant] = useState({
    title: "",
    type: "",
    imageUrl: "",
  });
  const { user } = useAuthContext();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurant({ ...restaurant, [name]: value });
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (!user && !user?.authorities.includes("ROLES_ADMIN")) {
      navigate("/");
    }
  }, [user]);
  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/restaurant", {
        method: "POST",
        body: JSON.stringify(restaurant),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        alert("Restaurannt Adds succesfully!!!");
        setRestaurant({
          title: "",
          type: "",
          imageUrl: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div class="relative flex flex-col justify-center h-screen overflow-hidden">
      <div className="container mx-auto">
        <div class="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
          <h1 class="text-2xl font-semibold text-center text-gray-700 mb-6">
            Add Item
          </h1>
          <div class="space-y-4">
            <div>
              <label class="label">
                <span class="text-base label-text">Title</span>
              </label>

              <input
                type="text"
                placeholder="Enter title"
                class="w-full input input-bordered"
                name="title"
                onChange={handleChange}
              />
            </div>

            <div>
              <label class="label">
                <span class="text-base label-text">Type</span>
              </label>
              <input
                type="text"
                placeholder="Enter type"
                class="w-full input input-bordered"
                name="type"
                onChange={handleChange}
              />
            </div>

            <div>
              <label class="label">
                <span class="text-base label-text">Image URL</span>
              </label>
              <input
                type="text"
                ClassName="grow"
                class="w-full input input-bordered"
                onChange={handleChange}
                placeholder="Restaurant imageUrl"
                name="imageUrl"
              />

              {restaurant.imageUrl && (
                <div ClassName="flex items-center gap-2">
                  <img ClassName="h-32" src={restaurant.imageUrl}></img>
                </div>
              )}
            </div>

            <div class="flex justify-center items-center my-6 space-x-4">
              <button
                type="submit"
                class="btn bg-green-500 text-white px-6"
                onClick={handleSubmit}
              >
                Add
              </button>
              <a
                href={"/"}
                button
                type="button"
                class="btn bg-red-500 text-white px-6"
              >
                Cancel
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
