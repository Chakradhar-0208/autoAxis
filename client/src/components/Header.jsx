import { ModeToggle } from "./mode-toggle";
import { Button } from "@/components/ui/button";
import { FiHeart, FiUser } from "react-icons/fi";
import {CustomLink as Link}  from "./ui/customLink";
import { useTheme } from "./theme-provider";
const Header = ({ isLogged, setIsLogged, checkLogin }) => {
  const { resolvedTheme } = useTheme();
  return (
    <div className="rounded-b-xl bg-white/60 dark:bg-[#000000]/60 backdrop-blur-2xl shadow-md shadow-[#000]/10 dark:shadow-[#fff]/5 sticky top-0 text-black  dark:text-white border-b-1 h-[75px] z-50 px-4 sm:px-6 md:px-8 lg:px-10 mb-8 sm:mb-10 md:mb-14">
      {/* mb-8 sm:mb-10 md:mb-14 */}
      <div className="flex space-x-3 items-center justify-between max-w-7xl mx-auto w-full h-full ">
            <Link to="/">
              <img
                src={
                  resolvedTheme === "dark"
                    ? "https://res.cloudinary.com/dppnjyn8a/image/upload/v1792404644/Autoaxis_Logo_rao63e.png"
                    : "https://res.cloudinary.com/dppnjyn8a/image/upload/v1792404639/Autoaxis-favicon1_egsctv.png"
                }
                alt="logo"
                className="max-w-[110px] sm:max-w-[150px] transition-all duration-300 -ml-2"
              />
            </Link>
        <div className="flex items-center sm:space-x-4 underline font-semibold ">
          <Link to="/profile">
            {/* <p>{localStorage.getItem("userName")}</p> */}
            <FiUser className="w-5 h-5 mr-4 sm:mr-0"/>
          </Link>
          <FiHeart className="w-5 h-5 hidden sm:block cursor-pointer" />
          <ModeToggle />
          <Link to="/sellCar" >
            <Button className="text-md rounded-full py-0 px-[24px] hidden sm:block ">
              Sell
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
