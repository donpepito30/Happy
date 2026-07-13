import React, { useState } from 'react';
import { 
  Eye, Sparkles, Shield, CheckCircle, 
  ArrowRight, Calendar, MapPin, Phone, User, Clock, Info,
  AlertCircle, ChevronLeft, ChevronRight, Heart, ShieldAlert,
  Search, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Navigation helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // State for promo container 5
  const [selectedPromo, setSelectedPromo] = useState<'antireflejos' | 'blueblock' | 'fotocromicos'>('blueblock');
  const [promoName, setPromoName] = useState('');
  const [promoPhone, setPromoPhone] = useState('');
  const [promoSuccess, setPromoSuccess] = useState(false);
  const [promoCode, setPromoCode] = useState('');

  // Hero background carousel images and auto-slide
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselImages = [
    "https://i.ibb.co/xKQ0sYwf/FB-IMG-1783531786216.jpg",
    "https://i.ibb.co/jPP9QhrX/FB-IMG-1783533248561.jpg",
    "https://i.ibb.co/pBpc9kDN/FB-IMG-1783533279236.jpg",
    "https://i.ibb.co/jZZWYN3L/FB-IMG-1783533296343.jpg",
    "https://i.ibb.co/Lz0nZYK1/FB-IMG-1783531744648.jpg",
    "https://i.ibb.co/CsvF4PpK/FB-IMG-1783531751730.jpg"
  ];

  const galleryImages = [
    "https://i.ibb.co/C5m0mJfm/FB-IMG-1783531754702.jpg",
    "https://i.ibb.co/3mqWP5JL/FB-IMG-1783536930233.jpg",
    "https://i.ibb.co/spkR8s8m/FB-IMG-1783536933708.jpg",
    "https://i.ibb.co/d0H4kbjY/FB-IMG-1783536926647.jpg",
    "https://i.ibb.co/0ySPMLZL/FB-IMG-1783536924569.jpg",
    "https://i.ibb.co/0yGQRNBP/FB-IMG-1783536919839.jpg",
    "https://i.ibb.co/xS4S9ydc/FB-IMG-1783536917865.jpg",
    "https://i.ibb.co/zV6CCh04/FB-IMG-1783536916044.jpg",
    "https://i.ibb.co/Q3r6ChhP/FB-IMG-1783536914152.jpg",
    "https://i.ibb.co/tMdn7t5n/FB-IMG-1783536907961.jpg",
    "https://i.ibb.co/cXgC9YrC/FB-IMG-1783536890348.jpg"
  ];

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  // State for booking container 10
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('10:00 AM - 12:00 PM');
  const [bookingName, setBookingName] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingTicket, setBookingTicket] = useState('');

  // Handle promo form submission
  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoName.trim() || !promoPhone.trim()) return;
    
    // Generate a unique promotional code
    const rand = Math.floor(1000 + Math.random() * 9000);
    const codes = {
      antireflejos: 'ANTI',
      blueblock: 'BLUE',
      fotocromicos: 'FOTO'
    };
    const code = `${codes[selectedPromo]}-${rand}`;
    setPromoCode(code);
    setPromoSuccess(true);

    // Build WhatsApp redirect link
    const optText = selectedPromo === 'antireflejos' ? 'Antireflejos ($40)' : selectedPromo === 'blueblock' ? 'Blue Block ($60)' : 'Fotocromáticos ($100)';
    const text = `¡Hola! He reservado una promoción 2X1 en Happy View Optics.\n\n*Código de Reserva:* ${code}\n*Cliente:* ${promoName}\n*Teléfono:* ${promoPhone}\n*Opción:* 2X1 ${optText}`;
    const url = `https://wa.me/593985520233?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  // Reset promo
  const resetPromo = () => {
    setPromoSuccess(false);
    setPromoName('');
    setPromoPhone('');
  };

  // Handle appointment booking submission
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName.trim() || !bookingPhone.trim() || !bookingDate) return;

    // Generate a visual exam ticket number
    const randCode = Math.floor(10000 + Math.random() * 90000);
    const ticket = `EXAM-${randCode}`;
    setBookingTicket(ticket);
    setBookingSuccess(true);

    // Build WhatsApp redirect link
    const text = `¡Hola! He agendado un examen visual en Happy View Optics.\n\n*Ticket:* ${ticket}\n*Paciente:* ${bookingName}\n*Contacto:* ${bookingPhone}\n*Fecha elegida:* ${bookingDate}\n*Horario:* ${bookingTime}\n\nDirección: Alborada 9na etapa, calle Demetrio Aguilera Malta mz 928 v 12`;
    const url = `https://wa.me/593985520233?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  // Reset booking
  const resetBooking = () => {
    setBookingSuccess(false);
    setBookingName('');
    setBookingPhone('');
    setBookingDate('');
    setBookingTime('10:00 AM - 12:00 PM');
  };

  return (
    <div className="min-h-screen bg-transparent text-text-main font-sans antialiased selection:bg-primary/10 selection:text-primary">
      
      {/* ================= HEADER (DO NOT TOUCH STRUCTURAL MARKERS) ================= */}
      <nav className="sticky top-0 w-full z-40 bg-white/20 backdrop-blur-xl border-b border-white/10 shadow-2xl">
        <div className="flex justify-between items-center px-6 md:px-12 lg:px-16 py-4 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.85, y: -10, rotate: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              rotate: 720
            }}
            transition={{ 
              opacity: { duration: 0.6 },
              scale: { duration: 0.6 },
              y: { duration: 0.6 },
              rotate: { duration: 2.5, ease: "easeInOut", delay: 1 }
            }}
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img 
              src="https://i.ibb.co/1tLd5swS/1000186513-removebg-preview.png" 
              alt="Happy View Optics Logo" 
              referrerPolicy="no-referrer"
              className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 hover:scale-105" 
            />
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('protection')} 
              className="font-bold text-xs uppercase tracking-wider text-text-sec hover:text-primary transition-colors cursor-pointer"
            >
              Protección
            </button>
            <button 
              onClick={() => scrollToSection('products')} 
              className="font-bold text-xs uppercase tracking-wider text-text-sec hover:text-primary transition-colors cursor-pointer"
            >
              Modelos
            </button>
            <button 
              onClick={() => scrollToSection('reviews')} 
              className="font-bold text-xs uppercase tracking-wider text-text-sec hover:text-primary transition-colors cursor-pointer"
            >
              Opiniones
            </button>
          </div>

          <motion.button 
            onClick={() => scrollToSection('combo-builder')}
            whileHover={{ scale: 1.05, y: -1, boxShadow: "0 8px 16px -4px rgba(0, 143, 76, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="bg-primary hover:bg-darkgreen text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-extrabold text-[10px] sm:text-xs uppercase tracking-wider transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Agendar Examen</span>
          </motion.button>
        </div>
      </nav>

      {/* ================= CONTENT MAIN WRAPPER ================= */}
      <main className="flex flex-col w-full">

        {/* 📦 1. PORTADA EDUCATIVA (HERO CON CARRUSEL DE FONDO FULL-BLEED DESDE EL HEADER HASTA EL LÍMITE DEL HERO) */}
        <section className="relative min-h-[500px] sm:min-h-[580px] lg:min-h-[640px] bg-transparent flex items-center justify-center overflow-hidden border-b border-border-neutral/20">
          
          {/* Full-bleed Background Carousel spanning exactly from header bottom to section bottom */}
          <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="absolute inset-0 w-full h-full"
              >
                <img
                  src={carouselImages[currentSlide]}
                  alt={`Happy View Optics Banner ${currentSlide + 1}`}
                  className="w-full h-full object-cover object-top saturate-[1.04] contrast-[1.03] brightness-100 cursor-zoom-in"
                  style={{ imageRendering: 'auto' }}
                  onClick={() => setSelectedImage(carouselImages[currentSlide])}
                  referrerPolicy="no-referrer"
                />
                
                {/* Bottom safety gradient to ensure button legibility on all backgrounds */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-40 sm:opacity-20" />
              </motion.div>
            </AnimatePresence>
            
            {/* Decorative accent elements */}
            <div className="absolute top-20 right-0 w-32 h-32 bg-gradient-accent-warm opacity-5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-primary-secondary opacity-5 rounded-full blur-3xl pointer-events-none" />
          </div>

          <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16 w-full relative z-20 flex items-end justify-center min-h-[500px] sm:min-h-[580px] lg:min-h-[640px] pb-8 sm:pb-12 pt-12">
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-2"
            >
              <motion.button
                onClick={() => scrollToSection('combo-builder')}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ 
                  scale: 1.1, 
                  y: -3, 
                  boxShadow: "0 15px 30px -5px rgba(0, 143, 76, 0.4)" 
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 10,
                  delay: 0.4
                }}
                className="group inline-flex w-auto items-center justify-center gap-1 bg-primary hover:bg-darkgreen text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-black text-[9px] sm:text-[11px] uppercase tracking-widest shadow-lg cursor-pointer transition-all"
              >
                <span>AGENDAR EXAMEN GRATUITO</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                onClick={() => scrollToSection('products')}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1, y: -2, boxShadow: "0 10px 20px -5px rgba(140, 44, 140, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 10,
                  delay: 0.5
                }}
                className="group inline-flex w-auto items-center justify-center gap-1 bg-secondary hover:bg-secondary/80 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-black text-[9px] sm:text-[11px] uppercase tracking-widest shadow-lg cursor-pointer transition-all"
              >
                <span>VER OFERTAS</span>
              </motion.button>
            </motion.div>

            {/* Float slide controller removed per user request */}

          </div>
        </section>


        {/* 📸 GALERÍA DE PROMOCIONES (DEBAJO DEL HERO) */}
        <section className="py-12 bg-transparent overflow-hidden relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16 mb-12 relative z-10">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-headline text-3xl md:text-5xl font-black text-text-main tracking-tight uppercase text-pretty mb-4">
                Promociones <span className="text-primary">Exclusivas</span>
              </h2>
              <div className="w-20 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto" />
              <p className="text-base md:text-lg text-text-sec font-medium text-pretty mt-6">
                Aprovecha nuestras ofertas diseñadas para cuidar tu visión con el mejor estilo y tecnología de punta.
              </p>
            </div>
          </div>
          
          <div className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide px-6 md:px-12 lg:px-16 relative z-10">
            {galleryImages.map((img, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, type: "spring", stiffness: 100 }}
                onClick={() => setSelectedImage(img)}
                className="min-w-[280px] sm:min-w-[400px] h-[350px] sm:h-[450px] rounded-[2.5rem] overflow-hidden bg-white/20 backdrop-blur-md border border-white/40 shadow-2xl snap-center shrink-0 flex items-center justify-center p-3 relative group cursor-zoom-in transition-all hover:bg-white/40"
              >
                <img 
                  src={img} 
                  alt={`Promoción ${idx + 1}`}
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 p-2 rounded-full shadow-sm">
                  <Search className="w-5 h-5 text-primary" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 🖼️ IMAGE MODAL (LIGHTBOX) */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative max-w-5xl w-full h-full flex items-center justify-center"
              >
                <img 
                  src={selectedImage} 
                  alt="Expanded view" 
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  referrerPolicy="no-referrer"
                />
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-0 right-0 m-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>


        {/* 📦 2. SECCIÓN INFORMATIVA: LENTES BIFOCALES */}
        <section id="protection" className="py-24 bg-transparent border-b border-border-neutral/10 scroll-mt-20">
          <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
            
            <div className="flex flex-col items-center text-center">
              


              {/* Right Column - Structured Texts */}
              <div className="max-w-3xl flex flex-col justify-center items-center">

                
                <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-main tracking-tight mb-6 text-pretty">
                  LENTES BIFOCALES
                </h2>
                
                <p className="text-sm md:text-base text-text-sec font-medium leading-relaxed mb-8 max-w-2xl text-pretty">
                  Diseñadas específicamente para brindar el máximo confort a quienes sufren de fatiga de acomodación. Estas lentes dividen sus zonas ópticas para simplificar tu rutina diaria con una precisión visual inigualable.
                </p>

                {/* Details bullet points */}
                <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
                  <motion.li 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.4)", borderColor: "rgba(255, 255, 255, 0.6)" }}
                    className="flex flex-col items-center text-center gap-4 p-6 rounded-3xl bg-white/30 backdrop-blur-lg border border-white/40 shadow-xl hover:shadow-2xl transition-all cursor-default"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 shadow-inner">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-text-main uppercase tracking-wide mb-2">Dos graduaciones</h4>
                      <p className="text-sm text-text-sec leading-relaxed text-pretty">Una zona para visión cercana y otra zona superior para visión lejana.</p>
                    </div>
                  </motion.li>

                  <motion.li 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.4)", borderColor: "rgba(255, 255, 255, 0.6)" }}
                    className="flex flex-col items-center text-center gap-4 p-6 rounded-3xl bg-white/30 backdrop-blur-lg border border-white/40 shadow-xl hover:shadow-2xl transition-all cursor-default"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 shadow-inner">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-text-main uppercase tracking-wide mb-2">Línea visible integrada</h4>
                      <p className="text-sm text-text-sec leading-relaxed text-pretty">Delimitación física nítida que separa ambas zonas de enfoque para evitar saltos de imagen.</p>
                    </div>
                  </motion.li>

                  <motion.li 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.4)", borderColor: "rgba(255, 255, 255, 0.6)" }}
                    className="flex flex-col items-center text-center gap-4 p-6 rounded-3xl bg-white/30 backdrop-blur-lg border border-white/40 shadow-xl hover:shadow-2xl transition-all cursor-default"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 shadow-inner">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-text-main uppercase tracking-wide mb-2">Ideal para personas con presbicia</h4>
                      <p className="text-sm text-text-sec leading-relaxed text-pretty">La solución más confortable para quienes necesitan corregir tanto la lectura manual como la distancia.</p>
                    </div>
                  </motion.li>
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* 📦 3. SECCIÓN INFORMATIVA: LENTES FOTOCROMÁTICOS */}
        <section className="py-24 bg-transparent border-b border-white/10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              
              {/* Left Column - Structured text & custom list */}
              <div className="lg:col-span-6 lg:order-1 order-2">
                
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                >
                  <h2 className="font-headline text-3xl md:text-5xl lg:text-6xl font-extrabold text-text-main tracking-tight mb-8 leading-[1.1]">
                    BENEFICIOS DE USAR <br />
                    <span className="text-secondary bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary-dark">LENTES FOTOCROMÁTICOS</span>
                  </h2>
                  
                  <p className="text-base md:text-lg text-text-sec font-medium leading-relaxed mb-10 text-pretty">
                    La tecnología inteligente que se adapta a tu estilo de vida. Lunas que aclaran en interiores y oscurecen al contacto con los rayos UV del sol, garantizando una transición cómoda y estética en todo momento.
                  </p>
                </motion.div>

                {/* Grid of high-end feature micro-cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 15 }}
                    whileHover={{ y: -4, scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)" }}
                    className="bg-white/60 backdrop-blur-md p-6 rounded-3xl min-h-[160px] border border-border-neutral/30 shadow-2xs hover:border-secondary/40 transition-all cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center mb-3 font-bold text-sm">01</div>
                    <h4 className="font-bold text-xs text-text-main uppercase tracking-wider mb-1">Reacción Inteligente</h4>
                    <p className="text-[11px] text-text-sec leading-relaxed">Se oscurecen progresivamente al entrar en contacto con la luz solar.</p>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}
                    whileHover={{ y: -4, scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)" }}
                    className="bg-white/60 backdrop-blur-md p-6 rounded-3xl min-h-[160px] border border-border-neutral/30 shadow-2xs hover:border-secondary/40 transition-all cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center mb-3 font-bold text-sm">02</div>
                    <h4 className="font-bold text-xs text-text-main uppercase tracking-wider mb-1">Protección UV Absoluta</h4>
                    <p className="text-[11px] text-text-sec leading-relaxed">Bloqueo de espectro completo contra los dañinos rayos UV solares.</p>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
                    whileHover={{ y: -4, scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)" }}
                    className="bg-white/60 backdrop-blur-md p-6 rounded-3xl min-h-[160px] border border-border-neutral/30 shadow-2xs hover:border-secondary/40 transition-all cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center mb-3 font-bold text-sm">03</div>
                    <h4 className="font-bold text-xs text-text-main uppercase tracking-wider mb-1">Confort Híbrido</h4>
                    <p className="text-[11px] text-text-sec leading-relaxed">Comodidad total al transicionar entre interiores y exteriores.</p>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 15, delay: 0.3 }}
                    whileHover={{ y: -4, scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)" }}
                    className="bg-white/60 backdrop-blur-md p-6 rounded-3xl min-h-[160px] border border-border-neutral/30 shadow-2xs hover:border-secondary/40 transition-all cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center mb-3 font-bold text-sm">04</div>
                    <h4 className="font-bold text-xs text-text-main uppercase tracking-wider mb-1">Ahorro inteligente</h4>
                    <p className="text-[11px] text-text-sec leading-relaxed">Práctico y económico: tienes dos pares de lentes en una sola montura.</p>
                  </motion.div>
                </div>
              </div>

              {/* Right Column - Clean uncropped image display with safety margins */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-6 lg:order-2 order-1 flex justify-center w-full"
              >
                <div className="w-full max-w-lg bg-white/40 backdrop-blur-md rounded-[2rem] border border-border-neutral/40 shadow-sm flex items-center justify-center overflow-hidden">
                  <div className="w-full bg-stone-100/50 flex items-center justify-center">
                    <img 
                      src="https://i.ibb.co/k6xvgFpP/FB-IMG-1783531765857.jpg" 
                      alt="Lentes Fotocromáticos Happy View" 
                      className="w-full h-auto object-contain filter brightness-105 hover:scale-102 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </motion.div>

            </div>

          </div>
        </section>


        {/* 📦 4. SECCIÓN INFORMATIVA: PROTECCIÓN DE LUZ AZUL */}
        <section className="py-24 bg-transparent border-b border-white/10 relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
            
            {/* Header Title & Slogan */}
            <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">

              <h2 className="font-headline text-3xl md:text-4.5xl font-extrabold text-text-main tracking-tight uppercase text-pretty">
                PROTEGE TU VISTA DE LA LUZ AZUL
              </h2>
              <div className="w-20 h-1.5 bg-gradient-primary-secondary rounded-full mt-4 mb-6 shadow-lg shadow-primary/20" />
              <p className="text-sm md:text-base text-text-sec leading-relaxed font-medium text-pretty">
                La sobreexposición a las pantallas LED de dispositivos digitales provoca fatiga visual y altera tu ciclo de sueño. Incorporar un filtro azul es una medida vital en la era digital actual.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Sub-blocks / Columns of use cases */}
              <div className="lg:col-span-6 flex flex-col gap-6">
                
                {/* Case 1 */}
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ x: 6, scale: 1.01, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.03)" }}
                  className="p-6 rounded-2xl bg-white/60 backdrop-blur-md border border-border-neutral/40 hover:border-primary/40 transition-all shadow-2xs group flex gap-4 items-start cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-100 text-text-main flex items-center justify-center shrink-0 font-bold text-2xl">
                    💼
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-base text-text-main mb-1 uppercase tracking-wide">
                      EN EL TRABAJO
                    </h3>
                    <p className="text-xs text-text-sec font-medium leading-relaxed">
                      Evita el enrojecimiento ocular y la sequedad provocados por pasar horas consecutivas analizando hojas de cálculo, documentos y correos electrónicos.
                    </p>
                  </div>
                </motion.div>

                {/* Case 2 */}
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  whileHover={{ x: 6, scale: 1.01, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.03)" }}
                  className="p-6 rounded-2xl bg-white/60 backdrop-blur-md border border-border-neutral/40 hover:border-primary/40 transition-all shadow-2xs group flex gap-4 items-start cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-100 text-text-main flex items-center justify-center shrink-0 font-bold text-2xl">
                    🎮
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-base text-text-main mb-1 uppercase tracking-wide">
                      AL JUGAR
                    </h3>
                    <p className="text-xs text-text-sec font-medium leading-relaxed">
                      Mejora el contraste visual cromático y la definición de sombras durante tus maratones gaming de alta intensidad protegiendo tus fotorreceptores.
                    </p>
                  </div>
                </motion.div>

                {/* Case 3 */}
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  whileHover={{ x: 6, scale: 1.01, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.03)" }}
                  className="p-6 rounded-2xl bg-white/60 backdrop-blur-md border border-border-neutral/40 hover:border-primary/40 transition-all shadow-2xs group flex gap-4 items-start cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-100 text-text-main flex items-center justify-center shrink-0 font-bold text-2xl">
                    📱
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-base text-text-main mb-1 uppercase tracking-wide">
                      CON EL CELULAR
                    </h3>
                    <p className="text-xs text-text-sec font-medium leading-relaxed">
                      Controla la interrupción del ciclo del sueño antes de dormir, permitiendo que tu cerebro produzca melatonina de manera natural para un descanso real.
                    </p>
                  </div>
                </motion.div>

              </div>

              {/* Right Column: Safe Image Showcase with generous paddings */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-6 flex justify-center w-full"
              >
                <div className="w-full max-w-lg bg-white/40 backdrop-blur-md p-5 rounded-[2rem] border border-border-neutral/40 shadow-sm flex items-center justify-center">
                  <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100/50 flex items-center justify-center">
                    <img 
                      src="https://i.ibb.co/Lz0nZYK1/FB-IMG-1783531744648.jpg" 
                      alt="Protección contra luz azul Happy View" 
                      className="w-full h-full object-contain filter brightness-105 drop-shadow-[0_8px_16px_rgba(0,0,0,0.12)] hover:scale-102 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </motion.div>

            </div>

          </div>
        </section>


        {/* 🎬 SECCIÓN DE EXPERIENCIA EN VIDEO (ZONA INTERMEDIA) */}
        <section id="videos" className="py-24 bg-stone-50/50">
          <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="font-headline text-3xl md:text-4.5xl font-extrabold text-text-main tracking-tight uppercase mb-4">
                EXPERIENCIA HAPPY VIEW
              </h2>
              <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-6" />
              <p className="text-xs sm:text-sm text-text-sec font-medium leading-relaxed">
                Nuestros pacientes comparten su transformación visual. Descubre por qué somos la opción favorita en salud visual.
              </p>
            </div>

            <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
              {[
                { id: "cOiQfQnUO0R", title: "Testimonio 1" },
                { id: "cOiQfQnUO0S", title: "Testimonio 2" },
                { id: "cOiQfQnUO0R", title: "Testimonio 3" }
              ].map((video, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="min-w-[280px] sm:min-w-[320px] max-w-[320px] aspect-[9/16] rounded-[2.5rem] overflow-hidden shadow-2xl border border-border-neutral/30 bg-black relative snap-center shrink-0"
                >
                  <iframe 
                    src={`https://screenpal.com/player/${video.id}?ff=1&title=0`} 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    title={video.title}
                    className="absolute inset-0 w-full h-full object-cover scale-[1.01]"
                  />
                  
                  {/* Máscara inferior con colores corporativos */}
                  <div className="absolute bottom-0 left-0 right-0 h-[18%] bg-gradient-to-t from-primary/80 via-secondary/40 to-transparent z-10 pointer-events-auto border-t border-white/10" />
                  
                  {/* Marco decorativo superior */}
                  <div className="absolute inset-0 pointer-events-none border-[12px] border-black/5 rounded-[2.5rem] z-20" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* 📦 5. CONTENEDOR DE PROMOCIONES (TABLA DE PRECIOS / OFERTAS INTERACTIVA) */}
        <section id="products" className="py-24 bg-gradient-to-br from-neutral-900 via-secondary/15 to-neutral-950 text-white relative overflow-hidden scroll-mt-20">
          
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
            
            {/* Upper Promo Banner info */}
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">

              <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-white uppercase text-pretty">
                MEGA PROMO 2X1 EN LENTES MONOFOCALES
              </h2>
              <div className="w-16 h-1 bg-secondary rounded-full mt-4 mb-6" />
              <p className="text-sm md:text-base text-stone-300 font-medium leading-relaxed text-pretty">
                Paga un solo par y llévate el segundo completamente gratis. Selecciona cualquiera de las opciones tecnológicas detalladas a continuación y reserva tu combo exclusivo hoy mismo.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Specified promo image, fully visible without crops */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-5 flex justify-center w-full"
              >
                <div className="relative p-3 bg-white/5 border border-white/10 rounded-3xl max-w-md w-full shadow-2xl">
                  <div className="aspect-square w-full rounded-2xl overflow-hidden bg-black/40 flex items-center justify-center p-4">
                    <img 
                      src="https://i.ibb.co/jZZWYN3L/FB-IMG-1783531296343.jpg" 
                      alt="Tabla de precios Mega Promo 2x1" 
                      className="w-full h-full object-contain rounded-xl drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)] filter brightness-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                </div>
              </motion.div>

              {/* Right Column: Structured Interactive Prices & Booking Ticket */}
              <div className="lg:col-span-7">
                
                {promoSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 rounded-3xl bg-neutral-900/95 border border-secondary/30 shadow-2xl text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                    
                    <h3 className="font-headline text-2xl font-black uppercase text-white mb-2">
                      ¡PROMO RESERVADA CON ÉXITO!
                    </h3>
                    <p className="text-xs text-stone-300 max-w-md mx-auto mb-6">
                      Hemos reservado tu promoción especial. Guarda tu código de descuento y compártelo por WhatsApp para confirmar tu cita.
                    </p>

                    {/* Receipt ticket widget */}
                    <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800 text-left max-w-xs mx-auto mb-6 font-mono relative">
                      <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-neutral-900 rounded-full" />
                      <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-neutral-900 rounded-full" />
                      
                      <div className="text-[9px] text-secondary font-bold uppercase tracking-widest mb-1">CUPÓN DE RESERVA</div>
                      <div className="text-xl font-black text-white tracking-wider mb-3 select-all">{promoCode}</div>
                      
                      <div className="border-t border-neutral-800 pt-2.5 text-[10px] text-stone-400">
                        <p><span className="text-stone-500">Cliente:</span> {promoName}</p>
                        <p><span className="text-stone-500">Telf:</span> {promoPhone}</p>
                        <p className="mt-1 font-bold text-white">
                           <span className="text-stone-500">Opción:</span> 2X1 {selectedPromo === 'antireflejos' ? 'ANTIREFLEJOS ($40)' : selectedPromo === 'blueblock' ? 'BLUE BLOCK ($60)' : 'FOTOCROMÁTICOS ($100)'}
                        </p>
                      </div>
                    </div>

                    {/* WhatsApp Action Button */}
                    <a
                      href={`https://wa.me/593985520233?text=${encodeURIComponent(
                        `¡Hola! He reservado una promoción 2X1 en Happy View Optics.\n\n` +
                        `*Código de Reserva:* ${promoCode}\n` +
                        `*Cliente:* ${promoName}\n` +
                        `*Teléfono:* ${promoPhone}\n` +
                        `*Opción:* 2X1 ${selectedPromo === 'antireflejos' ? 'Antireflejos ($40)' : selectedPromo === 'blueblock' ? 'Blue Block ($60)' : 'Fotocromáticos ($100)'}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full max-w-xs mx-auto mb-5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold text-xs uppercase tracking-widest py-3.5 px-6 rounded-xl transition-all items-center justify-center gap-2 shadow-lg cursor-pointer"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.182 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.479 2.016 14.01 1.016 11.998 1.016 6.558 1.016 2.13 5.388 2.127 10.82c-.001 1.778.473 3.51 1.378 5.024l-.953 3.477 3.6-.92c1.474.802 3.01 1.222 4.595 1.222l-.001-.001zm10.152-7.051c-.28-.14-1.65-.81-1.902-.902-.253-.093-.438-.14-.622.14-.184.28-.713.902-.873 1.087-.16.184-.32.205-.6.064-.28-.14-1.182-.435-2.251-1.39-1.32-.172-1.353-.102-2.205-1.118-.114-.148-.058-.243.014-.315.064-.064.14-.16.21-.24.07-.08.118-.14.184-.28.064-.14.032-.26-.014-.352-.047-.093-.438-1.056-.6-1.447-.158-.382-.333-.33-.457-.33h-.39c-.14 0-.368.052-.56.262-.192.21-.734.717-.734 1.748 0 1.03.75 2.022.854 2.162.104.14 1.478 2.258 3.58 3.166.5.216.89.346 1.196.442.502.16.96.137 1.322.083.404-.06 1.65-.674 1.882-1.326.23-.652.23-1.21.16-1.325-.07-.116-.253-.204-.533-.344z"/>
                      </svg>
                      <span>Enviar por WhatsApp</span>
                    </a>

                    <div className="block mt-2">
                      <button
                        onClick={resetPromo}
                        className="text-xs text-secondary font-bold hover:underline"
                      >
                        Reservar otra promoción
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <div className="bg-neutral-900/70 p-6 sm:p-8 rounded-3xl border border-white/5 backdrop-blur-md shadow-2xl">
                    <h3 className="font-headline text-xl font-bold uppercase text-white mb-6 tracking-wide">
                      Selecciona tu opción y reserva:
                    </h3>

                    {/* Pricing Cards */}
                    <div className="flex flex-col gap-3.5 mb-8">
                      
                      {/* Option 1 */}
                      <motion.button
                        onClick={() => setSelectedPromo('antireflejos')}
                        whileHover={{ scale: 1.02, y: -2, boxShadow: "0 10px 20px -8px rgba(140, 44, 140, 0.4)" }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-center justify-between p-4 rounded-2xl border transition-all text-left cursor-pointer ${
                          selectedPromo === 'antireflejos' 
                            ? 'bg-secondary/20 border-secondary ring-1 ring-secondary' 
                            : 'bg-neutral-950/40 border-neutral-800 hover:border-neutral-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                            selectedPromo === 'antireflejos' ? 'border-secondary bg-secondary' : 'border-stone-600'
                          }`}>
                            {selectedPromo === 'antireflejos' && <div className="w-2.5 h-2.5 rounded-full bg-neutral-950" />}
                          </div>
                          <div>
                            <span className="font-bold text-sm text-white uppercase tracking-wider block">2X1 ANTIREFLEJOS</span>
                            <span className="text-[10px] text-stone-400 block mt-0.5">Lunas con filtro contra reflejos y destellos molestos.</span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xl sm:text-2xl font-black text-white">$40</span>
                          <span className="text-[9px] text-stone-400 block">Total Combo</span>
                        </div>
                      </motion.button>

                      {/* Option 2 */}
                      <motion.button
                        onClick={() => setSelectedPromo('blueblock')}
                        whileHover={{ scale: 1.02, y: -2, boxShadow: "0 10px 20px -8px rgba(140, 44, 140, 0.4)" }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-center justify-between p-4 rounded-2xl border transition-all text-left cursor-pointer ${
                          selectedPromo === 'blueblock' 
                            ? 'bg-secondary/20 border-secondary ring-1 ring-secondary' 
                            : 'bg-neutral-950/40 border-neutral-800 hover:border-neutral-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                            selectedPromo === 'blueblock' ? 'border-secondary bg-secondary' : 'border-stone-600'
                          }`}>
                            {selectedPromo === 'blueblock' && <div className="w-2.5 h-2.5 rounded-full bg-neutral-950" />}
                          </div>
                          <div>
                            <span className="font-bold text-sm text-white uppercase tracking-wider block">2X1 BLUE BLOCK</span>
                            <span className="text-[10px] text-stone-400 block mt-0.5">Lunas con polímero bloqueador de luz azul nociva.</span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xl sm:text-2xl font-black text-secondary">$60</span>
                          <span className="text-[9px] text-stone-400 block">Total Combo</span>
                        </div>
                      </motion.button>

                      {/* Option 3 */}
                      <motion.button
                        onClick={() => setSelectedPromo('fotocromicos')}
                        whileHover={{ scale: 1.02, y: -2, boxShadow: "0 10px 20px -8px rgba(140, 44, 140, 0.4)" }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-center justify-between p-4 rounded-2xl border transition-all text-left cursor-pointer ${
                          selectedPromo === 'fotocromicos' 
                            ? 'bg-secondary/20 border-secondary ring-1 ring-secondary' 
                            : 'bg-neutral-950/40 border-neutral-800 hover:border-neutral-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                            selectedPromo === 'fotocromicos' ? 'border-secondary bg-secondary' : 'border-stone-600'
                          }`}>
                            {selectedPromo === 'fotocromicos' && <div className="w-2.5 h-2.5 rounded-full bg-neutral-950" />}
                          </div>
                          <div>
                            <span className="font-bold text-sm text-white uppercase tracking-wider block">2X1 FOTOCROMÁTICOS</span>
                            <span className="text-[10px] text-stone-400 block mt-0.5">Adaptables dinámicamente con oscurecimiento solar.</span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xl sm:text-2xl font-black text-white">$100</span>
                          <span className="text-[9px] text-stone-400 block">Total Combo</span>
                        </div>
                      </motion.button>

                    </div>

                    {/* Quick reservation form */}
                    <form onSubmit={handlePromoSubmit} className="flex flex-col sm:flex-row gap-3 items-end">
                      <div className="w-full sm:w-1/2">
                        <label className="block text-[10px] uppercase font-bold tracking-wider text-stone-400 mb-1.5">Tu Nombre:</label>
                        <div className="relative">
                          <input 
                            type="text" 
                            required
                            placeholder="Ej. María López" 
                            value={promoName}
                            onChange={(e) => setPromoName(e.target.value)}
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-secondary transition-colors"
                          />
                        </div>
                      </div>

                      <div className="w-full sm:w-1/2">
                        <label className="block text-[10px] uppercase font-bold tracking-wider text-stone-400 mb-1.5">Teléfono Celular:</label>
                        <div className="relative">
                          <input 
                            type="tel" 
                            required
                            placeholder="Ej. 0987654321" 
                            value={promoPhone}
                            onChange={(e) => setPromoPhone(e.target.value)}
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-secondary transition-colors"
                          />
                        </div>
                      </div>

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.03, y: -1, boxShadow: "0 8px 16px -4px rgba(140, 44, 140, 0.4)" }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        className="w-full sm:w-auto bg-secondary hover:bg-secondary/80 text-white font-extrabold text-xs uppercase tracking-widest py-3.5 px-6 rounded-xl transition-all cursor-pointer h-[46px] shrink-0 shadow-md"
                      >
                        Reservar 2X1
                      </motion.button>
                    </form>

                    <p className="text-[10px] text-stone-400 mt-4 text-center">
                      *La reserva es gratuita. Pagas al realizar tu examen visual en el local físico.
                    </p>
                  </div>
                )}

              </div>

            </div>

          </div>
        </section>


        {/* GALLERY WRAPPER CONTAINING SPECIFIED SECTIONS 6 & 7 SIDE-BY-SIDE FOR MAX RESPONSIVENESS AND BEAUTY */}
        <section className="py-24 bg-transparent border-b border-border-neutral/10">
          <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
            
            <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
              <h2 className="font-headline text-3xl md:text-4.5xl font-extrabold text-text-main tracking-tight uppercase text-pretty">
                GALERÍA DE PRODUCTOS
              </h2>
              <div className="w-16 h-1 bg-primary rounded-full mt-4 mb-6" />
              <p className="text-sm md:text-base text-text-sec leading-relaxed font-medium text-pretty">
                Nuestras monturas reales combinan la máxima calidad y ligereza. Encuentra el estilo que mejor se adapta a tus rasgos con diseños que definen tu personalidad única.
              </p>
            </div>

            <div className="flex justify-center">
              
              {/* 📦 6. GALERÍA DE PRODUCTOS: MODELO "GIRLY" */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -6, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.05), 0 10px 10px -5px rgba(0,0,0,0.03)" }}
                className="group bg-white/60 backdrop-blur-md rounded-[2.5rem] border border-border-neutral/40 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between max-w-md"
              >
                
                {/* Product image - dynamic height, full visibility */}
                <div className="w-full">
                  <div className="w-full bg-rose-50/35 border-b border-border-neutral/20 flex items-center justify-center relative">
                    <img 
                      src="https://i.ibb.co/jPP9QhrX/FB-IMG-1783533248561.jpg" 
                      alt="DPC Armazón Girly" 
                      className="w-full h-auto object-contain filter brightness-105 transition-transform duration-700 group-hover:scale-103"
                      referrerPolicy="no-referrer"
                    />

                  </div>
                </div>

                {/* Details info */}
                <div className="p-8 pt-4 flex flex-col items-center text-center">
                  <div className="mb-2">
                    <h3 className="font-headline font-black text-2xl text-text-main uppercase tracking-wide text-pretty">
                      DPC ARMAZÓN
                    </h3>

                  </div>
                  
                  {/* Slogan */}
                  <p className="text-sm font-bold text-secondary italic mb-4 uppercase tracking-wider">
                    EXPRESA TU PERSONALIDAD
                  </p>
                  
                  <p className="text-xs md:text-sm text-text-sec leading-relaxed mb-6 font-medium text-pretty">
                    Montura fina con acabados rosáceos y formas curvas sutiles que aportan dinamismo e iluminan tus facciones con total delicadeza y distinción.
                  </p>

                  <motion.button 
                    onClick={() => scrollToSection('combo-builder')}
                    whileHover={{ scale: 1.03, boxShadow: "0 8px 20px -6px rgba(140, 44, 140, 0.25)" }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="w-full text-center bg-white/40 backdrop-blur-sm border border-border-neutral/60 hover:border-secondary hover:text-secondary text-text-main font-bold text-xs uppercase tracking-widest py-3.5 rounded-full transition-colors cursor-pointer"
                  >
                    Ver detalles del armazón
                  </motion.button>
                </div>

              </motion.div>

            </div>

          </div>
        </section>


        {/* 📦 8. BANNER INSTITUCIONAL / PROPUESTA DE VALOR */}
        <section id="reviews" className="py-16 md:py-24 bg-gradient-to-r from-primary-dark via-primary-dark/80 to-neutral-950 text-white relative overflow-hidden scroll-mt-20">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_70%)] pointer-events-none" />
          
          <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column - Large featured message */}
              <motion.div 
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="lg:col-span-7 flex flex-col items-start text-left"
              >

                
                {/* Featured phrase */}
                <h2 className="font-headline text-3.5xl sm:text-4.5xl lg:text-5.5xl font-black tracking-tight leading-[1.08] mb-6 text-pretty">
                  “Cuidar de tu salud visual es nuestra prioridad.”
                </h2>
                
                {/* Supporting Text */}
                <p className="text-sm md:text-base text-stone-200 font-medium leading-relaxed max-w-xl text-pretty">
                  Nos esforzamos día a día para ofrecerte lentes de la mejor calidad. Seleccionamos cuidadosamente cada polímero, bisagra y luna bajo rigurosas certificaciones para entregarte un producto que transforme de verdad tu confort digital.
                </p>
              </motion.div>

              {/* Right Column - Specified Image, completely visible */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-5 flex justify-center w-full"
              >
                <div className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
                  <div className="w-full bg-black/35 flex items-center justify-center">
                    <img 
                      src="https://i.ibb.co/QvcD5pSW/FB-IMG-1783531739451.jpg" 
                      alt="Banner Institucional Propuesta de Valor" 
                      className="w-full h-auto object-contain filter brightness-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>


        {/* 📦 9. BLOQUE DE PREVENCIÓN Y CONCIENTIZACIÓN MÉDICA */}
        <section className="py-16 bg-transparent border-t border-b border-border-neutral/10">
          <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left text column highlighting the medical message */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-7"
              >
                <div className="flex items-center gap-2 text-primary mb-4">
                  <ShieldAlert className="w-5 h-5 shrink-0 text-primary" />
                  <span className="text-[11px] font-black uppercase tracking-widest">Alerta de Salud Pública</span>
                </div>
                
                {/* Message in full uppercase exactly as provided */}
                <h3 className="font-headline text-xl sm:text-2xl md:text-4xl font-black text-text-main tracking-tight leading-tight uppercase mb-6 text-pretty">
                  EL 80% DE LOS CASOS DE CEGUERA SON PREVENIBLES SI REALIZAS UN EXAMEN VISUAL PARA UNA DETECCIÓN TEMPRANA.
                </h3>
                
                <p className="text-sm md:text-lg text-text-sec leading-relaxed max-w-xl mb-8 font-medium text-pretty">
                  Afecciones silenciosas como el glaucoma, astigmatismo avanzado o el desgaste macular no presentan síntomas notables en fases iniciales. Una valoración anual a tiempo salva tu visión.
                </p>

                <motion.button
                  onClick={() => scrollToSection('combo-builder')}
                  whileHover={{ scale: 1.04, y: -2, boxShadow: "0 12px 24px -8px rgba(0, 143, 76, 0.45)" }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="bg-primary hover:bg-primary/90 text-white font-extrabold text-xs uppercase tracking-widest py-4 px-8 rounded-full shadow-lg cursor-pointer inline-flex items-center gap-2 transition-all"
                >
                  <Heart className="w-4 h-4 fill-white text-white" />
                  <span>¡NOSOTROS CUIDAMOS DE TI!</span>
                </motion.button>
              </motion.div>

              {/* Right Column showing the specific prevention image, completely visible */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-5 flex justify-center w-full"
              >
                <div className="w-full max-w-md bg-white/40 backdrop-blur-md border border-border-neutral/50 rounded-3xl shadow-md overflow-hidden">
                  <div className="w-full bg-neutral-100 flex items-center justify-center">
                    <img 
                      src="https://i.ibb.co/pBpc9kDN/FB-IMG-1783533279236.jpg" 
                      alt="Bloque de prevención examen médico" 
                      className="w-full h-auto object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>


        {/* 📦 10. BLOQUE DE AGENDAMIENTO DE CITAS (ANTES DEL FOOTER) */}
        <section id="combo-builder" className="py-24 bg-transparent border-b border-border-neutral/10 scroll-mt-20">
          <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column: Image entirely visible with safe padding */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-5 flex justify-center w-full"
              >
                <div className="w-full max-w-md bg-white/40 backdrop-blur-md border border-border-neutral/40 rounded-3xl shadow-sm overflow-hidden">
                  <div className="w-full bg-stone-50 flex items-center justify-center">
                    <img 
                      src="https://i.ibb.co/svbm2qd7/FB-IMG-1783531774962.jpg" 
                      alt="Agendamiento de Examen Visual" 
                      className="w-full h-auto object-contain filter brightness-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Structured Text & Fully Functional Booking Form */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-7"
              >

                
                <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-main tracking-tight uppercase mb-4 text-pretty">
                  VISÍTANOS Y REALIZA TU EXAMEN VISUAL
                </h2>
                
                {/* Informative text provided exactly */}
                <p className="text-sm md:text-base text-text-sec font-medium leading-relaxed mb-8 text-pretty">
                  Un examen visual puede detectar problemas como glaucoma, miopía o cataratas a tiempo. Reserva tu turno de forma rápida, cómoda y sin esperas en nuestro centro especializado.
                </p>

                {bookingSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-primary/40 shadow-lg text-center"
                  >
                    <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    
                    <h3 className="font-bold text-lg text-text-main uppercase tracking-wide mb-1">
                      ¡CITA REGISTRADA CON ÉXITO!
                    </h3>
                    <p className="text-xs text-text-sec mb-4">
                      Tu turno ha sido confirmado. Haz clic abajo para enviar tu ticket por WhatsApp y asegurar la atención.
                    </p>

                    {/* Booking Ticket Card */}
                    <div className="bg-white/40 backdrop-blur-md border border-border-neutral/30 rounded-xl p-4 text-left max-w-sm mx-auto text-xs space-y-2 mb-4">
                      <div className="flex justify-between border-b border-border-neutral/20 pb-2">
                        <span className="font-bold text-primary">TICKET EXAMEN:</span>
                        <span className="font-mono font-bold text-stone-700">{bookingTicket}</span>
                      </div>
                      <p><strong className="text-stone-500">Paciente:</strong> {bookingName}</p>
                      <p><strong className="text-stone-500">Contacto:</strong> {bookingPhone}</p>
                      <p><strong className="text-stone-500">Fecha elegida:</strong> {bookingDate}</p>
                      <p><strong className="text-stone-500">Horario:</strong> {bookingTime}</p>
                      <div className="border-t border-border-neutral/20 pt-2 text-[10px] text-stone-500 flex items-start gap-1">
                        <MapPin className="w-3.5 h-3.5 shrink-0 text-primary" />
                        <span>Alborada 9na etapa, calle Demetrio Aguilera Malta mz 928 v 12</span>
                      </div>
                    </div>

                    {/* WhatsApp Action Button */}
                    <a
                      href={`https://wa.me/593985520233?text=${encodeURIComponent(
                        `¡Hola! He agendado un examen visual en Happy View Optics.\n\n` +
                        `*Ticket:* ${bookingTicket}\n` +
                        `*Paciente:* ${bookingName}\n` +
                        `*Contacto:* ${bookingPhone}\n` +
                        `*Fecha elegida:* ${bookingDate}\n` +
                        `*Horario:* ${bookingTime}\n\n` +
                        `Dirección: Alborada 9na etapa, calle Demetrio Aguilera Malta mz 928 v 12`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full max-w-sm mx-auto mb-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold text-xs uppercase tracking-widest py-3.5 px-6 rounded-xl transition-all items-center justify-center gap-2 shadow-lg cursor-pointer"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.182 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.479 2.016 14.01 1.016 11.998 1.016 6.558 1.016 2.13 5.388 2.127 10.82c-.001 1.778.473 3.51 1.378 5.024l-.953 3.477 3.6-.92c1.474.802 3.01 1.222 4.595 1.222l-.001-.001zm10.152-7.051c-.28-.14-1.65-.81-1.902-.902-.253-.093-.438-.14-.622.14-.184.28-.713.902-.873 1.087-.16.184-.32.205-.6.064-.28-.14-1.182-.435-2.251-1.39-1.32-.172-1.353-.102-2.205-1.118-.114-.148-.058-.243.014-.315.064-.064.14-.16.21-.24.07-.08.118-.14.184-.28.064-.14.032-.26-.014-.352-.047-.093-.438-1.056-.6-1.447-.158-.382-.333-.33-.457-.33h-.39c-.14 0-.368.052-.56.262-.192.21-.734.717-.734 1.748 0 1.03.75 2.022.854 2.162.104.14 1.478 2.258 3.58 3.166.5.216.89.346 1.196.442.502.16.96.137 1.322.083.404-.06 1.65-.674 1.882-1.326.23-.652.23-1.21.16-1.325-.07-.116-.253-.204-.533-.344z"/>
                      </svg>
                      <span>Enviar Turno por WhatsApp</span>
                    </a>

                    <div className="block mt-1">
                      <button
                        onClick={resetBooking}
                        className="text-xs text-primary font-extrabold hover:underline"
                      >
                        Agendar otra cita
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="bg-white/30 backdrop-blur-2xl p-6 sm:p-10 rounded-[2.5rem] border border-white/40 shadow-2xl space-y-6">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Name input */}
                      <div>
                        <label className="block text-[11px] uppercase font-black tracking-widest text-text-sec mb-2 ml-1">Nombre Completo:</label>
                        <div className="relative group">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-stone-400 group-focus-within:text-primary transition-colors" />
                          <input 
                            type="text" 
                            required
                            placeholder="Ej. Juan Pérez" 
                            value={bookingName}
                            onChange={(e) => setBookingName(e.target.value)}
                            className="w-full bg-white/40 backdrop-blur-md border border-white/30 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-text-main focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-stone-300"
                          />
                        </div>
                      </div>

                      {/* Phone input */}
                      <div>
                        <label className="block text-[11px] uppercase font-black tracking-widest text-text-sec mb-2 ml-1">Teléfono Celular:</label>
                        <div className="relative group">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-stone-400 group-focus-within:text-primary transition-colors" />
                          <input 
                            type="tel" 
                            required
                            placeholder="Ej. 0991234567" 
                            value={bookingPhone}
                            onChange={(e) => setBookingPhone(e.target.value)}
                            className="w-full bg-white/40 backdrop-blur-md border border-white/30 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-text-main focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-stone-300"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Date input */}
                      <div>
                        <label className="block text-[11px] uppercase font-black tracking-widest text-text-sec mb-2 ml-1">Fecha de Visita:</label>
                        <div className="relative group">
                          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-stone-400 group-focus-within:text-primary transition-colors" />
                          <input 
                            type="date" 
                            required
                            value={bookingDate}
                            onChange={(e) => setBookingDate(e.target.value)}
                            className="w-full bg-white/40 backdrop-blur-md border border-white/30 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-text-main focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                          />
                        </div>
                      </div>

                      {/* Time Slot input */}
                      <div>
                        <label className="block text-[11px] uppercase font-black tracking-widest text-text-sec mb-2 ml-1">Rango Horario:</label>
                        <div className="relative group">
                          <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-stone-400 group-focus-within:text-primary transition-colors" />
                          <select 
                            value={bookingTime}
                            onChange={(e) => setBookingTime(e.target.value)}
                            className="w-full bg-white/40 backdrop-blur-md border border-white/30 rounded-2xl py-3.5 pl-12 pr-10 text-sm text-text-main focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all appearance-none cursor-pointer"
                          >
                            <option value="10:00 AM - 12:00 PM">Mañana: 10:00 AM - 12:00 PM</option>
                            <option value="12:00 PM - 02:00 PM">Mediodía: 12:00 PM - 02:00 PM</option>
                            <option value="02:00 PM - 04:00 PM">Tarde: 02:00 PM - 04:00 PM</option>
                            <option value="04:00 PM - 06:30 PM">Tarde/Noche: 04:00 PM - 06:30 PM</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.01, y: -2, boxShadow: "0 20px 40px -10px rgba(0, 143, 76, 0.4)" }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      className="w-full bg-primary hover:bg-darkgreen text-white font-black text-sm uppercase tracking-widest py-4.5 px-6 rounded-2xl transition-all shadow-xl cursor-pointer mt-2"
                    >
                      Reservar Mi Turno Visual
                    </motion.button>

                  </form>
                )}

              </motion.div>

            </div>

          </div>
        </section>

      </main>

      {/* ================= 🌍 GLOBAL COMPONENTE: PIE DE PÁGINA (FOOTER) ================= */}
      <footer className="w-full bg-neutral-950 text-white pt-16 pb-12 border-t border-neutral-800">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-12">
          
          {/* Logo & Slogan */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img 
                src="https://i.ibb.co/1tLd5swS/1000186513-removebg-preview.png" 
                alt="Happy View Optics Logo" 
                referrerPolicy="no-referrer"
                className="h-9 w-auto object-contain brightness-110" 
              />
              <span className="font-headline font-black text-xl text-white tracking-tight uppercase">
                Happy View Optics
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed font-semibold max-w-sm">
              Soluciones profesionales para el cuidado de la salud visual en Guayaquil. Ofrecemos lunas bifocales, fotocromáticas y de protección contra luz azul de la más alta calidad óptica.
            </p>
          </div>

          {/* Specified Header: VISÍTANOS / TE ESPERAMOS and static physical address */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <h4 className="font-headline font-black text-lg text-secondary uppercase tracking-wider">
              VISÍTANOS / TE ESPERAMOS
            </h4>
            
            <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
              <div className="flex gap-3.5 items-start">
                <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/40 text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h5 className="font-bold text-xs uppercase tracking-wide text-white mb-1">Dirección Física Principal:</h5>
                  {/* Static address requested by the user */}
                  <p className="text-xs text-stone-300 leading-relaxed select-all">
                    Guayaquil, Alborada 9na etapa, calle Demetrio Aguilera Malta mz 928 v 12
                  </p>
                </div>
              </div>

              <button 
                onClick={() => scrollToSection('combo-builder')}
                className="bg-white/10 hover:bg-white/20 text-white text-[10px] font-black uppercase tracking-widest px-4 py-3 rounded-lg border border-white/20 shrink-0 transition-colors cursor-pointer w-full md:w-auto"
              >
                ¿Cómo Llegar?
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright legal footer */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16 border-t border-neutral-900 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-stone-500 font-bold text-pretty text-center sm:text-left">
          <p>© 2026 Happy View Optics. Todos los derechos reservados. Monturas 100% Reales.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Términos y Condiciones</a>
            <a href="#" className="hover:underline">Políticas de Salud</a>
          </div>
        </div>
      </footer>

      {/* Background Blobs for Glassmorphism pop */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] left-[20%] w-[25%] h-[25%] bg-secondary/5 rounded-full blur-[90px]" />
      </div>

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/593985520233?text=Hola!%20Quisiera%20recibir%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20lentes%20y%20ex%C3%A1menes%20visuales."
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-[#25D366] text-white p-3 sm:p-4 rounded-full shadow-2xl flex items-center justify-center cursor-pointer transition-all hover:bg-[#20ba5a]"
        style={{ boxShadow: '0 10px 25px -5px rgba(0, 143, 76, 0.4), 0 8px 10px -6px rgba(0, 143, 76, 0.4)' }}
        aria-label="Contactar por WhatsApp"
      >
        <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.182 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.479 2.016 14.01 1.016 11.998 1.016 6.558 1.016 2.13 5.388 2.127 10.82c-.001 1.778.473 3.51 1.378 5.024l-.953 3.477 3.6-.92c1.474.802 3.01 1.222 4.595 1.222l-.001-.001zm10.152-7.051c-.28-.14-1.65-.81-1.902-.902-.253-.093-.438-.14-.622.14-.184.28-.713.902-.873 1.087-.16.184-.32.205-.6.064-.28-.14-1.182-.435-2.251-1.39-1.32-.172-1.353-.102-2.205-1.118-.114-.148-.058-.243.014-.315.064-.064.14-.16.21-.24.07-.08.118-.14.184-.28.064-.14.032-.26-.014-.352-.047-.093-.438-1.056-.6-1.447-.158-.382-.333-.33-.457-.33h-.39c-.14 0-.368.052-.56.262-.192.21-.734.717-.734 1.748 0 1.03.75 2.022.854 2.162.104.14 1.478 2.258 3.58 3.166.5.216.89.346 1.196.442.502.16.96.137 1.322.083.404-.06 1.65-.674 1.882-1.326.23-.652.23-1.21.16-1.325-.07-.116-.253-.204-.533-.344z"/>
        </svg>
      </motion.a>

    </div>
  );
}
