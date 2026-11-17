import { FeatureSection } from "./_components/feature-section";
import { Header } from "./_components/header";
import { HeroSection } from "./_components/Hero";
import { LogosSection } from "./_components/logos-section"; 

export default function page() {
	return (
		<>
			<Header />
			<main className="grow">
				<HeroSection />
				<LogosSection />
        <FeatureSection />
			</main>
		</>
	);
}
