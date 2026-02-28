import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { COMPANY_DETAILS } from '../constants';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Award, Users, History, Globe, X, ChevronLeft, ChevronRight } from 'lucide-react';

const monasteryImages = [
  "/dpeipics/WhatsApp Image 2026-02-23 at 11.57.35.jpeg",
  "/dpeipics/WhatsApp Image 2026-02-23 at 11.57.36 (1).jpeg",
  "/dpeipics/WhatsApp Image 2026-02-23 at 11.57.36.jpeg",
  "/dpeipics/WhatsApp Image 2026-02-23 at 11.57.37 (1).jpeg",
  "/dpeipics/WhatsApp Image 2026-02-23 at 11.57.37 (2).jpeg",
  "/dpeipics/WhatsApp Image 2026-02-23 at 11.57.37.jpeg",
  "/dpeipics/WhatsApp Image 2026-02-23 at 11.57.38 (1).jpeg",
  "/dpeipics/WhatsApp Image 2026-02-23 at 11.57.38 (2).jpeg",
  "/dpeipics/WhatsApp Image 2026-02-23 at 11.57.38.jpeg",
  "/dpeipics/WhatsApp Image 2026-02-23 at 11.57.39 (1).jpeg",
  "/dpeipics/WhatsApp Image 2026-02-23 at 11.57.39 (2).jpeg",
  "/dpeipics/WhatsApp Image 2026-02-23 at 11.57.39.jpeg",
  "/dpeipics/WhatsApp Image 2026-02-23 at 11.57.40 (1).jpeg",
  "/dpeipics/WhatsApp Image 2026-02-23 at 11.57.40.jpeg",
  "/dpeipics/WhatsApp Image 2026-02-23 at 11.57.41 (1).jpeg",
  "/dpeipics/WhatsApp Image 2026-02-23 at 11.57.41 (2).jpeg",
  "/dpeipics/WhatsApp Image 2026-02-23 at 11.57.41.jpeg",
  "/dpeipics/WhatsApp Image 2026-02-23 at 11.57.42 (1).jpeg",
  "/dpeipics/WhatsApp Image 2026-02-23 at 11.57.42 (2).jpeg",
  "/dpeipics/WhatsApp Image 2026-02-23 at 11.57.42.jpeg",
  "/dpeipics/WhatsApp Image 2026-02-23 at 11.57.43.jpeg",
  "/dpeipics/WhatsApp Image 2026-02-23 at 11.58.24.jpeg",
  "/dpeipics/WhatsApp Image 2026-02-23 at 11.58.25.jpeg",
  "/dpeipics/WhatsApp Image 2026-02-23 at 11.58.30.jpeg",
  "/dpeipics/WhatsApp Image 2026-02-23 at 11.58.31 (1).jpeg",
  "/dpeipics/WhatsApp Image 2026-02-23 at 11.58.31.jpeg",
  "/dpeipics/WhatsApp Image 2026-02-23 at 11.58.32 (1).jpeg",
  "/dpeipics/WhatsApp Image 2026-02-23 at 11.58.32 (2).jpeg",
  "/dpeipics/WhatsApp Image 2026-02-23 at 11.58.32.jpeg",
  "/dpeipics/WhatsApp Image 2026-02-23 at 11.58.33 (1).jpeg",
  "/dpeipics/WhatsApp Image 2026-02-23 at 11.58.33 (2).jpeg",
  "/dpeipics/WhatsApp Image 2026-02-23 at 11.58.33.jpeg",
  "/dpeipics/WhatsApp Image 2026-02-23 at 11.58.34 (1).jpeg",
  "/dpeipics/WhatsApp Image 2026-02-23 at 11.58.34 (2).jpeg",
  "/dpeipics/WhatsApp Image 2026-02-23 at 11.58.34.jpeg",
  "/dpeipics/WhatsApp Image 2026-02-23 at 11.58.35 (1).jpeg",
  "/dpeipics/WhatsApp Image 2026-02-23 at 11.58.35 (2).jpeg",
  "/dpeipics/WhatsApp Image 2026-02-23 at 11.58.35.jpeg",
  "/dpeipics/WhatsApp Image 2026-02-23 at 12.00.03.jpeg",
  "/dpeipics/WhatsApp Image 2026-02-23 at 12.00.04 (1).jpeg",
  "/dpeipics/WhatsApp Image 2026-02-23 at 12.00.04 (2).jpeg",
  "/dpeipics/WhatsApp Image 2026-02-23 at 12.00.04.jpeg",
  "/dpeipics/WhatsApp Image 2026-02-23 at 12.00.05.jpeg",
];

