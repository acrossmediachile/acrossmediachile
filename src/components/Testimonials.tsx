import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  results: string;
  avatar: string;
}

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Carlos Mendoza",
      position: "CEO",
      company: "TechSolutions SpA",
      content: "Across Media transformó completamente nuestra presencia digital. En 6 meses aumentamos nuestras ventas online en un 300% y posicionamos nuestra marca como líder del sector tecnológico.",
      rating: 5,
      results: "+300% ventas online",
      avatar: "CM"
    },
    {
      id: 2,
      name: "Ana Rodríguez",
      position: "Directora Marketing",
      company: "Retail Innovación",
      content: "La estrategia de contenido y marketing digital que desarrollaron superó todas nuestras expectativas. Nuestro engagement en redes sociales creció 500% y generamos leads de alta calidad constantemente.",
      rating: 5,
      results: "+500% engagement",
      avatar: "AR"
    },
    {
      id: 3,
      name: "Roberto Silva",
      position: "Fundador",
      company: "StartupChile",
      content: "Profesionales excepcionales que realmente entienden el negocio. Su enfoque integral nos ayudó a escalar de startup a empresa consolidada en tiempo récord.",
      rating: 5,
      results: "Escalamiento exitoso",
      avatar: "RS"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Lo que dicen nuestros <span className="gradient-text">clientes</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Casos de éxito reales que demuestran el impacto de nuestras estrategias digitales 
            en el crecimiento de empresas chilenas.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main testimonial */}
          <div className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-elegant relative overflow-hidden">
            {/* Quote icon */}
            <div className="absolute top-8 right-8 opacity-10">
              <Quote className="w-20 h-20 text-primary" />
            </div>

            {/* Stars */}
            <div className="flex items-center justify-center space-x-1 mb-8">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-accent text-accent" />
              ))}
            </div>

            {/* Content */}
            <div className="text-center space-y-8">
              <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed font-medium">
                "{currentTestimonial.content}"
              </blockquote>

              {/* Results badge */}
              <div className="inline-flex items-center bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-full font-semibold">
                <BarChart className="w-5 h-5 mr-2" />
                {currentTestimonial.results}
              </div>

              {/* Author */}
              <div className="flex items-center justify-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {currentTestimonial.avatar}
                </div>
                <div className="text-left">
                  <div className="font-bold text-foreground text-lg">
                    {currentTestimonial.name}
                  </div>
                  <div className="text-muted-foreground">
                    {currentTestimonial.position} en {currentTestimonial.company}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <Button
              variant="outline"
              size="lg"
              onClick={prevTestimonial}
              className="group"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </Button>

            {/* Indicators */}
            <div className="flex space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-primary scale-125'
                      : 'bg-muted hover:bg-primary/50'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="lg"
              onClick={nextTestimonial}
              className="group"
            >
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">+500</div>
            <div className="text-sm text-muted-foreground">Clientes satisfechos</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-secondary">98%</div>
            <div className="text-sm text-muted-foreground">Tasa de retención</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-accent">4.9/5</div>
            <div className="text-sm text-muted-foreground">Calificación promedio</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-foreground">150%</div>
            <div className="text-sm text-muted-foreground">ROI promedio</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;