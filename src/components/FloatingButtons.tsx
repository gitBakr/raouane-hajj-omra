import { Phone, MessageCircle } from "lucide-react";

const FloatingButtons = () => {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
      <a
        href="tel:+33783647594"
        className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white p-3 rounded-full shadow-lg transition-all"
      >
        <Phone className="w-6 h-6" />
      </a>
      <a
        href="https://wa.me/33783647594"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#25D366] hover:bg-[#128C7E] text-white p-3 rounded-full shadow-lg transition-all"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </div>
  );
};

export default FloatingButtons;
