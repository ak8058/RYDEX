"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa6";
import axios from "axios";

// 1. Social links ka array with different URLs
const SOCIAL_LINKS = [
  { Icon: FaFacebook, href: "/" },
  { Icon: FaInstagram, href: "/" },
  { Icon: FaTwitter, href: "/" },
  { Icon: FaLinkedin, href: "/" },
];

const FOOTER_LINKS = [
  {
    title: "Company",
    links: ["About Us", "Careers", "Press", "Blog"],
  },
  {
    title: "Support",
    links: [
      "Help Center",
      "Safety Guidelines",
      "Terms of Service",
      "Privacy Policy",
    ],
  },
];

function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("api/footer/newsletter", { email });
      setErr("");
      setSuccess(data.message ?? "Subscribed successfully! 🎉");
      setEmail("");
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setSuccess("");
      setErr(error.response.data.message ?? "something went wrong");
    }
  };
  return (
    <div className="relative w-full bg-[#050505] text-white pt-20 overflow-hidden border-t border-zinc-800/50">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-zinc-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-16"
        >
          {/* Column 1: Brand */}
          <div className="lg:pr-8">
            <h2 className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
              RYDEX
            </h2>
            <p className="mt-6 text-zinc-400 text-sm leading-relaxed font-medium">
              Book any vehicle — from bikes to trucks. Trusted owners.
              Transparent pricing. The ultimate fleet experience.
            </p>

            <div className="flex gap-3 mt-8">
              {/* 2. Mapping the new array properly */}
              {SOCIAL_LINKS.map((social, i) => {
                const Icon = social.Icon;
                return (
                  <motion.a
                    key={i}
                    whileHover={{
                      y: -4,
                      backgroundColor: "#ffffff",
                      color: "#000000",
                    }}
                    transition={{ duration: 0.2 }}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-md text-zinc-400 transition-colors shadow-sm"
                  >
                    <Icon size={18} strokeWidth={2} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {FOOTER_LINKS.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-white font-bold tracking-wide mb-6 text-sm uppercase">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-4">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="text-zinc-500 text-sm font-medium hover:text-white transition-all hover:translate-x-1 inline-block"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Column 4: Newsletter/CTA */}
          <div>
            <h3 className="text-white font-bold tracking-wide mb-6 text-sm uppercase flex items-center gap-2">
              <Mail size={16} className="text-zinc-500" />
              Stay Updated
            </h3>
            <p className="text-zinc-500 text-sm font-medium mb-4">
              Get the latest updates, offers, and fleet news directly to your
              inbox.
            </p>
            <div className="relative flex items-center mt-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                placeholder="Enter your email"
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl py-3 px-4 pr-12 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-zinc-500 transition-colors disabled:opacity-50"
              />
              <motion.button
                onClick={handleSubscribe}
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.05 }}
                whileTap={{ scale: loading ? 1 : 0.95 }}
                className="absolute right-2 p-1.5 bg-white text-black rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center disabled:opacity-70"
              >
                {loading ? (
                  <div className="w-4 h-4 m-[2px] border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <ArrowRight size={16} strokeWidth={2.5} />
                )}
              </motion.button>
            </div>

            {err && (
              <p className="text-red-400 text-xs font-medium pl-2">*{err}</p>
            )}
            {success && (
              <p className="text-emerald-400 text-xs mt-3 font-medium">
                {success}
              </p>
            )}
          </div>
        </motion.div>

        {/* Bottom Bar: Copyright & Legal */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
          className="border-t border-zinc-800/80 py-8 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <p className="text-zinc-500 text-sm font-medium">
            © {new Date().getFullYear()} RYDEX. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-zinc-600 hover:text-white text-sm font-medium transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-zinc-600 hover:text-white text-sm font-medium transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-zinc-600 hover:text-white text-sm font-medium transition-colors"
            >
              Cookies
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Footer;
