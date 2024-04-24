import path from "path";
import fs from "fs/promises";
import { Wish } from "@/types";

export async function loadData(filePath: string) {
  const dataPath = path.join(process.cwd(), filePath);
  const jsonData = await fs.readFile(dataPath, "utf8");
  return JSON.parse(jsonData);
}

export async function saveData(filePath: string, data: any) {
  const dataPath = path.join(process.cwd(), filePath);
  const jsonData = JSON.stringify(data, null, 2); // Format JSON for readability
  await fs.writeFile(dataPath, jsonData);
}

export function calculateHotness(wish: Wish) {
  const hoursSinceCreation =
    (Date.now() - new Date(wish.date).getTime()) / (1000 * 60 * 60);
  return wish.counter / Math.pow(hoursSinceCreation + 2, 1.5);
}

export function sortByDate(wishes: Wish[]) {
  return wishes.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function sortByCount(wishes: Wish[]) {
  return wishes.sort((a, b) => b.counter - a.counter);
}

export function sortByHot(wishes: Wish[]) {
  return wishes.sort((a, b) => calculateHotness(b) - calculateHotness(a));
}
