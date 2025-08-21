import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Target, Award, Lightbulb } from "lucide-react";
import { useState } from "react";
import ContactModal from "@/components/ContactModal";

const SobreNosotros = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const team = [
    {
      name: "María González",
      position: "CEO & Fundadora",
      description: "15+ años en marketing digital y transformación empresarial",
      image: "/lovable-uploads/9af34994-e98a-48b1-9413-e1883ba17b88.png"
    },
    {
      name: "Carlos Mendoza",
      position: "Director de Estrategia Digital",
      description: "Especialista en digitalización empresarial y automatización",
      image: "/lovable-uploads/9af34994-e98a-48b1-9413-e1883ba17b88.png"
    },
    {
      name: "Ana Rojas",
      position: "Directora Creativa",
      description: "Experta en contenido visual y estrategias de engagement",
      image: "/lovable-uploads/9af34994-e98a-48b1-9413-e1883ba17b88.png"
    },
    {
      name: "Diego Silva",
      position: "Director Técnico",
      description: "Desarrollo web, apps y soluciones tecnológicas avanzadas",
      image: "/lovable-uploads/9af34994-e98a-48b1-9413-e1883ba17b88.png"
    }
  ];

  const values = [
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: "Orientación a Resultados",
      description: "Cada estrategia está diseñada para generar resultados medibles y tangibles para nuestros clientes."
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
      title: "Innovación Constante",
      description: "Nos mantenemos a la vanguardia de las últimas tendencias y tecnologías digitales."
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Colaboración Estrecha",
      description: "Trabajamos como una extensión de tu equipo, entendiendo profundamente tu negocio."
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: "Excelencia en Servicio",
      description: "Nos comprometemos con la más alta calidad en cada proyecto que emprendemos."
    }
  ];

  const milestones = [
    { year: "2019", achievement: "Fundación de Across Media Chile" },
    { year: "2020", achievement: "Primeros 50 clientes transformados digitalmente" },
    { year: "2021", achievement: "Expansión del equipo y nuevos servicios" },
    { year: "2022", achievement: "200+ empresas digitalizadas exitosamente" },
    { year: "2023", achievement: "500+ transformaciones digitales completadas" },
    { year: "2024", achievement: "Liderazgo reconocido en transformación digital" }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Sobre{" "}
              <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
                Nosotros
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Somos un equipo apasionado por transformar empresas tradicionales en líderes digitales de su industria
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Nuestra Misión
              </h2>
              <p className="text-xl text-muted-foreground mb-6">
                En Across Media Chile, creemos que cada empresa tiene el potencial de liderar en el mundo digital. 
                Nuestra misión es democratizar el acceso a la transformación digital, ofreciendo soluciones de clase mundial 
                que antes solo estaban al alcance de grandes corporaciones.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Desde 2019, hemos ayudado a más de 500 empresas a digitalizar sus operaciones, 
                mejorar su presencia online y multiplicar sus resultados a través de estrategias digitales innovadoras.
              </p>
              <Button 
                className="btn-hero"
                onClick={() => setIsContactModalOpen(true)}
              >
                Trabajar con Nosotros
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-8 aspect-square flex items-center justify-center">
              <img 
                src="/lovable-uploads/9af34994-e98a-48b1-9413-e1883ba17b88.png" 
                alt="Equipo Across Media"
                className="w-full h-full object-cover rounded-lg opacity-60"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nuestros Valores
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Los principios que guían cada proyecto y cada relación con nuestros clientes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center space-y-4 p-6 bg-card rounded-lg border border-border hover:shadow-elegant transition-all duration-300">
                <div className="flex justify-center">{value.icon}</div>
                <h3 className="text-xl font-bold text-foreground">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nuestro Equipo
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Profesionales especializados con una pasión compartida por la excelencia digital
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center space-y-4 bg-card rounded-lg border border-border p-6 hover:shadow-elegant transition-all duration-300">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover opacity-60"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
                  <p className="text-primary font-medium">{member.position}</p>
                  <p className="text-sm text-muted-foreground mt-2">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nuestro Crecimiento
            </h2>
            <p className="text-xl text-muted-foreground">
              Los hitos más importantes en nuestro camino hacia la excelencia digital
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-center space-x-6 p-6 bg-card rounded-lg border border-border">
                <div className="flex-shrink-0 w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  {milestone.year}
                </div>
                <div>
                  <p className="text-lg text-foreground font-medium">{milestone.achievement}</p>
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
            ¿Listo para Transformar tu Empresa?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Únete a las más de 500 empresas que han confiado en nosotros para su transformación digital
          </p>
          <Button 
            className="btn-hero"
            onClick={() => setIsContactModalOpen(true)}
          >
            Comencemos Juntos
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </div>
  );
};

export default SobreNosotros;