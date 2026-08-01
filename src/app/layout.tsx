import "./globals.css";

/**
 * Intentional pass-through. The public site `(main)` and the guest captive
 * portal `(portal)` are separate products with different viewport, metadata and
 * runtime needs, so each route group renders its own `<html>`/`<body>` shell.
 * Adding a document shell here would nest one inside the other.
 *
 * Anything rendered outside a route group — notably `not-found.tsx` — must
 * therefore supply its own shell.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
