import "./App.css";
import SectionBody from "./components/sectionBody";
import Navigation from "./components/navigation";
import Section1 from "./components/sections/section-1";
import MobileNav from "./components/mobile-nav";

function App() {
  return (
    <div className="App">
      <div className="mobileHeader">
        <div className="mobileNav">
          <MobileNav />
        </div>
      </div>
      <div className="Navigation">
        <Navigation />
      </div>
      <div className="sectionBody">
        <Section1 />
        <SectionBody />
      </div>
    </div>
  );
}

export default App;
