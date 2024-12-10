

// "use client"

// import useHappening from "@/hooks/useHappening"
// // import Happening from "./Happening"
// import { FormType, HappeningType } from "@/types/type"
// import Link from "next/link"
// import { useParams } from "next/navigation"
// import { useEffect, useState } from "react"

// export default function Order() {
//   const { happenings } = useHappening()
//   const [newForm, setNewForm] = useState<FormType[]>([])
//   const [currentPerson, setCurrentPerson] = useState(0);
//   const { hapSlug, orderSlug } = useParams() as {
//     hapSlug: string
//     orderSlug: string
//   };

//   const eventFilter = happenings?.filter((hap) => hap.slug === hapSlug)

//   // const index = () => {
//   //   newForm.map((i: any) => (
//   //     setCurrentPerson(i)
//   //   ))
//   // }

//   useEffect(() => {
//     // index()
//     setCurrentPerson(1)
//   }, [])

//   const addTextBox = () => {
//     const updatedLessonText = newForm.map((hap, i) => {
//       if (currentPerson === i) {
//         const newPerson = [
//           { id: `${Math.floor(Math.random() * 1000 + 1)}`, name: "" },
//           console.log("current")
//         ];
//         if (hap?.persons?.length === 0) {
//           newPerson.push({
//             id: `${Math.floor(Math.random() * 1000 + 1)}`,
//             name: "",
//           });
//           console.log("push")
//         }
//         return {
//           ...hap,
//           person: [...hap?.persons, ...newPerson],
//         };
//       }
//       return hap;
//     });
//     console.log("form", newForm)
//     console.log(currentPerson)
//     console.log(updatedLessonText)
//     setNewForm(updatedLessonText);
//   };

//   const removeTextBox = (index: any) => {
//     const removed = newForm[currentPerson].persons.filter((_, i) => i !== index);
//     const updatedLessonText = newForm.map((hap, i) => {
//       if (currentPerson === i) {
//         return {
//           ...hap,
//           person: removed,
//         };
//       }
//       return hap;
//     });
//     setNewForm(updatedLessonText);
//   };

//   const handleLessonFieldChange = (
//     event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
//     index: number
//   ) => {
//     const { name, value } = event.target;
//     let text: any;
//     if (newForm[currentPerson]?.persons?.length === 0) {
//       text = [{ id: `${Math.floor(Math.random() * 1000 + 1)}`, name: "" }];
//     }
//     if (newForm[currentPerson]?.persons?.length > 0) {
//       text = newForm[currentPerson]?.persons?.map((_text, i) => {
//         if (i === index) {
//           return { id: _text.id, [name]: value };
//         }
//         return _text;
//       });
//     }

//     const updatedLessons = newForm.map((lesson, i) => {
//       if (i === currentPerson) {
//         return { ...lesson, [name]: value, name: text?.length > 0 ? text : [] };
//       }
//       return lesson;
//     });
//     console.log("Navn:", name, "Verdi:", value);
//     setNewForm(updatedLessons);
//   };

//   return (
//     <>
//       <article>
//         <p>Bestill her:</p>
//         {eventFilter?.map((f) => (
//           <form action="" key={f.id}>
//             <label htmlFor="">Arrangement</label>
//             <input type="text" name="" id="" disabled placeholder={f.title} />
//             <label htmlFor="">Navn</label>
//             <input type="text" name="" id="" placeholder="Kari Normann"/>
//             <label htmlFor="">E-mail</label>
//             <input type="text" name="" id="" placeholder="kari@norman.no" />
//             <label htmlFor="">Biletter</label>
//             <input type="text" name="" id="" placeholder="" />
//             <label htmlFor="">Betaling</label>
//             <input type="text" name="" id="" placeholder="" />
            
//             {newForm[currentPerson]?.persons?.length > 1 ? (
//               newForm[currentPerson]?.persons?.map((field, index) => (
//                 <div key={field?.id}>
//                   <label
//                     className="mt-4 flex flex-col"
//                     htmlFor={`text-${field?.id}`}
//                   >
//                     <span className="text-sm font-semibold">Tekst*</span>
//                     <textarea
//                       data-testid="form_person_name"
//                       //   type="text"
//                       name="text"
//                       id={`text-${field?.id}`}
//                       value={field?.name}
//                       onChange={(event) =>
//                         handleLessonFieldChange(event, index)
//                       }
//                       className="w-full rounded bg-slate-100"
//                       cols={30}
//                     />
//                   </label>
//                   <button
//                     className="text-sm font-semibold text-red-400 "
//                     type="button"
//                     onClick={() => removeTextBox(index)}
//                   >
//                     Fjern
//                   </button>
//                 </div>
//               ))
//             ) : (
//               <label className="mb-4 flex flex-col" htmlFor="text">
//                 <span className="mb-1 text-sm font-semibold">Tekst*</span>
//                 <textarea
//                   data-testid="form_person_name"
//                   //   type="text"
//                   name="text"
//                   id="text"
//                   value={newForm[currentPerson]?.persons?.[0]?.name}
//                   onChange={(event) => handleLessonFieldChange(event, 0)}
//                   className="w-full rounded bg-slate-100"
//                   cols={30}
//                 />
//               </label>
//             )}
//             <button
//               className="mt-6 w-full rounded bg-gray-300 px-4 py-3 font-semibold"
//               type="button"
//               onClick={addTextBox}
//               data-testid="form_person_add_name"
//             >
//               + Legg til tekstboks
//             </button>
//           </form>
//         ))}
//         {/* <Link href={""}> */}
//         {/* </Link> */}


