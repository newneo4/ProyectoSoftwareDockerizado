import { BookSection } from "@/components/BookSection";
import { DonationSection } from "@/components/DonationSection";
import { ExchangeSection } from "@/components/ExchangeSection";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";
import { useRef } from "react";

export default function Home() {

  const heroRef = useRef(null)

  return (
    <div className="min-h-screen bg-[#fcf9f2] bg-opacity-90 bg-[url('/images/hero-books.jpg')] bg-fixed bg-cover">
      <div className="min-h-screen bg-[#fcf9f2] bg-opacity-90">
        <Navbar heroRef={heroRef}/>
        <main>
          <HeroSection id="inicio"/>
          <BookSection />
          <DonationSection />
          <ExchangeSection/>
        </main>
        <Footer />
      </div>
    </div>
  )
}
