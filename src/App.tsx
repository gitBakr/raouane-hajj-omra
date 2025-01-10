import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PackageDetailsPage from './pages/packages/[id]';
import ReservationsPage from './pages/Reservations';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster 
        theme="light"
        className="bg-primary"
        toastOptions={{
          style: {
            background: '#9b87f5',
            color: 'white',
            border: 'none'
          },
          success: {
            style: {
              background: '#9b87f5',
              color: 'white',
              border: 'none'
            }
          }
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/packages/:id" element={<PackageDetailsPage />} />
          <Route path="/reservations" element={<ReservationsPage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
