declare module "react-helmet-async" {
  import type { FC, ReactNode } from "react";

  interface HelmetProps {
    children?: ReactNode;
  }

  interface HelmetProviderProps {
    children?: ReactNode;
  }

  export const HelmetProvider: FC<HelmetProviderProps>;
  export const Helmet: FC<HelmetProps>;
}
