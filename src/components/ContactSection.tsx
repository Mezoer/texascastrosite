import { useState, useRef } from "react";
import { Phone, Mail, MapPin, Clock, ArrowRight, Send, ChevronDown, ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

const serviceOptions = [
  { value: "sod-turf", label: "Sod & Turf Installation" },
  { value: "hardscaping", label: "Hardscaping & Patios" },
  { value: "drainage", label: "Drainage & Grading" },
  { value: "ponds-fountains", label: "Ambiance Ponds & Fountains" },
  { value: "tree-services", label: "Tree & Shrub Services" },
  { value: "flower-plantation", label: "Flower & Tree Plantation" },
  { value: "custom", label: "Other / Custom Project" }
];

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    service: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceSelect = (value: string) => {
    setFormData(prev => ({
      ...prev,
      service: value
    }));
    setIsDropdownOpen(false);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).slice(0, 5 - selectedImages.length);
      setSelectedImages(prev => [...prev, ...newImages].slice(0, 5));
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async () => {
    const imageUrls: string[] = [];

    try {
      for (const file of selectedImages) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `estimates/${fileName}`;

        const { data, error } = await supabase
          .storage
          .from('images')
          .upload(filePath, file);

        if (error) {
          console.error('Error uploading image:', error);
          continue;
        }

        const { data: { publicUrl } } = supabase
          .storage
          .from('images')
          .getPublicUrl(filePath);

        imageUrls.push(publicUrl);
      }
    } catch (error) {
      console.error('Error in image upload process:', error);
      throw error;
    }

    return imageUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Upload images first
      const imageUrls = await uploadImages();

      // Save estimate data to Supabase - using the correct table name
      const { data, error } = await supabase
        .from('Estimatesfinal') // Changed from 'Estimates' to 'Estimatesfinal'
        .insert([
          {
            full_name: formData.fullName,
            phone: formData.phone,
            service: formData.service,
            message: formData.message,
            images: imageUrls
          }
        ]);

      if (error) {
        console.error('Supabase insert error:', error);
        throw error;
      }

      toast({
        title: "Request Sent!",
        description: "Mr. Castro or a team member will contact you within 24 hours for your free estimate."
      });

      setFormData({
        fullName: "",
        phone: "",
        service: "",
        message: ""
      });
      setSelectedImages([]);
    } catch (error) {
      console.error('Error submitting estimate:', error);
      toast({
        title: "Error",
        description: "There was a problem submitting your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedService = serviceOptions.find(s => s.value === formData.service);

  return (
    <footer id="contact" className="relative">
      {/* CTA Banner */}
      <div className="glass py-10 glow-border">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground tracking-wide">
              Ready to Transform Your Yard?
            </h3>
            <p className="text-muted-foreground mt-2">
              Get your free estimate today and see the difference quality makes.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="cta"
              size="lg"
              onClick={() => document.querySelector('#lead-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Free Estimate
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="glass" size="lg" asChild>
              <a href="tel:8328899786">
                <Phone className="w-5 h-5" />
                (832) 889-9786
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16 bg-secondary/30">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Lead Form */}
            <div id="lead-form" className="lg:col-span-2">
              <h4 className="font-display text-2xl font-bold mb-4 text-foreground tracking-wide">
                Request Your Free Estimate
              </h4>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-muted-foreground mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl glass text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-muted-foreground mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl glass text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="(555) 123-4567"
                  />
                </div>

                {/* Custom Dropdown */}
                <div className="relative">
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Service Needed *
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full px-4 py-3 rounded-xl glass text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primary transition-all hover:glow-border"
                  >
                    <span className={selectedService ? "text-foreground" : "text-muted-foreground"}>
                      {selectedService?.label || "Select a service"}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${isDropdownOpen ? "rotate-180 text-primary" : ""}`} />
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute z-50 w-full mt-2 rounded-xl glass glow-border overflow-hidden animate-fade-in">
                      {serviceOptions.map(option => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => handleServiceSelect(option.value)}
                          className={`w-full px-4 py-3 text-left transition-colors hover:bg-primary/20 hover:text-primary ${formData.service === option.value ? "bg-primary/10 text-primary" : "text-foreground"}`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                  <input type="hidden" name="service" value={formData.service} required />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl glass text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all"
                    placeholder="Tell us about your project... (optional)"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Attach Images (optional)
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageSelect}
                    className="hidden"
                    id="image-upload"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={selectedImages.length >= 5}
                    className="w-full px-4 py-3 rounded-xl glass text-muted-foreground hover:text-foreground hover:glow-border focus:outline-none focus:ring-2 focus:ring-primary transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ImagePlus className="w-5 h-5" />
                    <span>{selectedImages.length >= 5 ? "Max 5 images" : "Add Images"}</span>
                  </button>
                  {selectedImages.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selectedImages.map((file, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${index + 1}`}
                            className="w-16 h-16 object-cover rounded-lg border border-border"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Button type="submit" variant="cta" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Submit Request"}
                  <Send className="w-5 h-5" />
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h5 className="font-display font-semibold text-lg mb-6 text-foreground tracking-wide">Contact Us</h5>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    6658 Thornwall St<br />
                    Houston, TX 77092
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <a href="tel:8328899786" className="text-muted-foreground hover:text-primary transition-colors">
                    (832) 889-9786
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <a href="mailto:info@texascastro.com" className="text-muted-foreground hover:text-primary transition-colors">
                    info@texascastro.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Hours */}
            <div>
              <h5 className="font-display font-semibold text-lg mb-6 text-foreground tracking-wide">Business Hours</h5>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary shrink-0" />
                  <div className="text-muted-foreground">
                    <p className="font-medium text-foreground">Mon - Fri</p>
                    <p>7:00 AM - 6:00 PM</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary shrink-0" />
                  <div className="text-muted-foreground">
                    <p className="font-medium text-foreground">Saturday</p>
                    <p>8:00 AM - 4:00 PM</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary shrink-0" />
                  <div className="text-muted-foreground">
                    <p className="font-medium text-foreground">Sunday</p>
                    <p>Closed</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              © 2026 Texas Castro Landscaping LLC. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <button type="button" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</button>
              <button type="button" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</button>
              <button type="button" className="text-muted-foreground hover:text-primary transition-colors">Sitemap</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactSection;