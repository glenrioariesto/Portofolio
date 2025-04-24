import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
import OrgExperience from "@/components/OrgExperience";
import Experience from "@/components/Experience";

export default function Home() {
  return (
    <main>
      <div className="bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/background-kotak.png')" }}>
        <Hero />
      </div>
      <div className="pt-12 ">
        <TechMarquee />
        <OrgExperience />
      </div>
      <Experience />  
     


    </main>
  );
}
