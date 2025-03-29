const NewsLetterBox = () => {
    const onSubmitHandler = (e) => {
        e.preventDefault();
    }


  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe to our newsletter and get 20% off your first purchase
      </p>
      <p className="mt-3 text-gray-500">
        Be the first to know about exclusive offers, new arrivals, and the
        latest trends.{" "}
        <span className="font-semibold text-red-600">Sign up now!</span>
      </p>
      <form onSubmit={onSubmitHandler} className="mx-auto my-6 flex w-full items-center gap-3 border pl-3 sm:w-1/2">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full outline-none sm:flex-1"
          required
        />
        <button type="submit" className="cursor-pointer bg-black px-10 py-4 text-white">
          Subscribe
        </button>
      </form>
    </div>
  );
};
export default NewsLetterBox;