export default function AboutPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex(i => i !== null ? (i - 1 + monasteryImages.length) % monasteryImages.length : null);
  const nextImage = () => setLightboxIndex(i => i !== null ? (i + 1) % monasteryImages.length : null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
  };

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
          Our Story
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold tracking-tighter mb-12 leading-tight"
        >
          A Legacy of <br /> <span className="italic font-light text-white/60">Craftsmanship.</span>
        </motion.h1>
      </section>

      {/* Founder Section */}
      <section className="py-16 sm:py-20 bg-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative aspect-[4/5] rounded-2xl sm:rounded-[2rem] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000" 
              alt="Founder" 
              className="w-full h-full object-cover grayscale"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
              <p className="text-brand-gold text-[8px] sm:text-[10px] uppercase tracking-widest font-bold mb-1">Founder</p>
              <p className="text-xl sm:text-2xl font-serif font-bold">{COMPANY_DETAILS.founder}</p>
            </div>
          </div>
          <div className="space-y-6 sm:space-y-8">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold">The Visionary</h2>
            <p className="text-white/50 text-base sm:text-lg leading-relaxed">
              With over 15 years of experience in the interior architecture industry, {COMPANY_DETAILS.founder} has led DEE PIESS to become a benchmark for quality and innovation in Secunderabad and beyond.
            </p>
            <p className="text-white/50 text-base sm:text-lg leading-relaxed">
              His philosophy centers on the belief that every space has a soul. Our job is to discover it and bring it to life through meticulous design and flawless execution.
            </p>
            <div className="grid grid-cols-2 gap-6 sm:gap-8 pt-4 sm:pt-8">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                  <Award className="text-brand-gold" size={20} />
                </div>
                <div>
                  <p className="text-lg sm:text-xl font-serif font-bold">500+</p>
                  <p className="text-[8px] sm:text-[10px] uppercase tracking-widest text-white/30 font-bold">Projects</p>
                </div>
              </div>
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                  <Users className="text-brand-gold" size={20} />
                </div>
                <div>
                  <p className="text-lg sm:text-xl font-serif font-bold">200+</p>
                  <p className="text-[8px] sm:text-[10px] uppercase tracking-widest text-white/30 font-bold">Clients</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Project Section */}
      <section className="py-20 sm:py-32 px-6 max-w-7xl mx-auto" onKeyDown={handleKeyDown} tabIndex={-1}>
        <div className="text-center mb-12 sm:mb-20">
          <h2 className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-brand-gold font-bold mb-6">Masterpiece</h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold">Monastery Hotel, Hyderabad</h3>
          <p className="text-white/40 mt-4 text-sm sm:text-base max-w-2xl mx-auto">
            Our most ambitious project — blending traditional spiritual aesthetics with modern luxury. Complete interior architecture from grand lobby to bespoke guest suites.
          </p>
        </div>

        {/* Project Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {[
            { label: "Scope", value: "Complete Interior Architecture" },
            { label: "Services", value: "Furniture · Lighting · Material Sourcing" },
            { label: "Location", value: "Hyderabad, Telangana" },
          ].map((item, i) => (
            <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-6">
              <p className="text-brand-gold text-[8px] sm:text-[10px] uppercase tracking-widest font-bold mb-2">{item.label}</p>
              <p className="text-white/70 text-sm sm:text-base font-medium">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl sm:rounded-[3rem] overflow-hidden aspect-video relative group cursor-pointer mb-8"
          onClick={() => openLightbox(0)}
        >
          <img
            src={monasteryImages[0]}
            alt="Monastery Hotel - Main"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
          <div className="absolute bottom-6 right-6 bg-black/60 backdrop-blur-sm text-white text-[10px] uppercase tracking-widest font-bold px-4 py-2 rounded-full border border-white/20">
            Click to view gallery
          </div>
        </motion.div>

        {/* Masonry-style grid gallery */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {monasteryImages.slice(1).map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 8) * 0.05 }}
              className="break-inside-avoid cursor-pointer rounded-xl sm:rounded-2xl overflow-hidden group relative"
              onClick={() => openLightbox(i + 1)}
            >
              <img
                src={src}
                alt={`Monastery Hotel ${i + 2}`}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/70 hover:text-white transition-colors z-10 bg-white/10 rounded-full p-2"
              onClick={closeLightbox}
            >
              <X size={24} />
            </button>
            <button
              className="absolute left-4 sm:left-6 text-white/70 hover:text-white transition-colors z-10 bg-white/10 rounded-full p-2"
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
            >
              <ChevronLeft size={28} />
            </button>
            <button
              className="absolute right-4 sm:right-16 text-white/70 hover:text-white transition-colors z-10 bg-white/10 rounded-full p-2"
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
            >
              <ChevronRight size={28} />
            </button>
            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              src={monasteryImages[lightboxIndex]}
              alt={`Monastery Hotel ${lightboxIndex + 1}`}
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 text-xs font-bold uppercase tracking-widest">
              {lightboxIndex + 1} / {monasteryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Values Section */}
      <section className="py-20 sm:py-32 bg-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4 sm:space-y-6">
              <History className="text-brand-gold" size={32} />
              <h4 className="text-xl sm:text-2xl font-serif font-bold">Our Heritage</h4>
              <p className="text-white/40 text-sm sm:text-base leading-relaxed">
                Founded on the principles of integrity and excellence, we have built a reputation that spans decades of successful project deliveries.
              </p>
            </div>
            <div className="space-y-4 sm:space-y-6">
              <Globe className="text-brand-gold" size={32} />
              <h4 className="text-xl sm:text-2xl font-serif font-bold">Our Reach</h4>
              <p className="text-white/40 text-sm sm:text-base leading-relaxed">
                While based in Secunderabad, our projects can be found across major Indian cities, each carrying our signature mark of quality.
              </p>
            </div>
            <div className="space-y-4 sm:space-y-6">
              <Award className="text-brand-gold" size={32} />
              <h4 className="text-xl sm:text-2xl font-serif font-bold">Our Quality</h4>
              <p className="text-white/40 text-sm sm:text-base leading-relaxed">
                We never compromise. Every material, every joint, and every finish is scrutinized to meet our exacting standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
