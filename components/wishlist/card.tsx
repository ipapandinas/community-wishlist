"use client";

import { Card as NuiCard } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { formatDate } from "@/utils/date";
import Vote from "./vote";

interface ICardProps {
  id: string;
  author?: string;
  counter: number;
  date: string;
  description?: string;
  resource?: string;
  title: string;
}

export default function Card({
  id,
  author,
  counter,
  date,
  description,
  resource,
  title,
}: ICardProps) {
  return (
    <NuiCard className="w-full flex flex-row items-stretch">
      <div className="flex-none p-3">{id}.</div>
      <div className="flex flex-col justify-between p-3 flex-grow">
        <div>
          <p className="text-md font-bold">{title}</p>
          {description && <p className="line-clamp-2">{description}</p>}
        </div>
        <div className="mt-auto text-gray-500">
          {author && `By ${author} `}
          {formatDate(new Date(date))}
          {resource && (
            <>
              {" | "}
              <Link isExternal showAnchorIcon href={resource}>
                source
              </Link>
            </>
          )}
          {" | "}
          <Link href="#">share</Link>
          {" | "}
          <Link href="#">report</Link>
        </div>
      </div>
      <div className="flex-none p-3">
        <Vote voteId={id} initialCounter={counter} />
      </div>
    </NuiCard>
  );
}
