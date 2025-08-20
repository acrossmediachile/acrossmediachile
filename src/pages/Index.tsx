import Hero from "../components/Hero";
import ServicesCube from "../components/ServicesCube";
import ProcessSteps from "../components/ProcessSteps";
import Testimonials from "../components/Testimonials";
import CTASection from "../components/CTASection";

const Index = () => {
  return (
    <div className="pt-16">
      <Hero />
      <ServicesCube />
      <ProcessSteps />
      <Testimonials />
      <CTASection />
    </div>
  );
};

export default Index;
