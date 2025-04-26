import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);

  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return null;

      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } },
      );

      if (response.data.success) {
        let allOrdersItem = [];

        response.data.userOrders.forEach((order) => {
          order.items.forEach((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrdersItem.push(item);
          });
        });

        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1="YOUR" text2="ORDERS" />
      </div>

      <div className="">
        {orderData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 border-t border-b py-4 text-gray-700 md:flex-row md:items-center md:justify-between"
          >
            <div className="flex items-start gap-6 text-sm">
              <img className="w-16 sm:w-20" src={item.images[0]} alt="" />
              <div className="">
                <p className="font-medium sm:text-base">{item.name}</p>

                <div className="mt-1 flex items-center gap-3 text-base text-gray-700">
                  <p>
                    {currency}
                    {item.price}
                  </p>
                  <p className="">Quantity : {item.quantity}</p>
                  <p className="">Size:{item.size} </p>
                </div>
                <p className="mt-1">
                  Date:{" "}
                  <span className="text-gray-400">
                    {new Date(item.date).toDateString()}{" "}
                  </span>
                </p>

                <p className="mt-1">
                  Payment:{" "}
                  <span className="text-gray-400"> {item.paymentMethod} </span>
                </p>
              </div>
            </div>
            <div className="flex justify-between md:w-1/2">
              <div className="flex items-center gap-2">
                <p className="h-2 min-w-2 rounded-full bg-green-500"></p>
                <p className="text-sm md:text-base">{item.status}</p>
              </div>

              <button
                onClick={loadOrderData}
                disabled={item.status === "Delivered"} // Disable if status is "Delivered"
                className={`cursor-pointer rounded-sm border px-4 py-2 text-sm font-medium ${
                  item.status === "Delivered"
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "hover:bg-blue-500 hover:text-white active:scale-90"
                }`}
              >
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Orders;
