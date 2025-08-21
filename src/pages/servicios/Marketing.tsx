import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Target, TrendingUp, Users, Zap } from "lucide-react";
import { useState } from "react";
import ContactModal from "@/components/ContactModal";

const Marketing = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const strategies = [
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: "Estrategia Digital",
      description: "Planificación integral de marketing digital basada en objetivos específicos"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      title: "SEO & SEM",
      description: "Posicionamiento orgánico y campañas de Google Ads para máxima visibilidad"
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Social Media",
      description: "Gestión de redes sociales y community management profesional"
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "Marketing Automation",
      description: "Automatización de procesos de marketing y nurturing de leads"
    }
  ];

  const results = [
    { metric: "+350%", description: "Incremento promedio en leads calificados" },
    { metric: "+200%", description: "Mejora en tasa de conversión" },
    { metric: "85%", description: "Reducción en costo por adquisición" },
    { metric: "+400%", description: "Crecimiento en engagement social" }
  ];

  const services = [
    "Auditoría de marketing digital",
    "Desarrollo de buyer personas",
    "Campañas de Google Ads",
    "Gestión de Facebook e Instagram Ads",
    "Email marketing automation",
    "Inbound marketing",
    "Analytics y reporting",
    "Optimización de conversiones"
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Marketing{" "}
              <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
                Digital
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Estrategias de marketing digital que generan leads calificados y aumentan tus ventas
            </p>
            <Button 
              className="btn-hero"
              onClick={() => setIsContactModalOpen(true)}
            >
              Solicitar Auditoría Gratuita
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Strategies Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Estrategias que Funcionan
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Implementamos las mejores prácticas de marketing digital para maximizar tu ROI
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {strategies.map((strategy, index) => (
              <div key={index} className="text-center space-y-4 p-6 bg-card rounded-lg border border-border hover:shadow-elegant transition-all duration-300">
                <div className="flex justify-center">{strategy.icon}</div>
                <h3 className="text-xl font-bold text-foreground">{strategy.title}</h3>
                <p className="text-muted-foreground">{strategy.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Resultados Comprobados
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Nuestros clientes experimentan un crecimiento significativo y medible
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {results.map((result, index) => (
              <div key={index} className="text-center bg-card p-8 rounded-lg border border-border">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{result.metric}</div>
                <p className="text-muted-foreground">{result.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Included Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Todo lo que Necesitas
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Nuestro servicio de marketing digital incluye todas las herramientas y estrategias necesarias para hacer crecer tu negocio online.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{service}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">¿Listo para Crecer?</h3>
              <p className="text-muted-foreground mb-6">
                Comienza con una auditoría gratuita de tu estrategia digital actual.
              </p>
              <Button 
                className="btn-secondary w-full"
                onClick={() => setIsContactModalOpen(true)}
              >
                Auditoría Gratuita
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

export default Marketing;