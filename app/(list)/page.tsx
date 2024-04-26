import { Suspense } from "react";
import List from "@/components/wishlist/list";
import ListSkeleton from "@/components/wishlist/skeleton";

interface IProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Wishlist({ searchParams }: IProps) {
  const sortType = searchParams.sort as string;

  return (
    <Suspense key={Math.random()} fallback={<ListSkeleton />}>
      <List sortType={sortType} />
    </Suspense>
  );
}
