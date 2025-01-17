import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { Users, BookCheck, BarChart, ChevronRight } from "lucide-react";

const AdminDashboard = () => {
  return (
    <Layout>
      <div className="container mx-auto px-2 sm:px-4 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Tableau de bord Administrateur</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-2 sm:px-0">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <CardTitle>Utilisateurs</CardTitle>
                  <CardDescription>Gestion des utilisateurs</CardDescription>
                </div>
                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                  128 actifs
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full group">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5" />
                    <span>Voir les utilisateurs</span>
                  </div>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <BookCheck className="w-6 h-6 text-green-500" />
                </div>
                <div className="flex-1">
                  <CardTitle>Réservations</CardTitle>
                  <CardDescription>Gestion des réservations</CardDescription>
                </div>
                <div className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-sm">
                  42 nouvelles
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full group">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <BookCheck className="w-5 h-5" />
                    <span>Voir les réservations</span>
                  </div>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <BarChart className="w-6 h-6 text-purple-500" />
                </div>
                <div className="flex-1">
                  <CardTitle>Statistiques</CardTitle>
                  <CardDescription>Analyses et rapports</CardDescription>
                </div>
                <div className="bg-purple-500/10 text-purple-500 px-3 py-1 rounded-full text-sm">
                  7 rapports
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full group">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <BarChart className="w-5 h-5" />
                    <span>Voir les statistiques</span>
                  </div>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
