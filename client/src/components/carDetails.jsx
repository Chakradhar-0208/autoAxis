import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
const SERVER_API = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await fetch(`${SERVER_API}/car/getCarbyId/${id}`);
        const data = await res.json();
        setCar(data);
      } catch (error) {
        console.error("Failed to fetch car:", error);
      }
    };

    fetchCar();
  }, [id]);

  if (!car) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">
        {car.make} {car.model}
      </h1>

      <div className="mb-6">
        <Carousel className="w-full">
          <CarouselContent>
            {car.images.map((url, index) => (
              <CarouselItem key={index} className="flex justify-center">
                <img
                  src={url}
                  alt={`Car image ${index + 1}`}
                  className="rounded-lg shadow-md object-cover max-h-[400px]"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="space-y-2 text-lg">
        <Link to={`/updateCar/${car._id}`}>
          <Button>Update Car Details</Button>
        </Link>
        <p>
          <strong>Year:</strong> {car.year}
        </p>
        <p>
          <strong>Price:</strong> ₹{car.price.toLocaleString()}
        </p>
        <p>
          <strong>Fuel:</strong> {car.fuelType}
        </p>
        <p>
          <strong>Transmission:</strong> {car.transmission}
        </p>
        <p>
          <strong>Location:</strong> {car.location}
        </p>
        <p>
          <strong>Mileage:</strong> {car.mileage} kmpl
        </p>
        <p>
          <strong>Color:</strong> {car.color}
        </p>
      </div>
    </div>
  );
};

export default CarDetails;
