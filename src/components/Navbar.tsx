import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const navItems = [
    { name: "Inicio", href: "/" },
    {
      name: "Servicios",
      href: "#",
      dropdown: [
        { name: "Digitalización Empresarial", href: "/servicios/digitalizacion" },
        { name: "Producción de Contenido", href: "/servicios/contenido" },
        { name: "Marketing Digital", href: "/servicios/marketing" },
      ],
    },
    { name: "Casos de Éxito", href: "/casos-exito" },
    { name: "Blog", href: "/recursos" },
    { name: "Nosotros", href: "/sobre-nosotros" },
    { name: "Contacto", href: "/contacto" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-transparent backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/cdeeb541-3d69-40af-8ea1-3784a0a3ded3.png" 
                alt="Across Media Chile - Logo" 
                className="w-10 h-10 object-contain"
              />
              <span className="text-xl font-bold gradient-text">Across Media</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <div key={item.name} className="relative">
                  {item.dropdown ? (
                    <div
                      className="group"
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      <button className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center">
                        {item.name}
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </button>
                      {servicesOpen && (
                        <div className="absolute left-0 mt-2 w-64 bg-card border border-border rounded-lg shadow-elegant z-50">
                          <div className="py-2">
                            {item.dropdown.map((subItem) => (
                              <a
                                key={subItem.name}
                                href={subItem.href}
                                className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
                              >
                                {subItem.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <a
                      href={item.href}
                      className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {item.name}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="btn-secondary">
              Consulta Gratuita
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <div key={item.name}>
                {item.dropdown ? (
                  <div>
                    <button
                      onClick={() => setServicesOpen(!servicesOpen)}
                      className="w-full text-left px-3 py-2 text-base font-medium text-foreground hover:text-primary flex items-center justify-between"
                    >
                      {item.name}
                      <ChevronDown
                        className={`h-4 w-4 transform transition-transform ${
                          servicesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {servicesOpen && (
                      <div className="pl-4 space-y-1">
                        {item.dropdown.map((subItem) => (
                          <a
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-3 py-2 text-sm text-muted-foreground hover:text-primary"
                          >
                            {subItem.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.href}
                    className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary"
                  >
                    {item.name}
                  </a>
                )}
              </div>
            ))}
            <div className="pt-4 pb-2">
              <Button className="btn-secondary w-full">
                Consulta Gratuita
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;