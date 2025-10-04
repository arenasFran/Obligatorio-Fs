import Level from "./models/level.model.js";

const defaultLevels = [
  {
    codeLevel: 1,
    name: "Bronce",
    description: "Nivel inicial para comenzar tu aventura.",
    ImageUrl: "https://example.com/levels/bronze.png",
    totalPointsRequired: 0,
  },
  {
    codeLevel: 2,
    name: "Plata",
    description: "Vas en camino, sigue sumando puntos.",
    ImageUrl: "https://example.com/levels/silver.png",
    totalPointsRequired: 100,
  },
  {
    codeLevel: 3,
    name: "Oro",
    description: "Excelente progreso, casi experto.",
    ImageUrl: "https://example.com/levels/gold.png",
    totalPointsRequired: 300,
  },
  {
    codeLevel: 4,
    name: "Platino",
    description: "Dominando el camino del conocimiento.",
    ImageUrl: "https://example.com/levels/platinum.png",
    totalPointsRequired: 700,
  },
  {
    codeLevel: 5,
    name: "Diamante",
    description: "Eres de la élite. Impresionante!",
    ImageUrl: "https://example.com/levels/diamond.png",
    totalPointsRequired: 1500,
  },
];

const seedLevels = async () => {
  try {
    const count = await Level.countDocuments();
    if (count === 0) {
      await Level.insertMany(defaultLevels);
      console.log("Niveles creados!");
    } else {
      console.log("Los niveles ya existen");
    }
  } catch (error) {
    console.error("Error al inicializar niveles:", error);
  }
};

export default seedLevels;
