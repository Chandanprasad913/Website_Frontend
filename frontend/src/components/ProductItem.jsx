import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, images, name, price }) => {
  const { currency } = useContext(ShopContext);

  // ✅ Normalize images input (handles undefined, string, object, etc.)
  const safeImages = Array.isArray(images) ? images : images ? [images] : [];
  const imageUrl = safeImages.length > 0 ? safeImages[0] : "/placeholder.jpg";

  return (
    <Link className="cursor-pointer text-gray-700" to={`/product/${id}`}>
      <div className="overflow-hidden">
        <img
          className="h-auto w-full object-cover transition ease-in-out hover:scale-110"
          src={imageUrl}
          alt={name || "Product image"}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/placeholder.jpg"; // 👈 Fallback if image fails to load
          }}
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name || "No name available"}</p>
      <p className="text-sm font-medium">
        {currency} {price || "N/A"}
      </p>
    </Link>
  );
};

export default ProductItem;
