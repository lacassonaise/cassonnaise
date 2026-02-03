export const metadata = {
  title: "Politique de confidentialité | La Cassonnaise",
  description:
    "Politique de confidentialité et protection des données personnelles du restaurant La Cassonnaise",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10 space-y-6">
      <h1 className="text-3xl font-bold">Politique de confidentialité</h1>

      <p>
        La présente politique de confidentialité a pour objectif d’informer les
        utilisateurs du site La Cassonnaise sur la manière dont leurs données
        personnelles sont collectées, utilisées et protégées.
      </p>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">
          1. Responsable du traitement
        </h2>
        <p>
          Les données personnelles sont traitées par :
        </p>
        <p>
          <strong>La Cassonnaise</strong><br />
          3 rue Myotis, 44390 Casson<br />
          Email : lacassonaise@gmail.com
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">
          2. Données collectées
        </h2>
        <p>
          Dans le cadre de l’utilisation du site, les données suivantes peuvent
          être collectées :
        </p>
        <ul className="list-disc pl-6">
          <li>Nom et prénom (le cas échéant)</li>
          <li>Adresse email</li>
          <li>Numéro de téléphone</li>
          <li>Adresse de livraison</li>
          <li>Détails de commandes</li>
          <li>Données de connexion au compte client</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">
          3. Finalités du traitement
        </h2>
        <p>
          Les données personnelles sont collectées pour les finalités suivantes :
        </p>
        <ul className="list-disc pl-6">
          <li>Gestion des commandes et livraisons</li>
          <li>Création et gestion du compte client</li>
          <li>Communication avec le client</li>
          <li>Respect des obligations légales et comptables</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">
          4. Paiement
        </h2>
        <p>
          Les paiements en ligne sont traités via un prestataire de paiement
          sécurisé (Stripe). La Cassonnaise ne conserve aucune donnée bancaire.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">
          5. Durée de conservation
        </h2>
        <p>
          Les données personnelles sont conservées uniquement pendant la durée
          nécessaire à la réalisation des finalités pour lesquelles elles ont
          été collectées, et conformément aux obligations légales.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">
          6. Destinataires des données
        </h2>
        <p>
          Les données sont destinées exclusivement à La Cassonnaise et à ses
          prestataires techniques strictement nécessaires au fonctionnement du
          service (hébergement, paiement).
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">
          7. Droits des utilisateurs
        </h2>
        <p>
          Conformément au Règlement Général sur la Protection des Données (RGPD),
          vous disposez des droits suivants :
        </p>
        <ul className="list-disc pl-6">
          <li>Droit d’accès</li>
          <li>Droit de rectification</li>
          <li>Droit à l’effacement</li>
          <li>Droit d’opposition</li>
          <li>Droit à la limitation du traitement</li>
        </ul>
        <p>
          Pour exercer vos droits, vous pouvez contacter :
          <strong> lacassonaise@gmail.com</strong>
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">
          8. Sécurité
        </h2>
        <p>
          La Cassonnaise met en œuvre des mesures techniques et organisationnelles
          appropriées afin de garantir la sécurité et la confidentialité des
          données personnelles.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">
          9. Modification de la politique
        </h2>
        <p>
          La présente politique de confidentialité peut être modifiée à tout
          moment. La version en vigueur est celle publiée sur le site.
        </p>
      </section>

      <p className="pt-6 text-sm text-gray-500">
        Dernière mise à jour : 28 janvier 2026
      </p>
    </div>
  );
}



