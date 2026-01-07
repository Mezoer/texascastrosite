import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-lawn.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24">
      {/* Background Image with softer overlay */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Beautiful Texas landscaping with manicured lawn" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/70 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/60" />
      </div>

      {/* Subtle decorative glow elements - reduced intensity, constrained for mobile */}
      <div className="absolute top-1/4 left-0 w-60 md:w-80 h-60 md:h-80 bg-primary/8 rounded-full blur-3xl -translate-x-1/2" />
      <div className="absolute bottom-1/4 right-0 w-40 md:w-56 h-40 md:h-56 bg-primary/5 rounded-full blur-3xl translate-x-1/2" />

      {/* Content */}
      <div className="container relative z-10 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass rounded-full px-6 py-3 mb-8 animate-fade-up">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-muted-foreground text-base font-medium tracking-wide">Houston's Premier Landscaping</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-foreground leading-tight mb-8 animate-fade-up animation-delay-100">
            The Best Looking Lawn<br />
            <span className="text-gradient">on the Block.</span><br />
            <span className="text-primary glow-text">Guaranteed.</span>
          </h1>

          {/* Subtext - increased size */}
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up animation-delay-200">
            We treat your property like it's our own home. Our goal is simple: to make sure yours is the best-looking yard on the block.
            <span className="block mt-3 text-foreground/80 italic text-lg md:text-xl">  - The Castro Family</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up animation-delay-300">
            <Button 
              variant="hero" 
              size="xl" 
              className="group text-lg" 
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get My Free Estimate
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              variant="outline" 
              size="xl" 
              className="group text-lg border-primary/30 hover:bg-primary/10 hover:border-primary/50" 
              asChild
            >
              <a href="tel:8328899786">
                <Phone className="w-5 h-5 mr-2" />
                Call Us
              </a>
            </Button>
          </div>

          {/* Trust Indicators - increased size */}
          <div className="flex flex-wrap justify-center gap-8 mt-16 animate-fade-up animation-delay-400">
            {["12+ Years Experience", "500+ Happy Clients", "Licensed & Insured"].map(item => (
              <div key={item} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-muted-foreground text-base">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
