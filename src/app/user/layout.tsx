"use client";
import Link from "next/link";
import { ClipboardList, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAuthContext } from "../AuthContextProvider";
import { LoadingSpinner } from "../components/LoadingSpinner";
import SignIn from "./signIn/page";

const navLinks = [
  { href: "/user", label: "Profile", icon: Users },
  { href: "/user/orders", label: "Orders", icon: ClipboardList },
];

const publicRoutes = ["/user/signUp", "/user/reset-password", "/user/signIn"];

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, loading } = useAuthContext();

  if (publicRoutes.includes(pathname)) return <>{children}</>;

  if (loading) {
    return (
      <main className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </main>
    );
  }

  if (!user) {
    return <SignIn />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="hidden w-64 flex-col bg-white p-4 md:flex">
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
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
