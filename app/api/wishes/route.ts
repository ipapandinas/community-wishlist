import { NextRequest } from "next/server";
import {
  loadData,
  sortByDate,
  sortByCount,
  sortByHot,
  saveData,
} from "@/utils/data";
import { WishResponse } from "@/types";
import { WishRequest } from "./validation";
import { assert } from "superstruct";

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

export async function POST(request: NextRequest) {
  try {
    const newWishData = await request.json();
    console.log(newWishData);

    // Scheme validation
    try {
      assert(newWishData, WishRequest);
    } catch (error) {
      return new Response(
        JSON.stringify({
          error: `Failed to validate WishRequest scheme - ${error instanceof Error ? error.message : error}`,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const filePath = "data/data.json";
    const data = await loadData(filePath);

    const newWish: WishResponse = {
      id: (data.wishes.length + 1).toString(),
      title: newWishData.title,
      author: newWishData.author,
      description: newWishData.description,
      resource: newWishData.resource,
      counter: 0,
      date: new Date().toISOString(),
    };

    data.wishes.push(newWish);
    await saveData(filePath, data);

    return new Response(JSON.stringify({ data: newWish }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response("Failed to load or save data.", {
      status: 500,
    });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const requestJson = await request.json();
    const { id, delta } = requestJson;

    const filePath = "data/data.json";
    const data = await loadData(filePath);

    // Find the wish by ID and update its counter
    const wishIndex = data.wishes.findIndex((wish) => wish.id === id);
    if (wishIndex === -1) {
      return new Response(JSON.stringify({ error: "Wish not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Update the counter by the delta provided in the request
    data.wishes[wishIndex].counter += delta;

    // Save the updated data back to the JSON file
    await saveData(filePath, data);

    return new Response(JSON.stringify({ data: data.wishes[wishIndex] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to update wish:", error);
    return new Response(JSON.stringify({ error: "Failed to update wish" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
