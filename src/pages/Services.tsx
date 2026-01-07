import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Leaf, Hammer, Droplets, TreeDeciduous, Waves, Flower2, ChevronDown, ArrowLeft, ArrowRight, RefreshCcw, Dot } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

// Import images
import serviceSod from "@/assets/service-sod.jpg";
import serviceHardscape from "@/assets/service-hardscape.jpg";
import serviceFlower from "@/assets/service-flower.jpg";
import placeholderImage from "/placeholder.svg"; // Corrected path to public directory

interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
  technicalProcess: string;
  features: { name: string; detail: string }[];
  image?: string; // Added image property
}

const allServices: Service[] = [
  {
    icon: Leaf,
    title: "Sod & Turf Installation",
    description: "Transform your yard with lush, healthy grass that thrives in Houston's climate.",
    technicalProcess: "Our sod installation process begins with a comprehensive site analysis, where we evaluate your soil pH, drainage patterns, and sun exposure. We then remove existing vegetation and debris, grade the surface for optimal water runoff, and amend the soil with organic matter and nutrients tailored to your lawn's needs. Premium sod varieties are carefully selected based on your specific yard conditions, then professionally installed with staggered seams and rolled for perfect soil contact. We finish with a deep initial watering and provide you with a detailed 30-day care schedule to ensure successful root establishment.",
    features: [
      { name: "Bermuda Grass", detail: "Heat-tolerant, drought-resistant turf perfect for full-sun Texas yards" },
      { name: "St. Augustine", detail: "Lush, thick grass ideal for shaded areas with excellent heat tolerance" },
      { name: "Soil Preparation", detail: "Complete soil testing, grading, and organic amendment application" },
      { name: "Irrigation Setup", detail: "Custom sprinkler system design and installation for optimal coverage" },
    ],
    image: serviceHardscape, // Swapped: now uses serviceHardscape
  },
  {
    icon: Hammer,
    title: "Hardscaping & Masonry",
    description: "Custom patios, walkways, and retaining walls built to last for decades.",
    technicalProcess: "Every hardscaping project starts with a detailed design consultation where we create 3D visualizations of your outdoor space. Our construction process involves excavating to the proper depth based on soil type and load requirements, installing a compacted gravel base for stability, and laying commercial-grade landscape fabric to prevent weed growth. We use precision leveling techniques and polymeric sand joints to ensure your surfaces remain flat and weed-free for years. All structures are built to exceed local building codes with proper footings, drainage, and reinforcement.",
    features: [
      { name: "Stone Patios", detail: "Natural flagstone, travertine, and premium pavers with lifetime warranty" },
      { name: "Brick Walkways", detail: "Classic herringbone and basket-weave patterns using antique or modern brick" },
      { name: "Retaining Walls", detail: "Engineered walls with proper drainage and geo-grid reinforcement" },
      { name: "Outdoor Kitchens", detail: "Complete outdoor cooking spaces with built-in grills, counters, and lighting" },
    ],
    image: serviceSod, // Swapped: now uses serviceSod
  },
  {
    icon: Flower2,
    title: "Flower & Tree Plantation",
    description: "Bring life to your yard with seasonal flowers and tree bushes planted by experts who understand the Houston climate.",
    technicalProcess: "Our horticulture team specializes in creating vibrant, ever-changing landscapes that bloom year-round. We design planting schemes based on Houston's unique microclimate zones, selecting varieties that thrive in our heat, humidity, and occasional freezes. Beds are prepared with premium planting mix enriched with slow-release fertilizers and water-retaining polymers. We implement drip irrigation zones specifically designed for flowering plants, ensuring deep root watering while keeping foliage dry to prevent disease. Our seasonal rotation program keeps your landscape colorful throughout the year with minimal client effort.",
    features: [
      { name: "Seasonal Flower Rotation", detail: "Four-season color programs with professional bed prep and planting" },
      { name: "Tree Bush Installation", detail: "Ornamental shrubs and flowering bushes for structure and color" },
      { name: "Soil Health Optimization", detail: "Custom soil amendments, pH balancing, and organic matter enrichment" },
      { name: "Life-Cycle Maintenance", detail: "Ongoing care programs including deadheading, fertilizing, and replacement" },
    ],
    image: serviceFlower, // Assigned image
  },
  {
    icon: Droplets,
    title: "Drainage Solutions",
    description: "Protect your property from Houston's heavy rains with expert drainage systems.",
    technicalProcess: "Houston's notorious rainfall demands professional drainage solutions. We begin with a topographical survey using laser levels to map water flow patterns across your property. Our engineers design custom drainage systems that redirect water away from your foundation using a combination of surface and subsurface solutions. We install 4-inch perforated PVC pipe wrapped in filter fabric, surrounded by washed gravel, all sloped at the proper gradient to ensure positive flow. Catch basins, channel drains, and pop-up emitters are strategically placed to handle even the heaviest Texas storms.",
    features: [
      { name: "French Drains", detail: "Subsurface drainage systems with perforated pipe and gravel trenches" },
      { name: "Surface Drainage", detail: "Channel drains, catch basins, and swales for immediate water removal" },
      { name: "Grading", detail: "Precision land grading to direct water flow away from structures" },
      { name: "Flood Prevention", detail: "Comprehensive water management including berms and retention areas" },
    ],
    image: placeholderImage, // Assigned placeholder image
  },
  {
    icon: Waves,
    title: "Ambiance Ponds & Fountains",
    description: "Custom water features and filtration systems designed for tranquility.",
    technicalProcess: "Our water feature installations are living ecosystems designed for minimal maintenance and maximum beauty. We use EPDM rubber liners rated for 20+ years, professional-grade pumps with energy-efficient variable speed motors, and biological filtration systems that keep water crystal clear naturally. Each pond is designed with proper depth zones, shelving for aquatic plants, and adequate circulation to prevent stagnation. We incorporate skimmers, UV clarifiers, and aeration systems to maintain optimal water quality year-round, creating a self-sustaining habitat for fish and wildlife.",
    features: [
      { name: "Custom Ponds", detail: "Natural-looking koi ponds with rock edges, waterfalls, and aquatic plants" },
      { name: "Waterfalls", detail: "Cascading water features with natural boulder formations and LED lighting" },
      { name: "Fountains", detail: "Elegant standalone fountains and bubbling rock features" },
      { name: "Ecosystem Filtration", detail: "Biological and mechanical filtration for crystal-clear, healthy water" },
    ],
    image: placeholderImage, // Assigned placeholder image
  },
  {
    icon: TreeDeciduous,
    title: "Tree & Shrub Services",
    description: "Professional planting, trimming, and maintenance for beautiful landscapes.",
    technicalProcess: "Our ISA-certified arborists bring decades of experience to every tree and shrub project. For new plantings, we select specimens from trusted nurseries, dig holes 2-3 times wider than the root ball, and amend backfill with mycorrhizal fungi to promote root development. Our pruning follows ANSI A300 standards, making precise cuts that promote healthy growth and structural integrity. We assess tree health using resistograph testing and visual diagnostics to identify issues before they become critical. All work is performed with proper climbing techniques and rigging to protect your property.",
    features: [
      { name: "Large Tree Planting", detail: "Professional installation of mature trees up to 30 feet with crane service" },
      { name: "Seasonal Trimming", detail: "Expert pruning for shape, health, and storm damage prevention" },
      { name: "Health Diagnostics", detail: "Disease identification, pest treatment, and preventive care programs" },
      { name: "Mulching", detail: "Premium hardwood and cedar mulch installation with proper depth and clearance" },
    ],
    image: placeholderImage, // Assigned placeholder image
  },
  {
    icon: RefreshCcw, // New icon for Other Services
    title: "Other Services",
    description: "Comprehensive property solutions tailored to enhance and maintain every detail of your outdoor living space.",
    technicalProcess: "Our 'Other Services' encompass a wide range of specialized solutions designed to meet unique property needs. This includes custom sprinkler system design and installation for optimal water efficiency, advanced security camera setups for enhanced property protection, and bespoke stone and waterfall features to create serene outdoor environments. We also provide essential maintenance services such as precise fertilizing schedules, protective mulching, expert tree trimming for health and aesthetics, safe tree removal, and regular lawn mowing to keep your landscape pristine year-round. Each service is executed with the highest standards of quality and attention to detail.",
    features: [
      { name: "Sprinkler System", detail: "Efficient irrigation design and installation for optimal watering" },
      { name: "Security Cameras Installation", detail: "Advanced surveillance systems for property protection" },
      { name: "Stone and Waterfalls", detail: "Custom rock features and cascading water elements" },
      { name: "Fertilizing", detail: "Nutrient-rich treatments for vibrant plant growth" },
      { name: "Mulching", detail: "Protective and aesthetic ground cover application" },
      { name: "Tree Trimming", detail: "Professional pruning for tree health and shape" },
      { name: "Tree Removal", detail: "Safe and efficient removal of unwanted trees" },
      { name: "Lawn Mowing", detail: "Regular cutting and edging for a pristine lawn" },
    ],
    image: placeholderImage, // Assigned placeholder image
  },
];

