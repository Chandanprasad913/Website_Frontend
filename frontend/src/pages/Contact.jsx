import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetterBox from "../components/NewsletterBox";

const Contact = () => {
  return (
    <div>
      <div className="border-t pt-10 text-center text-2xl">
        <Title text1="CONTACT" text2="US" />
      </div>

      <div className="my-10 mb-28 flex flex-col justify-center gap-10 md:flex-row">
        <img
          className="w-full md:max-w-[480px]"
          src={assets.contact_img}
          alt=""
        />

        <div className="flex flex-col items-start justify-center gap-6">
          <p className="text-xl font-semibold text-gray-600">Our Store</p>
          <p className="text-gray-500">
            1234 Denim Street, Suite 567
            <br />
            New York, NY 10001 United States
          </p>
          <p className="text-gray-500">
            Tel: (413) 555-0035 <br />
            Email: admin@voguevibe.com
          </p>
          <p className="text-xl font-semibold text-gray-600">
            Carrers at Vogue Vibe
          </p>
          <p className="text-gray-500">
            Learn more about our culture and values, and how you can join our
            team.
          </p>

          <button className="cursor-pointer border border-black px-8 py-4 text-sm transition-all duration-500 hover:bg-black hover:text-white">
            Explore Careers
          </button>
        </div>
      </div>
      <NewsLetterBox/>
    </div>
  );
};
export default Contact;
