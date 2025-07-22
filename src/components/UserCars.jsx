import { toast } from "sonner";
import UserCarCard from "./UserCarCard";
import { useEffect, useState } from "react";
import { useTheme } from "./theme-provider";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
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

const MyCars = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);

  const { theme } = useTheme();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    document.title = "User Cars | AutoAxis";

    if (!userId) {
      toast.error("User not found. Please log in.");
      navigate("/login");
      return;
    }

    fetch(`${API_URL}/car/getCarsByUser/${userId}`)
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch((err) => {
        console.error("Failed to fetch cars", err);
        toast.error("Failed to load your cars.");
      });
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch(`${API_URL}/logout`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.removeItem("userId");
        toast.success("Logged out successfully.");
        navigate("/login");
      } else {
        throw new Error(data?.message || "Logout failed");
      }
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col  dark:bg-[#050505] justify-start items-center py-5 space-y-4">
      <div className="flex justify-between items-center w-[85%]">
        <h2 className="text-3xl font-bold">MY CARS</h2>
        <Dialog>
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
              <Button
                type="button"
                variant="destructive"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-wrap w-[80%] py-5 gap-4 justify-center">
        {cars.length > 0 ? (
          cars.map((car) => (
            <UserCarCard
              key={car._id}
              car={car}
              cars={cars}
              setCars={setCars}
              API_URL={API_URL}
            />
          ))
        ) : (
          <p className="text-gray-500">No cars listed yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyCars;
