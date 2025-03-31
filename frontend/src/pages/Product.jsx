import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    const foundProduct = products.find((item) => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image[0]);
    } else {
      setProductData(null);
    }
  }, [productId, products]);

  if (!productData) {
    return (
      <div className="flex h-screen items-center justify-center text-lg text-gray-500">
        Product not found.
      </div>
    );
  }

  return (
    <div className="border-t-2 pt-10 opacity-100 transition-opacity duration-500 ease-in">
      {/* Product Data */}
      <div className="flex flex-col gap-12 sm:flex-row sm:gap-12">
        {/* Product Image */}
        <div className="flex flex-1 flex-col-reverse gap-3 sm:flex-row">
          <div className="flex w-full justify-between overflow-x-auto sm:w-[18.7%] sm:flex-col sm:justify-normal sm:overflow-y-scroll">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] flex-shrink-0 cursor-pointer sm:mb-3 sm:w-full"
                alt={productData.name}
                loading="lazy"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img
              src={image}
              className="m-auto h-auto w-full"
              alt={productData.name}
              loading="lazy"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="mt-2 text-2xl font-semibold">{productData.name}</h1>
          <div className="mt-2 flex items-center gap-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <img
                key={i}
                src={assets.star_icon}
                alt="star"
                className="w-3.5"
              />
            ))}
            <img src={assets.star_dull_icon} alt="star" className="w-3.5" />
            <p className="pl-2">(122)</p>
          </div>

          <p className="mt-5 text-3xl font-medium">
            {currency} {productData.price}
          </p>
          <p className="mt-5 w-4/5 text-gray-500">{productData.description}</p>

          {/* Size Selection */}
          <div className="my-8 flex flex-col gap-4">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`cursor-pointer border bg-gray-100 px-4 py-2 transition ${
                    item === size
                      ? "border-orange-500 bg-orange-100"
                      : "hover:border-gray-400"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(productData._id, size)}
            className="cursor-pointer bg-black px-10 py-4 text-sm text-white transition hover:bg-gray-800 active:scale-95"
          >
            Add to Cart
          </button>

          <hr className="mt-8 sm:w-4/5" />
          <div className="mt-5 flex flex-col gap-2 text-sm text-gray-500">
            <p>✅ 100% Original Products</p>
            <p>✅ Cash on delivery available</p>
            <p>✅ Easy return within 14 days</p>
          </div>
        </div>
      </div>

      {/* Description and Reviews */}
      <div className="mt-20">
        <div className="flex gap-2">
          <p className="border px-5 py-3 text-sm">Description</p>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>

        <div className="flex flex-col gap-4 border px-6 py-6 text-sm">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum,
            aperiam! Quibusdam itaque quasi iusto quam enim cumque quis ipsa
            perferendis, maiores consequatur.
          </p>
          <p>
            Repudiandae minus maxime cumque id fuga sit facilis, cum accusantium
            saepe cupiditate aliquid.
          </p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;
