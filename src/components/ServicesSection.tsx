import { useState } from "react";
import { Link } from "react-router-dom";
import { Leaf, Hammer, Flower2, ArrowRight, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import serviceSod from "@/assets/service-sod.jpg";
import serviceHardscape from "@/assets/service-hardscape.jpg";
import serviceFlower from "@/assets/service-flower.jpg";

interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  image?: string;
}

const services: Service[] = [
  {
    icon: Leaf,
    title: "Sod & Turf Installation",
    description: "Transform your yard with lush, healthy grass that thrives in Houston's climate.",
    features: ["Bermuda Grass", "St. Augustine", "Soil Preparation", "Irrigation Setup"],
    image: serviceSod,
  },
  {
    icon: Hammer,
    title: "Hardscaping & Masonry",
    description: "Custom patios, walkways, and retaining walls built to last for decades.",
    features: ["Stone Patios", "Brick Walkways", "Retaining Walls", "Outdoor Kitchens"],
    image: serviceHardscape,
  },
  {
    icon: Flower2,
    title: "Flower & Tree Plantation",
    description: "Bring life to your yard with seasonal flowers and tree bushes planted by experts who understand the Houston climate.",
    features: ["Seasonal Flower Rotation", "Tree Bush Installation", "Soil Health Optimization", "Life-Cycle Maintenance"],
    image: serviceFlower,
  },
];

const FlipCard = ({ service, index }: { service: Service; index: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const Icon = service.icon;

  return (
    <div
      className="perspective-1000 h-[320px] animate-fade-up"
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-3d cursor-pointer ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front Face */}
        <div className="absolute inset-0 backface-hidden glass-card rounded-2xl overflow-hidden flex flex-col glow-border-hover">
          {/* Image Section */}
          {service.image && (
            <div className="relative h-36 overflow-hidden group">
              <img 
                src={service.image} 
                alt={service.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/30 to-transparent" />
              <Dialog>
                <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>
                  <button className="absolute top-2 right-2 p-2 rounded-lg bg-background/60 backdrop-blur-sm text-foreground hover:bg-background/80 transition-colors">
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl p-0 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-auto"
                  />
                </DialogContent>
              </Dialog>
              <div className="absolute bottom-2 left-4">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 text-primary backdrop-blur-sm">
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </div>
          )}
          
          {/* Content Section */}
          <div className="p-5 flex flex-col flex-grow">
            <h3 className="font-display text-lg font-bold text-foreground mb-2 tracking-wide">
              {service.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed flex-grow line-clamp-2">
              {service.description}
            </p>
            <div className="mt-3 text-sm text-primary font-medium flex items-center gap-2">
              <span>Tap for details</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Back Face */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 glass-card rounded-2xl p-6 flex flex-col glow-border bg-card/95">
          <h4 className="font-display text-lg font-bold text-primary mb-4 tracking-wide">
            What's Included
          </h4>
          <ul className="space-y-3 flex-grow">
            {service.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-foreground text-base">
                <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <Link
            to="/services"
            onClick={(e) => {
              e.stopPropagation();
              window.scrollTo({ top: 0, behavior: 'instant' });
            }}
            className="mt-4 text-sm text-primary font-medium flex items-center gap-2 hover:gap-3 transition-all"
          >
            <span>Learn More</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 md:py-32 relative overflow-hidden">
      {/* Gradient background instead of solid */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: 'radial-gradient(ellipse at center, hsl(var(--primary) / 0.08) 0%, hsl(var(--background)) 60%, hsl(var(--background)) 100%)' 
        }}
      />
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-texture opacity-30" />
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-primary/5 rounded-full blur-3xl -translate-x-1/2" />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-primary font-medium text-base uppercase tracking-widest mb-4">
            Our Services
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 tracking-wide">
            Complete Landscaping<br />
            <span className="text-gradient">Solutions</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl">
            From new sod installation to complex drainage systems, we handle every aspect of your outdoor transformation.
          </p>
        </div>

        {/* Services Grid - 3 cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <FlipCard key={index} service={service} index={index} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button variant="cta" size="xl" className="group" asChild>
            <Link to="/services" onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}>
              View All Services
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
