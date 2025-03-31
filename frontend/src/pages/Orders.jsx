import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const Orders = () => {
  const { products, currency } = useContext(ShopContext);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1="YOUR" text2="ORDERS" />
      </div>

      <div className="">
        {products.slice(0, 4).map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 border-t border-b py-4 text-gray-700 md:flex-row md:items-center md:justify-between"
          >
            <div className="flex items-start gap-6 text-sm">
              <img className="w-16 sm:w-20" src={item.image[0]} alt="" />
              <div className="">
                <p className="font-medium sm:text-base">{item.name}</p>

                <div className="mt-2 flex items-center gap-3 text-base text-gray-700">
                  <p className="text-lg">
                    {currency}
                    {item.price}
                  </p>
                  <p className="">Quantity : 1</p>
                  <p className="">Size: M</p>
                </div>
                <p className="mt-2">
                  Date: <span className="text-gray-400">25, June 2024</span>
                </p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between">

            <div className="flex items-center gap-2 ">
              <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
              <p className="text-sm md:text-base">Delivered</p>
            </div>

            <button className="border px-4 py-2 text-sm cursor-pointer font-medium rounded-sm">Track Order</button>
            
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Orders;
