"use client";

import { MotionConfig } from "framer-motion";

/**
 * Honours the OS-level "reduce motion" setting for every framer-motion
 * animation on the site, instead of each component opting in individually.
 */
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
