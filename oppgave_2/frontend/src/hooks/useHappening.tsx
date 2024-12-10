"use client";

import { HappeningType } from "@/types/type";
import { useEffect, useState } from "react";

export default function useHappening() {
  const [happenings, setHappenings] = useState<HappeningType[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [happening, setHappening] = useState<HappeningType | null>(null);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:3999/categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch categories", response.statusText);
        return;
      }

      const data = await response.json();
      setCategories(data as string[]);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchHappenings = async () => {
    const response = await fetch("http://localhost:3999/api/events", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log("Get", response.status);
    // console.log("Get", response.ok);

    const data = await response.json();
    console.log("Get", data);
    setHappenings(data as HappeningType[]);
  };

  const getHappening = (slug: string): HappeningType | null => {
    return happenings.find((hap) => hap.slug === slug) ?? null;
  };

  const createHappening = async (event: HappeningType) => {
    try {
      const response = await fetch("http://localhost:3999/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });
      console.log("Status", response.status);
      console.log("OK", response.ok);

      const data = await response.json();
      console.log("Post", data);
      setHappenings((prev: any) => [...prev, happening]);
      fetchHappenings();
    } catch (error) {
      console.log(error);
    }
  };

  // const addHappeningData = async (event: HappeningType) => {
  //   try {
  //     const response = await fetch("http://localhost:3999/happenings", {
  //       method: 'POST',
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(event)
  //     })
  //     console.log("Status", response.status)
  //     console.log("OK", response.ok)

  //     const data = await response.json()
  //     console.log("Post", data)
  //     // const onAddHappening = (project: Omit<ProjectType, "id">) => {
  //     //   setProd((prev: any) => [...prev, {id: crypto.randomUUID(), ...project}])
  //     // }
  //     // onAddProject(data)
  //     fetchHappenings()
  //     // console.log(onAddProject)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const deleteHappening = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3999/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Delete", response.status);
      console.log("Delete OK", response.ok);

      const data = await response.json();
      setHappenings(data.updatedCourses);
      fetchHappenings();
    } catch (error) {
      console.log(error);
    }
  };

  //   const deleteProjectData = async (id: string) => {
  //     try {
  //       const response = await fetch(`${URLS.mainURL}/${id}`, {
  //         method: 'DELETE',
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       })
  //       console.log("Delete", response.status)
  //       console.log("Delete OK", response.ok)

  //     //   const data = await response.json()
  //       setProd(response.updatedProjects)
  //       // loadProjectData()
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  useEffect(() => {
    fetchHappenings();
    fetchCategories();
  }, []);

  return {
    categories,
    happenings,
    createHappening,
    setHappenings,
    deleteHappening,
    getHappening,
    setHappening,
    // happening
  };
}

// "use client";

// import { HappeningType } from "@/types/type";
// import { useEffect, useState } from "react";

// export default function useHappening() {
//   const [happening, setHappening] = useState<HappeningType[]>([]);

//   const loadHappeningData = async () => {
//     const response = await fetch("http://localhost:3999/api/events", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     console.log("Get", response.status);
//     console.log("Get", response.ok);

//     const data = await response.json();
//     console.log("Get", data);
//     setHappening(data.events);
//   };

//   const addHappeningData = async (happening: HappeningType) => {
//     try {
//       const response = await fetch("http://localhost:3999", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(happening),
//       });
//       console.log("Status", response.status);
//       console.log("OK", response.ok);

//       const data = await response.json();
//       console.log("Post", data);
//       // const onAddHappening = (project: Omit<ProjectType, "id">) => {
//       //   setProd((prev: any) => [...prev, {id: crypto.randomUUID(), ...project}])
//       // }
//       // onAddProject(data)
//       loadHappeningData();
//       // console.log(onAddProject)
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   //   const deleteProjectData = async (id: string) => {
//   //     try {
//   //       const response = await fetch(`${URLS.mainURL}/${id}`, {
//   //         method: 'DELETE',
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //         },
//   //       })
//   //       console.log("Delete", response.status)
//   //       console.log("Delete OK", response.ok)

//   //     //   const data = await response.json()
//   //       setProd(response.updatedProjects)
//   //       // loadProjectData()
//   //     } catch (error) {
//   //       console.log(error)
//   //     }
//   //   }

//   useEffect(() => {
//     loadHappeningData();
//   }, []);

//   return { addHappeningData, happening, setHappening };
// }
