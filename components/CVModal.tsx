"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FileDown, X } from "lucide-react";
import { useEffect, useRef } from "react";

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
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="flex-1 flex flex-col h-full w-full relative"
          >
            {/* Accessibility Title (Hidden) */}
            <h2 className="sr-only">CV Preview</h2>

            {/* Floating Top Bar (Controls) */}
            <div className="absolute top-4 right-4 z-[1000002] flex items-center gap-2">
              <a
                href="/assets/cv.pdf"
                download="Glen_Rio_Aristo_CV.pdf"
                className="p-3 bg-white/90 backdrop-blur-md border border-gray-200/50 hover:bg-white text-gray-700 hover:text-primary rounded-2xl transition-all shadow-xl flex items-center justify-center group"
                title="Download CV"
              >
                <FileDown size={22} className="group-hover:scale-110 transition-transform" />
              </a>
              <button
                onClick={onClose}
                className="p-3 bg-white/90 backdrop-blur-md border border-gray-200/50 hover:bg-white text-gray-700 hover:text-red-500 rounded-2xl transition-all shadow-xl flex items-center justify-center group"
                title="Close"
              >
                <X size={22} className="group-hover:rotate-90 transition-transform" />
              </button>
            </div>

            {/* CV Viewport */}
            <div className="flex-1 w-full relative bg-slate-100">
              <iframe
                src="/assets/cv.pdf#toolbar=0&navpanes=0&scrollbar=0"
                className="w-full h-full border-none"
                title="Glen Rio Aristo CV"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </dialog>
  );
};

export default CVModal;


