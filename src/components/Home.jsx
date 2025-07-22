import CarCard from "./carCard";
import { Slider } from "./ui/slider";
import { Skeleton } from "./ui/skeleton";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"


const Home = ({ setIsLogged }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
const [sortBy, setSortBy] = useState("default");

const API_URL = import.meta.env.VITE_API_URL;

const makeModelMap = {
  Maruti: ["Swift", "Baleno", "Dzire", "WagonR"],
  Hyundai: ["i20", "Creta", "Venue", "Verna"],
  Tata: ["Altroz", "Nexon", "Harrier", "Tiago"],
  Mahindra: ["XUV300", "Thar", "Scorpio", "Bolero"],
  Kia: ["Sonet", "Seltos", "Carens"],
  Toyota: ["Innova", "Fortuner", "Glanza"],
  Honda: ["City", "Amaze", "Jazz"],
  Renault: ["Kwid", "Triber", "Kiger"],
  Volkswagen: ["Virtus", "Polo"],
  Skoda: ["Slavia", "Rapid", "Kushaq"],
};

const colorOptions = [
  "White",
  "Silver",
  "Grey",
  "Black",
  "Red",
  "Blue",
  "Brown",
  "Orange",
  "Green",
  "Yellow",
];
const [currentPage, setCurrentPage] = useState(1);
const carsPerPage = 9; 
const [totalPages, setTotalPages] = useState(1);

const yearOptions = Array.from({ length: 15 }, (_, i) => `${2024 - i}`);
const kmsOptions = [
  { label: "0 - 10,000", value: "10000" },
  { label: "10,000 - 30,000", value: "30000" },
  { label: "30,000 - 50,000", value: "50000" },
  { label: "50,000 - 100,000", value: "100000" },
];
const transmissionOptions = ["Automatic", "Manual"];

  const [filters, setFilters] = useState({
    make: "",
    model: "",
    maxBudget: 10000000,
    year: "",
    maxKms: "",
    transmission: "",
    color: "",
  });

  useEffect(() => {
    document.title = "Featured Cars | AutoAxis";
    checkLogin();
    getAllCars();
  }, []);

  const checkLogin = () => {
    fetch(`${API_URL}/check-login`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "User Logged in false") {
          setIsLogged(false);
          navigate("/login");
        } else {
          setIsLogged(true);
          getUserData();
        }
      })
      .catch((err) => {
        console.error("Login check failed:", err);
        setIsLogged(false);
        navigate("/login");
      });
  };

  const getUserData = async () => {
    try {
      const response = await fetch(`${API_URL}/getUserData`, {
        credentials: "include",
        method: "GET",
      });
      const data = await response.json();
      setUserData(data.user);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  const getAllCars = async () => {
    try {
      const res = await fetch(`${API_URL}/car/getAllCars`);
      const data = await res.json();
      setCars(data);
      setFilteredCars(data);
    } catch (err) {
      console.log("Cannot fetch getAllCars", err);
    }
  };

  
  useEffect(() => {
  const result = cars.filter((car) => {
    const { make, model, maxBudget, year, maxKms, transmission, color } = filters;
    const price = car.price || 0;
    const kms = car.kmsDriven || 0;

    return (
      (make ? car.make?.toLowerCase() === make.toLowerCase() : true) &&
      (model ? car.model?.toLowerCase() === model.toLowerCase() : true) &&
      price <= maxBudget &&
      (year ? car.year?.toString() === year : true) &&
      (maxKms ? kms <= parseInt(maxKms) : true) &&
      (transmission ? car.transmission?.toLowerCase() === transmission.toLowerCase() : true) &&
      (color ? car.color?.toLowerCase() === color.toLowerCase() : true)
    );
  });

  const handleSort = (a, b) => {
    if (sortBy === "priceLowToHigh") return a.price - b.price;
    if (sortBy === "priceHighToLow") return b.price - a.price;
    if (sortBy === "yearNewToOld") return b.year - a.year;
    if (sortBy === "yearOldToNew") return a.year - b.year;
    return 0;
  };

  const sortedResult = result.slice().sort(handleSort);
const startIndex = (currentPage - 1) * carsPerPage;
const endIndex = startIndex + carsPerPage;
const paginatedCars = sortedResult.slice(startIndex, endIndex);

    setFilteredCars(paginatedCars);
    setTotalPages(Math.ceil(sortedResult.length / carsPerPage));

}, [filters, cars, sortBy,currentPage]);

useEffect(() => {
  setCurrentPage(1);
}, [filters, sortBy]);


  const clearFilters = () => {
    setFilters({
      make: "",
      model: "",
      maxBudget: 10000000,
      year: "",
      maxKms: "",
      transmission: "",
      color: "",
    });
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/logout`, {
        method: "GET",
        credentials: "include",
      });
      localStorage.removeItem("userId");
      setIsLogged(false);
      checkLogin();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="flex absolute top-6 right-8 space-x-5">
          <Button>Logout</Button>
        </div>
        <div className="absolute flex flex-col items-center justify-center">
          <Skeleton className="w-40 h-4 mb-2" />
          <Skeleton className="w-30 h-4 mb-2" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full  dark:bg-[#050505] min-h-screen py-10">

    
    <div className="max-w-7xl mx-auto px-4 overflow-hidden  min-h-screen pb-4 ">
      <div className="flex justify-between items-center my-4">
        <h1 className="text-3xl font-bold">Featured Cars</h1>
      </div>

      <fieldset className="dark:bg-[#080808]  shadow-md border px-4 py-2 rounded-xl mb-10">
        <legend className="font-bold  px-2">Filters</legend>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          <Select
            value={filters.make}
            onValueChange={(make) =>
              setFilters((prev) => ({
                ...prev,
                make,
                model: "",
              }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Make" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Make</SelectLabel>
                {Object.keys(makeModelMap).map((make) => (
                  <SelectItem key={make} value={make}>
                    {make}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            value={filters.model}
            onValueChange={(model) =>
              setFilters((prev) => ({ ...prev, model }))
            }
            disabled={!filters.make}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={
                  filters.make ? "Select Model" : "Select Make First"
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Model</SelectLabel>
                {filters.make &&
                  makeModelMap[filters.make].map((model) => (
                    <SelectItem key={model} value={model}>
                      {model}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            value={filters.year}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, year: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Year</SelectLabel>
                {yearOptions.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            value={filters.maxKms}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, maxKms: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Max KMs Driven" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>KMs Driven</SelectLabel>
                {kmsOptions.map(({ label, value }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            value={filters.transmission}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, transmission: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Transmission" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Transmission</SelectLabel>
                {transmissionOptions.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            value={filters.color}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, color: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Color" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Color</SelectLabel>
                {colorOptions.map((color) => (
                  <SelectItem key={color} value={color}>
                    {color}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <div>
            <label className="text-sm font-medium">Max Budget (₹)</label>
            <Slider
              value={[filters.maxBudget]}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, maxBudget: value[0] }))
              }
              min={0}
              max={10000000}
              step={10000}
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-1">
              <span>₹0</span>
              <span>₹{filters.maxBudget.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex gap-2  items-center">
            <Select value={sortBy}  onValueChange={setSortBy}>
    <SelectTrigger className="text-xs sm:text-base w-[60%]">
      <SelectValue placeholder="Sort By" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="default">Sort By</SelectItem>
      <SelectItem value="priceLowToHigh">Price: Low to High</SelectItem>
      <SelectItem value="priceHighToLow">Price: High to Low</SelectItem>
      <SelectItem value="yearNewToOld">Year: New to Old</SelectItem>
      <SelectItem value="yearOldToNew">Year: Old to New</SelectItem>
    </SelectContent>
  </Select> 
            <Button
              variant="outline"
              className="border-black flex w-[40%] sm:text-base text-xs "
              onClick={clearFilters}
            >
              Clear All
            </Button>
          </div>
        </div>
      </fieldset>
      <div className="flex flex-wrap justify-evenly gap-4">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => <CarCard key={car._id} car={car} />)
        ) : (
          <p className="text-gray-500 text-center w-full">
            No cars match the selected filters.
          </p>
        )}
      </div>
      {totalPages > 1 && (
  <div className="flex justify-center mt-8 ">
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) setCurrentPage(currentPage - 1);
            }}
          />
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={currentPage === i + 1}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(i + 1);
              }}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) setCurrentPage(currentPage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  </div>
)}

    </div>

    </div>
  );
};

export default Home;
