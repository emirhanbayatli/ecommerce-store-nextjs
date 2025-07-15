import Image from "next/image";
interface ItemCardProps {
  id?: number;
  title: string;
  imgSrc: string;
  imgAlt: string;
  price?: string;
  rating?: string;
}

export default function ItemCard({
  title,
  imgSrc,
  imgAlt,
  price,
  rating,
}: ItemCardProps) {
  return (
    <div className="rounded shadow-lg bg-white m-4 hover:shadow-2xl transition">
      <Image src={imgSrc} alt={imgAlt} width={250} height={250} />
      <div className="px-6 py-4 ">
        <h3 className="text-gray-700 font-bold text-xl mb-2 text-center">
          {title}
        </h3>
        <p className="text-gray-700 font-bold text-xl mb-2 text-center">
          {price}
        </p>
        <p className="text-gray-700 text-xl text-center">{rating}</p>
      </div>
    </div>
  );
}
