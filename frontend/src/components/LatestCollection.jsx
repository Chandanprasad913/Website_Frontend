import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);

  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      setLatestProducts(products.slice(0, 10));
    }
  }, [products]);

  return (
    <div className="my-10">
      <div className="py-8 text-center text-3xl">
        <Title text1="LATEST" text2="COLLECTION" />
        <p className="m-auto w-3/4 text-xs text-gray-600 sm:text-sm md:text-base">
          <span className="font-semibold text-red-600">Discover</span> our
          latest collection featuring trendy styles and timeless designs.{" "}
          <span className="font-semibold text-red-600">Elevate</span> your
          wardrobe with our newest arrivals!
        </p>
      </div>

      {/* Rendering the latest products */}
      <div className="grid grid-cols-2 gap-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {latestProducts.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            images={item.images}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};
export default LatestCollection;
