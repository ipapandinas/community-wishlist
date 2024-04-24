"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Tabs as NuiTabs, Tab } from "@nextui-org/tabs";
import Card from "./card";
import { Chart, Fire, Stars } from "../icons";
import { Wish } from "@/types";

interface ITabsProps {
  wishes: Wish[];
}

export default function Tabs({ wishes }: ITabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSelectionChange = (selection: unknown) => {
    const value = selection as string;
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("sort", value);
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
  };

  return (
    <div className="flex w-full flex-col">
      <NuiTabs
        aria-label="Sorting"
        color="primary"
        variant="bordered"
        onSelectionChange={handleSelectionChange}
      >
        <Tab
          key="hot"
          title={
            <div className="flex items-center space-x-2">
              <Fire />
              <span>Hot</span>
            </div>
          }
        >
          <div className="flex flex-col space-y-4">
            {wishes.map((wish) => (
              <Card key={wish.id} {...wish} />
            ))}
          </div>
        </Tab>
        <Tab
          key="new"
          title={
            <div className="flex items-center space-x-2">
              <Stars />
              <span>New</span>
            </div>
          }
        >
          <div className="flex flex-col space-y-4">
            {wishes.map((wish) => (
              <Card key={wish.id} {...wish} />
            ))}
          </div>
        </Tab>
        <Tab
          key="top"
          title={
            <div className="flex items-center space-x-2">
              <Chart />
              <span>Top</span>
            </div>
          }
        >
          <div className="flex flex-col space-y-4">
            {wishes.map((wish) => (
              <Card key={wish.id} {...wish} />
            ))}
          </div>
        </Tab>
      </NuiTabs>
    </div>
  );
}
