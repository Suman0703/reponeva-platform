import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { AuthGateProvider } from "./context/AuthGateContext.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { BookmarkProvider } from "./context/BookmarkContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <BookmarkProvider>
            <AuthGateProvider>
              <App />
            </AuthGateProvider>
          </BookmarkProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);