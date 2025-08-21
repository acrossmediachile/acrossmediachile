import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Smartphone, Monitor, Users, BarChart3 } from "lucide-react";
import { useState } from "react";
import ContactModal from "@/components/ContactModal";

const Digitalizacion = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const benefits = [
    {
      icon: <Smartphone className="h-8 w-8 text-primary" />,
      title: "Presencia Digital Integral",
      description: "Sitios web responsivos, apps móviles y presencia en redes sociales"
    },
    {
      icon: <Monitor className="h-8 w-8 text-primary" />,
      title: "Automatización de Procesos",
      description: "Sistemas CRM, ERP y herramientas de gestión empresarial"
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Experiencia del Cliente",
      description: "Mejora en la interacción y satisfacción del cliente"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-primary" />,
      title: "Análisis y Métricas",
      description: "Dashboard de control y reportes en tiempo real"
    }
  ];

  const features = [
    "Auditoría digital completa",
    "Diseño de sitio web profesional",
    "Desarrollo de aplicaciones móviles",
    "Integración de sistemas de pago",
    "Implementación de CRM",
    "Capacitación del equipo",
    "Soporte técnico continuo",
    "Análisis de rendimiento"
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Digitalización{" "}
              <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
                Empresarial
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Transformamos empresas tradicionales en organizaciones digitalmente preparadas para el futuro
            </p>
            <Button 
              className="btn-hero"
              onClick={() => setIsContactModalOpen(true)}
            >
              Solicitar Consulta Gratuita
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Beneficios de la Digitalización
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Descubre cómo la transformación digital puede revolucionar tu empresa
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center space-y-4 p-6 bg-card rounded-lg border border-border hover:shadow-elegant transition-all duration-300">
                <div className="flex justify-center">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-foreground">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Servicios Incluidos
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Nuestro proceso de digitalización integral abarca todos los aspectos necesarios para tu transformación digital.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">¿Listo para Digitalizar?</h3>
              <p className="text-muted-foreground mb-6">
                Agenda una consulta gratuita y descubre cómo podemos transformar tu empresa.
              </p>
              <Button 
                className="btn-secondary w-full"
                onClick={() => setIsContactModalOpen(true)}
              >
                Comenzar Ahora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
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

export default Digitalizacion;