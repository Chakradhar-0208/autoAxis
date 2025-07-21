import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyCars = () => {
  const userId = localStorage.getItem("userId");
  if (!userId) console.error("UserId fromm localStorage is not found");
  const [cars, setCars] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    fetch(`${API_URL}/car/getCarsByUser/${userId}`)
      .then((res) => res.json())
      .then((data) => setCars(data));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold mb-2">My Cars</h2>
      {cars.map((car) => (
        <div key={car._id} className="p-4 border rounded shadow">
          <div>
            <img src={car.images[0]} alt="" />
          </div>
          <h3 className="text-xl font-semibold">
            {car.make} {car.model}
          </h3>
          <p>
            {car.year} | ₹{car.price}
          </p>
          <div className="space-x-2 mt-2">
            <Link
              to={`/getCarbyId/${car._id}`}
              className="text-blue-600 underline"
            >
              View
            </Link>
            <Link
              to={`/updateCar/${car._id}`}
              className="text-green-600 underline"
            >
              Edit
            </Link>
            <button
              onClick={async () => {
                console.log(car._id);
                const res = await fetch(
                  `${API_URL}/car/deleteCar/${car._id}`,
                  {
                    method: "DELETE",
                    credentials: "include",
                  }
                );
                if (res.ok) {
                  setCars(cars.filter((c) => c._id !== car._id));
                  alert("Deleted");
                }
              }}
              className="text-red-600 underline"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyCars;
