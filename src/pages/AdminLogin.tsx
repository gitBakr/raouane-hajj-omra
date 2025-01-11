import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://hajj-omra-booking-backend.onrender.com';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // 1. Login Admin
      const loginResponse = await fetch(`${API_URL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      if (!loginResponse.ok) {
        setError('Email non autorisé');
        return;
      }

      // 2. Vérifier le statut Admin
      const checkResponse = await fetch(
        `${API_URL}/admin/check?email=${encodeURIComponent(email)}`, 
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (!checkResponse.ok) {
        setError('Vérification du statut admin échouée');
        return;
      }

      // 3. Test Admin Auth
      const testAuthResponse = await fetch(`${API_URL}/admin/test-auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      if (!testAuthResponse.ok) {
        setError('Test d\'authentification échoué');
        return;
      }

      // Si tout est OK, stocker l'email et rediriger
      localStorage.setItem('adminEmail', email);
      navigate('/admin');

    } catch (err) {
      console.error('Erreur:', err);
      setError('Erreur de connexion au serveur');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-3xl font-bold text-center text-primary">
          Administration
        </h2>
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email administrateur
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="admin@example.com"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
} 