export const metadata = {
  title: "Conditions générales de vente | La Cassonnaise",
  description:
    "Conditions générales de vente du restaurant La Cassonnaise à Casson",
};

export default function ConditionsGeneralesPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10 space-y-6">
      <h1 className="text-3xl font-bold">Conditions générales de vente</h1>

      <p>
        Les présentes conditions générales de vente (CGV) régissent les relations
        contractuelles entre le restaurant <strong>La Cassonnaise</strong> et
        toute personne effectuant une commande via le site internet.
      </p>

      {/* ARTICLE 1 */}
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Article 1 – Objet</h2>
        <p>
          Les présentes CGV définissent les conditions applicables aux commandes
          de produits alimentaires proposées par La Cassonnaise, en livraison
          locale ou à emporter (click & collect).
        </p>
      </section>

      {/* ARTICLE 2 */}
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">
          Article 2 – Champ d’application
        </h2>
        <p>
          Les CGV s’appliquent à toute commande passée sur le site, que le
          paiement soit effectué en ligne ou sur place.
        </p>
      </section>

      {/* ARTICLE 3 */}
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">
          Article 3 – Produits
        </h2>
        <p>
          Les produits proposés sont ceux figurant sur le site au jour de la
          commande. Les photographies sont non contractuelles.
        </p>
      </section>

      {/* ARTICLE 4 */}
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">
          Article 4 – Commande
        </h2>
        <p>
          Le client sélectionne les produits souhaités, vérifie le récapitulatif
          de commande et valide celle-ci. Toute commande validée implique
          l’acceptation pleine et entière des présentes CGV.
        </p>
      </section>

      {/* ARTICLE 5 */}
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">
          Article 5 – Prix
        </h2>
        <p>
          Les prix sont indiqués en euros (€), toutes taxes comprises (TTC).
          La Cassonnaise se réserve le droit de modifier ses prix à tout moment,
          sans effet sur les commandes déjà validées.
        </p>
      </section>

      {/* ARTICLE 6 */}
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">
          Article 6 – Paiement
        </h2>
        <p>
          Le paiement peut être effectué :
        </p>
        <ul className="list-disc pl-6">
          <li>En ligne via un service de paiement sécurisé</li>
          <li>Sur place lors du retrait ou de la livraison</li>
        </ul>
        <p>
          La Cassonnaise ne conserve aucune donnée bancaire.
        </p>
      </section>

      {/* ARTICLE 7 */}
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">
          Article 7 – Livraison et retrait
        </h2>
        <p>
          La livraison est proposée uniquement dans une zone géographique locale.
          Les délais sont indicatifs et peuvent varier selon l’affluence.
        </p>
        <p>
          Le retrait sur place (click & collect) s’effectue aux horaires
          d’ouverture du restaurant.
        </p>
      </section>

      {/* ARTICLE 8 */}
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">
          Article 8 – Droit de rétractation
        </h2>
        <p>
          Conformément à l’article L221-28 du Code de la consommation, le droit de
          rétractation ne s’applique pas aux produits alimentaires préparés à la
          demande.
        </p>
      </section>

      {/* ARTICLE 9 */}
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">
          Article 9 – Responsabilité
        </h2>
        <p>
          La Cassonnaise ne saurait être tenue responsable en cas d’indisponibilité
          temporaire du site ou de retard dû à des circonstances exceptionnelles.
        </p>
      </section>

      {/* ARTICLE 10 */}
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">
          Article 10 – Données personnelles
        </h2>
        <p>
          Les données personnelles sont traitées conformément à la politique de
          confidentialité disponible sur le site.
        </p>
      </section>

      {/* ARTICLE 11 */}
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">
          Article 11 – Droit applicable
        </h2>
        <p>
          Les présentes CGV sont soumises au droit français. En cas de litige, une
          solution amiable sera recherchée avant toute action judiciaire.
        </p>
      </section>

      <p className="pt-6 text-sm text-gray-500">
        Dernière mise à jour : 28 janvier 2026
      </p>
    </div>
  );
}
