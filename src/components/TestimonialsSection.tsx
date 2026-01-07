import { useState } from "react";
import { Star, Quote, ArrowRight, ZoomIn, X } from "lucide-react";
import bgReviews from "@/assets/bg-reviews.jpg";
import reviewRogelio from "@/assets/review-rogelio.jpg";
import reviewMatt from "@/assets/review-matt.jpg";
import reviewKarenBefore from "@/assets/review-karen-before.jpg";
import reviewKarenAfter from "@/assets/review-karen-after.jpg";

interface Testimonial {
  quote: string;
  author: string;
  context: string;
  rating: number;
  image?: string;
  beforeImage?: string;
  afterImage?: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "They have done an amazing job. The owner responds promptly and is very polite. 10/10 would recommend and will continue to utilize them for my landscape needs.",
    author: "Rogelio Rodriguez",
    context: "Weekly Lawn Maintenance",
    rating: 5,
    image: reviewRogelio,
  },
  {
    quote: "Texas Castro Landscaping did a PHENOMENAL job with our backyard. Someone came out to look at our backyard the same day I called and I received an estimate later that very day.",
    author: "Matt Kovach",
    context: "Full Backyard Renovation",
    rating: 5,
    image: reviewMatt,
  },
  {
    quote: "Texas Castro Landscaping did an awesome job on my lawn. The front yard needed a great deal of attention and they did all that I asked. Will I use them again? Absolutely!",
    author: "Karen Chadwick",
    context: "Front Yard Restoration & Cleanup",
    rating: 5,
    beforeImage: reviewKarenBefore,
    afterImage: reviewKarenAfter,
  },
];

const ImageModal = ({ 
  src, 
  alt, 
  isOpen, 
  onClose 
}: { 
  src: string; 
  alt: string; 
  isOpen: boolean; 
  onClose: () => void;
}) => {
  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <button 
        className="absolute top-4 right-4 p-2 rounded-full bg-card/80 text-foreground hover:bg-card transition-colors"
        onClick={onClose}
      >
        <X className="w-6 h-6" />
      </button>
      <img 
        src={src} 
        alt={alt}
        className="max-w-full max-h-[90vh] object-contain rounded-lg"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};