//       </article>
//       {/* <Happening /> */}
//     </>
//   )
// }

// // import useHappening from "@/hooks/useHappening";
// // import Happening from "./new";
// // import { HappeningType } from "@/types/type";
// // import Link from "next/link";
// // import { useParams } from "next/navigation";

// // type OrderType = {
// //   happening: HappeningType[];
// // };

// // export default function Order({ happening }: OrderType) {
// //   // const { slug, id } = useParams() as { slug: string; id: string
// //   //     orderSlug = slug as string;
// //   //     hapSlug = id as string;

// //   // };

// //   return (
// //     <>
// //       <article>
// //         <p>Bestill her:</p>
// //         {happening?.map((hap, i) => (
// //           <article key={i}>
// //             <h2>
// //               <a href={`/bestillinger/${hap.id}`}>{hap.title}</a>
// //             </h2>
// //             <p>{hap.description}</p>
// //           </article>
// //         ))}
// //         {/* <Link href={""}> */}
// //         {/* </Link> */}
// //       </article>
// //       <Happening happening={happening} />
// //     </>
// //   );
// // }

// "use client"

// import useHappening from "@/hooks/useHappening"
// // import Happening from "./Happening"
// import { FormType, HappeningType, PersonType } from "@/types/type"
// import Link from "next/link"
// import { useParams } from "next/navigation"
// import { useEffect, useState } from "react"

// export default function Order() {
//   const { happenings } = useHappening()
//   const [newForm, setNewForm] = useState<FormType[]>([])
//   const [newPerson, setNewPerson] = useState<PersonType[]>([])
//   const [currentPerson, setCurrentPerson] = useState(0);
//   const { hapSlug, orderSlug } = useParams() as {
//     hapSlug: string
//     orderSlug: string
//   };

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//   });

//   const addParticipant = () => {
//     setNewForm([...newForm, { id: crypto.randomUUID(), title: "Event Title", persons: [{ id: crypto.randomUUID(), name: "", email: "" }] }]);

//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,
//     });
//   };

//   const eventFilter = happenings?.filter((hap) => hap.slug === hapSlug)


//   // const index = () => {
//   //   newForm.map((i: any) => (
//   //     setCurrentPerson(i)
//   //   ))
//   // }

//   return (
//     <>
//       <article>
//         <p>Bestill her:</p>
//         {eventFilter.map((f) => (
//           <form action="" key={f.id} className="space-y-4">
//             <label htmlFor="event">Arrangement</label>
//             <input
//               type="text"
//               id="event"
//               value={f.title}
//               disabled
//               className="border px-2 py-1 rounded"
//             />

//             {newForm.map((person, index) => (
//               <div key={index} className="space-y-4">
//                 <label htmlFor={`name-${index}`}>Navn</label>
//                 <input
//                   type="text"
//                   id={`name-${index}`}
//                   placeholder="Navn"
//                   className="border px-2 py-1 rounded"
//                   required
//                 />
//                 <label htmlFor={`email-${index}`}>E-mail</label>
//                 <input
//                   type="email"
//                   id={`email-${index}`}
//                   placeholder="E-mail"
//                   className="border px-2 py-1 rounded"
//                   required
//                 />
//               </div>
//             ))}

//             <button type="button" onClick={addParticipant} className="mt-4 p-2 bg-blue-500 text-white rounded">
//               Legg til flere
//             </button>

//           </form>
//         ))}
//         {/* <Link href={""}> */}
//         {/* </Link> */}


//       </article>
//       {/* <Happening /> */}
//     </>
//   )
// }

// // import useHappening from "@/hooks/useHappening";
// // import Happening from "./new";
// // import { HappeningType } from "@/types/type";
// // import Link from "next/link";
// // import { useParams } from "next/navigation";

// // type OrderType = {
// //   happening: HappeningType[];
// // };

// // export default function Order({ happening }: OrderType) {
// //   // const { slug, id } = useParams() as { slug: string; id: string
// //   //     orderSlug = slug as string;
// //   //     hapSlug = id as string;

// //   // };

// //   return (
// //     <>
// //       <article>
// //         <p>Bestill her:</p>
// //         {happening?.map((hap, i) => (
// //           <article key={i}>
// //             <h2>
// //               <a href={`/bestillinger/${hap.id}`}>{hap.title}</a>
// //             </h2>
// //             <p>{hap.description}</p>
// //           </article>
// //         ))}
// //         {/* <Link href={""}> */}
// //         {/* </Link> */}
// //       </article>
// //       <Happening happening={happening} />
// //     </>
// //   );
// // }