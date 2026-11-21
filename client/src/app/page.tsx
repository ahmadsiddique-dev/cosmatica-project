import { Header } from "./_components/Header";
import { Footer } from "./_components/Footer";
import Hero from "./_components/Hero";
import ProductListOne from "./_components/ProductListOne";
import ProductListTwo from "./_components/ProductListTwo";
import ProductListThree from "./_components/ProductListThree";

export default function page() {
	return (
		<>
			<Header />
			<main className="grow">
				<Hero />
				<ProductListOne />
				<ProductListTwo />
				<ProductListThree />
			</main>
			<Footer />
		</>
	);
}
