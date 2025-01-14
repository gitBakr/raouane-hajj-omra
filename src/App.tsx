import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PackageDetailsPage from './pages/packages/[id]';
import ReservationsPage from './pages/Reservations';
import { Contact } from '@/pages/Contact';
import { Inscription } from '@/pages/Inscription';
import { Layout } from '@/components/Layout';
import Offres from "./pages/Offres";
import { Galerie } from '@/pages/Galerie';
import { Admin } from '@/pages/Admin';
import { AdminLogin } from '@/pages/AdminLogin';
import { ProtectedRoute } from '@/components/ProtectedRoute';

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
        }}
      />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/packages/:id" element={<PackageDetailsPage />} />
            <Route path="/reservations" element={<ReservationsPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/inscription" element={<Inscription />} />
            <Route path="/offres" element={<Offres />} />
            <Route path="/galerie" element={<Galerie />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
