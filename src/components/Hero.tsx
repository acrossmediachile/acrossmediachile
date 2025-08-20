import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";
import { useState } from "react";
import BookingModal from "./BookingModal";

const Hero = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      ></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 floating-element">
        <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center">
          <div className="w-8 h-8 bg-accent rounded-full"></div>
        </div>
      </div>
      <div className="absolute bottom-32 right-16 floating-element" style={{ animationDelay: '1s' }}>
        <div className="w-12 h-12 bg-secondary/20 rounded-lg rotate-45"></div>
      </div>
      <div className="absolute top-1/3 right-20 floating-element" style={{ animationDelay: '2s' }}>
        <div className="w-20 h-20 bg-primary/10 rounded-full"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <img 
              src="/lovable-uploads/cdeeb541-3d69-40af-8ea1-3784a0a3ded3.png" 
              alt="Across Media" 
              className="w-5 h-5 mr-2 object-contain"
            />
            <span className="text-white text-sm font-medium">A la vanguardia por excelencia</span>
          </div>

          {/* Main headline */}
          <div className="space-y-4" style={{ marginTop: '20px' }}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Potenciamos tu empresa con{" "}
              <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
                estrategias digitales
              </span>{" "}
              que generan resultados reales
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Transformamos empresas tradicionales en líderes digitales de su rubro mediante 
              digitalización, contenido de impacto y marketing estratégico.
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 text-white">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent">+500</div>
              <div className="text-sm md:text-base opacity-90">Empresas transformadas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-secondary">98%</div>
              <div className="text-sm md:text-base opacity-90">Satisfacción cliente</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">5+</div>
              <div className="text-sm md:text-base opacity-90">Años experiencia</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button 
              className="btn-hero group"
              onClick={() => setIsBookingModalOpen(true)}
            >
              Agenda tu consulta gratuita
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm group"
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Ver casos de éxito
            </Button>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
    </section>
    </>
  );
};

export default Hero;