import { Loader2 } from "lucide-react";

export const LoadingScreen: React.FC = () => (
  <div className="flex h-screen w-full items-center justify-center bg-surface text-primary">
    <div className="flex flex-col items-center gap-3">
      <Loader2 className="h-8 w-8 animate-spin" />
      <p className="text-sm font-medium">Cargando experiencia Aprende+...</p>
    </div>
  </div>
);
