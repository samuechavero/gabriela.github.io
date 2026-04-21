import React, { useState } from "react";
import { motion } from "framer-motion";
import { PlayCircle, Zap, TrendingDown, Heart, X, CheckCircle2, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";

function App() {
  const [isGated, setIsGated] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "" });

  const handleUnlock = () => {
    setIsGated(false);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", phone: "" });
    }, 300);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from("leads")
        .insert([{ 
          nombre: formData.name, 
          telefono: formData.phone 
        }]);

      if (error) {
        console.log("Error de Supabase:", error);
        throw error;
      }
      
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error al registrar lead:", error);
      alert("Hubo un error al registrar tus datos. Por favor intenta de nuevo.");
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className={`min-h-screen bg-background text-foreground font-sans ${isGated ? "h-screen overflow-hidden" : ""}`}>
      {/* SECTION 1: HERO */}
      <section className="pt-24 pb-16 px-6 sm:px-12 md:px-24 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-6 max-w-4xl mx-auto">
            Recupera tu Salud Física y Emocional:<br />
            <span className="text-primary italic">Sal del Modo Supervivencia</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Descubre cómo el enfoque PINE puede ayudarte a sanar de raíz, regulando tu cuerpo, mente y alma sin soluciones superficiales.
          </p>
        </motion.div>

        <motion.div 
          className="w-full max-w-3xl aspect-video bg-black rounded-xl shadow-2xl flex items-center justify-center mb-10 relative overflow-hidden group"
          initial="hidden" animate="visible" variants={fadeInUp} transition={{ delay: 0.2 }}
        >
          <video 
            className="w-full h-full object-cover rounded-xl"
            controls
            playsInline
            preload="metadata"
            data-testid="video-vsl"
          >
            <source src="./VSL.mp4" type="video/mp4" />
            Tu navegador no soporta el formato de video.
          </video>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={fadeInUp} transition={{ delay: 0.4 }}>
          <a href="https://wa.me/12678085466" target="_blank" rel="noreferrer" className="inline-block" data-testid="link-whatsapp-hero">
            <Button size="lg" className="bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full px-8 py-7 text-lg shadow-lg hover:shadow-xl transition-all duration-300 font-medium">
              📲 Hablar con Gabriela por WhatsApp
            </Button>
          </a>
        </motion.div>
      </section>

      {/* SECTION 2: LEAD MAGNET */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div 
            className="flex flex-col md:flex-row items-center gap-12 md:gap-20"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
          >
            <div className="w-full md:w-1/2 flex justify-center">
              {/* CSS Ebook Mockup */}
              <div className="relative w-64 h-80 bg-primary rounded-r-xl rounded-l-sm shadow-2xl overflow-hidden border-l-4 border-primary-foreground/30 transform rotate-[-5deg] hover:rotate-0 transition-transform duration-500">
                <div className="absolute inset-0 p-6 flex flex-col justify-between border border-white/10 m-2 rounded-lg">
                  <div className="space-y-4">
                    <div className="w-full h-px bg-white/40"></div>
                    <div className="w-full h-px bg-white/40"></div>
                    <h3 className="font-serif text-lg sm:text-xl text-white font-bold leading-tight mt-2 pb-2">
                      Guía de Transformación Integral
                    </h3>
                  </div>
                  <div>
                    <div className="w-12 h-px bg-white/60 mb-2"></div>
                    <p className="text-white/90 text-sm font-medium tracking-wide">Dra. Gabriela Gonzalez</p>
                  </div>
                </div>
                {/* Binding highlight */}
                <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/20 to-transparent"></div>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground">Empieza tu transformación hoy</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Descarga mi guía gratuita y comienza a entender las señales ocultas que tu cuerpo te envía. Descubre cómo tus emociones, hormonas y metabolismo están conectados.
              </p>
              <div className="pt-2">
                <a 
                  href="./guia-de-transformacion-integral.pdf" 
                  download 
                  target="_blank"
                  className="inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-medium shadow-lg hover:shadow-xl hover:bg-primary/90 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto overflow-hidden group"
                >
                  <Download className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  Descargar Ebook Gratis
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: ABOUT */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div 
            className="flex flex-col md:flex-row items-center gap-12 md:gap-20"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
          >
            <div className="w-full md:w-1/3 flex justify-center md:justify-end">
              <div className="w-64 h-64 rounded-full overflow-hidden shadow-2xl border-4 border-white bg-muted relative group">
                <img 
                  src="./foto.png" 
                  alt="Dra. Gabriela Gonzalez" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
            
            <div className="w-full md:w-2/3 space-y-6 text-center md:text-left">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground">Conoce a la Dra. Gabriela Gonzalez</h2>
              <div className="w-12 h-1 bg-primary mx-auto md:mx-0 rounded-full"></div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Nací en Córdoba, Argentina. Estudié medicina en la mundialmente reconocida Universidad Nacional de Córdoba y me especialicé en Clínica Médica.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Con posgrados en Psicología Fractal y Psiconeuroinmunoendocrinología (PINE), mi objetivo es lograr una <span className="font-semibold text-foreground">SALUD INTEGRAL</span>, reconociéndonos como un todo: Cuerpo, Mente y Alma.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Hoy vivo en Philadelphia, EE. UU., y mi misión es acompañarte a crear hábitos saludables y sostenibles para que recuperes tu calidad de vida.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: PINE INFO */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4 text-white">¿Haces de todo y sigues igual?</h2>
            <p className="text-xl text-white/85 max-w-2xl mx-auto">Tu cuerpo no está roto. Está en modo supervivencia.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div 
              className="bg-white/10 border border-white/20 rounded-xl p-8 backdrop-blur-sm hover:bg-white/15 transition-colors"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: 0.1 }}
            >
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-serif text-2xl mb-4 text-white">Cansancio Crónico</h3>
              <p className="text-white/80 leading-relaxed">Tu cerebro interpreta peligro y prioriza guardar energía. Por eso te sientes agotada sin razón aparente.</p>
            </motion.div>

            <motion.div 
              className="bg-white/10 border border-white/20 rounded-xl p-8 backdrop-blur-sm hover:bg-white/15 transition-colors"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: 0.2 }}
            >
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-6">
                <TrendingDown className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-serif text-2xl mb-4 text-white">Bloqueo Metabólico</h3>
              <p className="text-white/80 leading-relaxed">El cortisol y la insulina se disparan, bloqueando tu metabolismo. No es tu alimentación, es tu biología de emergencia.</p>
            </motion.div>

            <motion.div 
              className="bg-white/10 border border-white/20 rounded-xl p-8 backdrop-blur-sm hover:bg-white/15 transition-colors"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: 0.3 }}
            >
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-serif text-2xl mb-4 text-white">Solución Integral</h3>
              <p className="text-white/80 leading-relaxed">No es falta de voluntad. Es un bloqueo hormonal-emocional que abordamos uniendo biología, pensamiento y emoción.</p>
            </motion.div>
          </div>

          <motion.div className="text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: 0.4 }}>
            <a href="https://wa.me/12678085466" target="_blank" rel="noreferrer" className="inline-block" data-testid="link-whatsapp-footer">
              <Button size="lg" className="bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full px-8 py-7 text-lg shadow-lg hover:shadow-xl transition-all duration-300 font-medium">
                📲 Quiero sanar de raíz — Hablar con Gabriela
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-foreground text-white py-12 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <p className="font-serif text-lg mb-4 text-white/90">Dra. Gabriela Gonzalez • Medicina Integral • Philadelphia, EE. UU.</p>
          <div className="w-full h-px bg-white/10 mb-4 max-w-xs mx-auto"></div>
          <p className="text-sm text-white/50">© {new Date().getFullYear()} Dra. Gabriela Gonzalez. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* MODAL / GATING BARRIER */}
      {isGated && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-md transition-opacity duration-500">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4 }}
            className="bg-card rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative"
            data-testid="modal-ebook-gated"
          >
            
            <div className="p-8">
              {!isSubmitted ? (
                <>
                  <div className="text-center mb-6">
                    <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-2">¡Hay un video especial para ti!</h2>
                    <p className="text-muted-foreground">Déjame tus datos y accede al ebook + video exclusivo</p>
                  </div>
                  
                  <form onSubmit={handleFormSubmit} className="space-y-5" data-testid="form-ebook">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre</Label>
                      <Input 
                        id="name" 
                        required 
                        placeholder="Tu nombre" 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="py-6 rounded-xl"
                        data-testid="input-name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Número de Teléfono</Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        required 
                        placeholder="+1 (555) 000-0000" 
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="py-6 rounded-xl"
                        data-testid="input-phone"
                      />
                    </div>
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-6 text-lg mt-4" data-testid="button-submit-form">
                      Acceder a la Guía Ahora
                    </Button>
                  </form>
                </>
              ) : (
                <div className="py-8 text-center flex flex-col items-center justify-center space-y-4" data-testid="modal-success">
                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  >
                    <CheckCircle2 className="w-20 h-20 text-primary mb-2" />
                  </motion.div>
                  <h3 className="font-serif text-2xl text-foreground">¡Gracias!</h3>
                  <Button 
                    onClick={handleUnlock} 
                    className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-6 text-lg mt-4"
                  >
                    Acceder a la Guía Ahora
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default App;