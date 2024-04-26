import Card from "@/components/wishlist/card";
import { fetchWishes } from "@/lib/wishes";

interface IProps {
  sortType: string;
}

export default async function List({ sortType }: IProps) {
  const wishes = await fetchWishes(sortType);

  return (
    <div className="mt-2 flex flex-col gap-2">
      {wishes.map((wish) => (
        <Card key={wish.id} {...wish} />
      ))}
    </div>
  );
}
