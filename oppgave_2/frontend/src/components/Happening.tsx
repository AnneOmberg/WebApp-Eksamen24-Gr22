// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation"; // Correct import
// import useHappening from "@/hooks/useHappening";
// import { HappeningType } from "@/types/type";

// export default function Happening() {
//   const { hapSlug } = useParams() as {
//     hapSlug: string
//   }; // Get dynamic route parameter
//   const { happenings, getHappening } = useHappening();
//   const [content, setContent] = useState<HappeningType | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (hapSlug && happenings.length > 0) {
//         const data = await getHappening(hapSlug);
//         setContent(data as HappeningType);
//       }
//     };
//     fetchData();
//   }, [hapSlug, happenings]);

//   if (!content) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <section>
//       <h2 className="text-2xl font-bold">{content.title}</h2>
//       <p className="mt-4">{content.description}</p>
//     </section>
//   );
// }
