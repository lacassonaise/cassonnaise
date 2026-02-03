"use client";

const messages = [
  {
    text: "Livraison gratuite jusqu’à 12 km dès 25€ d’achat",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 7h11v10H3z" />
        <path d="M14 10h4l3 3v4h-7z" />
        <circle cx="7.5" cy="17.5" r="1.5" />
        <circle cx="17.5" cy="17.5" r="1.5" />
      </svg>
    ),
  },
  {
    text: "Pizzas, Burgers & Tacos faits maison",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2c2 3 2 6 0 8-2-2-2-5 0-8z" />
        <path d="M6 14c0 4 3 8 6 8s6-4 6-8z" />
      </svg>
    ),
  },
  {
    text: "Commande rapide • Service efficace",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </svg>
    ),
  },
];

export default function PromoBar() {
  return (
    <div className="sticky top-[64px] z-40 w-full border-b bg-white/80 backdrop-blur">
      <div className="relative overflow-hidden py-2">

        {/* TRACK */}
        <div className="flex w-max animate-promo-horizontal gap-12 px-6 text-sm font-medium text-gray-900">
          {[...messages, ...messages].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <span className="text-[#1F5C3A]">{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
 {/* BARRE SIGNATURE */}
      <div className="h-1 w-full bg-gradient-to-r from-[#1F5C3A] via-[#c96827] to-[#34cc78]" />
      {/* ANIMATION */}
      <style jsx>{`
        @keyframes promo-horizontal {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .animate-promo-horizontal {
          animation: promo-horizontal 25s linear infinite;
        }
      `}</style>
    </div>
  );
}
