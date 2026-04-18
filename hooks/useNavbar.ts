import { useNavbarContext } from '@/context/NavbarContext';
import { useCallback } from 'react';

export const useNavbar = (id: string) => {
  const { hideNavbar, showNavbar } = useNavbarContext();

  const hide = useCallback(() => hideNavbar(id), [hideNavbar, id]);
  const show = useCallback(() => showNavbar(id), [showNavbar, id]);

  return { hide, show };
};
