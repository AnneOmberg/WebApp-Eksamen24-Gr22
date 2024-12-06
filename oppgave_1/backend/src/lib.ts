import { readFile, writeFile } from "node:fs/promises"
import { CourseType } from "./types/types"

export async function getCourseData() {
    const data = await readFile('src/data/courses.json', "utf-8")
    const paredData = JSON.parse(data) as CourseType[]
    return paredData
}

export async function updateCourseData(newData: CourseType[]) {
    await writeFile("src/data/courses.json", JSON.stringify(newData))
}