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
  Images,
  Award,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { COMPANY_DETAILS } from '../constants';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sparkles from '../components/Sparkles';
import { portfolioProjects, totalPortfolioPhotos, heroMonasterySlides } from '../data/portfolioProjects';

const expertiseServices = [
  { icon: <Hotel size={28} />, title: "Hotels & Hospitality", desc: "Luxury interiors that define guest experiences.", points: ["Lobbies & reception", "Guest suites", "Dining & wellness spaces"], link: "/services" },
  { icon: <Home size={28} />, title: "Residences", desc: "Bespoke homes that reflect your lifestyle.", points: ["Custom furniture", "Kitchen & wardrobes", "Smart home integration"], link: "/services" },
  { icon: <Building2 size={28} />, title: "Corporate Offices", desc: "Workspaces that boost productivity and brand.", points: ["Executive suites", "Collaboration zones", "Ergonomic planning"], link: "/services" },
  { icon: <Store size={28} />, title: "Commercial & Retail", desc: "Spaces that engage customers and drive sales.", points: ["Showrooms", "Visual merchandising", "Customer flow planning"], link: "/services" },
  { icon: <Monitor size={28} />, title: "Kiosks & Modular", desc: "Flexible, high-impact display solutions.", points: ["Exhibition stalls", "Mall kiosks", "Pop-up units"], link: "/services" },
];

