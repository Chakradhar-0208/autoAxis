import { ModeToggle } from "./mode-toggle";
import { Button } from "@/components/ui/button";
import { FiHeart, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useTheme } from "./theme-provider"; 
const Header = ({ isLogged, setIsLogged, checkLogin }) => {
const { resolvedTheme } = useTheme();
  return (
    <div className=" rounded-b-xl bg-white/60 dark:bg-[#000000]/80 backdrop-blur-xl shadow-md sticky top-0 bg-white text-black dark:bg-[#000000] dark:text-white border-b-1 h-[75px] mx-auto w-full flex space-x-3 items-center px-5 md:px-10 lg:px-20 justify-between z-50">
      <a href="/">
        <img
          src={resolvedTheme === "dark"? "https://res.cloudinary.com/dppnjyn8a/image/upload/v1792404644/Autoaxis_Logo_rao63e.png" : "https://res.cloudinary.com/dppnjyn8a/image/upload/v1792404639/Autoaxis-favicon1_egsctv.png"}
          alt="logo"
          className="max-w-[110px] sm:max-w-[150px] transition-all  duration-300 "
        />
      </a>

      <div className="flex items-center sm:space-x-4 underline font-semibold ">
        <Link to="/userCars">
          {/* <p>{localStorage.getItem("userName")}</p> */}
          <FiUser className="w-5 h-5  mr-4 sm:mr-0" />
        </Link>
        <FiHeart className="w-5 h-5  hidden sm:block cursor-pointer" />
      <ModeToggle/> 
        <Link to="/uploadCar" >
          <Button className="text-md rounded-full py-0 px-[24px] hidden sm:block ">
            Sell
          </Button>
        </Link>
      </div>

    </div>
  );
};

export default Header;
