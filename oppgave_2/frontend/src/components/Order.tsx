import useHappening from "@/hooks/useHappening";
import Happening from "./Happenings";
import { HappeningType } from "@/types/type";
import Link from "next/link";
import { useParams } from "next/navigation";

type OrderType = {
  happening: HappeningType[];
};

export default function Order({ happening }: OrderType) {
  // const { slug, id } = useParams() as { slug: string; id: string
  //     orderSlug = slug as string;
  //     hapSlug = id as string;

  // };

  return (
    <>
      <Happening happening={happening} />
    </>
  );
}
