// 🧠 Imports are all good. Nothing to change here.
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod"); // ✅ Default is COD
  
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    deliveryFee,
    products,
  } = useContext(ShopContext);

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

  // 🔁 Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      let orderItems = [];

      // 🛒 Build orderItems from cart structure
      for (const [productId, sizes] of Object.entries(cartItems)) {
        for (const [size, quantity] of Object.entries(sizes)) {
          if (quantity > 0) {
            const itemInfo = structuredClone(
              products.find((item) => item._id === productId)
            );
            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = quantity;
              orderItems.push(itemInfo);
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + deliveryFee,
        paymentMethod: method, // ✅ Optional: store method for admin view
      };

      switch (method) {
        case "cod": {
          const response = await axios.post(
            `${backendUrl}/api/order/place`,
            orderData,
            { headers: { token } }
          );

          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message || "Failed to place COD order");
          }
          break;
        }

        case "stripe": {
          const responseStripe = await axios.post(
            `${backendUrl}/api/order/stripe`,
            orderData,
            { headers: { token } }
          );          

          console.log(responseStripe.data);
          

          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url); // 🔁 Redirect to Stripe
          } else {
            toast.error(responseStripe.data.message || "Stripe failed");
          }
          break;
        }

        // 🧠 Razorpay is selected but not handled, optional warning
        case "razorpay": {
          toast.info("Razorpay is currently not available.");
          break;
        }

        default:
          toast.error("Invalid payment method selected");
          break;
      }
    } catch (error) {
      console.error("Order submission error:", error?.response || error);
      toast.error(error.message || "Something went wrong while placing order");
    }
  };

  return (
   token ? ( <form
    onSubmit={onSubmitHandler}
    className="flex min-h-[80vh] flex-col justify-between gap-4 border-t pt-5 sm:flex-row sm:pt-14"
  >
    {/* LEFT SIDE — Form */}
    <div className="flex w-full flex-col gap-4 sm:max-w-[480px]">
      <div className="my-3 text-xl sm:text-2xl">
        <Title text1="DELIVERY" text2="INFORMATION" />
      </div>

      {/* Name Fields */}
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

      {/* Contact Info */}
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

      {/* Address */}
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

    {/* RIGHT SIDE — Cart + Payment */}
    <div className="mt-8">
      <div className="mt-8 min-w-80">
        <CartTotal />
      </div>

      <div className="mt-12">
        <Title text1="PAYMENT" text2="METHOD" />

        <div className="flex flex-col gap-3 lg:flex-row">
          {/* Stripe */}
          <label className="flex cursor-pointer items-center gap-3 border p-2 px-3">
            <input
              type="radio"
              name="payment"
              checked={method === "stripe"}
              onChange={() => setMethod("stripe")}
              hidden
            />
            <p
              className={`h-3.5 min-w-3.5 rounded-full border ${
                method === "stripe" ? "bg-green-500" : ""
              }`}
            ></p>
            <img
              className="mx-4 h-5"
              src={assets.stripe_logo}
              alt="Stripe Logo"
            />
          </label>

          {/* Razorpay */}
          <label className="flex cursor-pointer items-center gap-3 border p-2 px-3">
            <input
              type="radio"
              name="payment"
              checked={method === "razorpay"}
              onChange={() => setMethod("razorpay")}
              hidden
            />
            <p
              className={`h-3.5 min-w-3.5 rounded-full border ${
                method === "razorpay" ? "bg-green-500" : ""
              }`}
            ></p>
            <img
              className="mx-4 h-5"
              src={assets.razorpay_logo}
              alt="Razorpay Logo"
            />
          </label>

          {/* COD */}
          <label className="flex cursor-pointer items-center gap-3 border p-2 px-3">
            <input
              type="radio"
              name="payment"
              checked={method === "cod"}
              onChange={() => setMethod("cod")}
              hidden
            />
            <p
              className={`h-3.5 min-w-3.5 rounded-full border ${
                method === "cod" ? "bg-green-500" : ""
              }`}
            ></p>
            <p className="mx-4 text-sm font-medium text-gray-500">
              CASH ON DELIVERY
            </p>
          </label>
        </div>

        <div className="mt-8 w-full text-end">
          <button
            type="submit"
            className="w-full cursor-pointer rounded bg-green-600 py-2 text-white hover:bg-green-700 active:scale-95 active:bg-green-800"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  </form>) : (navigate("/login")) 
  );
};

export default PlaceOrder;
