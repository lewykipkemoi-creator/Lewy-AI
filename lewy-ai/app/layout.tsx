import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lewy AI — Never lose a customer because you replied too late.",
  description:
    "Lewy AI helps businesses manage customer conversations, capture leads and automate follow-ups."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