const ServiceDeepDive = ({ service, index }: { service: Service; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = service.icon;
  const navigate = useNavigate(); // Use useNavigate here

  return (
    <div
      className="glass-card rounded-3xl overflow-hidden transition-all duration-500 hover:glow-border animate-fade-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="p-8 md:p-10">
        {/* Service Image - Only render if it's not the placeholder */}
        {service.image && service.image !== placeholderImage && (
          <div className="mb-6 rounded-2xl overflow-hidden">
            <img 
              src={service.image} 
              alt={service.title} 
              className="w-full h-48 md:h-64 object-cover object-center" // Added object-center for better cropping
            />
          </div>
        )}

        {/* Header */}
        <div className="flex items-start gap-6 mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 text-primary shrink-0">
            <Icon className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2 tracking-wide">
              {service.title}
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {service.description}
            </p>
          </div>
        </div>

        {/* Technical Process */}
        <div className="mb-8">
          <h4 className="text-sm font-medium text-primary uppercase tracking-wider mb-4">
            Our Process
          </h4>
          <p className="text-foreground/90 leading-relaxed text-base">
            {service.technicalProcess}
          </p>
        </div>

        {/* Expand Toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-primary font-medium mb-6 hover:gap-3 transition-all"
        >
          <span>{isExpanded ? "Hide Details" : "View What's Included"}</span>
          <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
        </button>

        {/* Expanded Features */}
        <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? "max-h-[600px]" : "max-h-0"}`}>
          <div className="pt-6 border-t border-border">
            <h4 className="text-sm font-medium text-primary uppercase tracking-wider mb-6">
              What's Included
            </h4>
            <div className="grid md:grid-cols-2 gap-6">
              {service.features.map((feature, i) => (
                <div key={i} className="glass rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <Dot className="w-6 h-6 text-primary shrink-0" /> {/* Changed to Dot icon */}
                    <h5 className="font-display font-semibold text-foreground tracking-wide">
                      {feature.name}
                    </h5>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed pl-5">
                    {feature.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <Button
          variant="cta"
          size="lg"
          className="w-full mt-6 group"
          onClick={() => navigate('/', { hash: 'contact' })} // Corrected: navigate to home with contact hash
        >
          Get Free Estimate
          <ArrowRight className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
        </Button>
      </div>
    </div>
  );
};

const Services = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Reorder services to put the ones with specific images first, then append the rest
  // All services are now included, and placeholder images will be conditionally hidden in ServiceDeepDive
  const services = [
    allServices.find(s => s.title === "Sod & Turf Installation")!,
    allServices.find(s => s.title === "Hardscaping & Masonry")!,
    allServices.find(s => s.title === "Flower & Tree Plantation")!,
    ...allServices.filter(s => !["Sod & Turf Installation", "Hardscaping & Masonry", "Flower & Tree Plantation"].includes(s.title))
  ];

  // Handle smooth navigation to home sections
  const handleHomeNavigation = (hash: string) => { // hash is now always expected
    const elementId = hash.replace("/#", ""); // Extract elementId
    navigate('/', { hash: elementId }); // Navigate to home with hash
  };

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Background texture */}
      <div className="fixed inset-0 bg-texture opacity-20 pointer-events-none" />
      
      <Header />

      <main className="pt-32 pb-32 md:pb-24 relative z-10">
        {/* Hero Section */}
        <section className="container mb-16 px-4">
          <div className="text-center max-w-3xl mx-auto">
            {/* This is the original "Back to Home" button in the hero section, keeping it for now */}
            <button
              onClick={() => handleHomeNavigation('/#services')} // Updated to use fixed handleHomeNavigation
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </button>

            <span className="block text-primary font-medium text-sm uppercase tracking-widest mb-4">
              All Services
            </span>
            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-wide">
              Complete Landscaping<br />
              <span className="text-gradient">Solutions</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-xl leading-relaxed">
              From new sod installation to custom water features, we handle every aspect of your outdoor transformation with precision and care. Explore our comprehensive services below.
            </p>
          </div>
        </section>

        {/* Background glow - constrained to avoid overflow */}
        <div className="relative overflow-hidden">
          <div className="absolute top-1/4 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/5 rounded-full blur-3xl -translate-x-1/2" />
          <div className="absolute bottom-1/4 right-0 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-accent/5 rounded-full blur-3xl translate-x-1/2" />

          {/* Services Deep Dive */}
          <section className="container relative z-10 space-y-8 px-4">
            {services.map((service, index) => (
              <ServiceDeepDive key={index} service={service} index={index} />
            ))}
          </section>
        </div>

        {/* Go back Button (PC view) - Now at bottom right and more visible */}
        <div className="hidden md:block fixed bottom-6 right-6 z-[60]"> 
          <Button
            variant="default" 
            size="lg" // Increased size slightly for better visibility
            className="group bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-full flex items-center gap-2 shadow-lg animate-fade-up border border-primary-foreground/20" // Added border for more contrast
            onClick={() => handleHomeNavigation('/#services')} // Updated to use fixed handleHomeNavigation
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            Go back
          </Button>
        </div>

        {/* CTA Section */}
        <section className="container mt-8 px-4">
          <div className="glass-card rounded-3xl p-6 md:p-12 text-center glow-border">
            <h2 className="font-display text-xl md:text-3xl font-bold text-foreground mb-4 tracking-wide">
              Ready to Transform Your Yard?
            </h2>
            <p className="text-muted-foreground text-base md:text-lg mb-8 max-w-xl mx-auto">
              Get a free estimate today and see why Houston homeowners trust Texas Castro Landscaping.
            </p>
            <Button
              variant="hero"
              size="xl"
              className="group"
              onClick={() => handleHomeNavigation("#contact")}
            >
              Get My Free Estimate
              <ArrowRight className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            </Button>
          </div>
        </section>
      </main>

      {/* Floating Back Button - Mobile */}
      <button
        onClick={() => handleHomeNavigation('/#services')} // Updated to use fixed handleHomeNavigation
        className="fixed bottom-6 left-1/2 -translate-x-1/2 md:hidden z-50 glass px-6 py-4 rounded-full glow-border flex items-center gap-3 text-foreground font-medium shadow-elevated animate-fade-up"
      >
        <ArrowLeft className="w-5 h-5 text-primary" />
        <span>Return to Home</span>
      </button>
    </div>
  );
};

export default Services;