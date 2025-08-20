import { ArrowRight, MessageCircle, Calendar, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-hero relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full animate-float"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 bg-white rounded-lg rotate-45 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 border-4 border-white rounded-full animate-pulse"></div>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="space-y-8">
          {/* Main CTA */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              ¿Listo para transformar tu{" "}
              <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
                negocio digital?
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Únete a más de 500 empresas que ya confiaron en nosotros para potenciar 
              su presencia digital y multiplicar sus resultados.
            </p>
          </div>

          {/* Urgency element */}
          <div className="inline-flex items-center bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-full px-6 py-3 text-white">
            <div className="w-3 h-3 bg-accent rounded-full animate-pulse mr-3"></div>
            <span className="font-medium">Consulta gratuita por tiempo limitado</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <Button 
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-bold text-lg px-8 py-4 shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-105 group"
            >
              <Calendar className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
              Agenda tu consulta gratuita
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button 
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-semibold text-lg px-8 py-4 group"
            >
              <MessageCircle className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
              Hablar por WhatsApp
            </Button>
          </div>

          {/* Secondary CTA */}
          <div className="pt-12 border-t border-white/20 mt-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">
                O descarga nuestro diagnóstico digital gratuito
              </h3>
              <p className="text-white/80 max-w-2xl mx-auto">
                Evaluación completa de 40 puntos para identificar oportunidades de mejora 
                en tu estrategia digital actual.
              </p>
              <Button 
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm group mt-6"
              >
                <Download className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Descargar diagnóstico gratuito
              </Button>
            </div>
          </div>

          {/* Contact info */}
          <div className="pt-8 space-y-4 text-white/80">
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm">
              <div className="flex items-center">
                <MessageCircle className="w-4 h-4 mr-2" />
                <span>+56 9 1234 5678</span>
              </div>
              <div className="flex items-center">
                <span className="w-4 h-4 mr-2">✉️</span>
                <span>contacto@acrossmedia.cl</span>
              </div>
              <div className="flex items-center">
                <span className="w-4 h-4 mr-2">📍</span>
                <span>Santiago, Chile</span>
              </div>
            </div>
            <p className="text-xs opacity-75">
              Respuesta garantizada en menos de 2 horas hábiles
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;