import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  CarFront,
  Fuel,
  MapPin,
  Calendar,
  Gauge,
  PaintBucket,
  Info,
  BadgeInfo,
  UserCircle,
} from "lucide-react";
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
    document.title = `Car Page | AutoAxis`;
    const fetchCar = async () => {
      try {
        const res = await fetch(`${SERVER_API}/car/getCarbyId/${id}`);
        const data = await res.json();
        
        const normalizedData = {
          ...data,
          kmsDriven: Number(data.kmsDriven) || null,
        };

        setCar(normalizedData);
      } catch (error) {
        console.error("Failed to fetch car:", error);
      }
    };

    fetchCar();
  }, [id]);

  if (!car) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-full  dark:bg-[#050505]">
    <div className=" max-w-4xl mx-auto px-4 pb-10 pt-6">
      <h1 className="text-3xl font-bold mb-2 text-primary">
        {car.make} {car.model}
      </h1>
      <div className="flex justify-between items-center mb-4 ">
        <p className="text-xl font-semibold text-green-600  dark:text-green-400">
          ₹{new Intl.NumberFormat("en-IN").format(car.price)}
        </p>
        <Button className="h-[30px] sm:h-[36px]">Contact</Button>
      </div>
      <div className="mb-6 overflow-hidden rounded-lg">
        <Carousel className="w-full">
          <CarouselContent>
            {car.images.map((url, index) => (
              <CarouselItem key={index} className="flex justify-center">
                <img
                  src={url}
                  alt={`Car image ${index + 1}`}
                  className="rounded-md object-cover w-full max-h-[480px]"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="translate-x-[3.5rem]" />
          <CarouselNext className="-translate-x-[3.5rem]" />
        </Carousel>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base mb-6">
        <div className="flex items-center gap-2">
          <CarFront className="w-4 h-4" />
          <span>
            <strong>Make:</strong> {car.make}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <CarFront className="w-4 h-4" />
          <span>
            <strong>Model:</strong> {car.model}
          </span>
        </div>

        {car.variant && (
          <div className="flex items-center gap-2">
            <BadgeInfo className="w-4 h-4" />
            <span>
              <strong>Variant:</strong> {car.variant}
            </span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>
            <strong>Year:</strong> {car.year}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Fuel className="w-4 h-4" />
          <span>
            <strong>Fuel Type:</strong> {car.fuelType}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Gauge className="w-4 h-4" />
          <span>
            <strong>Transmission:</strong> {car.transmission}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span>
            <strong>Location:</strong> {car.location}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Gauge className="w-4 h-4" />
          <span>
            <strong>KMs Driven:</strong>{" "}
            {car.kmsDriven !== null
              ? `${car.kmsDriven.toLocaleString()} km`
              : "N/A"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Gauge className="w-4 h-4" />
          <span>
            <strong>AVG Mileage:</strong> {car.mileage} kmpl
          </span>
        </div>

        <div className="flex items-center gap-2">
          <PaintBucket className="w-4 h-4" />
          <span>
            <strong>Color:</strong> {car.color}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <UserCircle className="w-4 h-4" />
          <span>
            <strong>Posted By:</strong> {car.postedBy?.name || "Admin"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>
            <strong>Posted On:</strong>{" "}
            {new Date(car.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      {car.description && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <Info className="w-5 h-5" />
            Description
          </h3>
          <p className="text-gray-800 dark:text-gray-300 leading-relaxed">
            {car.description}
          </p>
        </div>
      )}

      <div className="mt-8 w-full flex justify-between">
        <Link to={`/updateCar/${car._id}`}>
          <Button>Update Car Details</Button>
        </Link>
      </div>
      </div>
    </div>
  );
};

export default CarDetails;
