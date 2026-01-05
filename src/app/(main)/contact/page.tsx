"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Send } from "lucide-react";
import { socialLinks } from "@/lib/data";
import { useState } from "react";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setSubmitted(true);
    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-mono text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Have a project in mind or want to discuss opportunities?
            I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold font-mono text-white mb-6">
              Connect With Me
            </h2>

            <div className="space-y-6">
              <a
                href="mailto:contact@tsys.dev"
                className="flex items-center gap-4 p-4 rounded-xl
                  bg-white/5 backdrop-blur-lg border border-white/10
                  hover:border-cyan-500/50 transition-all group"
              >
                <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Email</p>
                  <p className="text-white group-hover:text-cyan-400 transition-colors">
                    contact@tsys.dev
                  </p>
                </div>
              </a>

              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl
                  bg-white/5 backdrop-blur-lg border border-white/10
                  hover:border-cyan-500/50 transition-all group"
              >
                <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400">
                  <Github className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">GitHub</p>
                  <p className="text-white group-hover:text-cyan-400 transition-colors">
                    View my repositories
                  </p>
                </div>
              </a>

              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl
                  bg-white/5 backdrop-blur-lg border border-white/10
                  hover:border-cyan-500/50 transition-all group"
              >
                <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400">
                  <Linkedin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">LinkedIn</p>
                  <p className="text-white group-hover:text-cyan-400 transition-colors">
                    Connect professionally
                  </p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cyan-500/20
                    flex items-center justify-center">
                    <Send className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-slate-400">
                    Thanks for reaching out. I&apos;ll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-slate-300 mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg bg-slate-900/50
                        border border-white/10 text-white placeholder-slate-500
                        focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50
                        transition-all"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-300 mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg bg-slate-900/50
                        border border-white/10 text-white placeholder-slate-500
                        focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50
                        transition-all"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-slate-300 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg bg-slate-900/50
                        border border-white/10 text-white placeholder-slate-500
                        focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50
                        transition-all resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg
                      bg-cyan-500 text-slate-950 font-semibold
                      hover:bg-cyan-400 transition-all duration-300
                      disabled:opacity-50 disabled:cursor-not-allowed
                      shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

