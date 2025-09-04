import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import RestaurantService from "../services/restaurant.service";
import { useAuthContext } from "../context/authContext";
import { useNavigate } from "react-router";
const Update = () => {
  //Get ID from URL
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState({
    title: "",
    type: "",
    imageUrl: "",
  });
  const { user } = useAuthContext();
  //2.GEt Restaurant
  useEffect(() => {
    const editRestaurantById = async (id) => {
      try {
        const response = await RestaurantService.editRestaurantById(id);

        if (response.status === 200) {
          setRestaurant(response.data);
        }
      } catch (error) {
        Swal.fire({
          title: "Get All Restaurants",
          icon: "error",
          text: error?.response?.data?.message || error.message,
        });
      }
    };

    editRestaurantById(); // Call the async function
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurant({ ...restaurant, [name]: value });
  };
  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/restaurant/" + id,
        {
          method: "PUT",
          body: JSON.stringify(restaurant),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        alert("Restaurant Updated succesfully!!!");
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
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (
  //     (!user && !user?.authorities.includes("ROLES_ADMIN")) ||
  //     !user?.authorities.includes("ROLES_MODERATOR")
  //   ) {
  //     navigate("/");
  //   }
  // });
  return (
    <div className="container mx-auto">
      {(user && user.authorities.includes("ROLES_ADMIN")) ||
        (user.authorities.includes("ROLES_MODERATOR") && (
          <div class="relative flex flex-col justify-center h-screen overflow-hidden">
            <div class="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
              <h1 class="text-2xl font-semibold text-center text-gray-700 mb-6">
                Update Item
              </h1>
              <form class="space-y-4">
                <div>
                  <label class="label">
                    <span class="text-base label-text">Title</span>
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={restaurant.title}
                    placeholder="Enter title"
                    class="w-full input input-bordered"
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
                    value={restaurant.type}
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
                    value={restaurant.imageUrl}
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
                    type="button"
                    class="btn bg-red-500 text-white px-6"
                  >
                    Cancel
                  </a>
                </div>
              </form>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Update;
