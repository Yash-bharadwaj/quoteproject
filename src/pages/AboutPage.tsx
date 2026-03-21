import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { COMPANY_DETAILS } from '../constants';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Award, Users, History, Globe, X, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { monasteryGalleryImages } from '../data/portfolioProjects';

const monasteryImages = monasteryGalleryImages;

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

      {/* Founder Section - The Visionary */}
      <section className="pt-32 sm:pt-40 pb-20 sm:pb-28 bg-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10"
          >
            <img
              src="/dpeipics/DagaSrinivas.png"
              alt={COMPANY_DETAILS.founder}
              className="w-full h-full object-cover object-[center_35%]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <p className="text-brand-gold text-[10px] sm:text-xs uppercase tracking-[0.3em] font-bold mb-1">Founder & Contractor</p>
              <p className="text-xl sm:text-2xl md:text-3xl font-serif font-bold tracking-tight">{COMPANY_DETAILS.founder}</p>
              <a
                href={`tel:+${COMPANY_DETAILS.phoneWhatsappWa}`}
                className="mt-2 block text-sm sm:text-base text-white/75 hover:text-brand-gold transition-colors tracking-wide"
              >
                {COMPANY_DETAILS.phoneWhatsappDisplay}
              </a>
            </div>
          </motion.div>

          <div className="lg:pt-4">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-brand-gold font-bold mb-3">The Visionary</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
              {COMPANY_DETAILS.founder}
            </h2>
            <div className="h-1 w-16 bg-brand-gold rounded-full my-6" />

            <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-6">
              With over 15 years as an interior contractor, {COMPANY_DETAILS.founder} has built DEE PIESS from the ground up. Based in Secunderabad, he leads every project from planning to handover — working closely with clients, craftsmen, and vendors to deliver spaces that are both beautiful and built to last.
            </p>
            <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8">
              He believes every space has a soul. His job is to find it and bring it to life through solid planning, the right materials, and strict attention to detail on site. No shortcuts, no compromise on finish — that’s the standard he has set for the firm and for everyone who works with him.
            </p>

            <div className="space-y-3 mb-10">
              {[
                "Hands-on on every project from start to finish",
                "Strong focus on quality materials and craftsmanship",
                "Known for on-time delivery and clear communication",
              ].map((line, i) => (
                <div key={i} className="flex items-center gap-3 text-white/70 text-sm sm:text-base">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" />
                  <span>{line}</span>
                </div>
              ))}
            </div>

            <blockquote className="border-l-2 border-brand-gold pl-5 py-2 text-white/50 italic text-sm sm:text-base mb-10">
              “We deliver complete interiors — places people want to live and work in.”
            </blockquote>

            <div className="flex flex-wrap gap-8 sm:gap-12 pt-4 border-t border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <Award className="text-brand-gold" size={22} />
                </div>
                <div>
                  <p className="text-2xl font-serif font-bold text-white">500+</p>
                  <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Projects</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <Users className="text-brand-gold" size={22} />
                </div>
                <div>
                  <p className="text-2xl font-serif font-bold text-white">200+</p>
                  <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Clients</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            {[
              { value: "15+", label: "Years of experience" },
              { value: "500+", label: "Projects delivered" },
              { value: "100%", label: "Client satisfaction" },
              { value: "50+", label: "Premium partners" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center"
              >
                <p className="text-3xl sm:text-4xl font-serif font-bold text-white mb-2">{stat.value}</p>
                <p className="text-[10px] sm:text-xs uppercase tracking-widest text-white/40 font-bold">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* We focus on quality */}
      <section className="py-20 sm:py-28 px-6 max-w-4xl mx-auto">
        <div className="relative">
          <h2 className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-brand-gold font-bold mb-4">What we stand for</h2>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-8 relative z-0">We focus on quality.</h3>
          <div
            className="absolute left-0 -bottom-2 w-full max-w-md h-16 pointer-events-none z-[-1]"
            style={{
              background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(197,160,89,0.1), transparent 70%)',
              filter: 'blur(10px)',
            }}
            aria-hidden
          />
        </div>
        <p className="text-white/50 text-base sm:text-lg leading-relaxed mb-10">
          Every project is done with care. We use the best materials, stick to timelines, and never cut corners on finish.
        </p>
        <ul className="space-y-4">
          {[
            "We pick materials that last and look good.",
            "We finish on time and within the budget we agree on.",
            "We don’t compromise on detail — every joint and finish is checked.",
            "We work with skilled craftsmen and trusted partners.",
          ].map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="flex items-start gap-3 text-white/70 text-sm sm:text-base"
            >
              <CheckCircle2 size={18} className="text-brand-gold shrink-0 mt-0.5" />
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>
      </section>

      {/* Featured Project Section */}
      <section className="py-20 sm:py-32 px-6 max-w-7xl mx-auto" onKeyDown={handleKeyDown} tabIndex={-1}>
        <div className="text-center mb-12 sm:mb-20">
          <h2 className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-brand-gold font-bold mb-6">Masterpiece</h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold">Monastery Hotel, Hyderabad</h3>
          <p className="text-white/40 mt-4 text-sm sm:text-base max-w-2xl mx-auto">
            Our most ambitious project — blending traditional spiritual aesthetics with modern luxury. Complete interior fit-out and finishing from grand lobby to bespoke guest suites.
          </p>
        </div>

        {/* Project Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {[
            { label: "Scope", value: "Complete interior fit-out" },
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
