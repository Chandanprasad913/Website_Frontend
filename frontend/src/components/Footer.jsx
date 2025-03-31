import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="px-5 md:px-20">
      {/* Footer Content */}
      <div className="my-10 mt-40 grid gap-14 text-sm sm:grid-cols-[3fr_1fr_1fr]">
        {/* Brand Info */}
        <div className="mt-14">
          <Link to="/">
            <img src={assets.mLogo} className="w-44" alt="Brand Logo" />
          </Link>
          <p className="text-gray-600 md:w-3/4">
            At Vogue Vibe, we are driven by a passion for excellence, crafting
            premium-quality products that redefine industry standards. Our
            commitment to innovation, precision, and customer satisfaction
            ensures an unparalleled shopping experience. Join us on this journey
            and discover products designed to inspire, perform, and elevate your
            lifestyle.
          </p>
        </div>

        {/* Company Links */}
        <div className="mt-20">
          <p className="mb-12 text-lg font-semibold text-gray-800">Company</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>
              <Link to="/" className="transition-all hover:text-gray-900">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="transition-all hover:text-gray-900">
                About Us
              </Link>
            </li>
            <li className="cursor-pointer transition-all hover:text-gray-900">
              Delivery
            </li>
            <li className="cursor-pointer transition-all hover:text-gray-900">
              Privacy Policy
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="mt-20">
          <p className="mb-12 text-lg font-semibold text-gray-800">
            Get in Touch
          </p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>
              <a
                href="tel:+911234567890"
                className="transition-all hover:text-gray-900"
              >
                +91 1234567890
              </a>
            </li>
            <li>
              <a
                href="mailto:abhinavrusia@gmail.com"
                className="transition-all hover:text-gray-900"
              >
                abhinavrusia@gmail.com
              </a>
            </li>
            <li className="mt-4">
              <div className="flex gap-4">
                <a href="#" className="transition-all hover:text-gray-900">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-instagram"
                  >
                    <rect
                      width="20"
                      height="20"
                      x="2"
                      y="2"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </a>
                <a href="#" className="transition-all hover:text-gray-900">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-facebook"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="#" className="transition-all hover:text-gray-900">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-twitter"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t pt-5">
        <p className="mb-5 text-center text-sm text-gray-600">
          Copyright &copy; {new Date().getFullYear()} VogueVibe.com - All rights
          reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
