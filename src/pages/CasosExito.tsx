import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, TrendingUp, Users, DollarSign } from "lucide-react";
import { useState } from "react";
import ContactModal from "@/components/ContactModal";

const CasosExito = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const cases = [
    {
      company: "TechnoSolutions",
      industry: "Tecnología",
      challenge: "Aumentar leads calificados y mejorar presencia digital",
      solution: "Estrategia integral de marketing digital + rediseño web",
      results: [
        { metric: "+450%", description: "Incremento en leads" },
        { metric: "+280%", description: "Tráfico web orgánico" },
        { metric: "65%", description: "Reducción CAC" }
      ],
      image: "/lovable-uploads/9af34994-e98a-48b1-9413-e1883ba17b88.png",
      testimonial: "Across Media transformó completamente nuestra presencia digital. Los resultados superaron todas nuestras expectativas."
    },
    {
      company: "Fashion Forward",
      industry: "Retail & Moda",
      challenge: "Expandir ventas online y mejorar engagement en redes",
      solution: "E-commerce + gestión de redes sociales + contenido visual",
      results: [
        { metric: "+320%", description: "Ventas online" },
        { metric: "+180%", description: "Engagement redes" },
        { metric: "40%", description: "Aumento conversión" }
      ],
      image: "/lovable-uploads/9af34994-e98a-48b1-9413-e1883ba17b88.png",
      testimonial: "El equipo de Across Media entendió perfectamente nuestra visión. El crecimiento ha sido increíble."
    },
    {
      company: "RestaurantGroup",
      industry: "Gastronomía",
      challenge: "Digitalizar operaciones y aumentar reservas online",
      solution: "Sistema de reservas + app delivery + marketing local",
      results: [
        { metric: "+200%", description: "Reservas online" },
        { metric: "+150%", description: "Pedidos delivery" },
        { metric: "85%", description: "Satisfacción cliente" }
      ],
      image: "/lovable-uploads/9af34994-e98a-48b1-9413-e1883ba17b88.png",
      testimonial: "La digitalización nos permitió mantener y crecer el negocio, especialmente durante tiempos difíciles."
    }
  ];

  const stats = [
    { icon: <TrendingUp className="h-8 w-8 text-primary" />, value: "+500", description: "Empresas Transformadas" },
    { icon: <Users className="h-8 w-8 text-primary" />, value: "98%", description: "Satisfacción Cliente" },
    { icon: <DollarSign className="h-8 w-8 text-primary" />, value: "+300%", description: "ROI Promedio" }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Casos de{" "}
              <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
                Éxito
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Descubre cómo hemos transformado empresas como la tuya y los resultados extraordinarios que hemos logrado juntos
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-4 p-6 bg-card rounded-lg border border-border">
                <div className="flex justify-center">{stat.icon}</div>
                <div className="text-4xl md:text-5xl font-bold text-primary">{stat.value}</div>
                <p className="text-muted-foreground">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cases Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {cases.map((case_, index) => (
              <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{case_.company}</h3>
                      <p className="text-lg text-primary font-medium">{case_.industry}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-xl font-bold text-foreground mb-2">Desafío</h4>
                      <p className="text-muted-foreground">{case_.challenge}</p>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-foreground mb-2">Solución</h4>
                      <p className="text-muted-foreground">{case_.solution}</p>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      {case_.results.map((result, resultIndex) => (
                        <div key={resultIndex} className="text-center bg-card p-4 rounded-lg border border-border">
                          <div className="text-2xl font-bold text-primary">{result.metric}</div>
                          <p className="text-sm text-muted-foreground">{result.description}</p>
                        </div>
                      ))}
                    </div>

                    <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                      "{case_.testimonial}"
                    </blockquote>
                  </div>
                </div>
                
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-8 aspect-square flex items-center justify-center">
                    <img 
                      src={case_.image} 
                      alt={`Caso de éxito ${case_.company}`}
                      className="w-full h-full object-cover rounded-lg opacity-60"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            ¿Quieres ser Nuestro Próximo Caso de Éxito?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Agenda una consulta gratuita y descubre cómo podemos transformar tu empresa
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="btn-hero"
              onClick={() => setIsContactModalOpen(true)}
            >
              Solicitar Consulta Gratuita
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
              Ver Más Casos
              <ExternalLink className="ml-2 h-5 w-5" />
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

export default CasosExito;