import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertCircle } from 'lucide-react';

interface NotificationProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'success' | 'error';
  title: string;
  message: string;
}

export const Notification: React.FC<NotificationProps> = ({ isOpen, onClose, type, title, message }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[999]"
          />
          
          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[1000] p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="pointer-events-auto w-full max-w-sm bg-white/90 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)] border border-white p-8 relative overflow-hidden text-center"
            >
              {/* Premium Gradient Accent (Progress Bar Style) */}
              <div className={`absolute top-0 left-0 right-0 h-2 ${
                type === 'success' 
                  ? 'bg-gradient-to-r from-amber-400 via-primary to-amber-600' 
                  : 'bg-gradient-to-r from-rose-400 via-red-500 to-rose-600'
              }`} />

              <div className="flex flex-col items-center gap-6">
                <div className={`p-5 rounded-full ${type === 'success' ? 'bg-amber-50 text-primary' : 'bg-rose-50 text-rose-500'}`}>
                  {type === 'success' ? <CheckCircle2 size={36} strokeWidth={1.5} /> : <AlertCircle size={36} strokeWidth={1.5} />}
                </div>

                <div className="space-y-2">
                  <h4 className="text-2xl font-bold text-slate-900 font-grotesk tracking-tight">
                    {title}
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed font-grotesk px-2">
                    {message}
                  </p>
                </div>

                <button
                  onClick={onClose}
                  className="w-full py-5 rounded-3xl font-black text-sm transition-all active:scale-95 text-white bg-gradient-to-r from-primary-variant to-primary shadow-xl shadow-primary/20 hover:shadow-primary/40"
                >
                  {type === 'success' ? 'Great, thanks!' : 'Try Again'}
                </button>
              </div>

              {/* Close Icon Button */}
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={20} />
              </button>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
