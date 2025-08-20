import { useState } from "react";
import { X, Calendar, Clock, User, Building, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  const [formData, setFormData] = useState({
    day: "",
    date: "",
    time: "",
    companyName: "",
    phone: "",
    email: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking form submitted:", formData);
    // Here you would typically send the data to your booking system
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <div className="relative bg-card border border-border rounded-xl p-8 max-w-lg w-full mx-4 shadow-elegant">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold gradient-text mb-2">
              Agenda tu Consulta Gratuita
            </h2>
            <p className="text-muted-foreground">
              Selecciona el día y hora que mejor te acomode
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="day" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Día
                </Label>
                <Select onValueChange={(value) => handleSelectChange("day", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el día" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lunes">Lunes</SelectItem>
                    <SelectItem value="martes">Martes</SelectItem>
                    <SelectItem value="miercoles">Miércoles</SelectItem>
                    <SelectItem value="jueves">Jueves</SelectItem>
                    <SelectItem value="viernes">Viernes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Fecha
                </Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Hora
              </Label>
              <Select onValueChange={(value) => handleSelectChange("time", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona la hora" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="09:00">09:00 AM</SelectItem>
                  <SelectItem value="10:00">10:00 AM</SelectItem>
                  <SelectItem value="11:00">11:00 AM</SelectItem>
                  <SelectItem value="12:00">12:00 PM</SelectItem>
                  <SelectItem value="14:00">02:00 PM</SelectItem>
                  <SelectItem value="15:00">03:00 PM</SelectItem>
                  <SelectItem value="16:00">04:00 PM</SelectItem>
                  <SelectItem value="17:00">05:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyName" className="flex items-center gap-2">
                <Building className="w-4 h-4" />
                Nombre de la empresa
              </Label>
              <Input
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="Nombre de tu empresa"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Número de teléfono
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+56 9 1234 5678"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                E-mail
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="tu@email.com"
                required
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancelar
              </Button>
              <Button type="submit" className="btn-primary flex-1">
                Confirmar cita
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;