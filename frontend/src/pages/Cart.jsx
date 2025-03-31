import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const itemId in cartItems) {
      const product = products.find((item) => item._id === itemId);
      if (!product) continue; // Prevents errors if product is undefined

      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          tempData.push({
            _id: itemId,
            image: product.image ? product.image[0] : "",
            name: product.name || "Unknown Product",
            price: product.price || 0,
            size: size,
            quantity: cartItems[itemId][size],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems, products]); // Added `products` as a dependency

  return (
    <div className="border-t pt-14">
      <div className="mb-3 text-2xl">
        <Title text1="YOUR" text2="CART" />
      </div>

      {cartData.length > 0 ? (
        <>
          <div>
            {cartData.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-[4fr_0.5fr_0.5fr] items-center gap-4 border-t border-b py-4 text-gray-700 sm:grid-cols-[4fr_2fr_0.5fr]"
              >
                <div className="flex items-start gap-6">
                  <img
                    className="w-16 sm:w-20"
                    src={item.image}
                    alt={item.name}
                  />

                  <div>
                    <p className="text-xs font-medium sm:text-lg">
                      {item.name}
                    </p>
                    <div className="mt-2 flex items-center gap-5">
                      <p className="px-2 font-medium sm:px-3 sm:py-1">
                        {currency}
                        {item.price}
                      </p>
                      <p className="border bg-slate-50 px-2 sm:px-3 sm:py-1">
                        Size: {item.size}
                      </p>
                    </div>
                  </div>
                </div>

                <input
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (!isNaN(value) && value > 0) {
                      updateQuantity(item._id, item.size, value);
                    }
                  }}
                  className="max-w-10 border px-1 py-1 sm:max-w-20 sm:px-2"
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                />
                <img
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  className="mr-4 w-4 cursor-pointer sm:w-5"
                  src={assets.bin_icon}
                  alt="Remove"
                />
              </div>
            ))}
          </div>

          <div className="my-20 flex justify-end">
            <div className="w-full sm:w-[450px]">
              <CartTotal />

              <div className="w-full text-end">
                <button
                  onClick={() => navigate("/place-order")}
                  className="my-8 cursor-pointer bg-black px-10 py-4 text-white hover:bg-gray-900 active:scale-95 active:bg-gray-900"
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="mt-10 text-center text-gray-600">
          <p className="text-lg font-semibold">
            Nothing to see here… just an empty cart dreaming of goodies. 💤
          </p>
          <p className="text-sm">Wake it up with some fresh finds! 🛍️.</p>
          <button
            onClick={() => navigate("/collection")}
            className="mt-6 cursor-pointer rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-900 active:scale-95 active:bg-gray-900"
          >
            Start Shopping 🛍️
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
