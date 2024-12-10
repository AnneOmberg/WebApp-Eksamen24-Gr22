"use client";

import { useAdmin } from "@/context/AdminContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const { isAdmin } = useAdmin();
  const logIn = pathname === "/";

  return (
    <header className="container sticky top-0 mx-auto p-4 bg-white text-slate-800">
      {!logIn ? (
        <nav className="flex justify-between">
          <ul className="flex space-x-4">
            <li>
              <Link
                href="/happenings"
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
                  href="/newevent"
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
