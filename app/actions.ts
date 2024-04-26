"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { object, string, assert, optional, enums } from "superstruct";
import db from "@/db";
import { WISH_TYPES } from "@/data/const";

const WishRequest = object({
  title: string(),
  author: optional(string()),
  description: optional(string()),
  resource: optional(string()),
  type: optional(enums(WISH_TYPES)),
});

function validateFormData(formData: FormData) {
  const newData = {
    title: formData.get("title"),
    author: formData.get("author"),
    description: formData.get("description"),
    resource: formData.get("resource"),
    type: formData.get("type"),
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
    console.error("Error creating a wish:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";
    return {
      errors: {
        _form: [errorMessage],
      },
    };
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
