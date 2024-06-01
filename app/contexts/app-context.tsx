"use client"
import { createContext, useContext, useEffect, useState } from 'react';

interface ContextValue{
  originUrl: string
}

const AppContext = createContext<ContextValue>({originUrl: ''});

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [originUrl, setOriginUrl] = useState<string>(''); 

  useEffect(() => {
    setOriginUrl(window.location.origin); 
  }, []);

  return (
    <AppContext.Provider value={{ originUrl }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}