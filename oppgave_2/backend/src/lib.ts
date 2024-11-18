import { readFile, writeFile } from "node:fs/promises"
import { HappeningType } from "./types/type"

export async function getHappeningData() {
    const data = await readFile('src/data/happenings.json', "utf-8")
    const paredData = JSON.parse(data) as HappeningType[]
    return paredData
}

export async function updateHappeningData(newData: HappeningType[]) {
    await writeFile("src/data/happenings.json", JSON.stringify(newData))
}