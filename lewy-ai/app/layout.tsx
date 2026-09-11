import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lewy AI — Never lose a customer",
  description: "AI customer response and lead recovery platform."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
