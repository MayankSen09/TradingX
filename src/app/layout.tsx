import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PredictEx | Decentralized Prediction Markets",
  description: "Trade on what happens next. Turn your conviction about the future into a position.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground overflow-hidden flex`}>
        <Sidebar />
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <TopBar />
          <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 bg-gradient-to-br from-background via-background to-secondary/20">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