// 3 best landscape/wide images for the hero carousel — from Monastery folder
const heroBannerImages =
  heroMonasterySlides.length >= 3
    ? heroMonasterySlides
    : [
        "/dpeipics/monastery/" + encodeURIComponent("WhatsApp Image 2026-02-23 at 11.58.25.jpeg"),
        "/dpeipics/monastery/" + encodeURIComponent("WhatsApp Image 2026-02-23 at 11.58.31 (1).jpeg"),
        "/dpeipics/monastery/" + encodeURIComponent("WhatsApp Image 2026-02-23 at 11.58.35.jpeg"),
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

type GalleryState = { projectId: string; index: number };

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [gallery, setGallery] = useState<GalleryState | null>(null);
  const [showInquiryPopup, setShowInquiryPopup] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({ name: "", project: "", message: "" });
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const galleryProject = gallery
    ? portfolioProjects.find((p) => p.id === gallery.projectId) ?? null
    : null;
  const galleryImages = galleryProject?.images ?? [];

  const openGallery = (projectId: string, imageIndex = 0) =>
    setGallery({ projectId, index: imageIndex });
  const closeGallery = () => setGallery(null);
  const prevGallery = () => {
    setGallery((g) => {
      if (!g) return null;
      const proj = portfolioProjects.find((p) => p.id === g.projectId);
      if (!proj) return null;
      const next = g.index > 0 ? g.index - 1 : proj.images.length - 1;
      return { projectId: g.projectId, index: next };
    });
  };
  const nextGallery = () => {
    setGallery((g) => {
      if (!g) return null;
      const proj = portfolioProjects.find((p) => p.id === g.projectId);
      if (!proj) return null;
      const next = g.index < proj.images.length - 1 ? g.index + 1 : 0;
      return { projectId: g.projectId, index: next };
    });
  };

  useEffect(() => {
    if (!gallery) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setGallery(null);
      if (e.key === "ArrowLeft") {
        setGallery((g) => {
          if (!g) return null;
          const proj = portfolioProjects.find((p) => p.id === g.projectId);
          if (!proj) return null;
          const next = g.index > 0 ? g.index - 1 : proj.images.length - 1;
          return { projectId: g.projectId, index: next };
        });
      }
      if (e.key === "ArrowRight") {
        setGallery((g) => {
          if (!g) return null;
          const proj = portfolioProjects.find((p) => p.id === g.projectId);
          if (!proj) return null;
          const next = g.index < proj.images.length - 1 ? g.index + 1 : 0;
          return { projectId: g.projectId, index: next };
        });
      }
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [gallery]);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide(prev => (prev + 1) % heroBannerImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("dpei-inquiry-seen") === "1") return;
    const t = setTimeout(() => setShowInquiryPopup(true), 10000);
    return () => clearTimeout(t);
  }, []);

  const closeInquiryPopup = () => {
    setShowInquiryPopup(false);
    sessionStorage.setItem("dpei-inquiry-seen", "1");
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, project, message } = inquiryForm;
    const text = [
      "Hi, I'd like to discuss a project.",
      name.trim() && `Name: ${name.trim()}`,
      project && `Project: ${project}`,
      message.trim() && message.trim(),
    ].filter(Boolean).join("\n");
    window.open(`https://wa.me/${COMPANY_DETAILS.phoneWhatsappWa}?text=${encodeURIComponent(text)}`, "_blank");
    setInquiryForm({ name: "", project: "", message: "" });
    closeInquiryPopup();
  };

  const projectOptions = [
    "Hotels & Hospitality",
    "Residence / Home",
    "Corporate Office",
    "Commercial / Retail",
    "Kiosk / Modular",
    "Villa",
    "Apartment",
    "Restaurant / Cafe",
    "Showroom",
    "Other",
  ];

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
              alt="DEE PIESS — Interior Contractor"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </AnimatePresence>
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#0A0A0A]" />
        </div>
        <Sparkles />

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-brand-gold text-[10px] sm:text-xs uppercase tracking-[0.4em] font-bold mb-6"
          >
            Interior Contractor
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
            Specializing in luxury hotel interiors, bespoke homes, corporate offices, and commercial fit-outs across India — from planning and materials to on-site execution and handover.
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

      {/* Stats Section */}
      <section className="py-20 sm:py-28 px-6 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-20">
            {[
              { label: "Years of Experience", value: "15", suffix: "+" },
              { label: "Projects Delivered", value: "500", suffix: "+" },
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

      {/* Our Expertise — redesigned for clarity & mobile UX */}
      <section id="services" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="mb-12 sm:mb-16 md:mb-20">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-brand-gold font-bold mb-3 sm:mb-4">Our Expertise</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight mb-4 sm:mb-6 max-w-3xl">
            What We Provide.
          </h2>
          <p className="text-white/50 text-base sm:text-lg max-w-2xl leading-relaxed mb-8 sm:mb-10">
            End-to-end interior contracting: from planning and material selection through site execution to handover. We deliver <strong className="text-white/70">hotels, homes, offices, retail spaces, and modular kiosks</strong>—with planning, material sourcing, skilled workmanship, and project management.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 sm:gap-y-3 text-[11px] sm:text-xs uppercase tracking-widest text-white/50">
            {["Planning & coordination", "Material sourcing", "On-site project management"].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {expertiseServices.map((s, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-24px" }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className="group flex flex-col bg-white/[0.06] border border-white/[0.08] rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-7 hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-3 mb-4 sm:mb-5">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/10 flex items-center justify-center text-white group-hover:bg-brand-gold group-hover:text-black transition-colors duration-300 shrink-0">
                  {s.icon}
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-white/30 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-white mb-2 sm:mb-3 leading-tight">{s.title}</h3>
              <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-4 sm:mb-5 flex-grow">{s.desc}</p>
              <ul className="space-y-2 sm:space-y-2.5 mb-5 sm:mb-6" aria-label={`${s.title} — key areas`}>
                {s.points.map((point, j) => (
                  <li key={j} className="flex items-center gap-2.5 text-white/60 text-xs sm:text-sm">
                    <span className="w-1 h-1 rounded-full bg-brand-gold/80 shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
              <Link
                to={s.link}
                className="inline-flex items-center gap-2 min-h-[44px] sm:min-h-0 py-2.5 text-[10px] sm:text-xs uppercase tracking-widest font-bold text-brand-gold hover:text-white transition-colors"
              >
                Learn more <ArrowRight size={14} className="shrink-0" />
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 sm:mt-16 text-center">
          <Link
            to="/services"
            className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 sm:px-8 py-3 rounded-full border border-white/20 font-bold text-sm sm:text-base hover:bg-white hover:text-black hover:border-white transition-all"
          >
            View all services <ArrowRight size={18} className="shrink-0" />
          </Link>
        </div>
      </section>

      {/* About Section - The Visionary (same as About page) */}
      <section id="about" className="py-20 sm:py-28 bg-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
              He believes every space has a soul. His job is to find it and bring it to life through solid planning, the right materials, and strict attention to detail on site. No shortcuts, no compromise on finish — that's the standard he has set for the firm and for everyone who works with him.
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
              "We deliver complete interiors — places people want to live and work in."
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

            <div className="mt-10">
              <Link to="/about" className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-brand-gold transition-all text-sm sm:text-base">
                Read Our Story <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section - Our Work */}
      <section id="gallery" className="py-20 sm:py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-16">
          <div className="relative inline-block">
            <motion.h2
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-white relative z-0"
            >
              Our Work
              <motion.span
                className="block h-0.5 sm:h-1 bg-brand-gold mt-2 origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
              />
            </motion.h2>
            <div
              className="absolute -bottom-2 left-0 right-0 h-14 pointer-events-none z-[-1]"
              style={{
                background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(197,160,89,0.12), transparent 70%)',
                filter: 'blur(10px)',
              }}
              aria-hidden
            />
          </div>
          <div className="flex items-center gap-2 text-white/25 shrink-0">
            <Images size={16} />
            <span className="text-xs uppercase tracking-widest font-bold">{totalPortfolioPhotos} photos · {portfolioProjects.length} projects</span>
          </div>
        </div>

        <p className="text-white/45 text-sm max-w-2xl mb-10 sm:mb-12 leading-relaxed">
          Hotels, restaurants, and interior fit-outs across Hyderabad — tap a project to browse its gallery. Swipe left or right on the image on mobile.
        </p>

        {/* Project cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
          {portfolioProjects.map((project, pIdx) => {
            const cover = project.images[project.coverIndex] ?? project.images[0];
            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: pIdx * 0.06, duration: 0.45 }}
                className="group relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] shadow-xl cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60"
                tabIndex={0}
                role="button"
                onClick={() => openGallery(project.id, 0)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openGallery(project.id, 0);
                  }
                }}
              >
                <div className="relative w-full overflow-hidden bg-black/30 h-[260px] sm:h-[300px] md:h-[340px] lg:h-[400px] xl:h-[420px]">
                  <img
                    src={cover}
                    alt=""
                    className="absolute inset-0 block h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 sm:opacity-80 group-hover:opacity-95 transition-opacity" />
                  <div className="absolute inset-0 z-[2] flex flex-col justify-end p-5 sm:p-6">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-gold mb-2">
                      {project.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-white leading-tight mb-1">
                      {project.title}
                    </h3>
                    <p className="text-sm text-white/70 leading-snug line-clamp-2">{project.subtitle}</p>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <span className="text-[11px] uppercase tracking-widest font-bold text-white/50">
                        {project.images.length} photos
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-white bg-white/10 px-3 py-2 rounded-full border border-white/10 group-hover:bg-brand-gold group-hover:text-black group-hover:border-brand-gold transition-colors">
                        <Images size={14} />
                        View
                      </span>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* Lightbox — project-scoped */}
      <AnimatePresence>
        {gallery && galleryProject && galleryImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 bg-black/96 flex flex-col items-center justify-center cursor-pointer"
            onClick={closeGallery}
            role="dialog"
            aria-modal="true"
            aria-label={galleryProject.title}
          >
            <button
              type="button"
              onClick={closeGallery}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-60 w-11 h-11 min-w-[44px] min-h-[44px] bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              aria-label="Close gallery"
            >
              <X size={22} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prevGallery();
              }}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-60 w-11 h-11 min-w-[44px] min-h-[44px] bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              aria-label="Previous photo"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextGallery();
              }}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-60 w-11 h-11 min-w-[44px] min-h-[44px] bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              aria-label="Next photo"
            >
              <ChevronRight size={24} />
            </button>

            <div
              className="flex-1 flex flex-col items-center justify-center w-full min-h-0 px-4 pt-14 pb-2 sm:pt-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-3 sm:mb-4 px-4 shrink-0">
                <p className="text-brand-gold text-[10px] sm:text-xs uppercase tracking-[0.25em] font-bold">
                  {galleryProject.category}
                </p>
                <p className="text-white font-serif font-bold text-lg sm:text-xl mt-1">{galleryProject.title}</p>
                <p className="text-white/50 text-xs sm:text-sm mt-0.5">{galleryProject.subtitle}</p>
              </div>
              <AnimatePresence mode="wait">
                <motion.img
                  key={`${gallery.projectId}-${gallery.index}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                  src={galleryImages[gallery.index]}
                  alt={`${galleryProject.title} — ${gallery.index + 1}`}
                  className="max-h-[min(58vh,520px)] sm:max-h-[min(72vh,680px)] w-auto max-w-[min(100%,92vw)] object-contain rounded-lg shadow-2xl cursor-default select-none"
                  draggable={false}
                  onTouchStart={(e) => {
                    touchStart.current = {
                      x: e.touches[0].clientX,
                      y: e.touches[0].clientY,
                    };
                  }}
                  onTouchEnd={(e) => {
                    if (!touchStart.current) return;
                    const dx = e.changedTouches[0].clientX - touchStart.current.x;
                    const dy = e.changedTouches[0].clientY - touchStart.current.y;
                    touchStart.current = null;
                    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
                    if (dx > 0) prevGallery();
                    else nextGallery();
                  }}
                  role="presentation"
                />
              </AnimatePresence>
            </div>

            <div
              className="w-full shrink-0 px-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 flex flex-col items-center gap-2 bg-gradient-to-t from-black/80 to-transparent"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-white/50 text-[11px] font-bold uppercase tracking-widest">
                {gallery.index + 1} / {galleryImages.length}
              </span>
              <div className="flex gap-2 overflow-x-auto max-w-full px-2 py-1.5 pb-1 snap-x snap-mandatory [scrollbar-width:thin]">
                {galleryImages.map((src, i) => (
                  <button
                    key={src + i}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setGallery({ projectId: gallery.projectId, index: i });
                    }}
                    className={`min-w-[52px] w-[52px] h-[52px] sm:min-w-[48px] sm:w-12 sm:h-12 rounded-xl overflow-hidden border-2 shrink-0 snap-center transition-all duration-200 ${
                      i === gallery.index
                        ? "border-brand-gold scale-105 opacity-100 ring-2 ring-brand-gold/30"
                        : "border-white/20 opacity-55 hover:opacity-90"
                    }`}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Process Section */}
      <section className="py-20 sm:py-32 px-6 bg-[#0F0F0F]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 relative">
            <h2 className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-brand-gold font-bold mb-6">How We Work</h2>
            <h3 className="text-3xl sm:text-5xl font-serif font-bold leading-tight relative z-0">From Idea to Finished Space.</h3>
            <div
              className="absolute left-1/2 -translate-x-1/2 -bottom-4 w-full max-w-xl h-20 pointer-events-none z-[-1]"
              style={{
                background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(197,160,89,0.1), transparent 70%)',
                filter: 'blur(12px)',
              }}
              aria-hidden
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Consultation", desc: "We begin by understanding your vision, lifestyle, and functional requirements through in-depth discussions." },
              { step: "02", title: "Planning & drawings", desc: "Our team prepares detailed 2D layouts and 3D views so you can approve the look and scope before work begins on site." },
              { step: "03", title: "Materials", desc: "We source and procure materials — from marbles to bespoke hardware — matched to your budget, timeline, and finish quality." },
              { step: "04", title: "Site execution", desc: "Our skilled site teams and project managers carry out the interior work on site to agreed quality, on time and within budget." }
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
                  <div className="space-y-2">
                    <p className="text-[8px] sm:text-[10px] uppercase tracking-widest font-bold text-black/40 mb-1">Phone</p>
                    <a
                      href={`https://wa.me/${COMPANY_DETAILS.phoneWhatsappWa}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-sm sm:text-base hover:underline block"
                    >
                      WhatsApp {COMPANY_DETAILS.phoneWhatsappDisplay}
                    </a>
                    <a href={`tel:${COMPANY_DETAILS.phoneSecondaryTel}`} className="font-medium text-sm sm:text-base hover:underline block">
                      {COMPANY_DETAILS.phoneSecondaryDisplay}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-black/5 rounded-xl flex items-center justify-center shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-[8px] sm:text-[10px] uppercase tracking-widest font-bold text-black/40 mb-1">Email</p>
                    <a href={`mailto:${COMPANY_DETAILS.email}`} className="font-medium text-sm sm:text-base hover:underline block">{COMPANY_DETAILS.email}</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-black/5 p-6 sm:p-8 rounded-3xl sm:rounded-4xl">
              <form className="space-y-4 sm:space-y-6" onSubmit={(e) => e.preventDefault()}>
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

      {/* Inquiry popup — appears after 10s, sends to WhatsApp */}
      <AnimatePresence>
        {showInquiryPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={closeInquiryPopup}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-5 pt-5 pb-4 border-b border-white/10">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-serif font-bold text-white tracking-tight">
                    Quick inquiry
                    <motion.span
                      className="block h-0.5 bg-brand-gold mt-1.5 origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    />
                  </h3>
                  <button
                    type="button"
                    onClick={closeInquiryPopup}
                    className="p-1.5 text-white/50 hover:text-white rounded-lg transition-colors shrink-0"
                    aria-label="Close"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
              <form onSubmit={handleInquirySubmit} className="p-5 space-y-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/50 font-bold mb-1.5">Name</label>
                  <input
                    type="text"
                    value={inquiryForm.name}
                    onChange={(e) => setInquiryForm((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Your name"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/50 font-bold mb-1.5">Project type</label>
                  <select
                    value={inquiryForm.project}
                    onChange={(e) => setInquiryForm((p) => ({ ...p, project: e.target.value }))}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold appearance-none cursor-pointer [&>option]:bg-[#0A0A0A] [&>option]:text-white"
                  >
                    <option value="">Select project type</option>
                    {projectOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/50 font-bold mb-1.5">Message <span className="text-white/30 font-normal normal-case">(optional)</span></label>
                  <select
                    value={inquiryForm.message}
                    onChange={(e) => setInquiryForm((p) => ({ ...p, message: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold appearance-none cursor-pointer [&>option]:bg-[#0A0A0A] [&>option]:text-white"
                  >
                    <option value="">—</option>
                    <option value="Need a quote">Need a quote</option>
                    <option value="Schedule site visit">Schedule site visit</option>
                    <option value="Discuss budget & timeline">Discuss budget & timeline</option>
                    <option value="General inquiry">General inquiry</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  Send via WhatsApp
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
