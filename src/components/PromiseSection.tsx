import { Clock, Calendar, Users, CheckCircle2 } from "lucide-react";
import bgPromise from "@/assets/bg-promise.jpg";

interface Promise {
  icon: React.ElementType;
  title: string;
  description: string;
}
const promises: Promise[] = [{
  icon: Clock,
  title: "Same-Day Estimates",
  description: "Get your free quote within hours, not days. We value your time."
}, {
  icon: Calendar,
  title: "Work Starts Next Day",
  description: "Once approved, our crews are ready to transform your yard immediately."
}, {
  icon: Users,
  title: "Bilingual Team",
  description: "Our team speaks English and Spanish for seamless communication."
}, {
  icon: CheckCircle2,
  title: "Daily Clean-Up",
  description: "We leave your property spotless at the end of every work day."
}];
const PromiseSection = () => {
  return <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Image with gradient overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{ backgroundImage: `url(${bgPromise})` }}
      />
      {/* Radial gradient overlay: black edges, transparent center */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: 'radial-gradient(ellipse at center, transparent 0%, hsl(var(--background) / 0.6) 40%, hsl(var(--background)) 100%)' 
        }}
      />
      <div className="absolute inset-0 bg-background/75" />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-primary font-medium text-base uppercase tracking-widest mb-4">
            Our Commitment
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 tracking-wide">
            The Castro<br />
            <span className="text-gradient">Promise</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl">
            We treat your property like it's our own home. Our goal is simple: to make sure yours is the best-looking yard on the block.
          </p>
        </div>

        {/* Promises Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {promises.map((promise, index) => {
          const Icon = promise.icon;
          return <div key={index} className="text-center group glass-card rounded-2xl p-8 transition-all duration-300 hover:glow-border animate-fade-up" style={{
            animationDelay: `${index * 100}ms`
          }}>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:scale-110 group-hover:shadow-glow">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3 tracking-wide">
                  {promise.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-base">
                  {promise.description}
                </p>
              </div>;
        })}
        </div>

        {/* Divider Quote */}
        <div className="mt-16 pt-16 border-t border-border text-center">
          <blockquote className="font-display text-xl md:text-2xl text-foreground/90 italic max-w-3xl mx-auto tracking-wide">
            "Your lawn is our reputation. Providing Houston with honest, high-quality landscaping since day one."
          </blockquote>
          <p className="mt-4 text-primary font-semibold text-xl glow-text"> - The Castro Family</p>
        </div>
      </div>
    </section>;
};
export default PromiseSection;