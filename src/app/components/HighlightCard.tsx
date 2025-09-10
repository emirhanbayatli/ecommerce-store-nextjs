interface HighlightProps {
  id?: number;
  title: string;
  imgSrc: string;
  imgAlt: string;
  price?: number | string;
  discount: number;
  className?: string;
}

const colors = [
  "bg-blue-300",
  "bg-green-300",
  "bg-yellow-300",
  "bg-pink-300",
  "bg-purple-300",
  "bg-indigo-300",
  "bg-teal-300",
  "bg-red-300",
  "bg-orange-300",
];

export default function HighlightCard({
  title,
  imgSrc,
  imgAlt,
  price,
  discount,
  className,
}: HighlightProps) {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <main className="flex justify-end max-w-md mx-auto rounded-lg shadow-lg hover:shadow-xl cursor-pointer h-60">
      <img
        src={imgSrc}
        alt={imgAlt}
        className="w-40 h-40 object-cover rounded-lg"
      />
      <div
        data-testid="highlight-card-info"
        className={`p-4 flex flex-col justify-between text-white rounded-r-lg w-3/5 ${randomColor} ${className}`}
      >
        <h3 className="text-xl text-center font-bold mb-2">{title}</h3>

        <div className="mb-2 flex flex-col items-center">
          {discount > 0 ? (
            <div>
              <p className="text-white font-bold text-xl mb-2 text-center">
                {discount} $
              </p>
            </div>
          ) : (
            <p className="text-white font-bold text-xl mb-2 text-center">
              {price} $
            </p>
          )}
        </div>
        <p className="text-white font-semibold">Limited Stock !</p>
      </div>
    </main>
  );
}
