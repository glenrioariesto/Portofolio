import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
import OrgExperience from "@/components/OrgExperience";
import Services from "@/components/Services";
import Experience from "@/components/Experience";
import Booking from "@/components/Booking";

export default function Home() {
  return (
    <main className="flex flex-col pb-40">
      {/* Hero Section */}
      <div className="relative bg-cover bg-center bg-no-repeat mb-15 md:mb-30 px-4 md:px-0" style={{ backgroundImage: "url('/assets/background-kotak.png')" }}>
        {/* Transition Gradient to Peach Background */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background-primary to-transparent pointer-events-none" />
        <Hero />
      </div>

      {/* Tech Stack Marquee (Integrated with no extra gap) */}
      <div className="py-0 pt-[60px] md:pt-0">
        <TechMarquee />
      </div>

      {/* Services Section (With top gap) */}
      <div className="relative bg-white py-24 md:py-32 mt-24 md:mt-32">
        {/* Top Transition: Peach to White */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background-primary to-transparent pointer-events-none" />

        <div className="px-4">
          <Services />
        </div>

        {/* Bottom Transition: White to Peach */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background-primary to-transparent pointer-events-none" />
      </div>

      {/* Experience / Showcase Section */}
      <div className="mt-24 md:mt-32 px-4 md:px-0">
        <Experience />
      </div>

      {/* Booking Section */}
      <div className="mt-24 md:mt-32">
        <Booking />
      </div>
    </main>
  );
}
