import React, { useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'motion/react';
import { 
  ArrowRight, 
  Hotel, 
  Home, 
  Building2, 
  Store, 
  Monitor, 
  Phone, 
  Mail, 
  MapPin
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

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { stiffness: 40, damping: 20 });
  const displayValue = useTransform(spring, (latest) => Math.floor(latest));
  const [current, setCurrent] = React.useState(0);

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  useEffect(() => {
    return displayValue.on("change", (latest) => {
      setCurrent(latest);
    });
  }, [displayValue]);

  return (
    <motion.span ref={ref} className="tabular-nums">
      {current}
      <span className="text-brand-gold ml-1">{suffix}</span>
    </motion.span>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-brand-gold selection:text-brand-ink">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000" 
            alt="Interior Design" 
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#0A0A0A]" />
        </div>

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
            Crafting Spaces <br className="hidden sm:block" /> That <span className="italic font-light text-white/60">Inspire.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white/50 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed"
          >
            Specializing in luxury hotels, bespoke residences, and high-performance corporate environments across India.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/services" className="bg-white text-black px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-brand-gold transition-all group text-sm sm:text-base">
              Explore Our Work <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="#contact" className="border border-white/20 px-8 py-4 rounded-full font-bold hover:bg-white/5 transition-all text-sm sm:text-base">
              Start a Project
            </a>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
          <span className="text-[10px] uppercase tracking-widest font-bold">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

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
              <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-white/60">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                Conceptual Planning
              </div>
              <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-white/60">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                Material Curation
              </div>
              <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-white/60">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                Project Management
              </div>
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
      <section className="py-20 sm:py-32 px-6 border-y border-white/5">
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
        <div className="bg-white text-black rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 md:p-20 overflow-hidden relative">
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
            <div className="bg-black/5 p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem]">
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
