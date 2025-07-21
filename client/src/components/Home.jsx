import { data, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";
import { Link } from "react-router-dom";
import CarCard from "./carCard";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "./ui/skeleton";
const API_URL = import.meta.env.VITE_API_URL;

const Home = ({ setIsLogged }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cars, setCars] = useState([]);
  useEffect(() => {
    document.title = "Home | Authenticator App";
    checkLogin();
    getAllCars();
  }, []);

  const getUserData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/getUserData`, {
        credentials: "include",
        method: "GET",
      });
      if (!response.ok) throw new Error(`Status: ${response.status}`);

      const data = await response.json();
      setUserData(data.user);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  const checkLogin = () => {
    fetch(`${API_URL}/check-login`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "User Logged in false") {
          console.log("User logged out, redirecting to /login");

          setIsLogged(false);

          navigate("/login");
        } else {
          setIsLogged(true);

          console.log("User logged in");
          getUserData();
        }
      })
      .catch((err) => {
        console.error("Login check failed:", err);

        setIsLogged(false);

        navigate("/login");
      });
  };

  const getAllCars = async () => {
    try {
      const cars = await fetch(`${API_URL}/car/getAllCars`);
      const data = await cars.json();
      setCars(data);
    } catch (err) {
      console.log("Cannot fetch getAllCars", err);
    }
  };

  const handleLogout = async () => {
    try {
      const loggedRes = await fetch(`${API_URL}/logout`, {
        method: "GET",
        credentials: "include",
      });
      const data = await loggedRes.json();
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
          <ModeToggle />
          <Button>Logout</Button>
        </div>
        <div
          className="absolute flex flex-col items-center
         justify-center"
        >
          <Skeleton className="w-40 h-4 mb-2" />
          <Skeleton className="w-30 h-4 mb-2" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center gap-10 h-[100dvh]">
      <div className="max-w-md mx-auto mt-20 space-y-4"></div>
      <div className=" absolute top-6 right-8 flex space-x-5">
        <ModeToggle />
        <Dialog>
          <form>
            <DialogTrigger asChild>
              <Button>Logout</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Are You Sure?</DialogTitle>
                <DialogDescription>
                  You are about to be logged out. Click "Logout" to confirm.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" onClick={handleLogout}>
                  Logout
                </Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </div>
      <div className="absolute flex flex-col min-w-[22rem] w-[90dvw] max-w-xl h-fit space-y-5  justify-around min-h-[25rem]  items-center">
        <div className="text-center">
          <p>{`Welcome ${userData?.name},`}</p>
          <h1>You're Logged In.</h1>
          <div className="flex space-x-2 justify-center">
            <Button className="mt-2 " onClick={getAllCars}>
              See Listed Cars
            </Button>
            <Link to="/uploadCar">
              <Button className="mt-2">List A Car</Button>
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6">Available Cars</h1>
          <div className="flex gap-4 max-w-[1280px] ">
            {cars.map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
