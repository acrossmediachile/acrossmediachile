import { useState, useRef, useEffect } from "react";
import { ArrowRight, Globe, Video, TrendingUp, Users, Target, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContactModal from "./ContactModal";
interface ServiceFace {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  features: string[];
  cta: string;
  color: string;
}
const ServicesCube = () => {
  const [currentFace, setCurrentFace] = useState(0);
  const [rotation, setRotation] = useState({
    x: 0,
    y: 0
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({
    x: 0,
    y: 0
  });
  const [isHovering, setIsHovering] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const cubeRef = useRef<HTMLDivElement>(null);
  const services: ServiceFace[] = [{
    icon: <Globe className="w-8 h-8" />,
    title: "Digitalización Empresarial",
    subtitle: "Moderniza tu presencia digital",
    features: ["Desarrollo web profesional", "E-commerce completo", "Automatización de procesos", "Hosting y mantenimiento"],
    cta: "Digitalizar mi empresa",
    color: "from-primary to-primary-glow"
  }, {
    icon: <Video className="w-8 h-8" />,
    title: "Producción de Contenido",
    subtitle: "Comunica con impacto visual",
    features: ["Videos promocionales", "Fotografía profesional", "Diseño gráfico", "Gestión de redes sociales"],
    cta: "Crear contenido",
    color: "from-secondary to-accent"
  }, {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Marketing Digital",
    subtitle: "Genera leads que convierten",
    features: ["SEO y posicionamiento", "Google Ads y Meta Ads", "Email marketing", "Analytics y reportes"],
    cta: "Aumentar ventas",
    color: "from-accent to-secondary"
  }];
  const handleFaceChange = (index: number) => {
    setCurrentFace(index);
    setRotation({
      x: 0,
      y: index * 120
    });
  };
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX,
      y: e.clientY
    });
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    setRotation(prev => ({
      x: prev.x + deltaY * 0.5,
      y: prev.y + deltaX * 0.5
    }));
    setDragStart({
      x: e.clientX,
      y: e.clientY
    });
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Auto rotation effect
  useEffect(() => {
    if (!isDragging && !isHovering) {
      const interval = setInterval(() => {
        setRotation(prev => ({
          x: prev.x,
          y: prev.y + 0.5
        }));
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isDragging, isHovering]);
  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      setRotation(prev => ({
        x: prev.x + deltaY * 0.5,
        y: prev.y + deltaX * 0.5
      }));
      setDragStart({
        x: e.clientX,
        y: e.clientY
      });
    };
    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, dragStart]);
  return <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Nuestros <span className="gradient-text">Pilares Estratégicos</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transformamos tu negocio con soluciones integrales que abarcan desde la digitalización 
            hasta el crecimiento sostenible en el mundo digital.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Interactive Cube */}
          <div className="relative">
            <div className="perspective-1000 w-full h-96 flex items-center justify-center">
              <div ref={cubeRef} className="relative w-80 h-80 transform-style-preserve-3d cursor-grab select-none" style={{
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              transition: isDragging ? 'none' : 'transform 0.3s ease-out'
            }} onMouseDown={handleMouseDown} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => {
              setIsHovering(false);
              handleMouseLeave();
            }} onMouseMove={e => {
              if (isHovering && !isDragging) {
                const rect = e.currentTarget.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const deltaX = (e.clientX - centerX) * 0.1;
                const deltaY = (e.clientY - centerY) * -0.1;
                setRotation(prev => ({
                  x: deltaY,
                  y: deltaX
                }));
              } else if (isDragging) {
                handleMouseMove(e);
              }
            }} onMouseUp={handleMouseUp}>
                {services.map((service, index) => <div key={index} className={`absolute inset-0 w-80 h-80 bg-gradient-to-br ${service.color} rounded-2xl shadow-elegant flex flex-col items-center justify-center text-white p-8 hover:shadow-glow transition-all duration-300 pointer-events-none`} style={{
                transform: `rotateY(${index * 120}deg) translateZ(140px)`
              }}>
                    <div className="text-center space-y-6">
                      <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                        {service.icon}
                      </div>
                      <h3 className="text-2xl font-bold">{service.title}</h3>
                      <p className="text-lg opacity-90">{service.subtitle}</p>
                      <div className="space-y-2">
                        {service.features.slice(0, 2).map((feature, idx) => <div key={idx} className="text-sm opacity-80">
                            • {feature}
                          </div>)}
                      </div>
                    </div>
                  </div>)}
              </div>
            </div>

            {/* Cube Controls */}
            <div className="flex justify-center space-x-4 mt-8">
              {services.map((_, index) => <button key={index} onClick={() => handleFaceChange(index)} className={`w-4 h-4 rounded-full transition-all duration-300 ${currentFace === index ? 'bg-primary shadow-glow scale-125' : 'bg-muted hover:bg-primary/50'}`} />)}
            </div>
            
            {/* Instruction text */}
            <div className="text-center mt-4">
              <p className="text-sm text-muted-foreground">
                🖱️ Arrastra para rotar | 👆 Click en los puntos para navegar
              </p>
            </div>
          </div>

          {/* Service Details */}
          <div className="space-y-8">
            <div className="card-service bg-black/65">
              <div className="flex items-start space-x-4 mb-6">
                <div className={`bg-gradient-to-r ${services[currentFace].color} w-12 h-12 rounded-lg flex items-center justify-center text-white`}>
                  {services[currentFace].icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {services[currentFace].title}
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    {services[currentFace].subtitle}
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {services[currentFace].features.map((feature, index) => <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-foreground">{feature}</span>
                  </div>)}
              </div>

              <Button className="btn-secondary group w-full" onClick={() => setIsContactModalOpen(true)}>
                {services[currentFace].cta}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Stats for current service */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-card rounded-lg border border-border">
                <div className="text-2xl font-bold text-primary">150+</div>
                <div className="text-sm text-muted-foreground">Proyectos</div>
              </div>
              <div className="text-center p-4 bg-card rounded-lg border border-border">
                <div className="text-2xl font-bold text-secondary">95%</div>
                <div className="text-sm text-muted-foreground">Éxito</div>
              </div>
              <div className="text-center p-4 bg-card rounded-lg border border-border">
                <div className="text-2xl font-bold text-accent">24/7</div>
                <div className="text-sm text-muted-foreground">Soporte</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </section>;
};
export default ServicesCube;