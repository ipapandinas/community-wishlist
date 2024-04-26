import { WishResponse } from "@/types";

export function calculateHotness(wish: WishResponse) {
  const hoursSinceCreation =
    (Date.now() - new Date(wish.date).getTime()) / (1000 * 60 * 60);
  return wish.counter / Math.pow(hoursSinceCreation + 2, 1.5);
}

export const sortByHot = (a: WishResponse, b: WishResponse) =>
  calculateHotness(b) - calculateHotness(a);
