interface InfoCardProps {
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
}

export function InfoCard({
  category,
  title,
  description,
  imageUrl,
  imageAlt,
}: InfoCardProps) {
  return (
    <div className="lg:col-span-1 bg-white dark:bg-[#1a2a3a] rounded-xl shadow-lg overflow-hidden flex flex-col">
      <img alt={imageAlt} className="w-full h-56 object-cover" src={imageUrl} />
      <div className="p-6">
        <p className="text-gray-500 dark:text-gray-400 text-sm uppercase font-semibold mb-2">
          {category}
        </p>
        <h3 className="text-2xl font-bold text-[#111418] dark:text-white mb-3 line-clamp-1 ">
          {title}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {description}
        </p>
        <button className="w-full bg-gray-100 dark:bg-gray-800 text-primary dark:text-white py-2 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          Add To Cart
        </button>
      </div>
    </div>
  );
}
