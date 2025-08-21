import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Clock, Search } from "lucide-react";
import { useState } from "react";

const Recursos = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const posts = [
    {
      id: 1,
      title: "10 Estrategias de Marketing Digital para 2024",
      excerpt: "Descubre las tendencias más importantes en marketing digital y cómo implementarlas en tu empresa para maximizar resultados.",
      category: "Marketing Digital",
      author: "María González",
      date: "2024-01-15",
      readTime: "8 min",
      image: "/lovable-uploads/9af34994-e98a-48b1-9413-e1883ba17b88.png"
    },
    {
      id: 2,
      title: "Cómo Digitalizar tu Empresa en 5 Pasos",
      excerpt: "Una guía completa para transformar digitalmente tu negocio tradicional y adaptarlo a la era digital actual.",
      category: "Digitalización",
      author: "Carlos Mendoza",
      date: "2024-01-10",
      readTime: "12 min",
      image: "/lovable-uploads/9af34994-e98a-48b1-9413-e1883ba17b88.png"
    },
    {
      id: 3,
      title: "ROI en Redes Sociales: Métricas que Importan",
      excerpt: "Aprende a medir el retorno de inversión real en tus campañas de redes sociales y optimiza tu estrategia.",
      category: "Social Media",
      author: "Ana Rojas",
      date: "2024-01-05",
      readTime: "6 min",
      image: "/lovable-uploads/9af34994-e98a-48b1-9413-e1883ba17b88.png"
    },
    {
      id: 4,
      title: "Automatización de Marketing: Guía Práctica",
      excerpt: "Implementa sistemas de automatización que trabajen 24/7 para generar y nutrir leads de manera eficiente.",
      category: "Automatización",
      author: "Diego Silva",
      date: "2023-12-28",
      readTime: "10 min",
      image: "/lovable-uploads/9af34994-e98a-48b1-9413-e1883ba17b88.png"
    },
    {
      id: 5,
      title: "Contenido Visual: Tendencias 2024",
      excerpt: "Explora las últimas tendencias en contenido visual y cómo crear piezas que generen mayor engagement.",
      category: "Contenido",
      author: "Laura Vásquez",
      date: "2023-12-20",
      readTime: "7 min",
      image: "/lovable-uploads/9af34994-e98a-48b1-9413-e1883ba17b88.png"
    },
    {
      id: 6,
      title: "SEO Local: Dominando las Búsquedas Cercanas",
      excerpt: "Estrategias específicas para mejorar tu posicionamiento en búsquedas locales y atraer clientes de tu zona.",
      category: "SEO",
      author: "Roberto Herrera",
      date: "2023-12-15",
      readTime: "9 min",
      image: "/lovable-uploads/9af34994-e98a-48b1-9413-e1883ba17b88.png"
    }
  ];

  const categories = ["Todos", "Marketing Digital", "Digitalización", "Social Media", "Contenido", "SEO", "Automatización"];

  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === "Todos" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Blog &{" "}
              <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
                Recursos
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Conocimiento, tips y estrategias para hacer crecer tu empresa en el mundo digital
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar artículos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-primary text-white"
                      : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article key={post.id} className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-elegant transition-all duration-300 group">
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-60"
                  />
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                      {post.category}
                    </span>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-muted-foreground line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(post.date).toLocaleDateString('es-ES')}</span>
                    </div>
                  </div>

                  <Button className="w-full btn-secondary group">
                    Leer Artículo
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No se encontraron artículos que coincidan con tu búsqueda.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Mantente Actualizado
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Suscríbete a nuestro newsletter y recibe los últimos artículos y consejos directamente en tu inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Tu email..."
              className="flex-1 px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button className="btn-hero">
              Suscribirse
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Recursos;