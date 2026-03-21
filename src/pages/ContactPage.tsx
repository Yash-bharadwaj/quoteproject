import React, { useState } from "react";
import { motion } from "motion/react";
import { MapPin, Phone, Mail, MessageCircle, Instagram, Send, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { COMPANY_DETAILS } from "../constants";

const projectTypes = [
  "Hotels & Hospitality",
  "Residence / Home",
  "Corporate Office",
  "Commercial / Retail",
  "Restaurant / Cafe",
  "Other",
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", project: projectTypes[0], message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = [
      "*Contact — website form*",
      form.name.trim() && `Name: ${form.name.trim()}`,
      form.email.trim() && `Email: ${form.email.trim()}`,
      `Project: ${form.project}`,
      form.message.trim() && `Message:\n${form.message.trim()}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(`https://wa.me/${COMPANY_DETAILS.phoneWhatsappWa}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const contactItems = [
    {
      label: "Office",
      value: COMPANY_DETAILS.address,
      href: undefined as string | undefined,
      icon: MapPin,
    },
    {
      label: "WhatsApp",
      value: COMPANY_DETAILS.phoneWhatsappDisplay,
      href: `https://wa.me/${COMPANY_DETAILS.phoneWhatsappWa}`,
      icon: MessageCircle,
    },
    {
      label: "Phone",
      value: COMPANY_DETAILS.phoneSecondaryDisplay,
      href: `tel:${COMPANY_DETAILS.phoneSecondaryTel}`,
      icon: Phone,
    },
    {
      label: "Email",
      value: COMPANY_DETAILS.email,
      href: `mailto:${COMPANY_DETAILS.email}`,
      icon: Mail,
    },
    {
      label: "Instagram",
      value: "@deepiess.interiors",
      href: COMPANY_DETAILS.instagramUrl,
      icon: Instagram,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-brand-gold selection:text-brand-ink">
      <Navbar />

      <main className="pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-12 sm:mb-16"
          >
            <p className="text-brand-gold text-[10px] sm:text-xs uppercase tracking-[0.35em] font-bold mb-4">Contact</p>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight leading-[1.1] mb-4">
              Let&apos;s discuss your project.
            </h1>
            <p className="text-white/50 text-base sm:text-lg max-w-xl leading-relaxed">
              Share a brief — we&apos;ll reply on WhatsApp or email. For site visits and quotes, leave your details below.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="lg:col-span-5 space-y-4"
            >
              {contactItems.map((item, i) => {
                const Icon = item.icon;
                const inner = (
                  <div className="flex gap-4 p-5 sm:p-6 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-brand-gold/25 hover:bg-white/[0.05] transition-colors">
                    <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                      <Icon className="text-brand-gold" size={20} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/35 mb-1">{item.label}</p>
                      <p className="text-sm sm:text-base text-white/90 leading-snug break-words">{item.value}</p>
                    </div>
                  </div>
                );
                return item.href ? (
                  <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined} className="block">
                    {inner}
                  </a>
                ) : (
                  <div key={item.label}>{inner}</div>
                );
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.12 }}
              className="lg:col-span-7"
            >
              <div className="bg-white text-black rounded-3xl sm:rounded-[2rem] p-6 sm:p-10 md:p-12 shadow-2xl shadow-black/40">
                <h2 className="text-xl sm:text-2xl font-serif font-bold mb-2">Send a message</h2>
                <p className="text-black/45 text-sm mb-8">We&apos;ll open WhatsApp with your message so you can send it in one tap.</p>
                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-black/40 ml-0.5">Name</label>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black/20 transition-all"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-black/40 ml-0.5">Email</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black/20 transition-all"
                        placeholder="you@email.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-black/40 ml-0.5">Project type</label>
                    <select
                      value={form.project}
                      onChange={(e) => setForm((f) => ({ ...f, project: e.target.value }))}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black/20 transition-all appearance-none"
                    >
                      {projectTypes.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-black/40 ml-0.5">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black/20 transition-all resize-none"
                      placeholder="Tell us about your space, timeline, and location…"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-brand-gold hover:text-black transition-all active:scale-[0.98]"
                  >
                    <Send size={18} />
                    Continue on WhatsApp
                  </button>
                </form>
              </div>

              <Link
                to="/"
                className="inline-flex items-center gap-2 mt-8 text-sm text-white/45 hover:text-brand-gold transition-colors"
              >
                <ArrowRight size={16} className="rotate-180" />
                Back to home
              </Link>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
