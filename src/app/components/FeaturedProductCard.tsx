interface FeaturedProductCardProps {
  category: string;
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  imageUrl: string;
  imageAlt: string;
  buttonText: string;
  imagePosition: "left" | "right";
}

export const FeaturedProductCard = ({
  category,
  title,
  description,
  price,
  originalPrice,
  imageUrl,
  imageAlt,
  buttonText,
  imagePosition,
}: FeaturedProductCardProps) => (
  <div className="lg:col-span-2 bg-white dark:bg-[#1a2a3a] rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
    <img
      alt={imageAlt}
      className={`w-full md:w-1/2 h-80 md:h-auto object-cover ${
        imagePosition === "right" ? "md:order-2" : ""
      }`}
      src={imageUrl}
    />
    <div
      className={`p-8 flex flex-col justify-center ${
        imagePosition === "right" ? "md:order-1" : ""
      }`}
    >
      <p className="text-gray-500 dark:text-gray-400 text-sm uppercase font-semibold mb-2">
        {category}
      </p>
      <h2 className="text-3xl font-bold text-[#111418] dark:text-white mb-4 leading-tight">
        {title}
      </h2>
      <p className="text-gray-700 dark:text-gray-300 text-base mb-6">
        {description}
      </p>
      <div className="flex items-center mb-6">
        <p className="text-primary text-2xl font-bold mr-3">{price}</p>
        {originalPrice && (
          <p className="text-gray-500 line-through">{originalPrice}</p>
        )}
      </div>
      <button className="w-full bg-gray-100 dark:bg-gray-800 text-primary dark:text-white py-2 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
        {buttonText}
      </button>
    </div>
  </div>
);
