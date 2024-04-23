import { title, subtitle } from "@/components/primitives";

export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={title()}>Wish&nbsp;</h1>
				<h1 className={title({ color: "violet" })}>magic&nbsp;</h1>
				<h2 className={subtitle({ class: "mt-4" })}>
					Suggest ideas for your favorite project to implement.
				</h2>
			</div>
		</section>
	);
}
