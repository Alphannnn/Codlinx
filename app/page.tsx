import Capabilities from "./components/Capabilities";
import Hero from "./components/Hero";
import Process from "./components/Process";
import Services from "./components/Services";
import Work from "./components/Work";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col bg-black">
      <Hero />
      <Capabilities />
      <Services />
      <Process />
      <Work />
    </main>
  );
}
