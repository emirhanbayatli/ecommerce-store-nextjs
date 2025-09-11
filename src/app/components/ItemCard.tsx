import Image from "next/image";
interface ItemCardProps {
  id?: number;
  title: string;
  imgSrc: string;
  imgAlt: string;
  price?: string;
  rating?: string;
  discount: number;
}

export default function ItemCard({
  title,
  imgSrc,
  imgAlt,
  price,
  rating,
  discount,
}: ItemCardProps) {
  return (
    <div className="w-80 rounded shadow-lg bg-white p-4 hover:shadow-2xl transition ">
      <div className="flex justify-center">
        <Image src={imgSrc} alt={imgAlt} width={200} height={200} />
      </div>
      <div className="px-6 py-4 ">
        <h3 className="text-gray-700 font-bold text-xl mb-2 text-center ">
          {title}
        </h3>

        {discount > 0 ? (
          <div>
            <p className="text-gray-700 font-bold text-xl mb-2 text-center line-through">
              {price}
            </p>
            <p className="text-gray-700 font-bold text-xl mb-2 text-center">
              {discount}
            </p>
          </div>
        ) : (
          <p className="text-gray-700 font-bold text-xl mb-2 text-center">
            {price}
          </p>
        )}

        <p className="text-gray-700 text-xl text-center">{rating}</p>
      </div>
    </div>
  );
}
