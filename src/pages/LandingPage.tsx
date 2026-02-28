import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Hotel,
  Home,
  Building2,
  Store,
  Monitor,
  Phone, 
  Mail, 
  MapPin,
  X,
  ChevronLeft,
  ChevronRight,
  Images
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { COMPANY_DETAILS } from '../constants';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const services = [
  { icon: <Hotel size={24} />, title: "Hotels", desc: "Luxury hospitality interiors that define guest experiences.", link: "/services" },
  { icon: <Home size={24} />, title: "Residences", desc: "Crafting personal sanctuaries with bespoke design elements.", link: "/services" },
  { icon: <Building2 size={24} />, title: "Corporate Offices", desc: "Productive workspaces that reflect your brand identity.", link: "/services" },
  { icon: <Store size={24} />, title: "Commercial Outlets", desc: "Dynamic retail spaces designed to engage and convert.", link: "/services" },
  { icon: <Monitor size={24} />, title: "Kiosks", desc: "Functional and eye-catching modular display solutions.", link: "/services" },
];

// 3 best landscape/wide images for the hero carousel (1600×1200 — highest res, widest)
const heroBannerImages = [
  "/dpeipics/WhatsApp Image 2026-02-23 at 11.58.25.jpeg",
  "/dpeipics/WhatsApp Image 2026-02-23 at 11.58.31 (1).jpeg",
  "/dpeipics/WhatsApp Image 2026-02-23 at 11.58.35.jpeg",
];

