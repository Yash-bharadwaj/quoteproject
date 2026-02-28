import React from 'react';
import { motion } from 'motion/react';
import { 
  Hotel, 
  Home, 
  Building2, 
  Store, 
  Monitor, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const detailedServices = [
  {
    icon: <Hotel size={40} />,
    title: "Hospitality Design",
    category: "Hotels & Resorts",
    desc: "We create immersive guest experiences that blend luxury with operational efficiency. Our approach focuses on creating a unique sense of place while ensuring that every operational aspect—from staff flow to guest privacy—is seamlessly integrated. Our work at the Monastery Hotel, Hyderabad, stands as a testament to our hospitality expertise, where we balanced heritage aesthetics with modern luxury.",
    features: ["Lobby & Reception Areas", "Guest Suites", "Fine Dining Restaurants", "Wellness & Spa Centers", "Operational Flow Planning", "Acoustic & Lighting Design"],
    image: "/dpeipics/WhatsApp Image 2026-02-23 at 11.57.35.jpeg",
  },
  {
    icon: <Home size={40} />,
    title: "Residential Interiors",
    category: "Luxury Homes",
    desc: "Transforming houses into homes that reflect the unique personality of their owners. We specialize in high-end villas and premium apartments, focusing on bespoke solutions that prioritize both comfort and sophistication. Our residential projects are characterized by a harmonious blend of textures, custom-designed furniture, and intelligent space planning that adapts to your lifestyle.",
    features: ["Bespoke Furniture", "Smart Home Integration", "Kitchen & Wardrobe Solutions", "Landscape Integration", "Custom Art Curation", "Lighting Control Systems"],
    image: "/dpeipics/WhatsApp Image 2026-02-23 at 11.58.24.jpeg",
  },
  {
    icon: <Building2 size={40} />,
    title: "Corporate Spaces",
    category: "Offices",
    desc: "Designing workspaces that foster productivity and innovation while reinforcing your corporate brand identity. We understand that the modern office is more than just a place to work; it's a hub for collaboration and culture. Our designs incorporate ergonomic principles, sustainable materials, and flexible layouts that can evolve with your business needs.",
    features: ["Executive Suites", "Collaborative Zones", "Conference Facilities", "Ergonomic Planning", "Brand Identity Integration", "IT & AV Infrastructure"],
    image: "/dpeipics/WhatsApp Image 2026-02-23 at 11.58.30.jpeg",
  },
  {
    icon: <Store size={40} />,
    title: "Commercial & Retail",
    category: "Outlets & Showrooms",
    desc: "Strategic retail design that maximizes customer engagement and optimizes product display. We combine psychological insights with architectural precision to create environments that guide the customer journey and enhance brand perception. From high-end showrooms to boutique outlets, we ensure your physical space is your most powerful marketing tool.",
    features: ["Visual Merchandising", "Lighting Design", "Customer Flow Optimization", "Brand Integration", "Point of Sale Design", "Storage & Inventory Planning"],
    image: "/dpeipics/WhatsApp Image 2026-02-23 at 11.58.33.jpeg",
  },
  {
    icon: <Monitor size={40} />,
    title: "Modular Solutions",
    category: "Kiosks & Displays",
    desc: "Functional, eye-catching, and modular solutions for temporary or permanent brand presence. We specialize in creating high-impact modular units that are easy to assemble, durable, and highly customizable. Whether it's a mall kiosk or an exhibition stall, our solutions are designed to stand out in high-traffic environments while maintaining brand consistency.",
    features: ["Exhibition Stalls", "Mall Kiosks", "Pop-up Stores", "Modular Displays", "Portable Branding Units", "Integrated Digital Signage"],
    image: "/dpeipics/WhatsApp Image 2026-02-23 at 12.00.03.jpeg",
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-brand-gold selection:text-brand-ink">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-20 px-6 max-w-7xl mx-auto">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-brand-gold text-[10px] sm:text-xs uppercase tracking-[0.4em] font-bold mb-6"
        >
          Our Services
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold tracking-tighter mb-12 leading-tight"
        >
          Design Without <br /> <span className="italic font-light text-white/60">Boundaries.</span>
        </motion.h1>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-20 px-6 max-w-7xl mx-auto space-y-20 sm:space-y-32">
        {detailedServices.map((service, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
          >
            <div className={`${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
              <div className="text-brand-gold mb-6 sm:mb-8">
                {React.cloneElement(service.icon as React.ReactElement, { size: 32 })}
              </div>
              <p className="text-brand-gold text-[8px] sm:text-[10px] uppercase tracking-widest font-bold mb-2">{service.category}</p>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-6">{service.title}</h2>
              <p className="text-white/50 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10">
                {service.desc}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs sm:text-sm text-white/70">
                    <CheckCircle2 size={16} className="text-brand-gold shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
              <button className="mt-10 sm:mt-12 flex items-center gap-3 text-brand-gold font-bold uppercase tracking-widest text-[10px] sm:text-xs hover:gap-5 transition-all">
                Learn More <ArrowRight size={16} />
              </button>
            </div>
            <div className={`relative aspect-square rounded-2xl sm:rounded-[3rem] overflow-hidden ${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          </motion.div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="bg-brand-gold text-black rounded-[2.5rem] sm:rounded-[4rem] p-10 sm:p-16 md:p-24 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold mb-6 sm:mb-8 leading-tight">Ready to start your <br className="hidden sm:block" /> transformation?</h3>
            <p className="text-black/60 text-base sm:text-lg max-w-2xl mx-auto mb-10 sm:mb-12">
              Whether it's a single room or a multi-story hotel, we bring the same level of passion and precision to every project.
            </p>
            <a href="/#contact" className="inline-block bg-black text-white px-10 sm:px-12 py-4 sm:py-5 rounded-full font-bold hover:scale-105 transition-all active:scale-95 text-sm sm:text-base">
              Get a Free Consultation
            </a>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 sm:w-64 h-48 sm:h-64 bg-black/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
