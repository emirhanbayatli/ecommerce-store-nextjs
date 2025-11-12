"use client";
import { useAuthContext } from "../AuthContextProvider";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { LoadingSpinner } from "../components/LoadingSpinner";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Boxes, ClipboardList, Users } from "lucide-react";
import { toast } from "sonner";

const navLinks = [
  { href: "/admin/products", label: "Products", icon: Boxes },
  { href: "/admin/orders", label: "Orders", icon: ClipboardList },
  { href: "/admin/customers", label: "Customers", icon: Users },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuthContext();
  const [role, setRole] = useState<string | null>(null);
  const [roleLoading, setRoleLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user?.id) {
        setRole(null);
        setRoleLoading(false);
        return;
      }
      try {
        const docRef = doc(db, "users", user.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setRole(docSnap.data()?.role ?? null);
        } else {
          setRole(null);
        }
      } catch (err) {
        console.error("Error fetching user role:", err);
        toast.error("Error fetching user role");
        setRole(null);
      } finally {
        setRoleLoading(false);
      }
    };
    fetchUserRole();
  }, [user?.id]);

  if (loading || roleLoading || !role)
    return (
      <main className="flex items-center justify-center w-full h-screen">
        <LoadingSpinner />
      </main>
    );
  if (!user || role !== "admin")
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

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="hidden w-64 flex-col bg-white p-4 md:flex">
        <div className="mb-6 flex items-center gap-3 px-2">
          <Boxes className="text-blue-600" size={28} />
          <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
        </div>
        <nav className="flex-1">
          <ul className="space-y-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex items-center gap-3 rounded-lg p-3 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <link.icon size={20} />
                    <span>{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <main className="flex-1">
        <header className="sticky top-0 z-10  bg-white p-2 md:hidden">
          <div className="flex items-center justify-between px-2">
            <span className="font-bold text-gray-800">Admin Panel</span>
          </div>
          <nav className="mt-2 overflow-x-auto whitespace-nowrap pb-2">
            <ul className="flex space-x-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <link.icon size={16} />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </header>

        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
