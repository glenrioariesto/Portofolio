import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CVTemplate from "./CVTemplate";
import { X } from "lucide-react";
import dynamic from "next/dynamic";

const PDFButton = dynamic(() => import("./PDFButton"), { 
  ssr: false,
  loading: () => <div className="p-3 bg-white/90 backdrop-blur-md border border-gray-200/50 rounded-2xl"><div className="w-5 h-5 border-2 border-slate-200 border-t-slate-400 animate-spin rounded-full" /></div>
});

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CVModal = ({ isOpen, onClose }: CVModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
        document.body.style.overflow = "hidden";
      }
    } else {
      if (dialog.open) {
        dialog.close();
        document.body.style.overflow = "unset";
      }
    }
  }, [isOpen]);

  // Handle click on backdrop to close
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={handleBackdropClick}
      className="
        fixed inset-0 m-auto 
        w-full max-w-5xl h-[90vh] md:h-[85vh] 
        bg-white rounded-3xl overflow-hidden shadow-2xl 
        border border-white/20 z-[1000000]
        p-0 backdrop:bg-black/80 backdrop:backdrop-blur-md
        open:flex open:flex-col
      "
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="flex-1 flex flex-col h-full w-full relative"
          >
            {/* Accessibility Title (Hidden) */}
            <h2 className="sr-only">Interactive CV Preview</h2>

            {/* Floating Top Bar (Controls) */}
            <div className="absolute top-4 right-8 z-[1000003] flex items-center gap-3">
              <PDFButton />
              <button
                onClick={onClose}
                className="p-3 bg-white/90 backdrop-blur-md border border-gray-200/50 hover:bg-white text-gray-700 hover:text-red-500 rounded-2xl transition-all shadow-xl flex items-center justify-center group"
                title="Close Preview"
              >
                <X size={22} className="group-hover:rotate-90 transition-transform" />
              </button>
            </div>

            {/* Live CV Content (HTML Version for fast viewing) */}
            <div className="flex-1 w-full overflow-hidden bg-white">
              <CVTemplate />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </dialog>
  );
};

export default CVModal;





