import { Wish } from "@/types";

async function fetchData<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const jsonData = await response.json();
    const data = Object.values(jsonData)[0];
    return data as T;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error(`Failed to fetch data from ${url}`);
  }
}

export async function fetchWishes(sort?: string): Promise<Wish[]> {
  try {
    const url = new URL(process.env.URL + "/api/wishes");
    if (sort) {
      url.searchParams.append("sort", sort);
    }
    const wishes = await fetchData<Wish[]>(url.toString());
    return wishes;
  } catch (error) {
    console.error("Error fetching wishes:", error);
    throw new Error("Failed to fetch wishes data");
  }
}

export async function fetchHotWishes(): Promise<Wish[]> {
  return fetchWishes("hot");
}

export async function fetchNewWishes(): Promise<Wish[]> {
  return fetchWishes("new");
}

export async function fetchTopWishes(): Promise<Wish[]> {
  return fetchWishes("top");
}

export async function handleVote(wishId: string, delta: number) {
  const response = await fetch(`/api/wishes`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: wishId, delta }),
  });

  if (!response.ok) {
    console.error("Error updating wish");
  }

  const result = await response.json();
  console.log("Updated wish:", result);
}
