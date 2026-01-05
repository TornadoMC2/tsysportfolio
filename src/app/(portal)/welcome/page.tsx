"use client";

import { motion } from "framer-motion";
import { Wifi, Coffee, Clock, Shield, Music, Gamepad2, MessageCircle } from "lucide-react";

export default function WelcomePage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12">
      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="max-w-2xl mx-auto w-full relative z-10">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-cyan-500/20 border border-cyan-500/30 mb-6">
            <Wifi className="w-10 h-10 text-cyan-400" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-mono mb-4">
            <span className="text-white">Welcome to the</span>
            <br />
            <span className="text-cyan-400">Guest Network</span>
          </h1>
          <p className="text-lg text-slate-400">
            You&apos;re connected! Make yourself at home. 🏠
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-2xl p-6 md:p-8 mb-6"
        >
          <h2 className="text-xl font-semibold text-white font-mono mb-4 flex items-center gap-2">
            <Coffee className="w-5 h-5 text-cyan-400" />
            Quick Info
          </h2>

          <div className="space-y-4 text-slate-300">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-white">Network Speed</p>
                <p className="text-sm text-slate-400">You&apos;re on a shared connection - streaming and browsing should be smooth!</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-white">Stay Safe</p>
                <p className="text-sm text-slate-400">This is an open network. Use HTTPS sites and avoid sensitive banking stuff while connected.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MessageCircle className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-white">Need Help?</p>
                <p className="text-sm text-slate-400">Just grab me if you&apos;re having connection issues. Happy to help!</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* House Rules Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass rounded-2xl p-6 md:p-8 mb-6"
        >
          <h2 className="text-xl font-semibold text-white font-mono mb-4">
            The Basics ✨
          </h2>

          <ul className="space-y-3 text-slate-300">
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Stream, browse, game - it&apos;s all good</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Please don&apos;t do anything illegal (obviously)</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>No crypto mining - my electricity bill thanks you</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Be nice to the bandwidth - others might be using it too</span>
            </li>
          </ul>
        </motion.div>

        {/* Fun Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass rounded-2xl p-6 md:p-8 mb-8"
        >
          <h2 className="text-xl font-semibold text-white font-mono mb-4">
            While You&apos;re Here 🎉
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
              <Music className="w-5 h-5 text-cyan-400" />
              <span className="text-sm text-slate-300">Spotify works great</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
              <Gamepad2 className="w-5 h-5 text-cyan-400" />
              <span className="text-sm text-slate-300">Gaming is supported</span>
            </div>
          </div>
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <a
            href="https://google.com"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full
              bg-cyan-500 text-slate-950 font-semibold
              hover:bg-cyan-400 transition-all duration-300
              shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40"
          >
            Continue to Internet
          </a>
          <p className="mt-4 text-sm text-slate-500">
            Enjoy your stay! 🚀
          </p>
        </motion.div>
      </div>
    </div>
  );
}

