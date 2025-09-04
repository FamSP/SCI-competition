import React from "react";
import { useAuthContext } from "../context/authContext";

const Card = (props) => {
  const { user, login } = useAuthContext();
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this restaurant?"
    );
    if (!isConfirmed) return;

    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/restaurant/" + id,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        alert("Restaurant deleted successfully!");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img src={props.imageUrl} alt="Restaurant" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {props.title}
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p>{props.type}</p>
        {/* {user.authorities === ROLES_ADMIN():()} */}
        {user && user.authorities.includes("ROLES_ADMIN") && (
          <div className="card-actions justify-end">
            <button
              onClick={() => handleDelete(props.id)}
              className="btn btn-soft btn-error"
            >
              Delete
            </button>
            <a
              href={"/update/" + props.id}
              className="btn btn-soft btn-warning"
            >
              Edit
            </a>
          </div>
        )}
        {user && user.authorities.includes("ROLES_MODERATOR") && (
          <div className="card-actions justify-end">
            <a
              href={"/update/" + props.id}
              className="btn btn-soft btn-warning"
            >
              Edit
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
