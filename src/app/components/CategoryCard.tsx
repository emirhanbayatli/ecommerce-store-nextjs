interface CategoryCardProps {
  title: string;
  imageUrl: string;
}

export function CategoryCard({ title, imageUrl }: CategoryCardProps) {
  return (
    <div
      className="mb-5 bg-cover bg-center flex flex-col gap-3 rounded-xl p-6 border border-gray-200 dark:border-gray-700 justify-end h-[200px]"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.5), transparent), url('${imageUrl}')`,
      }}
    >
      <p className="text-white text-xl font-bold leading-tight">{title}</p>
      <p className="text-blue-400 text-sm font-medium hover:underline cursor-pointer">
        Shop Now →
      </p>
    </div>
  );
}
