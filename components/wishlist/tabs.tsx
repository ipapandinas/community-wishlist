"use client";

import React, { useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Tabs as NuiTabs, Tab } from "@nextui-org/tabs";
import { Chart, Fire, Stars } from "../icons";

export default function Tabs() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const topDivRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  const handleSelectionChange = (selection: unknown) => {
    const value = selection as string;
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("sort", value);
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.replace(`${pathname}${query}`, { scroll: false });
    if (topDivRef.current && isReady) {
      topDivRef.current.scrollIntoView({ behavior: "smooth" });
    }
    router.refresh();
    if (!isReady) {
      setIsReady(true);
    }
  };

  return (
    <>
      <div ref={topDivRef} />
      <div className="flex w-full flex-col sticky top-2 pt-4 bg-background-dark z-10">
        <NuiTabs
          classNames={{ tabList: "mx-auto sm:mx-0 !bg-black" }}
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
          />
          <Tab
            key="new"
            title={
              <div className="flex items-center space-x-2">
                <Stars />
                <span>New</span>
              </div>
            }
          />
          <Tab
            key="top"
            title={
              <div className="flex items-center space-x-2">
                <Chart />
                <span>Top</span>
              </div>
            }
          />
        </NuiTabs>
      </div>
    </>
  );
}
