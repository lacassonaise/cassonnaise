import PizzaConfigurator from "@/components/PizzaConfigurator";
import { PIZZAS_BY_BASE } from "@/lib/pizzas";

export default function PizzasPage() {
  return (
    <main className="mx-auto max-w-7xl p-6 space-y-16">

      {/* BASE TOMATE */}
      <section>
        <h2 className="text-2xl font-bold mb-6">🍅 Base tomate</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PIZZAS_BY_BASE.tomate.map((pizza) => (
            <PizzaConfigurator key={pizza.slug} pizza={pizza} />
          ))}
        </div>
      </section>

      {/* BASE CRÈME */}
      <section>
        <h2 className="text-2xl font-bold mb-6">🥛 Base crème fraîche</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PIZZAS_BY_BASE.creme.map((pizza) => (
            <PizzaConfigurator key={pizza.slug} pizza={pizza} />
          ))}
        </div>
      </section>

    </main>
  );
}



