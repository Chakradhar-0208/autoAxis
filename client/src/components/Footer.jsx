import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=" dark:bg-[#000000] py-10">
      <div className="max-w-7xl mx-auto px-4 pt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
     <a href="/">
        <img
          src="https://res.cloudinary.com/dppnjyn8a/image/upload/v1753210118/LOGO_oecgpj.png"
          alt="logo"
          className="max-w-[10rem] sm:max-w-[12rem] transition-all  duration-300"
        />
      </a>
          <p className="mt-2 text-sm">
            Your trusted platform to buy, sell, and explore used cars with ease.
            Empowering car enthusiasts and sellers with seamless experiences.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/cars" className="hover:text-white">
                Browse Cars
              </Link>
            </li>
            <li>
              <Link to="/uploadCar" className="hover:text-white">
                Sell Your Car
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Contact</h3>
          <ul className="text-sm space-y-1">
            <li>
              Email:{" "}
              <a
                href="mailto:chakrikommoju123@gmail.com   "
                className="hover:text-white"
              >
                chakrikommoju123@gmail.com
              </a>
            </li>
            <li>Phone: +91 93472 14589</li>
            <li>Location: Vizianagaram, India</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Follow Us</h3>
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

      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} AutoAxis. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
