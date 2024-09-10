import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" >
      <NextUIProvider>
     
          <Toaster />
          {children}
   
      </NextUIProvider>
    </ThemeProvider>
  );
}
