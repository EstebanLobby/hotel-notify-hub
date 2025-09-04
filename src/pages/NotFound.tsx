import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-background">
      <Header title="Página No Encontrada" />
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="text-8xl font-bold text-primary mb-4">404</div>
          <h1 className="text-2xl font-semibold text-foreground mb-4">
            Oops! Página no encontrada
          </h1>
          <p className="text-text-muted mb-6">
            La página que estás buscando no existe o ha sido movida.
          </p>
          <Button asChild>
            <a href="/">Volver al Dashboard</a>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
