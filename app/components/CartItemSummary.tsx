import { CartItem } from "@/store/cart";

export default function CartItemSummary({ item }: { item: CartItem }) {
  const c = item.customizations;

  return (
    <div className="border-b py-4">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold">
            {item.name} × {item.quantity}
          </p>

          {/* TACOS */}
          {c?.tacos && (
            <ul className="text-sm text-gray-600 list-disc ml-4">
              <li>Taille : {c.tacos.size}</li>
              <li>Base : {c.tacos.base}</li>
              <li>Viandes : {c.tacos.meats.join(", ")}</li>
              {c.tacos.sauces.length > 0 && (
                <li>Sauces : {c.tacos.sauces.join(", ")}</li>
              )}
              {c.tacos.extras.length > 0 && (
                <li>Extras : {c.tacos.extras.join(", ")}</li>
              )}
              {c.tacos.menu && <li>Menu</li>}
            </ul>
          )}

          {/* BURGER */}
          {c?.burger && (
            <ul className="text-sm text-gray-600 list-disc ml-4">
              {c.burger.menu && <li>Menu</li>}
              {c.burger.removedIngredients.length > 0 && (
                <li>
                  Sans : {c.burger.removedIngredients.join(", ")}
                </li>
              )}
            </ul>
          )}

          {/* ASSIETTE */}
          {c?.assiette && (
            <ul className="text-sm text-gray-600 list-disc ml-4">
              <li>{c.assiette.size} viande(s)</li>
              <li>Viandes : {c.assiette.meats.join(", ")}</li>

              {c.assiette.removedSides.length > 0 && (
                <li>Sans : {c.assiette.removedSides.join(", ")}</li>
              )}

              {c.assiette.removedVeggies.length > 0 && (
                <li>Sans : {c.assiette.removedVeggies.join(", ")}</li>
              )}

              {c.assiette.extraSalad && <li>+ Salade</li>}
            </ul>
          )}
        </div>

        <p className="font-bold">
          {((item.priceCents * item.quantity) / 100).toFixed(2)} €
        </p>
      </div>
    </div>
  );
}
