"use client";

import SignUp from "@/components/SignUp";
import { usePathname } from "next/navigation";
import { AppProps } from "next/app";
import { AdminProvider } from "@/context/AdminContext";

export default function HomePage() {
  return (
    <AdminProvider>
      <SignUp />
    </AdminProvider>
  );
}

// "use client";

// import useHappening from "@/hooks/useHappening";
// import Order from "./Order";
// import Admin from "./Admin";

// export default function HomePage() {
//   const { addHappeningData, happening, setHappening } = useHappening();

//   return (
//     <>
//       <h1 className="text-3xl font-bold">Finn nytt arrangement</h1>
//       <a href="/Bestillinger">
//         <p>Finn arrangement her:</p>
//       </a>
//       <Order happening={happening} />
//       <Admin />
//     </>
//   );
// }
