import { CheckCircle, MessageCircle, Lightbulb, Rocket, BarChart } from "lucide-react";

const ProcessSteps = () => {
  const steps = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Consulta Inicial",
      description: "Analizamos tu negocio y objetivos para crear una estrategia personalizada.",
      duration: "1-2 días",
      color: "from-primary to-primary-glow"
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Estrategia Digital",
      description: "Desarrollamos un plan integral con objetivos claros y métricas definidas.",
      duration: "3-5 días",
      color: "from-secondary to-accent"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Implementación",
      description: "Ejecutamos la estrategia con metodologías ágiles y comunicación constante.",
      duration: "2-4 semanas",
      color: "from-accent to-secondary"
    },
    {
      icon: <BarChart className="w-8 h-8" />,
      title: "Optimización",
      description: "Monitoreamos resultados y optimizamos continuamente para maximizar el ROI.",
      duration: "Continuo",
      color: "from-primary to-secondary"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Nuestro <span className="gradient-text">Proceso Probado</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Metodología estructurada que garantiza resultados medibles y crecimiento sostenible 
            para tu negocio digital.
          </p>
        </div>

        <div className="relative">
          {/* Progress line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full transform -translate-y-1/2 z-0"></div>

          {/* Steps */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className="group relative bg-card border border-border rounded-2xl p-8 hover:shadow-elegant transition-all duration-500 hover:-translate-y-2"
              >
                {/* Step number */}
                <div className="absolute -top-4 left-8">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {index + 1}
                  </div>
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {step.icon}
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <div className="text-sm text-primary font-medium bg-primary/10 px-3 py-1 rounded-full inline-block">
                      {step.duration}
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connector for mobile */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-1 h-8 bg-gradient-to-b from-primary to-secondary rounded-full"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Process guarantee */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center space-x-3 bg-card border border-border rounded-2xl px-8 py-4 shadow-card">
              <CheckCircle className="w-6 h-6 text-primary" />
              <span className="text-foreground font-medium">
                Garantía de satisfacción del 100% o devolvemos tu inversión
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;