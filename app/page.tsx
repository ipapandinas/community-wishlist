import { title, subtitle } from "@/components/primitives";
import Tabs from "@/components/wishlist/tabs";
import { fetchWishes } from "@/lib/wishes";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

interface IProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Home({ searchParams }: IProps) {
  const sortType = searchParams.sort as string;
  const wishes = await fetchWishes(sortType);
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Wish&nbsp;</h1>
        <h1 className={title({ color: "violet" })}>magic&nbsp;</h1>
        <h2 className={subtitle({ class: "mt-4" })}>
          Suggest ideas for your favorite project to implement.
        </h2>
        <Link className="mt-4" href="/new">
          <Button color="primary">Create Wish</Button>
        </Link>
      </div>

      <div className="mt-8 w-full">
        <Tabs wishes={wishes} />
      </div>
    </section>
  );
}