const TestimonialCard = ({ testimonial, index, isFullWidth = false }: { testimonial: Testimonial; index: number; isFullWidth?: boolean }) => {
  const hasBeforeAfter = testimonial.beforeImage && testimonial.afterImage;
  const [modalImage, setModalImage] = useState<{ src: string; alt: string } | null>(null);
  
  return (
    <>
      <ImageModal 
        src={modalImage?.src || ''} 
        alt={modalImage?.alt || ''} 
        isOpen={!!modalImage} 
        onClose={() => setModalImage(null)} 
      />
      <div
        className="relative glass-card rounded-2xl p-8 transition-all duration-300 hover:glow-border animate-fade-up h-full"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {/* Quote Icon */}
        <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/20" />

        {/* Stars */}
        <div className="flex gap-1 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-accent text-accent" />
          ))}
        </div>

        {/* Quote */}
        <blockquote className="text-foreground text-lg leading-relaxed mb-6">
          "{testimonial.quote}"
        </blockquote>

        {/* Single Image - with better positioning for Matt */}
        {testimonial.image && (
          <div 
            className="mb-6 rounded-xl overflow-hidden relative group cursor-pointer"
            onClick={() => setModalImage({ src: testimonial.image!, alt: `Work done for ${testimonial.author}` })}
          >
            <img 
              src={testimonial.image} 
              alt={`Work done for ${testimonial.author}`}
              className={`w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105 ${
                testimonial.author === "Matt Kovach" ? "object-[center_40%]" : ""
              }`}
            />
            <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors flex items-center justify-center">
              <ZoomIn className="w-8 h-8 text-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        )}

        {/* Before/After Images */}
        {hasBeforeAfter && (
          <div className="mb-6">
            <div className={`flex items-center gap-4 ${isFullWidth ? 'md:gap-6' : ''}`}>
              <div className="flex-1">
                <span className="text-sm text-muted-foreground font-medium mb-2 block">Before</span>
                <div 
                  className="rounded-xl overflow-hidden relative group cursor-pointer"
                  onClick={() => setModalImage({ src: testimonial.beforeImage!, alt: `Before work for ${testimonial.author}` })}
                >
                  <img 
                    src={testimonial.beforeImage} 
                    alt={`Before work for ${testimonial.author}`}
                    className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${isFullWidth ? 'h-48 md:h-56' : 'h-32'}`}
                  />
                  <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors flex items-center justify-center">
                    <ZoomIn className="w-6 h-6 text-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center text-primary">
                <ArrowRight className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <span className="text-sm text-muted-foreground font-medium mb-2 block">After</span>
                <div 
                  className="rounded-xl overflow-hidden relative group cursor-pointer"
                  onClick={() => setModalImage({ src: testimonial.afterImage!, alt: `After work for ${testimonial.author}` })}
                >
                  <img 
                    src={testimonial.afterImage} 
                    alt={`After work for ${testimonial.author}`}
                    className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${isFullWidth ? 'h-48 md:h-56' : 'h-32'}`}
                  />
                  <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors flex items-center justify-center">
                    <ZoomIn className="w-6 h-6 text-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Author */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
            <span className="text-primary font-semibold text-sm">
              {testimonial.author.charAt(0)}
            </span>
          </div>
          <div>
            <p className="font-semibold text-foreground">{testimonial.author}</p>
            <p className="text-sm text-muted-foreground">{testimonial.context}</p>
          </div>
        </div>
      </div>
    </>
  );
};

const TestimonialsSection = () => {
  return (
    <section id="reviews" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Image with radial gradient overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${bgReviews})` }}
      />
      {/* Radial gradient overlay: black edges, transparent center */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: 'radial-gradient(ellipse at center, transparent 0%, hsl(var(--background) / 0.7) 50%, hsl(var(--background)) 100%)' 
        }}
      />
      <div className="absolute inset-0 bg-background/80" />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-primary font-medium text-base uppercase tracking-widest mb-4">
            What Our Clients Say
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 tracking-wide">
            Real Results,<br />
            <span className="text-gradient">Real Reviews</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl">
            Don't just take our word for it. Here's what Houston homeowners are saying about our work.
          </p>
        </div>

        {/* Testimonial Grid - 3 equal columns on desktop */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TestimonialCard testimonial={testimonials[0]} index={0} />
          <TestimonialCard testimonial={testimonials[1]} index={1} />
          <TestimonialCard testimonial={testimonials[2]} index={2} isFullWidth />
        </div>

        {/* Google Reviews Link */}
        <div className="text-center mt-10">
          <a
            href="https://www.google.com/maps/place/Texas+Castro+Landscaping+LLC/@29.8341099,-95.5055153,14.33z/data=!4m12!1m3!11m2!2sAPKozn0-QI6kWFt7juypqg!3e3!3m7!1s0x8640c5eb6e508207:0x3391176bded1ef2e!8m2!3d29.8270205!4d-95.4915334!9m1!1b1!16s%2Fg%2F11fj5cq9qx?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline underline-offset-4 transition-all hover:text-primary/80"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Read more of our 100+ five-star reviews on Google
          </a>
        </div>

        {/* Google Map */}
        <div className="mt-12">
          <div className="rounded-2xl overflow-hidden glow-border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3462.123!2d-95.4915334!3d29.8270205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c5eb6e508207%3A0x3391176bded1ef2e!2sTexas%20Castro%20Landscaping%20LLC!5e0!3m2!1sen!2sus!4v1704300000000!5m2!1sen!2sus"
              width="100%"
              height="350"
              style={{ border: 0, filter: "grayscale(0.8) invert(0.9) hue-rotate(180deg)" }}
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title="Texas Castro Landscaping LLC Location"
              className="w-full"
            />
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-16 border-t border-border">
          {[
            { value: "12+", label: "Years Experience" },
            { value: "500+", label: "Projects Completed" },
            { value: "4.9", label: "Average Rating" },
            { value: "100%", label: "Satisfaction Rate" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="font-display text-3xl md:text-4xl font-bold text-primary glow-text mb-2">{stat.value}</p>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;