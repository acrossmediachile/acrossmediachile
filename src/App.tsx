import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Digitalizacion from "./pages/servicios/Digitalizacion";
import Contenido from "./pages/servicios/Contenido";
import Marketing from "./pages/servicios/Marketing";
import CasosExito from "./pages/CasosExito";
import Recursos from "./pages/Recursos";
import SobreNosotros from "./pages/SobreNosotros";
import Contacto from "./pages/Contacto";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/servicios/digitalizacion" element={<Digitalizacion />} />
              <Route path="/servicios/contenido" element={<Contenido />} />
              <Route path="/servicios/marketing" element={<Marketing />} />
              <Route path="/casos-exito" element={<CasosExito />} />
              <Route path="/recursos" element={<Recursos />} />
              <Route path="/sobre-nosotros" element={<SobreNosotros />} />
              <Route path="/contacto" element={<Contacto />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
