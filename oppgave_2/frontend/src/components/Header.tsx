"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const logIn = pathname === "/";

  return (
    <header className="container mx-auto p-4 bg-white text-slate-800">
      {!logIn ? (
        <nav className="flex justify-between">
          <ul className="flex space-x-4">
            <li>
              <Link
                href={isAdmin ? "/admin/Happenings" : "/Happenings"}
                className="text-lg font-semibold hover:text-gray-300"
              >
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
          <span>
            <Link
              href="/"
              className="text-lg font-semibold hover:text-gray-300"
            >
              Logg ut
            </Link>
          </span>
        </nav>
      ) : (
        <h2 className="text-lg font-semibold hover:text-gray-300">Logg inn</h2>
      )}
    </header>
  );
}
