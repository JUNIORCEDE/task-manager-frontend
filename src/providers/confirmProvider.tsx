'use client';

import { createContext, useContext, useRef } from 'react';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

const ToastContext = createContext<any>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast debe usarse dentro de ConfirmProvider');
  }
  return context;
};

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const toast = useRef<Toast>(null);

  return (
    <ToastContext.Provider value={toast}>
      <Toast ref={toast} />
      <ConfirmDialog />
      {children}
    </ToastContext.Provider>
  );
}