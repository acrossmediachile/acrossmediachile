import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Camera, Video, PenTool, Megaphone } from "lucide-react";
import { useState } from "react";
import ContactModal from "@/components/ContactModal";

const Contenido = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const services = [
    {
      icon: <Camera className="h-8 w-8 text-primary" />,
      title: "Fotografía Profesional",
      description: "Sesiones fotográficas para productos, eventos corporativos y branding"
    },
    {
      icon: <Video className="h-8 w-8 text-primary" />,
      title: "Producción Audiovisual",
      description: "Videos corporativos, spots publicitarios y contenido para redes sociales"
    },
    {
      icon: <PenTool className="h-8 w-8 text-primary" />,
      title: "Diseño Gráfico",
      description: "Identidad visual, brochures, presentaciones y material promocional"
    },
    {
      icon: <Megaphone className="h-8 w-8 text-primary" />,
      title: "Contenido Digital",
      description: "Posts para redes sociales, blogs, newsletters y campañas digitales"
    }
  ];

  const portfolio = [
    { type: "Video Corporativo", client: "Tech Solutions", engagement: "+250% de engagement" },
    { type: "Campaña Social Media", client: "Retail Fashion", engagement: "+180% alcance orgánico" },
    { type: "Branding Completo", client: "Restaurant Chain", engagement: "+300% reconocimiento de marca" },
    { type: "Fotografía Producto", client: "E-commerce Store", engagement: "+120% conversiones" }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Producción de{" "}
              <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
                Contenido
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Creamos contenido visual y audiovisual que conecta con tu audiencia y fortalece tu marca
            </p>
            <Button 
              className="btn-hero"
              onClick={() => setIsContactModalOpen(true)}
            >
              Ver Nuestro Portafolio
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nuestros Servicios de Contenido
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Desde la conceptualización hasta la entrega final, manejamos todo el proceso creativo
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="text-center space-y-4 p-6 bg-card rounded-lg border border-border hover:shadow-elegant transition-all duration-300">
                <div className="flex justify-center">{service.icon}</div>
                <h3 className="text-xl font-bold text-foreground">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nuestro Proceso Creativo
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Briefing", description: "Entendemos tus objetivos y audiencia" },
              { step: "02", title: "Concepto", description: "Desarrollamos la idea creativa" },
              { step: "03", title: "Producción", description: "Ejecutamos con la más alta calidad" },
              { step: "04", title: "Entrega", description: "Contenido optimizado para cada canal" }
            ].map((item, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Results Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Resultados que Hablan por Sí Solos
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {portfolio.map((item, index) => (
              <div key={index} className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-lg font-bold text-foreground mb-2">{item.type}</h3>
                <p className="text-muted-foreground mb-4">{item.client}</p>
                <div className="text-2xl font-bold text-primary">{item.engagement}</div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              className="btn-secondary"
              onClick={() => setIsContactModalOpen(true)}
            >
              Crear Contenido para Mi Marca
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </div>
  );
};

export default Contenido;