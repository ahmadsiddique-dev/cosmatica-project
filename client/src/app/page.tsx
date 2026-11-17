
import { FeatureSection } from "@/components/feature-section";
import { Header } from "./_components/header";
import { HeroSection } from "./_components/Hero";
import { LogosSection } from "./_components/logos-section";
import { Integrations } from "@/components/integrations";
import { FaqsSection } from "./_components/FAQs";
import { CallToAction } from "@/components/cta";
import { TestimonialsSection } from "@/components/testimonials-section";
import { Footer } from "@/components/footer";

export default function page() {
	return (
		<>
			<Header />
			<main className="grow">
				<HeroSection />
				<LogosSection />
				<FeatureSection />
				<Integrations />
				<FaqsSection />
				<TestimonialsSection />
				<CallToAction />
				<Footer />
			</main>
		</>
	);
}
