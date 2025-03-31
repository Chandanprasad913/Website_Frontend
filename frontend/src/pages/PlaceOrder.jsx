import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const { navigate } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });

  // Function to handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to validate form and navigate
  const handlePlaceOrder = () => {
    const { firstName, lastName, email, address, city, state, zip, country, phone } = formData;

    if (!firstName || !lastName || !email || !address || !city || !state || !zip || !country || !phone) {
      alert("Please fill in all required fields.");
      return;
    }

    navigate("/orders");
  };

  return (
    <div className="flex min-h-[80vh] flex-col justify-between gap-4 border-t pt-5 sm:flex-row sm:pt-14">
      {/* //* Left Side */}
      <div className="flex w-full flex-col gap-4 sm:max-w-[480px]">
        <div className="my-3 text-xl sm:text-2xl">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full rounded border border-gray-400 px-3.5 py-1.5"
            required
            autoComplete="given-name"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full rounded border border-gray-400 px-3.5 py-1.5"
            required
            autoComplete="family-name"
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded border border-gray-400 px-3.5 py-1.5"
          required
          autoComplete="email"
        />
        <input
          type="text"
          name="address"
          placeholder="Street address"
          value={formData.address}
          onChange={handleChange}
          className="w-full rounded border border-gray-400 px-3.5 py-1.5"
          required
          autoComplete="address-line1"
        />
        <div className="flex gap-3">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="w-full rounded border border-gray-400 px-3.5 py-1.5"
            required
            autoComplete="address-level2"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            className="w-full rounded border border-gray-400 px-3.5 py-1.5"
            required
            autoComplete="address-level1"
          />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            name="zip"
            placeholder="Zip Code"
            value={formData.zip}
            onChange={handleChange}
            className="w-full rounded border border-gray-400 px-3.5 py-1.5"
            required
            pattern="[0-9]{5,6}"
            autoComplete="postal-code"
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            className="w-full rounded border border-gray-400 px-3.5 py-1.5"
            required
            autoComplete="country"
          />
        </div>
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full rounded border border-gray-400 px-3.5 py-1.5"
          required
          pattern="[0-9]{10,15}"
          autoComplete="tel"
        />
      </div>

      {/* //* Right Side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1="PAYMENT" text2="METHOD" />
          {/* //* Payment Options */}
          <div className="flex flex-col gap-3 lg:flex-row">
            <label className="flex cursor-pointer items-center gap-3 border p-2 px-3">
              <input type="radio" name="payment" checked={method === "stripe"} onChange={() => setMethod("stripe")} hidden />
              <p className={`h-3.5 min-w-3.5 rounded-full border ${method === "stripe" ? "bg-green-500" : ""}`}></p>
              <img className="mx-4 h-5" src={assets.stripe_logo} alt="Stripe Logo" />
            </label>

            <label className="flex cursor-pointer items-center gap-3 border p-2 px-3">
              <input type="radio" name="payment" checked={method === "razorpay"} onChange={() => setMethod("razorpay")} hidden />
              <p className={`h-3.5 min-w-3.5 rounded-full border ${method === "razorpay" ? "bg-green-500" : ""}`}></p>
              <img className="mx-4 h-5" src={assets.razorpay_logo} alt="Razorpay Logo" />
            </label>

            <label className="flex cursor-pointer items-center gap-3 border p-2 px-3">
              <input type="radio" name="payment" checked={method === "cod"} onChange={() => setMethod("cod")} hidden />
              <p className={`h-3.5 min-w-3.5 rounded-full border ${method === "cod" ? "bg-green-500" : ""}`}></p>
              <p className="mx-4 text-sm font-medium text-gray-500">CASH ON DELIVERY</p>
            </label>
          </div>
          <div className="mt-8 w-full text-end">
            <button
              onClick={handlePlaceOrder}
              className="w-full cursor-pointer rounded bg-green-600 py-2 text-white hover:bg-green-700 active:scale-95 active:bg-green-800"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
