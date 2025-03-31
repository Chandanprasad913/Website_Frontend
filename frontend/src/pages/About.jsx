import { assets } from "../assets/assets";
import Title from "../components/Title";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <div>
      <div className="border-t pt-8 text-center text-2xl">
        <Title text1="About" text2="Us" />
      </div>

      <div className="my-10 flex flex-col gap-16 md:flex-row">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.posterImg8}
          alt="About Us"
        />

        <div className="flex flex-col justify-center gap-6 text-gray-600 md:w-2/4">
          <p>
            Welcome to Vogue Vibe, where passion meets innovation. We believe in
            creating high-quality, stylish, and functional products that enhance
            everyday experiences. Our journey began with a vision to redefine
            excellence, pushing the boundaries of design and craftsmanship.
          </p>

          <p>
            We take pride in our commitment to quality, sustainability, and
            customer satisfaction. Every product we offer is a result of
            meticulous attention to detail, ensuring that you receive nothing
            but the best.
          </p>

          <b className="text-gray-800">Our Mission</b>

          <p>
            Our mission is to inspire confidence and elevate lifestyles through
            exceptional products. We are dedicated to innovation, continuous
            improvement, and delivering value to our customers. At Vogue Vibe,
            we don’t just sell products—we create experiences.
          </p>
        </div>
      </div>

      <div className="py-4 text-2xl">
        <Title text1="WHY" text2="CHOOSE US" />
      </div>

      <div className="mb-20 flex flex-col gap-6 text-sm md:flex-row md:gap-8">
        <div className="flex flex-col gap-4 border px-8 py-10 text-center sm:py-16 md:px-14 md:text-left">
          <b className="text-lg text-gray-800">Quality Assurance</b>
          <p className="text-gray-600">
            We are committed to delivering only the highest quality products,
            meticulously designed and crafted with attention to detail. Our
            rigorous quality control ensures durability, reliability, and
            excellence in every purchase.
          </p>
        </div>

        <div className="flex flex-col gap-4 border px-8 py-10 text-center sm:py-16 md:px-14 md:text-left">
          <b className="text-lg text-gray-800">Convenience</b>
          <p className="text-gray-600">
            Shopping with us is seamless and hassle-free. From an intuitive
            browsing experience to smooth transactions and fast delivery, we
            prioritize your convenience at every step.
          </p>
        </div>

        <div className="flex flex-col gap-4 border px-8 py-10 text-center sm:py-16 md:px-14 md:text-left">
          <b className="text-lg text-gray-800">Exceptional Customer Service</b>
          <p className="text-gray-600">
            Your satisfaction is our top priority. Our dedicated support team is
            always available to assist you, ensuring that every interaction is
            friendly, professional, and solution-driven.
          </p>
        </div>
      </div>
      <NewsletterBox />

    </div>
  );
};
export default About;
