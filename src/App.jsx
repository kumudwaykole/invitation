import { lazy, Suspense, useState } from "react";
import FloatingFlowers from "./components/FloatingLeaves";
import EnvelopeReveal from "./components/EnvelopeReveal";
import HeroSection from "./components/HeroSection";
import "./index.css";

const QuoteSection = lazy(() => import("./components/QuoteSection"));
const SaveTheDateSection = lazy(() => import("./components/SaveTheDateSection"));
const OurStorySection = lazy(() => import("./components/OurStorySection"));
const SacredCeremoniesSection = lazy(() => import("./components/SacredCeremoniesSection"));
const VenueSection = lazy(() => import("./components/VenueSection"));
const TimelineSection = lazy(() => import("./components/TimelineSection"));
const WelcomeSection = lazy(() => import("./components/WelcomeSection"));

function App() {
  const [revealed, setRevealed] = useState(false);

  return (
    <FloatingFlowers>
      <EnvelopeReveal onReveal={() => setRevealed(true)} />

      {revealed && (
        <div className="mx-auto relative overflow-x-hidden">
          <HeroSection revealed={revealed} />

          <Suspense fallback={null}>
            <QuoteSection />
            <SaveTheDateSection />
            <OurStorySection />
            <SacredCeremoniesSection />
            <VenueSection />
            <TimelineSection />
            <WelcomeSection />
          </Suspense>
        </div>
      )}
    </FloatingFlowers>
  );
}

export default App;