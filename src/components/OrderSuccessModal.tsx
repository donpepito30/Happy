import { ComboOrder } from '../types';
import { Check, Truck, Sparkles, Box, ShieldCheck, Mail } from 'lucide-react';
import { motion } from 'motion/react';

interface OrderSuccessModalProps {
  order: ComboOrder | null;
  onClose: () => void;
}

export default function OrderSuccessModal({ order, onClose }: OrderSuccessModalProps) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-lg w-full border border-outline-variant my-8"
      >
        {/* Banner with Success Logo */}
        <div className="bg-primary p-6 text-center text-white relative">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-25">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-white rounded-full blur-2xl animate-pulse" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary rounded-full blur-2xl animate-pulse" />
          </div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 15 }}
            className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white"
          >
            <Check className="w-8 h-8 text-white" />
          </motion.div>

          <h3 className="font-headline text-2xl font-bold mb-1">¡Pedido Confirmado!</h3>
          <p className="text-sm text-primary-fixed opacity-90">
            Gracias por confiar en Happy View. Tu salud visual está en camino.
          </p>
        </div>

        {/* Success Details */}
        <div className="p-6 flex flex-col gap-5">
          {/* Tracking Bar */}
          <div className="bg-surface-container-low border border-outline-variant/60 p-4 rounded-2xl">
            <div className="flex justify-between items-center mb-2.5">
              <span className="text-xs font-bold text-on-surface-variant flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-primary" /> Código de Envío
              </span>
              <span className="text-xs font-mono font-bold text-primary">
                {order.id}
              </span>
            </div>
            
            {/* Timeline Progress */}
            <div className="relative flex justify-between items-center mt-3">
              <div className="absolute left-1.5 right-1.5 top-2.5 h-0.5 bg-stone-200 -z-10" />
              <div className="absolute left-1.5 w-1/3 top-2.5 h-0.5 bg-primary -z-10" />
              
              <div className="flex flex-col items-center">
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[10px] text-white font-bold">
                  1
                </div>
                <span className="text-[9px] font-bold text-on-surface mt-1">Registrado</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-5 h-5 rounded-full bg-stone-300 flex items-center justify-center text-[10px] text-white font-bold">
                  2
                </div>
                <span className="text-[9px] font-bold text-on-surface-variant mt-1">Empacando</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-5 h-5 rounded-full bg-stone-300 flex items-center justify-center text-[10px] text-white font-bold">
                  3
                </div>
                <span className="text-[9px] font-bold text-on-surface-variant mt-1">En camino</span>
              </div>
            </div>
          </div>

          {/* Configuration Summary */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2.5">
              Resumen de tu Combo BlueBlock
            </h4>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center p-2.5 bg-surface-container-low rounded-xl border border-outline-variant/30 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-primary">Gafa #1:</span>
                  <span>{order.pair1.model.name}</span>
                  <span className="text-[10px] text-on-surface-variant font-medium">({order.pair1.shape.name}, {order.pair1.color.name})</span>
                </div>
                <span className="font-semibold text-on-surface-variant">{order.pair1.lens.name}</span>
              </div>
              
              <div className="flex justify-between items-center p-2.5 bg-surface-container-low rounded-xl border border-outline-variant/30 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-secondary">Gafa #2:</span>
                  <span>{order.pair2.model.name}</span>
                  <span className="text-[10px] text-on-surface-variant font-medium">({order.pair2.shape.name}, {order.pair2.color.name})</span>
                </div>
                <span className="font-semibold text-on-surface-variant">{order.pair2.lens.name}</span>
              </div>
            </div>
          </div>

          {/* Customer info & Delivery */}
          <div className="grid grid-cols-2 gap-4 text-xs border-t border-b border-outline-variant/40 py-4">
            <div>
              <p className="font-bold text-on-surface-variant uppercase tracking-wider text-[9px] mb-1">
                Destinatario
              </p>
              <p className="font-semibold text-on-surface">{order.customerName}</p>
              <p className="text-on-surface-variant truncate">{order.customerEmail}</p>
            </div>
            <div>
              <p className="font-bold text-on-surface-variant uppercase tracking-wider text-[9px] mb-1">
                Dirección de Envío
              </p>
              <p className="font-semibold text-on-surface">{order.shippingAddress}</p>
              <p className="text-on-surface-variant truncate">{order.city}, {order.postalCode}</p>
            </div>
          </div>

          {/* Eco Gift Kit Promo Box */}
          <div className="bg-primary/5 p-3 rounded-xl border border-primary/20 flex items-center gap-3">
            <Box className="w-8 h-8 text-primary flex-shrink-0" />
            <div className="text-xs">
              <p className="font-bold text-primary flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> ¡Kit de Regalo Incluido!
              </p>
              <p className="text-on-surface-variant text-[11px] leading-relaxed">
                Tu pedido incluye 2 fundas ecológicas, microfibras premium anti-empañamiento y destornillador óptico portátil.
              </p>
            </div>
          </div>

          {/* Close CTA */}
          <button
            onClick={onClose}
            className="w-full bg-primary hover:bg-primary-container text-white py-3.5 rounded-full font-bold text-sm shadow-md transition-all text-center flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Volver a la Tienda</span>
          </button>

          <p className="text-[10px] text-center text-on-surface-variant flex items-center justify-center gap-1 opacity-70">
            <Mail className="w-3 h-3" /> Copia de recibo enviada a {order.customerEmail}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
