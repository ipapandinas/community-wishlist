"use server";

import { revalidatePath } from "next/cache";
import { object, string, assert, nullable, enums } from "superstruct";
import db from "@/db";
import { WISH_TYPES } from "@/data/const";

const WishRequest = object({
  title: string(),
  author: nullable(string()),
  description: nullable(string()),
  resource: nullable(string()),
  type: nullable(enums(WISH_TYPES)),
});

function validateFormData(formData: FormData) {
  const newData = {
    title: formData.get("title"),
    author: formData.get("author") || null,
    description: formData.get("description") || null,
    resource: formData.get("resource") || null,
    type: formData.get("type") || null,
  };

  assert(newData, WishRequest);

  return newData;
}

export async function createWish(formData: FormData) {
  try {
    const data = validateFormData(formData);
    const wish = await db.wish.create({
      data,
    });

    revalidatePath("/", "page");
    return wish;
  } catch (error) {
    throw new Error(`Error creating a wish - ${error instanceof Error ? error.message : "Something went wrong"}`);
  }
}

export async function updateWishCounter(id: number, delta: number) {
  const updatedWish = await db.wish.update({
    where: {
      id,
    },
    data: {
      counter: {
        increment: delta,
      },
    },
  });

  return updatedWish.counter;
}
