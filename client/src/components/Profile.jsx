import { toast } from "sonner";
import UserCarCard from "./UserCarCard";
import { FiPlus } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";
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
  const userName = localStorage.getItem("userName");
  const { theme } = useTheme();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    document.title = "Profile | AutoAxis";

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
    <div className="dark:bg-[#050505] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex  flex-col-reverse sm:flex-row justify-between items-center w-full mb-4 gap-4 shadow-md shadow-[#000]/10 dark:shadow-[#fff]/10 border p-4 rounded-xl">
          {/* flex-col-reverse sm:flex-row */}
          <div className="flex flex-col sm:flex-row items-center sm:pb-0 pb-4 gap-4">
            {/* pb-4 */}
            <img
              src="https://macromissionary.com/wp-content/uploads/2021/10/dummy-avatar-2.jpg"
              alt="profile-icon"
              className="rounded-full w-[6rem] h-[6rem] object-cover"
            />
            <h2 className="text-3xl font-bold">
              {userName ? userName : "User"}
            </h2>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-[80px] ms-auto">Logout</Button>
            </DialogTrigger>
            <DialogContent className="min-w-[320px] max-w-[85%] xs:max-w-[425px] rounded-md">
              <DialogHeader>
                <DialogTitle>Are You Sure?</DialogTitle>
                <DialogDescription>
                  You are about to be logged out.{" "}
                  <span className="block sm:inline">
                    Click "Logout" to confirm.
                  </span>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex flex-row gap-4 justify-between">
                <DialogClose asChild>
                  <Button variant="outline" className="w-full">
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleLogout}
                  className="w-full"
                >
                  Logout
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">My Cars</h1>
          <Link to="/sellCar">
          {/* <Button className="rounded-full hidden" variant="default">Sell</Button> */}
          <Button variant="outline" className="rounded-full shadow-md shadow-[#000]/10 dark:shadow-[#fff]/10 px-2.5 py-1.5 transition transform hover:scale-[1.2] duration-300 hover:shadow-lg hover:shadow-[#000]/15 dark:hover:shadow-[#fff]/15"><FiPlus/></Button>
          </Link>
        </div>
        <div className="flex flex-wrap justify-evenly gap-y-6 gap-x-4">
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
    </div>
  );
};

export default MyCars;
