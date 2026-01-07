import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ServicesSection from "@/components/ServicesSection";
import PromiseSection from "@/components/PromiseSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main>
        <HeroSection />
        <PromiseSection /> {/* Moved PromiseSection here */}
        <TestimonialsSection />
        <ServicesSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;