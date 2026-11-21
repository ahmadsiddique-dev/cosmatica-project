import { Header } from "./_components/header";
import { Footer } from "@/components/footer";
import Hero from "./_components/Hero";

export default function page() {
	return (
		<>
			<Header />
			<main className="grow">
				<Hero />
			</main>
			<Footer />
		</>
	);
}
