import { FileText, CreditCard, AlertCircle } from 'lucide-react';

export function Inscription() {
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-center text-primary mb-12">
        Inscription aux Voyages
      </h1>

      <div className="max-w-4xl mx-auto">
        {/* Documents requis */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <FileText className="w-6 h-6 text-primary" />
            Documents Requis
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Passeport valide 6 mois après la date de retour
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                2 photos d'identité récentes (fond blanc)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Carnet de vaccination international à jour
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Justificatif de domicile de moins de 3 mois
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Certificat médical d'aptitude pour les personnes de plus de 65 ans
              </li>
            </ul>
          </div>
        </section>

        {/* Modalités de paiement */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-primary" />
            Modalités de Paiement
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Acompte de 30% à la réservation
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Possibilité de paiement en 3 ou 4 fois sans frais
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Solde à régler au plus tard 45 jours avant le départ
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Moyens de paiement acceptés : carte bancaire, virement, chèque
              </li>
            </ul>
          </div>
        </section>

        {/* Conditions d'annulation */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-primary" />
            Conditions d'Annulation
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Plus de 60 jours avant le départ : 10% du montant total
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Entre 60 et 30 jours : 30% du montant total
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Entre 30 et 15 jours : 50% du montant total
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Moins de 15 jours : 100% du montant total
              </li>
            </ul>
          </div>
        </section>

        {/* Call to action */}
        <div className="bg-primary/10 p-6 rounded-lg text-center">
          <h3 className="text-xl font-semibold mb-4">Prêt à réserver votre voyage ?</h3>
          <p className="mb-6">
            Notre équipe est à votre disposition pour vous accompagner dans votre inscription.
          </p>
          <button 
            onClick={() => window.location.href = '/#offres'}
            className="bg-primary text-white px-8 py-3 rounded-md hover:bg-primary/90 transition-colors"
          >
            Voir nos offres
          </button>
        </div>
      </div>
    </div>
  );
}

export default Inscription; 