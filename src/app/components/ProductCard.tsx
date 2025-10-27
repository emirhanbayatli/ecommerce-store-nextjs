interface ProductCardProps {
  imageUrl: string;
  altText: string;
  title: string;
  description: string;
  price: string;
}
export const ProductCard = ({
  imageUrl,
  altText,
  title,
  description,
  price,
}: ProductCardProps) => (
  <div className="bg-white dark:bg-[#1a2a3a] rounded-xl shadow-lg overflow-hidden">
    <img alt={altText} className="w-full h-56 object-cover" src={imageUrl} />
    <div className="p-5">
      <h3 className="text-xl font-semibold text-[#111418] dark:text-white mb-2 line-clamp-1 ">
        {title}
      </h3>
      <p className="text-gray-700 dark:text-gray-400 text-base mb-3 line-clamp-3">
        {description}
      </p>
      <p className="text-gray-900 dark:text-gray-400 text-primary text-xl font-bold my-2 text-center">
        {price}
      </p>
      <button className="w-full bg-gray-100 dark:bg-gray-800 text-primary dark:text-white py-2 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
        Add To Cart
      </button>
    </div>
  </div>
);
