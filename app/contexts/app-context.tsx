"use client"
import { createContext, useContext } from 'react';

interface ContextValue{//add to interfaces file when set
  
}

const AppContext = createContext<ContextValue>({});

export function AppWrapper({ children }: { children: React.ReactNode }) {

  return (
    <AppContext.Provider value={{ }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}