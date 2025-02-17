import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";

export default function Home() {
  return (
    <main>
      <div className="bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/background-kotak.png')" }}>
        <Hero />
      </div>
      <div className="bg-white pt-28 ">
        <TechMarquee />
        <Experience />
      </div>
      <Hero />
      <Hero />


    </main>
  );
}
