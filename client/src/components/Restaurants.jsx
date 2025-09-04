import React from "react";
import Card from "./Card";
import { useAuthContext } from "../context/authContext";

const Restaurants = ({ restaurants }) => {
  const { user } = useAuthContext();
  return (
    <div className="flex">
      <div className="flex flex-wrap justify-center gap-4">
        {restaurants &&
          user &&
          restaurants.map((restaurants) => {
            return (
              <div>
                <Card
                  key={restaurants.id}
                  id={restaurants.id}
                  title={restaurants.title}
                  type={restaurants.type}
                  imageUrl={restaurants.imageUrl}
                />
              </div>
            );
          })}
        {!user && <div>You dont have permission to access this content!</div>}
        {!restaurants && <div>No content</div>}
      </div>
    </div>
  );
};

export default Restaurants;
