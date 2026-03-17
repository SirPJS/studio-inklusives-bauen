import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/Layout/Layout";
import Projekte from "./sections/Projekte";
import Studio from "./sections/Studio";
import UeberMich from "./sections/UeberMich";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Layout>
        <Projekte />
        <Studio />
        <UeberMich />
      </Layout>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
