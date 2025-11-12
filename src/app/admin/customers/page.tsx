"use client";

import { db } from "@/utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
interface Customer {
  id: string;
  uid: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function Customers() {
  const [customer, setCustomer] = useState<Customer[]>();

  useEffect(() => {
    async function getCustomersFirebase() {
      const querySnapshot = await getDocs(collection(db, "users"));
      const customersData: Customer[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        uid: doc.data().uid,
        email: doc.data().email,
        role: doc.data().role,
        createdAt: doc.data().createdAt?.toDate
          ? doc.data().createdAt.toDate().toISOString()
          : "",
      }));
      setCustomer(customersData);
    }
    getCustomersFirebase();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white font-inter overflow-x-hidden">
      <main className="flex-1 px-10 py-5 flex justify-center">
        <div className="flex flex-col max-w-4xl w-full">
          <div className="flex flex-col sm:flex-row justify-between gap-3 p-4">
            <div className="flex flex-col gap-1">
              <p className="text-2xl font-bold text-gray-900">Customers</p>
              <p className="text-sm text-gray-500">
                Manage and view all registered users
              </p>
            </div>
          </div>

          <div className="overflow-x-auto px-4 py-3">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-white">
                <tr>
                  {["Email", "Role", "Joined Date", "User ID"].map((col) => (
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
                {customer?.map((c) => (
                  <tr key={c.id} className="border-t border-gray-200">
                    <td className="px-4 py-2 text-sm text-gray-500">
                      {c.email}
                    </td>
                    <td className="px-4 py-2">
                      <button className="w-full h-8 rounded-lg bg-gray-200 text-gray-900 text-sm font-medium">
                        {c.role}
                      </button>
                    </td>

                    <td className="px-4 py-2 text-sm text-gray-500">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900">{c.id}</td>
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
