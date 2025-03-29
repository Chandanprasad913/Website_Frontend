import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller === true);
    setBestSellers(bestProduct.slice(0, 5));
  }, []);

  return (
    <div className="my-10">
      <div className="py-8 text-center text-3xl">
        <Title text1="BEST" text2="SELLERS" />
        <p className="m-auto w-3/4 text-xs text-gray-600 sm:text-sm md:text-base">
          <span className="font-semibold text-red-600">Discover</span> our most
          popular picks, loved by our customers for their quality and style.
          Grab yours before they sell out!
        </p>
      </div>

      {/* Rendering the best sellers */}
      <div className="grid grid-cols-2 gap-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {bestSellers.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};
export default BestSeller;
