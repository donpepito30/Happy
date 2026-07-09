import { useState } from 'react';
import { FRAME_MODELS, FRAME_SHAPES } from '../data';
import { FrameModel, FrameColor } from '../types';
import { Star, Shield, Filter, Eye, Layers, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CatalogGridProps {
  onSelectForCombo: (model: FrameModel, color: FrameColor) => void;
}

export default function CatalogGrid({ onSelectForCombo }: CatalogGridProps) {
  const [selectedShapeFilter, setSelectedShapeFilter] = useState<string>('all');
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  // Keep track of the active color selected *locally* for each product card
  const [selectedColors, setSelectedColors] = useState<Record<string, FrameColor>>(() => {
    const initial: Record<string, FrameColor> = {};
    FRAME_MODELS.forEach((m) => {
      initial[m.id] = m.colors[0];
    });
    return initial;
  });

  const handleColorSelect = (productId: string, color: FrameColor) => {
    setSelectedColors((prev) => ({
      ...prev,
      [productId]: color
    }));
  };

  // Filter products based on shape eligibility
  const filteredProducts = selectedShapeFilter === 'all'
    ? FRAME_MODELS
    : FRAME_MODELS.filter((m) => m.shapes.includes(selectedShapeFilter));

  return (
    <div className="w-full">
      {/* Filters bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h3 className="font-headline-md text-2xl text-on-surface">
            Nuestra Colección BlueBlock
          </h3>
          <p className="text-sm text-on-surface-variant">
            Gafas diseñadas en Europa con ingeniería oftalmológica de primer nivel.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-bold text-on-surface-variant flex items-center gap-1 mr-2">
            <Filter className="w-3.5 h-3.5" /> Filtrar Silueta:
          </span>
          <button
            onClick={() => setSelectedShapeFilter('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              selectedShapeFilter === 'all'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-white border border-outline-variant/60 text-on-surface-variant hover:bg-stone-50'
            }`}
          >
            Todos
          </button>
          {FRAME_SHAPES.map((shape) => (
            <button
              key={shape.id}
              onClick={() => setSelectedShapeFilter(shape.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedShapeFilter === shape.id
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-white border border-outline-variant/60 text-on-surface-variant hover:bg-stone-50'
              }`}
            >
              {shape.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-7">
        {filteredProducts.map((product) => {
          const activeColor = selectedColors[product.id] || product.colors[0];
          
          return (
            <motion.div
              layout
              key={product.id}
              onMouseEnter={() => setHoveredCardId(product.id)}
              onMouseLeave={() => setHoveredCardId(null)}
              className="bg-white rounded-2xl border border-outline-variant/60 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group relative"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] bg-surface-container-low overflow-hidden flex items-center justify-center p-4">
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                  {product.featured && (
                    <span className="bg-secondary text-white text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>Más Vendido</span>
                    </span>
                  )}
                  <span className="bg-white/80 backdrop-blur-md text-on-surface-variant border border-outline-variant/40 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                    {product.material}
                  </span>
                </div>

                {/* Rating badge */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-on-surface text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm border border-outline-variant/30 z-10">
                  <Star className="w-3 h-3 fill-amber-400 stroke-amber-500" />
                  <span>{product.rating}</span>
                </div>

                {/* Product Image with responsive hover zooms */}
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-105"
                />

                {/* Glass reflection graphic effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none opacity-60 group-hover:translate-x-12 transition-transform duration-1000" />
              </div>

              {/* Product Info */}
              <div className="p-5 flex-1 flex flex-col">
                <h4 className="font-headline-md text-lg text-on-surface tracking-tight leading-snug mb-1 group-hover:text-primary transition-colors">
                  {product.name}
                </h4>
                
                <p className="text-xs text-on-surface-variant font-body-md line-clamp-2 mb-4 leading-relaxed flex-1">
                  {product.description}
                </p>

                {/* Colors Selectors */}
                <div className="mb-4">
                  <span className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block mb-1.5">
                    Color: <span className="text-on-surface font-semibold">{activeColor.name}</span>
                  </span>
                  <div className="flex gap-2">
                    {product.colors.map((color) => {
                      const isSelected = activeColor.name === color.name;
                      return (
                        <button
                          key={color.name}
                          onClick={() => handleColorSelect(product.id, color)}
                          style={{ backgroundColor: color.hex }}
                          className={`w-5 h-5 rounded-full transition-all relative ${
                            isSelected 
                              ? 'scale-125 ring-2 ring-primary ring-offset-2' 
                              : 'hover:scale-110 opacity-80 hover:opacity-100'
                          }`}
                          title={color.name}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between pt-3 border-t border-outline-variant/40 mt-auto">
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase font-bold text-on-surface-variant tracking-wider">
                      Precio Base
                    </span>
                    <span className="font-headline text-lg font-bold text-on-surface">
                      ${product.basePrice} USD
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectForCombo(product, activeColor)}
                    className="bg-primary/10 hover:bg-primary hover:text-white text-primary transition-all duration-300 font-bold text-xs py-2 px-4 rounded-full flex items-center gap-1"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Añadir a Combo</span>
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
