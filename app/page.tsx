import Capabilities from "./components/Capabilities";
import Hero from "./components/Hero";
import Process from "./components/Process";
import Work from "./components/Work";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col bg-black">
      <Hero />
      <Capabilities />
      <Process />
      <Work />
    </main>
  );
}
