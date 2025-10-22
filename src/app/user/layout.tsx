"use client";
import Link from "next/link";
import { ClipboardList, Users, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navLinks = [
    { href: "/user", label: "Profile", icon: Users },
    { href: "/user/orders", label: "Orders", icon: ClipboardList },
    { href: "/user/settings", label: "Settings", icon: Settings },
  ];
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
        <header className="sticky top-0 z-10  bg-white p-2 md:hidden">
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