// All 43 images for the gallery
const allImages = [
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

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { stiffness: 40, damping: 20 });
  const displayValue = useTransform(spring, (latest) => Math.floor(latest));
  const [current, setCurrent] = React.useState(0);

  useEffect(() => {
    if (isInView) spring.set(value);
  }, [isInView, value, spring]);

  useEffect(() => {
    return displayValue.on("change", (latest) => setCurrent(latest));
  }, [displayValue]);

  return (
    <motion.span ref={ref} className="tabular-nums">
      {current}
      <span className="text-brand-gold ml-1">{suffix}</span>
    </motion.span>
  );
}

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);

  const openGallery = (i: number) => setGalleryIndex(i);
  const closeGallery = () => setGalleryIndex(null);
  const prevGallery = () => setGalleryIndex(i => i !== null ? (i - 1 + allImages.length) % allImages.length : null);
  const nextGallery = () => setGalleryIndex(i => i !== null ? (i + 1) % allImages.length : null);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide(prev => (prev + 1) % heroBannerImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-brand-gold selection:text-brand-ink">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Carousel background */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={currentSlide}
              custom={direction}
              variants={{
                enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
                center: { x: 0, opacity: 1 },
                exit: (d: number) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              src={heroBannerImages[currentSlide]}
              alt="DEE PIESS Interior Design"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </AnimatePresence>
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#0A0A0A]" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-brand-gold text-[10px] sm:text-xs uppercase tracking-[0.4em] font-bold mb-6"
          >
            Interior Architecture & Design
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-8xl font-serif font-bold tracking-tighter mb-8 leading-[1.1] sm:leading-[0.9]"
          >
            Crafting Spaces <br className="hidden sm:block" /> That{' '}
            <span className="italic font-light text-white/60">Inspire.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white/60 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed"
          >
            Specializing in luxury hotels, bespoke residences, and high-performance corporate environments across India.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="#gallery" className="bg-white text-black px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-brand-gold transition-all group text-sm sm:text-base">
              View Our Work <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#contact" className="border border-white/30 px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all text-sm sm:text-base">
              Start a Project
            </a>
          </motion.div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
          {heroBannerImages.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`transition-all duration-500 rounded-full ${
                i === currentSlide
                  ? 'w-8 h-2 bg-brand-gold'
                  : 'w-2 h-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 right-8 flex flex-col items-center gap-2 opacity-30 rotate-0">
          <span className="text-[9px] uppercase tracking-widest font-bold" style={{ writingMode: 'vertical-rl' }}>Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 sm:py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <h2 className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-brand-gold font-bold mb-4">Our Work</h2>
            <h3 className="text-3xl sm:text-5xl font-serif font-bold leading-tight">
              Monastery Hotel,{' '}
              <span className="italic font-light text-white/50">Hyderabad.</span>
            </h3>
            <p className="text-white/40 mt-4 text-sm sm:text-base max-w-xl">
              Complete interior architecture — from grand lobby to bespoke guest suites.
            </p>
          </div>
          <div className="flex items-center gap-2 text-white/25 shrink-0">
            <Images size={16} />
            <span className="text-xs uppercase tracking-widest font-bold">{allImages.length} Photos</span>
          </div>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[180px] sm:auto-rows-[220px] gap-3 sm:gap-4">
          {allImages.map((src, i) => {
            const isWide = i === 0 || i === 8 || i === 16 || i === 24 || i === 32 || i === 40;
            const isTall = i === 4 || i === 12 || i === 20 || i === 28 || i === 36;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: (i % 8) * 0.05, duration: 0.45 }}
                onClick={() => openGallery(i)}
                className={`relative overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer group
                  ${isWide ? 'col-span-2' : ''}
                  ${isTall ? 'row-span-2' : ''}
                `}
              >
                <img
                  src={src}
                  alt={`DEE PIESS — Monastery Hotel ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/45 transition-all duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center">
                    <Images size={15} className="text-white" />
                  </div>
                </div>
                <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[8px] uppercase tracking-widest font-bold text-white/80 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full">
                    {i + 1}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {galleryIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 bg-black/96 flex items-center justify-center"
            onClick={closeGallery}
          >
            <button
              onClick={closeGallery}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <X size={20} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prevGallery(); }}
              className="absolute left-3 sm:left-6 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextGallery(); }}
              className="absolute right-3 sm:right-6 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <ChevronRight size={22} />
            </button>

            <AnimatePresence mode="wait">
              <motion.img
                key={galleryIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.18 }}
                src={allImages[galleryIndex]}
                alt={`DEE PIESS — Monastery Hotel ${galleryIndex + 1}`}
                className="max-h-[80vh] max-w-[85vw] object-contain rounded-xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </AnimatePresence>

            {/* Thumbnail strip */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 overflow-x-auto max-w-[90vw] px-3 py-1">
              {allImages.map((src, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setGalleryIndex(i); }}
                  className={`shrink-0 w-10 h-10 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    i === galleryIndex
                      ? 'border-brand-gold scale-110 opacity-100'
                      : 'border-transparent opacity-40 hover:opacity-75'
                  }`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <div className="absolute bottom-[72px] left-1/2 -translate-x-1/2">
              <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">
                {galleryIndex + 1} / {allImages.length}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Services Section */}
      <section id="services" className="py-20 sm:py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
          <div className="lg:col-span-1">
            <h2 className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-brand-gold font-bold mb-6">Our Expertise</h2>
            <h3 className="text-3xl sm:text-4xl font-serif font-bold mb-8 leading-tight">Comprehensive Design Solutions.</h3>
            <p className="text-white/40 leading-relaxed mb-12 text-sm sm:text-base">
              From initial concept to final handover, we provide end-to-end interior design services. Our approach integrates architectural integrity with aesthetic excellence, ensuring every square foot serves a purpose.
            </p>
            <div className="space-y-4 mb-12">
              {["Conceptual Planning", "Material Curation", "Project Management"].map((item) => (
                <div key={item} className="flex items-center gap-3 text-xs uppercase tracking-widest text-white/60">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                  {item}
                </div>
              ))}
            </div>
            <Link to="/services" className="inline-flex gap-4 group">
              <div className="w-12 h-px bg-white/20 self-center group-hover:bg-brand-gold transition-colors" />
              <span className="text-[10px] uppercase tracking-widest font-bold text-white/40 group-hover:text-white transition-colors">View Detailed Services</span>
            </Link>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white/5 border border-white/5 p-6 sm:p-8 rounded-2xl sm:rounded-3xl hover:bg-white/10 transition-all group"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-gold group-hover:text-black transition-colors">
                  {s.icon}
                </div>
                <h4 className="text-lg sm:text-xl font-serif font-bold mb-3">{s.title}</h4>
                <p className="text-white/40 text-xs sm:text-sm leading-relaxed mb-6">{s.desc}</p>
                <Link to={s.link} className="text-[10px] uppercase tracking-widest font-bold text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity">Explore Expertise</Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 sm:py-32 px-6 bg-[#0F0F0F]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-brand-gold font-bold mb-6">How We Work</h2>
            <h3 className="text-3xl sm:text-5xl font-serif font-bold leading-tight">A Meticulous Journey <br /> From Concept to Reality.</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Consultation", desc: "We begin by understanding your vision, lifestyle, and functional requirements through in-depth discussions." },
              { step: "02", title: "Conceptualization", desc: "Our designers create detailed 2D layouts and 3D visualizations to bring your ideas to life before execution." },
              { step: "03", title: "Material Selection", desc: "We curate the finest materials, from Italian marbles to bespoke hardware, ensuring durability and luxury." },
              { step: "04", title: "Execution", desc: "Our skilled craftsmen and project managers ensure every detail is executed to perfection, on time and within budget." }
            ].map((p, i) => (
              <div key={i} className="relative p-8 bg-white/5 rounded-3xl border border-white/5 hover:border-brand-gold/30 transition-all group">
                <span className="text-5xl font-serif italic text-white/10 group-hover:text-brand-gold/20 transition-colors absolute top-4 right-8">{p.step}</span>
                <h4 className="text-xl font-serif font-bold mb-4 mt-4">{p.title}</h4>
                <p className="text-white/40 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 sm:py-28 px-6 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-20">
            {[
              { label: "Years of Experience", value: "15", suffix: "+" },
              { label: "Projects Delivered", value: "250", suffix: "+" },
              { label: "Client Satisfaction", value: "100", suffix: "%" },
              { label: "Premium Partners", value: "50", suffix: "+" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="text-4xl sm:text-6xl font-serif font-bold mb-4 flex items-center justify-center text-white group-hover:text-brand-gold transition-colors">
                  <Counter value={parseInt(stat.value)} suffix={stat.suffix} />
                </div>
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-bold text-white/30 group-hover:text-white/60 transition-colors">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 sm:py-32 bg-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative aspect-square rounded-2xl sm:rounded-3xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000"
              alt="Founder"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 bg-black/80 backdrop-blur-xl p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-white/10">
              <p className="text-brand-gold text-[8px] sm:text-[10px] uppercase tracking-widest font-bold mb-1">Founder</p>
              <p className="text-lg sm:text-xl font-serif font-bold">{COMPANY_DETAILS.founder}</p>
            </div>
          </div>
          <div>
            <h2 className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-brand-gold font-bold mb-6">The Visionary</h2>
            <h3 className="text-3xl sm:text-5xl font-serif font-bold mb-8 leading-tight">Legacy of Excellence.</h3>
            <div className="space-y-6 text-white/50 leading-relaxed text-base sm:text-lg">
              <p>
                Under the leadership of {COMPANY_DETAILS.founder}, DEE PIESS has grown into a premier interior architecture firm known for its meticulous attention to detail and uncompromising quality. We specialize in creating environments that are not only aesthetically stunning but also functionally superior.
              </p>
              <p>
                Our philosophy is simple: we don't just design spaces; we create environments that enhance the lives of those who inhabit them. By integrating cutting-edge technology with traditional craftsmanship, we deliver projects that stand the test of time.
              </p>
              <p className="italic text-brand-gold/80">
                "Design is not just what it looks like and feels like. Design is how it works."
              </p>
            </div>
            <div className="mt-12 flex flex-col sm:flex-row gap-8">
              <Link to="/about" className="bg-white text-black px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-brand-gold transition-all text-sm sm:text-base">
                Read Our Story <ArrowRight size={18} />
              </Link>
              <div className="flex gap-8">
                <div>
                  <p className="text-2xl sm:text-3xl font-serif font-bold mb-1">15+</p>
                  <p className="text-[8px] sm:text-[10px] uppercase tracking-widest text-white/30 font-bold">Years Experience</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-serif font-bold mb-1">500+</p>
                  <p className="text-[8px] sm:text-[10px] uppercase tracking-widest text-white/30 font-bold">Projects Delivered</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 sm:py-32 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="bg-white text-black rounded-4xl sm:rounded-5xl p-8 sm:p-12 md:p-20 overflow-hidden relative">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <h2 className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-black/40 font-bold mb-6">Contact Us</h2>
              <h3 className="text-3xl sm:text-5xl font-serif font-bold mb-8 sm:mb-12 leading-tight">Let's Discuss Your Next Project.</h3>
              <div className="space-y-6 sm:space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-black/5 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-[8px] sm:text-[10px] uppercase tracking-widest font-bold text-black/40 mb-1">Office</p>
                    <p className="font-medium text-sm sm:text-base">{COMPANY_DETAILS.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-black/5 rounded-xl flex items-center justify-center shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-[8px] sm:text-[10px] uppercase tracking-widest font-bold text-black/40 mb-1">Phone</p>
                    <p className="font-medium text-sm sm:text-base">{COMPANY_DETAILS.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-black/5 rounded-xl flex items-center justify-center shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-[8px] sm:text-[10px] uppercase tracking-widest font-bold text-black/40 mb-1">Email</p>
                    <p className="font-medium text-sm sm:text-base">{COMPANY_DETAILS.email}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-black/5 p-6 sm:p-8 rounded-3xl sm:rounded-4xl">
              <form className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <label className="text-[8px] sm:text-[10px] uppercase tracking-widest font-bold text-black/40 ml-1">Name</label>
                    <input type="text" className="w-full bg-white border border-black/5 rounded-xl px-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 transition-all" placeholder="Your Name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[8px] sm:text-[10px] uppercase tracking-widest font-bold text-black/40 ml-1">Email</label>
                    <input type="email" className="w-full bg-white border border-black/5 rounded-xl px-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 transition-all" placeholder="your@email.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[8px] sm:text-[10px] uppercase tracking-widest font-bold text-black/40 ml-1">Project Type</label>
                  <select className="w-full bg-white border border-black/5 rounded-xl px-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 transition-all appearance-none">
                    <option>Residential</option>
                    <option>Commercial</option>
                    <option>Hotel</option>
                    <option>Office</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[8px] sm:text-[10px] uppercase tracking-widest font-bold text-black/40 ml-1">Message</label>
                  <textarea rows={4} className="w-full bg-white border border-black/5 rounded-xl px-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 transition-all resize-none" placeholder="Tell us about your project..."></textarea>
                </div>
                <button className="w-full bg-black text-white py-3.5 sm:py-4 rounded-xl font-bold hover:bg-brand-gold hover:text-black transition-all active:scale-[0.98] text-sm sm:text-base">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
