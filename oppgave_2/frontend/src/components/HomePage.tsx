"use client";

import useHappening from "@/hooks/useHappening";
import Order from "./Order";
import Admin from "./Admin";

export default function HomePage() {
  const { addHappeningData, happening, setHappening } = useHappening();

  return (
    <>
      <Order happening={happening} />
      <Admin />
    </>
  );
}
