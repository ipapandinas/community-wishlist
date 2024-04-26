import { Suspense } from "react";
import { title, subtitle } from "@/components/primitives";
import Tabs from "@/components/wishlist/tabs";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

export default function WishlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="text-center mx-auto">
        <h1 className={title()}>Wish&nbsp;</h1>
        <h1 className={title({ color: "violet" })}>magic&nbsp;</h1>
        <h2 className={subtitle({ class: "mt-4" })}>
          Suggest ideas for your favorite project to implement.
        </h2>
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
