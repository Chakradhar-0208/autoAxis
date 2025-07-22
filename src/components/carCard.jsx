import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "./theme-provider";

const CarCard = ({ car }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <Link to={`/getCarById/${car._id}`}>
      <div
        className="border shadow-md rounded-xl p-4 w-[22rem] transition transform hover:scale-[1.02] hover:shadow-lg duration-200 h-[23.675rem] 
      bg-white text-black dark:bg-[#080808] dark:text-white
      hover:shadow-gray-300 dark:hover:shadow-gray-800 cursor-pointer"
      >
        <img
          src={car.images[0]}
          alt={car.model}
          className="w-full h-48 aspect-[4/3] object-cover rounded-md mb-4"
        />

        <div className="flex justify-between">
          <h2 className="text-lg font-semibold truncate max-w-[70%]">
            {car.make} {car.model}
          </h2>

          {car.tag && (
            <span className="text-xs bg-blue-100 text-center my-auto text-blue-600 px-2 py-0.5 rounded-full">
              {car.tag}
            </span>
          )}
        </div>

        <p className="text-sm">
          {car.year} • {car.fuelType}
        </p>
        <p className="text-sm">
          {car.transmission} • {car.color}
        </p>
        <p className="my-1 font-bold text-green-600 dark:text-green-400">
          ₹{new Intl.NumberFormat("en-IN").format(car.price)}
        </p>
        <p className="text-sm">{car.location}</p>

        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <p>Posted by: {car.postedBy?.name}</p>
        </div>
      </div>
    </Link>
  );
};

export default CarCard;
