import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider, { AuthContextProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Courier & Parcel Management',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthContextProvider>
          <Navigation />
          <div className="flex flex-1">{children}</div>
          <Footer />
        </AuthContextProvider>
      </body>
    </html>
  );
}
