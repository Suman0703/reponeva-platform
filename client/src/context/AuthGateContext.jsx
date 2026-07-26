import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";

const AuthGateContext = createContext();

export function AuthGateProvider({ children }) {
  const { user } = useAuth();
  const [promptOpen, setPromptOpen] = useState(false);

  // Any component can call requireAuth(() => doTheRealThing()) instead of
  // running an action directly. If logged in, it just runs immediately —
  // callers don't need to know or care whether a gate even exists.
  function requireAuth(action) {
    if (user) {
      action();
    } else {
      setPromptOpen(true);
    }
  }

  return (
    <AuthGateContext.Provider value={{ requireAuth, promptOpen, setPromptOpen }}>
      {children}
    </AuthGateContext.Provider>
  );
}

export function useAuthGate() {
  return useContext(AuthGateContext);
}