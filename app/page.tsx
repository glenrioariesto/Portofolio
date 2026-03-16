import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
import OrgExperience from "@/components/OrgExperience";
import Services from "@/components/Services";
import Experience from "@/components/Experience";

export default function Home() {
  return (
    <main>
      <div className="bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/background-kotak.png')" }}>
        <Hero />
      </div>
      <div className="pt-12">
        <TechMarquee />
        {/* <OrgExperience /> */}
        <Services />
      </div>
      <Experience />



    </main>
  );
}
