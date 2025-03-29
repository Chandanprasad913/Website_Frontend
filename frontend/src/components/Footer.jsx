import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="px-5 md:px-20">
      {/* Footer Content */}
      <div className="my-10 mt-40 grid gap-14 text-sm sm:grid-cols-[3fr_1fr_1fr]">
        
        {/* Brand Info */}
        <div>
          <img src={assets.mLogo} className="mb-5 w-44" alt="Brand Logo" />
          <p className="text-gray-600 md:w-3/4">
            Bringing you the best products with unmatched quality and service.
            Stay connected for exclusive deals and updates!
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className="mb-5 text-lg font-semibold text-gray-800">Company</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li className="hover:text-gray-900 transition-all cursor-pointer">Home</li>
            <li className="hover:text-gray-900 transition-all cursor-pointer">About Us</li>
            <li className="hover:text-gray-900 transition-all cursor-pointer">Delivery</li>
            <li className="hover:text-gray-900 transition-all cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <p className="mb-5 text-lg font-semibold text-gray-800">Get in Touch</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li className="hover:text-gray-900 transition-all cursor-pointer">+91 1234567890</li>
            <li className="hover:text-gray-900 transition-all cursor-pointer">abhinavrusia@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t pt-5">
        <p className="text-center text-sm mb-5 text-gray-600">
          Copyright &copy; 2025 VogueVibe.com - All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
