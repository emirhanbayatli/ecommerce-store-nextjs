import { getProducts } from "../../actions/admin/products";
import { Button } from "../../components/Button";
import Link from "next/link";
export default async function AdminProducts() {
  const products = await getProducts();
  return (
    <main>
      <h1 className="text-3xl text-center my-6">Admin Products</h1>

      <div className="container mx-auto px-4 my-12 max-w-5xl">
        {products.length > 0 ? (
          <div className="border rounded-xl">
            <div className="min-w-full">
              <div className="bg-white divide-y divide-gray-100">
                <ul>
                  {products.map((product) => (
                    <li
                      key={product.id}
                      className="grid justify-items-center grid-cols-6 gap-5 place-items-center p-4"
                    >
                      <img
                        src={product.images}
                        alt={product.title}
                        width={100}
                        className="rounded"
                      />
                      <span className="text-center">{product.title}</span>
                      <span>{product.price} $</span>
                      <span> {product.quantity}</span>
                      <Link href={`/admin/products/${product.id}/edit`}>
                        <Button label="Edit" />
                      </Link>
                      <Button label="Delete" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center my-12">
            <h2 className="text-2xl my-4">Your shopping cart is empty!</h2>
          </div>
        )}
      </div>
    </main>
  );
}
