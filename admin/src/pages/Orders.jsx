import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return null;

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: event.target.value },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchAllOrders();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3 className="text-2xl font-semibold text-black mb-3.5">Order Page</h3>
      <div className="">
        {orders.map((order, index) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700 "
            key={index}
          >
            <img className="w-12" src={assets.parcel_icon} alt="" />

            <div className="">
              <div className="">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (
                      <p className="py-0.5" key={index}>
                        {" "}
                        {item.name} X {item.quantity} <span> {item.size} </span>{" "}
                      </p>
                    );
                  } else {
                    return (
                      <p className="py-0.5" key={index}>
                        {" "}
                        {item.name} X {item.quantity} <span> {item.size} </span>{" "}
                        ,
                      </p>
                    );
                  }
                })}
              </div>
              <p className="mt-3 mb-2 font-semibold text-blue-600">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="">
                <p> {order.address.address + ","} </p>
                <p>
                  {" "}
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zip}{" "}
                </p>
              </div>
              <p> {order.address.phone} </p>
            </div>
            <div className="">
              <p className="text-sm sm:text-[15px]">
                {" "}
                Items : {order.items.length}{" "}
              </p>
              <p className="mt-3"> Method : {order.paymentMethod} </p>

              <p>
                Payment:{" "}
                <span
                  className={`px-2 py-1 rounded-full text-white text-xs ${
                    order.payment ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {order.payment ? "Paid" : "Pending"}
                </span>
              </p>

              <p className="">
                {" "}
                Date : {new Date(order.date).toLocaleDateString()}{" "}
              </p>
            </div>
            <p className="text-sm sm:text-[16px]">
              {" "}
              {currency} {order.amount}{" "}
            </p>

            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
              className="p-2 font-semibold border border-gray-400 rounded-md"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Orders;
