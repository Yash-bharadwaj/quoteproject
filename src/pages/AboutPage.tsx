import React from 'react';
import { motion } from 'motion/react';
import { COMPANY_DETAILS } from '../constants';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Award, Users, History, Globe } from 'lucide-react';

export default function AboutPage() {
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
      <section className="py-20 sm:py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-20">
          <h2 className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-brand-gold font-bold mb-6">Masterpiece</h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold">Monastery Hotel, Hyderabad</h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          <div className="lg:col-span-7 rounded-2xl sm:rounded-[3rem] overflow-hidden aspect-video relative group">
            <img 
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200" 
              alt="Monastery Hotel" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
          </div>
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            <div className="bg-white/5 p-8 sm:p-10 rounded-2xl sm:rounded-[2.5rem] border border-white/10">
              <p className="text-brand-gold text-[8px] sm:text-[10px] uppercase tracking-widest font-bold mb-4">Project Highlight</p>
              <h4 className="text-xl sm:text-2xl font-serif font-bold mb-6">Complete Interior Architecture</h4>
              <p className="text-white/40 text-sm sm:text-base leading-relaxed mb-8">
                Our most ambitious project to date, the Monastery Hotel in Hyderabad, showcases our ability to blend traditional spiritual aesthetics with modern luxury. We handled the complete interior design, from the grand lobby to the bespoke guest suites.
              </p>
              <ul className="space-y-3 text-xs sm:text-sm text-white/60">
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
                  Bespoke Furniture Design
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
                  Custom Lighting Solutions
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
                  Premium Material Sourcing
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

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
