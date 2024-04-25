import { NextRequest } from "next/server";
import {
  loadData,
  sortByDate,
  sortByCount,
  sortByHot,
  saveData,
} from "@/utils/data";

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
