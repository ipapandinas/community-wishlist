import { Skeleton } from "@nextui-org/skeleton";

export default function ListSkeleton() {
  return (
    <div className="mt-2 flex flex-col gap-2">
      {Array.from({ length: 10 }, (_, i) => (
        <Skeleton key={i} className="w-full h-[136px] rounded-large" />
      ))}
    </div>
  );
}
