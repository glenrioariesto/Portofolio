"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface NavbarContextType {
  isHidden: boolean;
  hideNavbar: (sourceId: string) => void;
  showNavbar: (sourceId: string) => void;
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export const NavbarProvider = ({ children }: { children: ReactNode }) => {
  const [hiddenSources, setHiddenSources] = useState<Set<string>>(new Set());

  const hideNavbar = useCallback((sourceId: string) => {
    setHiddenSources((prev) => {
      const newSet = new Set(prev);
      newSet.add(sourceId);
      return newSet;
    });
  }, []);

  const showNavbar = useCallback((sourceId: string) => {
    setHiddenSources((prev) => {
      const newSet = new Set(prev);
      newSet.delete(sourceId);
      return newSet;
    });
  }, []);

  // Navbar is hidden if ANY component has requested to hide it
  const isHidden = hiddenSources.size > 0;

  return (
    <NavbarContext.Provider value={{ isHidden, hideNavbar, showNavbar }}>
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbarContext = () => {
  const context = useContext(NavbarContext);
  if (context === undefined) {
    throw new Error('useNavbarContext must be used within a NavbarProvider');
  }
  return context;
};
