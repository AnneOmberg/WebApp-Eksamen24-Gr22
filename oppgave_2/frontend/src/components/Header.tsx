"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <header className="bg-gray-800 text-white">
      <nav className="container mx-auto p-4">
        <ul className="flex space-x-4">
          
          <li>
            <Link href={isAdmin ? "/admin/Happenings" : "/Happenings"} className="text-lg font-semibold hover:text-gray-300">
              Hjem
            </Link>
          </li>
          {isAdmin && (
            <li>
              <Link
                href="/admin"
                className="text-lg font-semibold hover:text-gray-300"
              >
                Admin
              </Link>
            </li>
          )}
          {isAdmin && (
            <li>
              <Link
                href="/admin/newevent"
                className="text-lg font-semibold hover:text-gray-300"
              >
                + Nytt arrangement
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
