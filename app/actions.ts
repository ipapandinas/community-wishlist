"use server";

import { loadData, saveData } from "@/utils/data";
import { revalidateTag } from "next/cache";
import { object, string, assert, optional } from "superstruct";

const WishRequest = object({
  title: string(),
  author: optional(string()),
  description: optional(string()),
  resource: optional(string()),
});

function validateFormData(formData: FormData) {
  const newData = {
    title: formData.get("title"),
    author: formData.get("author"),
    description: formData.get("description"),
    resource: formData.get("resource"),
  };

  assert(newData, WishRequest);

  return newData;
}

export async function createWish(formData: FormData) {
  try {
    const newData = validateFormData(formData);

    const filePath = "data/data.json";
    const data = await loadData(filePath);

    const newWish = {
      id: (data.wishes.length + 1).toString(),
      counter: 0,
      date: new Date().toISOString(),
      ...newData,
    };

    data.wishes.push(newWish);
    await saveData(filePath, data);

    revalidateTag("wishes");
    return newWish;
  } catch (error) {
    console.error("Error creating a wish:", error);
    throw Error("Error creating a wish");
  }
}

export async function updateWishCounter(wishId: string, delta: number) {
  try {
    const filePath = "data/data.json";
    const data = await loadData(filePath);

    const wishIndex = data.wishes.findIndex((wish) => wish.id === wishId);
    if (wishIndex === -1) {
      throw Error(`Wish ${wishId} not found`);
    }

    data.wishes[wishIndex].counter += delta;
    await saveData(filePath, data);

    return data.wishes[wishIndex].counter;
  } catch (error) {
    console.error("Error voting for a wish:", error);
  }
}
