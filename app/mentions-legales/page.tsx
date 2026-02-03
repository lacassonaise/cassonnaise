export const metadata = {
  title: "Mentions légales | La Cassonnaise",
  description:
    "Mentions légales du site du restaurant La Cassonnaise à Casson",
};

export default function MentionsLegalesPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10 space-y-6">
      <h1 className="text-3xl font-bold">Mentions légales</h1>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Éditeur du site</h2>
        <p><strong>Nom du restaurant :</strong> La Cassonnaise</p>
        <p><strong>Adresse :</strong> 3 rue Myotis, 44390 Casson</p>
        <p><strong>Téléphone :</strong> 09 82 28 22 14</p>
        <p><strong>Email :</strong> lacassonaise@gmail.com</p>
        <p><strong>Responsable de publication :</strong> Ez-zine Mouad</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Activité</h2>
        <p>
          Le site a pour objet la présentation et la prise de commandes du
          restaurant La Cassonnaise, incluant :
        </p>
        <ul className="list-disc pl-6">
          <li>Livraison locale uniquement</li>
          <li>Commande à emporter (click & collect)</li>
          <li>Paiement en ligne et paiement sur place</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Développement du site</h2>
        <p><strong>Développeuse :</strong> Wahi Haroun</p>
        <p><strong>Fonction :</strong> Développeuse web full stack</p>
        <p><strong>Contact :</strong> wahibaharoun78@gmail.com</p>

        <p className="text-sm text-gray-600">
          Le site a été conçu et développé par un prestataire technique
          indépendant. La développeuse n’intervient pas dans la gestion des
          contenus, des commandes, des paiements ou des relations commerciales
          avec les clients. L’éditeur du site demeure seul responsable de
          l’exploitation du service.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Hébergement</h2>
        <p><strong>Hébergeur :</strong> Netlify</p>
        <p>
          Netlify, Inc. <br />
          2325 3rd Street, Suite 215 <br />
          San Francisco, CA 94107, États-Unis
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Propriété intellectuelle</h2>
        <p>
          L’ensemble du contenu du site (textes,logos, design,
          structure) est la propriété exclusive de La Cassonnaise, sauf mention
          contraire.
        </p>
        <p>
          Toute reproduction, représentation ou exploitation, même partielle,
          est interdite sans autorisation écrite préalable.
        </p>
      </section>

      <p className="pt-6 text-sm text-gray-500">
        Dernière mise à jour : 28 janvier 2026
      </p>
    </div>
  );
}

