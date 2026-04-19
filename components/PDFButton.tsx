"use client";

import React, { useState, useEffect } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFDocument from './PDFDocument';
import { Printer, Loader2 } from 'lucide-react';

const PDFButton = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return (
    <div className="p-3 bg-white/90 backdrop-blur-md border border-gray-200/50 rounded-2xl flex items-center justify-center">
       <Loader2 size={22} className="animate-spin text-slate-400" />
    </div>
  );

  return (
    <PDFDownloadLink
      document={<PDFDocument />}
      fileName="Glen_Rio_Aristo_CV.pdf"
      className="p-3 bg-white/90 backdrop-blur-md border border-gray-200/50 hover:bg-white text-gray-700 hover:text-amber-950 rounded-2xl transition-all shadow-xl flex items-center justify-center group"
    >
      {({ loading }) =>
        loading ? (
          <Loader2 size={22} className="animate-spin text-slate-400" />
        ) : (
          <Printer size={22} className="group-hover:scale-110 transition-transform" />
        )
      }
    </PDFDownloadLink>
  );
};

export default PDFButton;
