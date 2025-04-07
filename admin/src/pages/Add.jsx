import { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("bestseller", bestseller);

      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message || "Failed to add product");
      }
    } catch (error) {
      toast.error(error.message || "Failed to add product");
    } finally {
      setLoading(false); // Stop loading
      setName("");
      setDescription("");
      setPrice("");
      setCategory("Men");
      setSubCategory("Topwear");
      setSizes([]);
      setBestseller(false);
      setImage1(null);
      setImage2(null);
      setImage3(null);
      setImage4(null);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p className="mb-2 font-semibold">Upload Image</p>

        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20 cursor-pointer"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt=""
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>

          <label htmlFor="image2">
            <img
              className="w-20 cursor-pointer"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt=""
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>

          <label htmlFor="image3">
            <img
              className="w-20 cursor-pointer"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt=""
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>

          <label htmlFor="image4">
            <img
              className="w-20 cursor-pointer"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt=""
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="my-2 font-semibold text-gray-800">Product Name</p>

        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here..."
        />
      </div>

      <div className="w-full">
        <p className="my-2 font-semibold text-gray-800">Product Description</p>

        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2"
          placeholder="Write product description here..."
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="my-2 font-semibold text-gray-800">Product category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="my-2 font-semibold text-gray-800">Sub Category</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className="my-2 font-semibold text-gray-800 ">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full sm:w-[120px] px-3 py-1"
            type="number"
            placeholder="250"
          />
        </div>
      </div>

      <div>
        <p className="my-2 font-semibold text-gray-800">Product sizes</p>
        <div className="flex gap-3">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((s) => s !== size)
                    : [...prev, size]
                )
              }
            >
              <p
                className={`${
                  sizes.includes(size) ? "bg-amber-300" : "bg-slate-300"
                } px-3 py-1 cursor-pointer`}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mt-5">
        <input
          onChange={() => setBestseller((prev) => !prev)}
          type="checkbox"
          checked={bestseller}
          id="bestseller"
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-28 py-3 mt-4 transition duration-300 text-sm ease-in-out text-white rounded-xl 
          ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-black hover:bg-blue-600 hover:text-black cursor-pointer active:scale-95"
          }
        `}
      >
        {loading ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
};
export default Add;
