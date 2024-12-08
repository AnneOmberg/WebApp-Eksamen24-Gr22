import type { Metadata } from "next";
import localFont from "next/font/local";

// TODO: Kommenter ut om du ønsker å bruke .css
// import '../styles/scss/main.css'

// TODO: Kommenter ut om du ikke ønsker å bruke tailwind
import "../styles/tailwind/main.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased m-2`}
      >
        <div
          className="mx-auto grid min-h-screen w-full max-w-7xl grid-rows-[auto_minmax(900px,_1fr)_30px]"
          data-testid="layout"
        >
          <nav className="mt-6 mb-2 flex justify-between">
            <h1 className="text-lg font-bold uppercase" data-testid="logo">
              <a href="/">TVA Events</a>
            </h1>
            <ul className="flex gap-8" data-testid="nav">
              <li className="text-base font-semibold" data-testid="nav_courses">
                <a href="kurs">Kurs</a>
              </li>
              <li className="text-base font-semibold" data-testid="nav_new">
                <a href="/ny">Nytt kurs</a>
              </li>
            </ul>
          </nav>

          <main className="h-full m-4">{children}</main>

          <footer className="flex justify-between" data-testid="footer">
            <p>Mikro LMS AS, 2024</p>
            <p>99 00 00 00, mail@lms.no</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
import React from "react";
