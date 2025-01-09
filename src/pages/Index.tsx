import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import OffersSection from "@/components/OffersSection";
import Gallery from "@/components/Gallery";
import RegistrationForm from "@/components/RegistrationForm";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <OffersSection />
      <Gallery />
      <RegistrationForm />
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default Index;