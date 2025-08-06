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

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
