import { useState, useEffect } from "react";
import { X, MessageCircle, Calendar, Download, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PopupModalProps {
  type: 'newsletter' | 'audit' | 'whatsapp' | 'exit-intent';
  isOpen: boolean;
  onClose: () => void;
}

const PopupModal = ({ type, isOpen, onClose }: PopupModalProps) => {
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const renderContent = () => {
    switch (type) {
      case 'newsletter':
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                ¡Únete a nuestra newsletter!
              </h3>
              <p className="text-muted-foreground">
                Recibe consejos exclusivos de marketing digital y casos de éxito cada semana.
              </p>
            </div>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Tu mejor email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button className="btn-hero w-full">
                Suscribirme gratis
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              📧 Sin spam. Cancela cuando quieras.
            </p>
          </div>
        );

      case 'audit':
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center mx-auto">
              <Download className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Auditoría Digital Gratuita
              </h3>
              <p className="text-muted-foreground">
                Evaluación completa de 40 puntos para identificar oportunidades de mejora en tu estrategia digital.
              </p>
            </div>
            <div className="bg-muted rounded-lg p-4 space-y-2 text-left">
              <div className="flex items-center text-sm">
                <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                <span>Análisis de presencia digital</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                <span>Evaluación de competencia</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                <span>Plan de acción personalizado</span>
              </div>
            </div>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email para recibir la auditoría"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button className="btn-secondary w-full">
                <Download className="mr-2 h-5 w-5" />
                Descargar auditoría gratuita
              </Button>
            </div>
          </div>
        );

      case 'whatsapp':
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                ¿Necesitas ayuda inmediata?
              </h3>
              <p className="text-muted-foreground">
                Nuestro equipo está disponible por WhatsApp para resolver tus dudas y orientarte.
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-2">
              <div className="text-green-800 font-medium">✅ Respuesta inmediata</div>
              <div className="text-green-700 text-sm">✅ Consulta sin compromiso</div>
              <div className="text-green-700 text-sm">✅ Atención personalizada</div>
            </div>
            <Button className="bg-green-500 hover:bg-green-600 text-white w-full text-lg py-3">
              <MessageCircle className="mr-2 h-5 w-5" />
              Escribir por WhatsApp
            </Button>
            <p className="text-xs text-muted-foreground">
              📱 +56 9 1234 5678 | Horario: Lun-Vie 9:00-18:00
            </p>
          </div>
        );

      case 'exit-intent':
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center mx-auto">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                ¡Espera! No te vayas sin tu consulta gratuita
              </h3>
              <p className="text-muted-foreground">
                Agenda 30 minutos con nuestro equipo y descubre cómo podemos ayudarte a crecer digitalmente.
              </p>
            </div>
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
              <div className="text-accent font-bold text-lg mb-2">🎯 Oferta especial</div>
              <div className="text-sm text-foreground">
                Consulta valorada en $50.000 - <span className="font-bold">¡Completamente GRATIS!</span>
              </div>
            </div>
            <Button className="btn-hero w-full">
              <Calendar className="mr-2 h-5 w-5" />
              Agendar consulta gratuita ahora
            </Button>
            <p className="text-xs text-muted-foreground">
              ⏰ Quedan solo 3 cupos disponibles esta semana
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="relative p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-muted hover:bg-muted/80 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default PopupModal;