import path from "path";
import fs from "fs/promises";
import { Wish } from "@/types";
import { NextRequest } from "next/server";

async function loadData(filePath: string) {
  const dataPath = path.join(process.cwd(), filePath);
  const jsonData = await fs.readFile(dataPath, "utf8");
  return JSON.parse(jsonData);
}

function calculateHotness(wish: Wish) {
  const hoursSinceCreation =
    (Date.now() - new Date(wish.date).getTime()) / (1000 * 60 * 60);
  return wish.counter / Math.pow(hoursSinceCreation + 2, 1.5);
}

function sortByDate(wishes: Wish[]) {
  return wishes.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

function sortByCount(wishes: Wish[]) {
  return wishes.sort((a, b) => b.counter - a.counter);
}

function sortByHot(wishes: Wish[]) {
  return wishes.sort((a, b) => calculateHotness(b) - calculateHotness(a));
}

export async function GET(request: NextRequest) {
  try {
    const data = await loadData("data/data.json");

    const searchParams = request.nextUrl.searchParams;
    const sort = searchParams.get("sort");

    switch (sort) {
      case "new":
        data.wishes = sortByDate(data.wishes);
        break;
      case "top":
        data.wishes = sortByCount(data.wishes);
        break;
      case "hot":
        data.wishes = sortByHot(data.wishes);
        break;
      default:
        break;
    }

    return new Response(JSON.stringify({ data: data.wishes }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response("Failed to load data.", {
      status: 500,
    });
  }
}
