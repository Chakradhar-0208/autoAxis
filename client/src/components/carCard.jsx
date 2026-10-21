import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "./theme-provider";

const CarCard = ({ car }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <Link to={`/car/${car._id}`}>
      <div
        className="border shadow-md shadow-[#000]/10 dark:shadow-[#fff]/10 rounded-xl min-w-[18rem] xxs:min-w-[20rem] xs:min-w-[18rem] max-w-[22rem] transition transform hover:scale-[1.02] hover:shadow-lg duration-200  
      bg-white text-black dark:bg-[#010101] dark:text-white
      hover:shadow-[#000]/15 dark:hover:shadow-[#fff]/15 cursor-pointer"
      >
        <img
          src={car.images[0]}
          alt={car.model}
          className="w-full h-48 aspect-[4/3] object-cover rounded-t-xl"
        />

        <div className="p-4">
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
            ₹ {new Intl.NumberFormat("en-IN").format(car.price)}
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
      </div>
    </Link>
  );
};

export default CarCard;
