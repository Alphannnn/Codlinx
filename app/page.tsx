import Capabilities from "./components/Capabilities";
import CursorGlow from "./components/CursorGlow";
import Hero from "./components/Hero";
import Process from "./components/Process";
import Services from "./components/Services";
import Work from "./components/Work";

export default function Home() {
  return (
    <>
      <CursorGlow />
      <Hero />
      <Capabilities />
      <Services />
      <Process />
      <Work />
    </>
  );
}
