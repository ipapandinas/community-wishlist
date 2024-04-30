"use client";

import { Card as NuiCard } from "@nextui-org/card";
// import { Chip } from "@nextui-org/chip";
import { Link } from "@nextui-org/link";
import { formatDate } from "@/utils/date";
import Vote from "./vote";
import { WishResponse } from "@/types";
import { Badge } from "../icons";
import { Tooltip } from "@nextui-org/tooltip";

interface ICardProps extends WishResponse {
  idx: number;
}

export default function Card({
  id,
  idx,
  author,
  counter,
  date,
  description,
  resource,
  title,
  // type,
}: ICardProps) {
  return (
    <NuiCard className="w-full flex flex-row items-stretch">
      <div className="flex-none p-3">{idx}.</div>
      <div className="flex flex-col justify-between p-3 flex-grow">
        <div>
          <p className="text-md font-bold">{title}</p>
          {description && <p className="line-clamp-2 my-4">{description}</p>}
        </div>
        <div className="mt-auto text-gray-500 flex gap-2 items-center">
          {/* {type && <Chip className="mr-2">{type}</Chip>} */}
          {author && (
            <Tooltip
              content="From a certified 'Builder' role user in Ternoa Discord."
              color="secondary"
            >
              <div className="flex gap-1 items-center">
                {`By ${author} `}
                <Badge size={16} />
              </div>
            </Tooltip>
          )}
          {formatDate(new Date(date))}
          {resource && (
            <>
              {" |"}
              <Link isExternal showAnchorIcon href={resource} color="secondary">
                source
              </Link>
            </>
          )}
          {/* {" | "}
          <Link href="#">share</Link>
          {" | "}
          <Link href="#">report</Link> */}
        </div>
      </div>
      <div className="flex-none p-3">
        <Vote id={id} initialCounter={counter} />
      </div>
    </NuiCard>
  );
}
