import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white">
      <nav className="container mx-auto p-4">
        <ul className="flex space-x-4">
          <li>
            <a href="/" className="text-lg font-semibold hover:text-gray-300">
              Hjem
            </a>
          </li>
          <li>
            <a
              href="/admin"
              className="text-lg font-semibold hover:text-gray-300"
            >
              Admin
            </a>
          </li>
          <li>
            <Link
              href="/newevent"
              className="text-lg font-semibold hover:text-gray-300"
            >
              + Nytt arrangement
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
