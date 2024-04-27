import { Suspense } from "react";
import { subtitle } from "@/components/primitives";
import Tabs from "@/components/wishlist/tabs";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { TernoaIcon } from "@/components/icons";

export default function WishlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="text-center mx-auto max-w-xl mt-8">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <TernoaIcon className="w-80" width={40} height={40} />
          <h1 className="tracking-tight inline font-semibold text-[2.5rem] leading-tight lg:text-5xl">
            Top{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#FF1CF7] to-[#b249f8]">
              wishes
            </span>
            : Curated by the Ternoa Community and You
          </h1>
          <h2 className={subtitle({ class: "mt-4" })}>
            Imagine the possibilities with Ternoa. Suggest & Vote protocol
            improvements or new apps to be build —{" "}
            <span className="underline">No account needed</span>, every feedback
            matters!
          </h2>
        </div>
        <Link className="mt-4" href="/new-wish">
          <Button color="primary">Create Wish</Button>
        </Link>
      </section>

      <section className="mt-8 w-full flex flex-col gap-2 mx-auto">
        <Suspense>
          <Tabs />
        </Suspense>
        {children}
      </section>
    </>
  );
}
