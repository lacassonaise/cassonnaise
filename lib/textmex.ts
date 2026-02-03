export type TextMexItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

export const TEXT_MEX: TextMexItem[] = [
  {
    id: "nuggets",
    name: "Nuggets",
    description: "6 pièces croustillantes",
    price: 750,
    image: "/text-mex/nuggets.jpg",
  },
  {
    id: "mozza",
    name: "Mozza Sticks",
    description: "6 pièces fondantes",
    price: 750,
    image: "/text-mex/mozzasticks.jpg",
  },
  {
    id: "wings",
    name: "Wings",
    description: "6 pièces épicées",
    price: 750,
    image: "/text-mex/wings.jpg",
  },
  {
    id: "calamars",
    name: "Calamars frits",
    description: "6 pièces dorées",
    price: 750,
    image: "/text-mex/calamar.jpg",
  },
  {
    id: "onion",
    name: "Onion Rings",
    description: "6 pièces croustillantes",
    price: 750,
    image: "/text-mex/oignion.jpg",
  },
  {
    id: "frites",
    name: "Frites maison",
    description: "Pommes de terre fraîches",
    price: 300,
    image: "/text-mex/frittesm.jpg",
  },
  {
    id: "frites-cheddar",
    name: "Frites cheddar",
    description: "Cheddar fondu",
    price: 300,
    image: "/text-mex/potates.jpg",
  },
];

