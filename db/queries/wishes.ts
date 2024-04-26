import db from "@/db";

export function fetchTopWishes() {
  return db.wish.findMany({
    orderBy: { counter: "desc" },
  });
}

export function fetchNewWishes() {
  return db.wish.findMany({
    orderBy: { date: "desc" },
  });
}

export async function fetchAllWishes() {
  return db.wish.findMany({
    select: {
      id: true,
      title: true,
      author: true,
      description: true,
      resource: true,
      counter: true,
      date: true,
    },
  });
}
