import React, { useState, useEffect } from 'react';
import { FRAME_MODELS, FRAME_SHAPES, LENS_OPTIONS } from '../data';
import { FrameModel, FrameColor, FrameShape, LensOption, FrameCustomization, ComboOrder } from '../types';
import { 
  Sparkles, Check, ChevronRight, ShoppingBag, 
  User, Mail, Phone, MapPin, Shield, Lock, CreditCard 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ComboBuilderProps {
  onOrderPlaced: (order: ComboOrder) => void;
  selectedModelFromCatalog: FrameModel | null;
  selectedColorFromCatalog: FrameColor | null;
  onClearSelection: () => void;
}

export default function ComboBuilder({ 
  onOrderPlaced, 
  selectedModelFromCatalog, 
  selectedColorFromCatalog,
  onClearSelection
}: ComboBuilderProps) {
  // Tabs: 'pair1' or 'pair2' or 'checkout'
  const [activeTab, setActiveTab] = useState<'pair1' | 'pair2' | 'checkout'>('pair1');

  // Pair 1 Customization State
  const [p1Model, setP1Model] = useState<FrameModel>(FRAME_MODELS[0]);
  const [p1Shape, setP1Shape] = useState<FrameShape>(FRAME_SHAPES[0]);
  const [p1Color, setP1Color] = useState<FrameColor>(FRAME_MODELS[0].colors[0]);
  const [p1Lens, setP1Lens] = useState<LensOption>(LENS_OPTIONS[0]);

  // Pair 2 Customization State
  const [p2Model, setP2Model] = useState<FrameModel>(FRAME_MODELS[1]);
  const [p2Shape, setP2Shape] = useState<FrameShape>(FRAME_SHAPES[0]);
  const [p2Color, setP2Color] = useState<FrameColor>(FRAME_MODELS[1].colors[0]);
  const [p2Lens, setP2Lens] = useState<LensOption>(LENS_OPTIONS[0]);

  // Shipping Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Monitor catalog imports
  useEffect(() => {
    if (selectedModelFromCatalog && selectedColorFromCatalog) {
      if (activeTab === 'pair1') {
        setP1Model(selectedModelFromCatalog);
        setP1Color(selectedColorFromCatalog);
        // default a matching shape if current shape not supported
        const supported = selectedModelFromCatalog.shapes;
        const matchingShape = FRAME_SHAPES.find(s => supported.includes(s.id)) || FRAME_SHAPES[0];
        setP1Shape(matchingShape);
      } else {
        setP2Model(selectedModelFromCatalog);
        setP2Color(selectedColorFromCatalog);
        const supported = selectedModelFromCatalog.shapes;
        const matchingShape = FRAME_SHAPES.find(s => supported.includes(s.id)) || FRAME_SHAPES[0];
        setP2Shape(matchingShape);
      }
      onClearSelection(); // Reset catalog import trigger
    }
  }, [selectedModelFromCatalog, selectedColorFromCatalog]);

  // Automatically update active colors when model changes
  const handleModelChange = (pairNum: 1 | 2, model: FrameModel) => {
    if (pairNum === 1) {
      setP1Model(model);
      setP1Color(model.colors[0]);
      // Update shape to first supported shape
      const defaultShape = FRAME_SHAPES.find((s) => model.shapes.includes(s.id)) || FRAME_SHAPES[0];
      setP1Shape(defaultShape);
    } else {
      setP2Model(model);
      setP2Color(model.colors[0]);
      const defaultShape = FRAME_SHAPES.find((s) => model.shapes.includes(s.id)) || FRAME_SHAPES[0];
      setP2Shape(defaultShape);
    }
  };

  // Pricing calculations
  // Combo offer: 2 glasses for $60 base. 
  // Custom lenses add up. Premium frame models (like Titanium with basePrice > 35) can add a small premium (+5)
  const baseComboPrice = 60;
  const p1Premium = p1Model.basePrice > 35 ? (p1Model.basePrice - 35) : 0;
  const p2Premium = p2Model.basePrice > 35 ? (p2Model.basePrice - 35) : 0;
  
  const extrasPrice = p1Lens.priceModifier + p2Lens.priceModifier + p1Premium + p2Premium;
  const totalPrice = baseComboPrice + extrasPrice;

  // Validate and submit order
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!name.trim()) errors.name = 'El nombre es requerido';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) errors.email = 'Escribe un email válido';
    if (!phone.trim()) errors.phone = 'El teléfono es requerido';
    if (!address.trim()) errors.address = 'La dirección de envío es requerida';
    if (!city.trim()) errors.city = 'La ciudad es requerida';
    if (!postalCode.trim()) errors.postalCode = 'El código postal es requerido';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});

    const p1Custom: FrameCustomization = {
      model: p1Model,
      shape: p1Shape,
      color: p1Color,
      lens: p1Lens
    };

    const p2Custom: FrameCustomization = {
      model: p2Model,
      shape: p2Shape,
      color: p2Color,
      lens: p2Lens
    };

    const randomId = `HV-${Math.floor(1000000 + Math.random() * 9000000)}`;

    const newOrder: ComboOrder = {
      id: randomId,
      pair1: p1Custom,
      pair2: p2Custom,
      price: totalPrice,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      shippingAddress: address,
      city,
      postalCode,
      date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
      status: 'pending'
    };

    // Trigger parent success
    onOrderPlaced(newOrder);

    // Reset forms
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setCity('');
    setPostalCode('');
    setActiveTab('pair1');
  };

  // Helper to render dynamic SVG representation of glasses in previewer
  const renderGlassesSVG = (shapeId: string, colorHex: string, lensId: string) => {
    const isSunTint = lensId === 'tint';
    
    // Lens fill color based on type
    const lensFill = isSunTint 
      ? 'rgba(217, 119, 6, 0.4)' // Amber Tinted
      : 'rgba(59, 130, 246, 0.08)'; // Clear BlueBlock sheen
      
    const reflectionColor = 'rgba(255, 255, 255, 0.4)';

    return (
      <svg viewBox="0 0 200 80" className="w-full h-auto max-w-[200px]" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.15))' }}>
        {/* Bridge */}
        <path d="M 90 28 Q 100 18 110 28" fill="none" stroke={colorHex} strokeWidth="5" strokeLinecap="round" />
        
        {/* Temples (Slight visible wings on side) */}
        <path d="M 12 30 Q 3 32 3 45" fill="none" stroke={colorHex} strokeWidth="3" strokeLinecap="round" />
        <path d="M 188 30 Q 197 32 197 45" fill="none" stroke={colorHex} strokeWidth="3" strokeLinecap="round" />

        {shapeId === 'round' && (
          <>
            {/* Left Frame & Lens */}
            <circle cx="53" cy="35" r="23" fill={lensFill} stroke={colorHex} strokeWidth="5.5" />
            <path d="M 37 25 L 63 15" stroke={reflectionColor} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
            {/* Right Frame & Lens */}
            <circle cx="147" cy="35" r="23" fill={lensFill} stroke={colorHex} strokeWidth="5.5" />
            <path d="M 131 25 L 157 15" stroke={reflectionColor} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          </>
        )}

        {shapeId === 'square' && (
          <>
            {/* Left Frame & Lens */}
            <rect x="28" y="15" width="48" height="40" rx="8" fill={lensFill} stroke={colorHex} strokeWidth="5.5" />
            <path d="M 33 25 L 60 18" stroke={reflectionColor} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
            {/* Right Frame & Lens */}
            <rect x="124" y="15" width="48" height="40" rx="8" fill={lensFill} stroke={colorHex} strokeWidth="5.5" />
            <path d="M 129 25 L 156 18" stroke={reflectionColor} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          </>
        )}

        {shapeId === 'clubmaster' && (
          <>
            {/* Left Frame Lens */}
            <path d="M 28 18 Q 50 12 74 18 L 70 48 Q 48 55 32 48 Z" fill={lensFill} stroke={colorHex} strokeWidth="2.5" />
            {/* Thick top brow */}
            <path d="M 25 18 Q 50 11 76 18" fill="none" stroke={colorHex} strokeWidth="6" strokeLinecap="round" />
            <path d="M 32 24 L 56 18" stroke={reflectionColor} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />

            {/* Right Frame Lens */}
            <path d="M 126 18 Q 150 12 172 18 L 168 48 Q 146 55 130 48 Z" fill={lensFill} stroke={colorHex} strokeWidth="2.5" />
            {/* Thick top brow */}
            <path d="M 124 18 Q 150 11 175 18" fill="none" stroke={colorHex} strokeWidth="6" strokeLinecap="round" />
            <path d="M 130 24 L 154 18" stroke={reflectionColor} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
          </>
        )}

        {shapeId === 'aviator' && (
          <>
            {/* Left Teardrop Frame */}
            <path d="M 28 20 Q 52 14 74 20 L 71 44 Q 50 56 31 44 Z" fill={lensFill} stroke={colorHex} strokeWidth="4" />
            <path d="M 35 25 L 60 20" stroke={reflectionColor} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
            {/* Right Teardrop Frame */}
            <path d="M 126 20 Q 148 14 172 20 L 169 44 Q 148 56 129 44 Z" fill={lensFill} stroke={colorHex} strokeWidth="4" />
            <path d="M 133 25 L 158 20" stroke={reflectionColor} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
            
            {/* Double Top bar bridge */}
            <line x1="72" y1="18" x2="128" y2="18" stroke={colorHex} strokeWidth="3.5" />
          </>
        )}
      </svg>
    );
  };

  return (
    <div className="bg-white rounded-[2.5rem] p-6 md:p-8 lg:p-12 border border-outline-variant shadow-md max-w-6xl mx-auto">
      
      {/* Combo Builder Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-outline-variant/40 pb-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-secondary-container/25 text-secondary px-3.5 py-1 rounded-full text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Configurador del Combo Especial</span>
          </div>
          <h2 className="font-headline text-3xl md:text-4xl text-on-surface">
            Arma Tu Combo <span className="text-primary italic">2 x $60</span>
          </h2>
          <p className="text-sm text-on-surface-variant max-w-xl">
            Selecciona el modelo, color, silueta y tipo de lente para cada una de tus gafas. Recibe estuches de regalo y envío totalmente gratis.
          </p>
        </div>

        {/* Total Pricing Floating Counter */}
        <div className="bg-primary/5 border border-primary/20 px-6 py-3 rounded-2xl flex flex-col items-end shrink-0">
          <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Precio Combo Personalizado</span>
          <div className="flex items-baseline gap-1">
            <span className="font-headline text-3xl font-extrabold text-primary">${totalPrice}</span>
            <span className="text-xs text-on-surface-variant font-medium">USD</span>
          </div>
          <span className="text-[10px] text-emerald-600 font-bold">¡Envío Gratis Incluido!</span>
        </div>
      </div>

      {/* Grid: Customizer Panel vs Preview & Bill Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Customization Tabs and Option Selectors */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Customizer Tabs */}
          <div className="flex bg-surface-container-low p-1.5 rounded-2xl border border-outline-variant/55">
            <button
              onClick={() => setActiveTab('pair1')}
              className={`flex-1 py-3.5 rounded-xl font-bold text-xs md:text-sm transition-all flex items-center justify-center gap-2 ${
                activeTab === 'pair1'
                  ? 'bg-primary text-white shadow-md'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-white/50'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center text-[10px]">1</span>
              <span>Gafa #1: {p1Model.name}</span>
            </button>
            <button
              onClick={() => setActiveTab('pair2')}
              className={`flex-1 py-3.5 rounded-xl font-bold text-xs md:text-sm transition-all flex items-center justify-center gap-2 ${
                activeTab === 'pair2'
                  ? 'bg-secondary text-white shadow-md'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-white/50'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center text-[10px]">2</span>
              <span>Gafa #2: {p2Model.name}</span>
            </button>
            <button
              onClick={() => setActiveTab('checkout')}
              className={`flex-1 py-3.5 rounded-xl font-bold text-xs md:text-sm transition-all flex items-center justify-center gap-2 ${
                activeTab === 'checkout'
                  ? 'bg-neutral-800 text-white shadow-md'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-white/50'
              }`}
            >
              <span>Continuar</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <AnimatePresence mode="wait">
            
            {/* Customize Gafa 1 */}
            {activeTab === 'pair1' && (
              <motion.div
                key="p1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex flex-col gap-6"
              >
                {/* 1. Model Selector */}
                <div>
                  <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block mb-3">
                    A. Selecciona el Modelo de Montura:
                  </span>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {FRAME_MODELS.map((model) => {
                      const isSelected = p1Model.id === model.id;
                      return (
                        <button
                          key={model.id}
                          onClick={() => handleModelChange(1, model)}
                          className={`p-3 rounded-xl border text-left flex flex-col justify-between h-24 transition-all ${
                            isSelected
                              ? 'border-primary bg-primary/5 ring-1 ring-primary'
                              : 'border-outline-variant bg-white hover:bg-stone-50'
                          }`}
                        >
                          <span className="font-semibold text-xs text-on-surface leading-tight truncate">{model.name}</span>
                          <span className="text-[10px] text-on-surface-variant leading-relaxed truncate">{model.material}</span>
                          <div className="flex justify-between items-center w-full mt-2">
                            <span className="text-xs font-bold text-primary">${model.basePrice}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-primary" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Lens Option Selector */}
                <div>
                  <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block mb-3">
                    B. Selecciona el Tipo de Lente BlueBlock:
                  </span>
                  <div className="flex flex-col gap-2.5">
                    {LENS_OPTIONS.map((lens) => {
                      const isSelected = p1Lens.id === lens.id;
                      return (
                        <button
                          key={lens.id}
                          onClick={() => setP1Lens(lens)}
                          className={`p-4 rounded-xl border text-left flex justify-between items-center transition-all ${
                            isSelected
                              ? 'border-primary bg-primary/5 ring-1 ring-primary'
                              : 'border-outline-variant bg-white hover:bg-stone-50'
                          }`}
                        >
                          <div className="max-w-[80%]">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-xs text-on-surface">{lens.name}</span>
                              {lens.priceModifier === 0 ? (
                                <span className="bg-emerald-100 text-emerald-800 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded">Incluido</span>
                              ) : (
                                <span className="bg-secondary/10 text-secondary text-[9px] font-extrabold uppercase px-2 py-0.5 rounded">Premium</span>
                              )}
                            </div>
                            <p className="text-[10px] text-on-surface-variant leading-relaxed mt-1">
                              {lens.description}
                            </p>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="font-bold text-xs text-on-surface">
                              {lens.priceModifier === 0 ? 'Sin cargo' : `+$${lens.priceModifier} USD`}
                            </span>
                            {isSelected && <Check className="w-4 h-4 text-primary mt-1" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* CTA Next */}
                <button
                  onClick={() => setActiveTab('pair2')}
                  className="bg-primary text-white py-3.5 rounded-full font-bold text-sm shadow-md hover:bg-primary-container transition-all flex items-center justify-center gap-2"
                >
                  <span>Siguiente: Personalizar Gafa #2</span>
                  <ChevronRight className="w-4.5 h-4.5" />
                </button>
              </motion.div>
            )}

            {/* Customize Gafa 2 */}
            {activeTab === 'pair2' && (
              <motion.div
                key="p2"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex flex-col gap-6"
              >
                {/* 1. Model Selector */}
                <div>
                  <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block mb-3">
                    A. Selecciona el Modelo de Montura:
                  </span>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {FRAME_MODELS.map((model) => {
                      const isSelected = p2Model.id === model.id;
                      return (
                        <button
                          key={model.id}
                          onClick={() => handleModelChange(2, model)}
                          className={`p-3 rounded-xl border text-left flex flex-col justify-between h-24 transition-all ${
                            isSelected
                              ? 'border-secondary bg-secondary/5 ring-1 ring-secondary'
                              : 'border-outline-variant bg-white hover:bg-stone-50'
                          }`}
                        >
                          <span className="font-semibold text-xs text-on-surface leading-tight truncate">{model.name}</span>
                          <span className="text-[10px] text-on-surface-variant leading-relaxed truncate">{model.material}</span>
                          <div className="flex justify-between items-center w-full mt-2">
                            <span className="text-xs font-bold text-secondary">${model.basePrice}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-secondary" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Lens Option Selector */}
                <div>
                  <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block mb-3">
                    B. Selecciona el Tipo de Lente BlueBlock:
                  </span>
                  <div className="flex flex-col gap-2.5">
                    {LENS_OPTIONS.map((lens) => {
                      const isSelected = p2Lens.id === lens.id;
                      return (
                        <button
                          key={lens.id}
                          onClick={() => setP2Lens(lens)}
                          className={`p-4 rounded-xl border text-left flex justify-between items-center transition-all ${
                            isSelected
                              ? 'border-secondary bg-secondary/5 ring-1 ring-secondary'
                              : 'border-outline-variant bg-white hover:bg-stone-50'
                          }`}
                        >
                          <div className="max-w-[80%]">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-xs text-on-surface">{lens.name}</span>
                              {lens.priceModifier === 0 ? (
                                <span className="bg-emerald-100 text-emerald-800 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded">Incluido</span>
                              ) : (
                                <span className="bg-secondary/10 text-secondary text-[9px] font-extrabold uppercase px-2 py-0.5 rounded">Premium</span>
                              )}
                            </div>
                            <p className="text-[10px] text-on-surface-variant leading-relaxed mt-1">
                              {lens.description}
                            </p>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="font-bold text-xs text-on-surface">
                              {lens.priceModifier === 0 ? 'Sin cargo' : `+$${lens.priceModifier} USD`}
                            </span>
                            {isSelected && <Check className="w-4 h-4 text-secondary mt-1" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* CTA Next */}
                <button
                  onClick={() => setActiveTab('checkout')}
                  className="bg-secondary text-white py-3.5 rounded-full font-bold text-sm shadow-md hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
                >
                  <span>Siguiente: Formulario de Envío</span>
                  <ChevronRight className="w-4.5 h-4.5" />
                </button>
              </motion.div>
            )}

            {/* Slide-out Checkout Form */}
            {activeTab === 'checkout' && (
              <motion.form
                key="checkout"
                onSubmit={handlePlaceOrder}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="flex flex-col gap-5 bg-surface-container-low p-5 md:p-6 rounded-2xl border border-outline-variant/60"
              >
                <div className="flex items-center gap-2 border-b border-outline-variant/40 pb-3 mb-2">
                  <ShoppingBag className="w-5 h-5 text-primary" />
                  <h4 className="font-bold text-sm text-on-surface uppercase tracking-wider">
                    Información de Envío
                  </h4>
                </div>

                {/* Input Fields Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-on-surface-variant flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-stone-400" /> Nombre Completo
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Juan Pérez"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full p-2.5 rounded-xl border text-xs bg-white focus:outline-none focus:ring-1 focus:ring-primary ${
                        formErrors.name ? 'border-red-500' : 'border-outline-variant'
                      }`}
                    />
                    {formErrors.name && <span className="text-[10px] text-red-500">{formErrors.name}</span>}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-on-surface-variant flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-stone-400" /> Correo Electrónico
                    </label>
                    <input
                      type="email"
                      placeholder="Ej. juan@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full p-2.5 rounded-xl border text-xs bg-white focus:outline-none focus:ring-1 focus:ring-primary ${
                        formErrors.email ? 'border-red-500' : 'border-outline-variant'
                      }`}
                    />
                    {formErrors.email && <span className="text-[10px] text-red-500">{formErrors.email}</span>}
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-on-surface-variant flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-stone-400" /> Teléfono Móvil
                    </label>
                    <input
                      type="tel"
                      placeholder="Ej. +34 612 345 678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`w-full p-2.5 rounded-xl border text-xs bg-white focus:outline-none focus:ring-1 focus:ring-primary ${
                        formErrors.phone ? 'border-red-500' : 'border-outline-variant'
                      }`}
                    />
                    {formErrors.phone && <span className="text-[10px] text-red-500">{formErrors.phone}</span>}
                  </div>

                  {/* Address */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-on-surface-variant flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" /> Dirección de Calle
                    </label>
                    <input
                      type="text"
                      placeholder="Calle Gran Vía 42, Piso 3A"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className={`w-full p-2.5 rounded-xl border text-xs bg-white focus:outline-none focus:ring-1 focus:ring-primary ${
                        formErrors.address ? 'border-red-500' : 'border-outline-variant'
                      }`}
                    />
                    {formErrors.address && <span className="text-[10px] text-red-500">{formErrors.address}</span>}
                  </div>

                  {/* City */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-on-surface-variant flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" /> Ciudad / Provincia
                    </label>
                    <input
                      type="text"
                      placeholder="Madrid"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className={`w-full p-2.5 rounded-xl border text-xs bg-white focus:outline-none focus:ring-1 focus:ring-primary ${
                        formErrors.city ? 'border-red-500' : 'border-outline-variant'
                      }`}
                    />
                    {formErrors.city && <span className="text-[10px] text-red-500">{formErrors.city}</span>}
                  </div>

                  {/* Postal Code */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-on-surface-variant flex items-center gap-1">
                      Código Postal
                    </label>
                    <input
                      type="text"
                      placeholder="28013"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className={`w-full p-2.5 rounded-xl border text-xs bg-white focus:outline-none focus:ring-1 focus:ring-primary ${
                        formErrors.postalCode ? 'border-red-500' : 'border-outline-variant'
                      }`}
                    />
                    {formErrors.postalCode && <span className="text-[10px] text-red-500">{formErrors.postalCode}</span>}
                  </div>
                </div>

                {/* Trust Elements */}
                <div className="grid grid-cols-2 gap-3 mt-2 border-t border-b border-outline-variant/30 py-3 text-[10px] text-on-surface-variant">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Garantía de Satisfacción 30 Días</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-semibold">
                    <Lock className="w-4 h-4 text-primary shrink-0" />
                    <span>Pago Seguro y Encriptado SSL</span>
                  </div>
                </div>

                {/* Payment Simulated Detail */}
                <div className="bg-white/60 p-3 rounded-xl border border-outline-variant/30 text-[11px] text-on-surface-variant flex items-center gap-2">
                  <CreditCard className="w-4.5 h-4.5 text-primary" />
                  <span>Método de pago: <strong>Contra reembolso / Envío gratuito</strong>. Paga cómodamente al recibir tus gafas.</span>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-4 rounded-full font-bold text-sm shadow-md hover:bg-primary-container transition-all flex items-center justify-center gap-2 mt-2"
                >
                  <span>Finalizar Pedido de Combo por ${totalPrice} USD</span>
                </button>
              </motion.form>
            )}

          </AnimatePresence>

        </div>

        {/* Right Side: Combo Dynamic Previewer & Bill Summary */}
        <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-24">
          
          <div className="bg-surface-container-low border border-outline-variant/70 rounded-3xl p-6 flex flex-col gap-6">
            <h4 className="font-bold text-sm text-on-surface uppercase tracking-wider flex items-center gap-2 border-b border-outline-variant/40 pb-3">
              <ShoppingBag className="w-4.5 h-4.5 text-primary" />
              Vista Previa de Tus Gafas
            </h4>

            {/* Dynamic Glass Graphics display */}
            <div className="flex flex-col gap-4">
              
              {/* Pair 1 Graphic */}
              <div className="bg-white rounded-2xl border border-outline-variant/40 p-4.5 flex flex-col items-center relative overflow-hidden group">
                <div className="absolute top-2.5 left-2.5 bg-primary/10 text-primary text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full">
                  Gafa #1
                </div>
                
                {/* SVG Live Render */}
                <div className="py-4 w-full flex justify-center">
                  {renderGlassesSVG(p1Shape.id, p1Color.hex, p1Lens.id)}
                </div>

                <div className="text-center">
                  <p className="text-xs font-bold text-on-surface">{p1Model.name} — {p1Shape.name}</p>
                  <p className="text-[10px] text-on-surface-variant font-medium mt-0.5">
                    Acetato {p1Color.name} | {p1Lens.name}
                  </p>
                </div>
              </div>

              {/* Pair 2 Graphic */}
              <div className="bg-white rounded-2xl border border-outline-variant/40 p-4.5 flex flex-col items-center relative overflow-hidden group">
                <div className="absolute top-2.5 left-2.5 bg-secondary/10 text-secondary text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full">
                  Gafa #2
                </div>

                {/* SVG Live Render */}
                <div className="py-4 w-full flex justify-center">
                  {renderGlassesSVG(p2Shape.id, p2Color.hex, p2Lens.id)}
                </div>

                <div className="text-center">
                  <p className="text-xs font-bold text-on-surface">{p2Model.name} — {p2Shape.name}</p>
                  <p className="text-[10px] text-on-surface-variant font-medium mt-0.5">
                    Acetato {p2Color.name} | {p2Lens.name}
                  </p>
                </div>
              </div>

            </div>

            {/* Pricing Breakdown */}
            <div className="flex flex-col gap-2.5 border-t border-outline-variant/40 pt-4 text-xs font-body-md">
              <div className="flex justify-between text-on-surface-variant">
                <span>Base Combo (2 Gafas Estándar)</span>
                <span className="font-bold text-on-surface">$60.00 USD</span>
              </div>

              {/* Lens modifications & Premium frame upgrades list */}
              {p1Lens.priceModifier > 0 && (
                <div className="flex justify-between text-on-surface-variant">
                  <span className="flex items-center gap-1">Lentes {p1Lens.name} (Gafa 1)</span>
                  <span className="font-bold text-on-surface">+${p1Lens.priceModifier.toFixed(2)} USD</span>
                </div>
              )}
              {p2Lens.priceModifier > 0 && (
                <div className="flex justify-between text-on-surface-variant">
                  <span className="flex items-center gap-1">Lentes {p2Lens.name} (Gafa 2)</span>
                  <span className="font-bold text-on-surface">+${p2Lens.priceModifier.toFixed(2)} USD</span>
                </div>
              )}
              {p1Premium > 0 && (
                <div className="flex justify-between text-on-surface-variant">
                  <span>Suplemento montura premium (Gafa 1: {p1Model.name})</span>
                  <span className="font-bold text-on-surface">+${p1Premium.toFixed(2)} USD</span>
                </div>
              )}
              {p2Premium > 0 && (
                <div className="flex justify-between text-on-surface-variant">
                  <span>Suplemento montura premium (Gafa 2: {p2Model.name})</span>
                  <span className="font-bold text-on-surface">+${p2Premium.toFixed(2)} USD</span>
                </div>
              )}

              <div className="flex justify-between text-on-surface-variant">
                <span>Envío Courier Express</span>
                <span className="font-bold text-emerald-600">GRATIS</span>
              </div>

              <div className="flex justify-between text-sm font-bold border-t border-dashed border-outline-variant/60 pt-3 text-on-surface">
                <span>Total Estimado</span>
                <span className="text-primary font-headline text-lg">${totalPrice.toFixed(2)} USD</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
