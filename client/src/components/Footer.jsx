import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { useTheme } from "./theme-provider";
const Footer = () => {
  const { resolvedTheme } = useTheme();
  return (
    <footer className="w-full dark:bg-[#000000] flex flex-col items-center justify-center border-t border-gray-400 dark:border-dark-400 mt-8">
      <div className="px-4 sm:px-6 md:px-8 lg:px-10 pt-8 sm:pt-10 pb-8 ">
        <div className="max-w-7xl w-full grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <a href="/">
              <img
                src={
                  resolvedTheme === "dark"
                    ? "https://res.cloudinary.com/dppnjyn8a/image/upload/v1792404644/Autoaxis_Logo_rao63e.png"
                    : "https://res.cloudinary.com/dppnjyn8a/image/upload/v1792404639/Autoaxis-favicon1_egsctv.png"
                }
                alt="logo"
                className="max-w-[110px] sm:max-w-[150px] transition-all duration-300 -ml-2"
              />
            </a>
            <p className="mt-2 text-sm ">
              Your trusted platform to buy, sell, and explore used cars with
              ease. Empowering car enthusiasts and sellers with seamless
              experiences.
            </p>
          </div>
          <div className="sm:mx-auto">
            <h3 className="text-lg font-semibold dark:text-white mb-2 ">
              Quick Links
            </h3>
            <ul className="space-y-1 text-sm">
              <li>
                <Link to="/" className="">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/cars" className="">
                  Browse Cars
                </Link>
              </li>
              <li>
                <Link to="/uploadCar" className="">
                  Sell Your Car
                </Link>
              </li>
              <li>
                <Link to="/about" className="">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="sm:mx-auto">
            <h3 className="text-lg font-semibold dark:text-white mb-2">
              Contact
            </h3>
            <ul className="text-sm space-y-1">
              <li>
                Email:{" "}
                <a href="mailto:chakradhark1227@gmail.com" className="">
                  chakradhark1227@gmail.com
                </a>
              </li>
              <li>Phone: +91 93472 14589</li>
              <li>Location: Vizianagaram, India</li>
            </ul>
          </div>

          <div className="md:mx-auto">
            <h3 className="text-lg font-semibold dark:text-white mb-2">
              Follow Us
            </h3>
            <div className="flex space-x-4 text-xl">
              <a href="#" className="hover:text-blue-500">
                <FaFacebook />
              </a>
              <a
                href="https://www.instagram.com/chakree_0208/"
                className="hover:text-pink-400"
              >
                <FaInstagram />
              </a>
              <a
                href="https://x.com/DaarlingChakri"
                className="hover:text-sky-400"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.linkedin.com/in/chakradhar-kommoju/"
                className="hover:text-blue-300"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300 py-4 text-center text-sm text-gray-400 w-full">
        &copy; {new Date().getFullYear()} AutoAxis. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
