import { useState } from "react";
import { toast } from "sonner";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    tripType: "omra",
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Votre demande a été envoyée avec succès !");
    setFormData({
      tripType: "omra",
      name: "",
      email: "",
      phone: "",
      message: ""
    });
  };

  return (
    <section id="inscription" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
          Inscription en Ligne
        </h2>
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="tripType" className="block text-gray-700 mb-2">Type de voyage</label>
              <select
                id="tripType"
                value={formData.tripType}
                onChange={(e) => setFormData({...formData, tripType: e.target.value})}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="omra">Omra</option>
                <option value="hajj">Hajj</option>
              </select>
            </div>
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-2">Nom complet</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-gray-700 mb-2">Téléphone</label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700 mb-2">Message (optionnel)</label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary h-32"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white py-3 rounded-md transition-all"
            >
              Envoyer la demande
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;