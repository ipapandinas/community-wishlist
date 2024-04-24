"use client";

import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import NewForm from "@/components/form/new";
import { BackArrow } from "@/components/icons";

export default function New() {
  return (
    <>
      <section className="max-w-96 flex flex-col items-start justify-center gap-4 py-8 mx-auto md:py-10">
        <div className="flex flex-col gap-3">
          <Link href="/" title="Back to the Homepage">
            <Button startContent={<BackArrow />}>Back</Button>
          </Link>
          <h1 className="text-2xl font-bold">Your #1 Wish?</h1>
        </div>
        <div className="max-w-lg w-full mt-8">
          <NewForm />
        </div>
      </section>
    </>
  );
}
