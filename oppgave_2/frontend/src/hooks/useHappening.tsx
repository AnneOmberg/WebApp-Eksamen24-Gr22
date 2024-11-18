"use client"

import { HappeningType } from "@/types/type"
import { useEffect, useState } from "react"

export default function useHappening() {
  const [happening, setHappening] = useState<HappeningType[]>([])

  const loadHappeningData = async () => {
    const response = await fetch("http://localhost:3999", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    console.log("Get", response.status)
    console.log("Get", response.ok)

    const data = await response.json()
    setHappening(data.data)
    console.log("Get", data)
  }
    
      const addHappeningData = async (happening: HappeningType) => {
        try {
            const response = await fetch("http://localhost:3999", {
              method: 'POST',
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(happening)
            })
            console.log("Status", response.status)
            console.log("OK", response.ok)
      
            const data = await response.json()
            console.log("Post", data)
            // const onAddHappening = (project: Omit<ProjectType, "id">) => {
            //   setProd((prev: any) => [...prev, {id: crypto.randomUUID(), ...project}])
            // }
            // onAddProject(data)
            loadHappeningData()
            // console.log(onAddProject)
          } catch (error) {
            console.log(error)
          }
      }
    
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
        loadHappeningData()
      }, [])

      return{addHappeningData, happening, setHappening}
}