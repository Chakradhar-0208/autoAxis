
import React from "react";
import { Link } from "react-router-dom";

const CarCard = ({ car }) => {
  return (
    <Link to={`/getCarById/${car._id}`}>
      <div className="bg-white shadow-md rounded-xl p-4 w-full min-w-[22rem] transition hover:scale-105 hover:shadow-lg duration-200">
        <img
          src={car.images[0]}
          alt={car.model}
          className="w-full h-40 object-cover rounded-md mb-4"
        />

        <h2 className="text-lg font-semibold text-gray-800">
          {car.make} {car.model}
        </h2>
        <p className="text-sm text-gray-600">
          {car.year} • {car.fuelType}
        </p>
        <p className="text-sm text-gray-600">
          {car.transmission} • {car.color}
        </p>
        <p className="mt-2 font-bold text-blue-600">
          ₹{car.price.toLocaleString()}
        </p>
        <p className="text-sm text-gray-500">📍 {car.location}</p>
        <p className="text-sm text-gray-500">Posted by: {car.postedBy?.name}</p>
      </div>
    </Link>
  );
};

export default CarCard;
