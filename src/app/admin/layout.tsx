"use client";
import Link from "next/link";
import {
  Home,
  Boxes,
  ClipboardList,
  Users,
  BarChart,
  Settings,
} from "lucide-react";
import { useAuthContext } from "../AuthContextProvider";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { LoadingSpinner } from "../components/LoadingSpiner";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = useAuthContext();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUserRole = async () => {
      if (!currentUser?.id) {
        setLoading(false);
        return;
      }

      const docRef = doc(db, "users", currentUser.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setRole(docSnap.data()?.role ?? null);
      } else {
        setRole(null);
      }
      setLoading(false);
    };

    fetchUserRole();
  }, [currentUser?.id]);

  if (loading)
    return (
      <main className="flex items-center justify-center w-full h-screen">
        <LoadingSpinner />
      </main>
    );

  if (!currentUser || role !== "admin") {
    return (
      <main className="flex items-center justify-center w-full h-screen bg-gray-50">
        <div className="text-center p-6 bg-white shadow-md rounded-lg">
          <p className="text-lg font-semibold text-red-600 mb-4">
            Only admins can access this panel!
          </p>
          <Link
            href="/"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Go Home Page
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen">
      <div className="flex justify-center w-50 bg-gray-100 p-4">
        <ul className="space-y-3 text-sm ">
          <li className="flex items-center gap-2">
            <Home size={18} />
            <Link href="/admin">Home</Link>
          </li>
          <li className="flex items-center gap-2">
            <Boxes size={18} />
            <Link href="/admin/products">Products</Link>
          </li>
          <li className="flex items-center gap-2">
            <ClipboardList size={18} />
            <Link href="/admin/orders">Orders</Link>
          </li>
          <li className="flex items-center gap-2">
            <Users size={18} />
            <Link href="/admin/customers">Customers</Link>
          </li>
          <li className="flex items-center gap-2">
            <BarChart size={18} />
            <Link href="/admin/reports">Reports</Link>
          </li>
          <li className="flex items-center gap-2">
            <Settings size={18} />
            <Link href="/admin/settings">Settings</Link>
          </li>
        </ul>
      </div>

      <section className="flex-1 p-6 bg-white">{children}</section>
    </main>
  );
}
