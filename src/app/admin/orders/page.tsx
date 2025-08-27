import { db } from "@/utils/firebase";
import { collection, getDocs } from "firebase/firestore";

export default async function Orders() {
  const querySnapshot = await getDocs(collection(db, "orders"));
  const orders = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    userName: doc.data().userName,
    userId: doc.data().userId,
    totalAmount: doc.data().totalAmount,
    status: doc.data().status,
    createdAt: doc.data().createdAt,
    ...doc.data(),
  }));

  return (
    <div className="min-h-screen flex flex-col bg-white font-inter overflow-x-hidden">
      <main className="flex-1 px-10 py-5 flex justify-center">
        <div className="flex flex-col max-w-4xl w-full">
          <div className="flex flex-col sm:flex-row justify-between gap-3 p-4">
            <div className="flex flex-col gap-1">
              <p className="text-2xl font-bold text-gray-900">Orders</p>
              <p className="text-sm text-gray-500">
                Manage and track all customer orders
              </p>
            </div>
          </div>

          <div className="overflow-x-auto px-4 py-3">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-white">
                <tr>
                  {[
                    "Order Number",
                    "Customer",
                    "Order Date",
                    "Total Amount",
                    "Status",
                    "Actions",
                  ].map((col) => (
                    <th
                      key={col}
                      className="px-4 py-3 text-left text-sm font-medium text-gray-900"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-t border-gray-200">
                    <td className="px-4 py-2 text-sm text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-500">
                      {order.userName}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-500">
                      {order.createdAt.toDate().toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-500">
                      {order.totalAmount}$
                    </td>
                    <td className="px-4 py-2">
                      <button className="w-full h-8 rounded-lg bg-gray-200 text-gray-900 text-sm font-medium">
                        {order.status}
                      </button>
                    </td>
                    <td className="px-4 py-2 text-sm font-bold text-blue-600 cursor-pointer">
                      View Details
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
