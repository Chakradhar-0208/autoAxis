import React from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useTheme } from "./theme-provider";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";

const CarCard = ({ car, API_URL, setCars, cars }) => {
  const { theme } = useTheme();

  const handleDelete = async () => {
    try {
      const res = await fetch(`${API_URL}/car/deleteCar/${car._id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        setCars(cars.filter((c) => c._id !== car._id));
        toast.success("Car deleted successfully");
      } else {
        toast.error("Failed to delete car");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("An error occurred while deleting the car.");
    }
  };

  return (
    <div
      className="border shadow-md rounded-xl p-4 w-[22rem] h-[23.675rem] transition transform hover:scale-[1.02] hover:shadow-lg duration-200 
        bg-white text-black dark:bg-[#080808] dark:text-white 
        hover:shadow-gray-300 dark:hover:shadow-gray-800"
    >
      <Link to={`/getCarById/${car._id}`}>
        <img
          src={car.images[0]}
          alt={car.model}
          className="w-full h-48 aspect-[4/3] object-cover rounded-md mb-4"
        />

        <div className="flex justify-between">
          <h2 className="text-lg font-semibold truncate max-w-[70%]">
            {car.make} {car.model}
          </h2>
          <span className="text-xs bg-blue-100 text-center my-auto text-blue-600 px-2 py-0.5 rounded-full">
            {car.tag || "Listed"}
          </span>
        </div>

        <p className="text-sm">
          {car.year} • {car.fuelType}
        </p>
        <p className="text-sm">
          {car.transmission} • {car.color}
        </p>
        <p className="my-1 font-bold text-green-600 dark:text-green-400">
          ₹{car.price.toLocaleString("en-IN")}
        </p>
        <p className="text-sm">{car.location}</p>
      </Link>

      <div className="flex justify-between items-center ">
        <p className="text-sm">Posted by: {car.postedBy?.name}</p>
        <div className="space-x-3">
          <Link
            to={`/updateCar/${car._id}`}
            className="text-green-700 hover:text-green-800 text-sm"
          >
            Edit
          </Link>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="text-red-600 hover:text-red-800 text-sm">
                Delete
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently remove the car listing. You can't undo
                  this action.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
