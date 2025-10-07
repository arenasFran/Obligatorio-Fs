import Pet from "./models/pet.model.js";

export async function initPets() {
  const count = await Pet.countDocuments();
  if (count > 0) return { skipped: true };

  const data = [
    {
      name: "Gatito",
      description: "Un gato curioso que ama los libros.",
      ImageSet: [
        "https://example.com/pets/cat/idle.png",
        "https://example.com/pets/cat/happy.png",
      ],
      totalPointsRequired: 0,
      isUnlocked: true,

      hungryCostPerHour: 0.5,
    },
    {
      name: "Perrito",
      description: "Un perro fiel motivador.",
      ImageSet: [
        "https://example.com/pets/dog/idle.png",
        "https://example.com/pets/dog/happy.png",
      ],
      totalPointsRequired: 100,
      isUnlocked: false,

      hungryCostPerHour: 1,
    },
    {
      name: "Búho Sabio",
      description:
        "Guardián nocturno del conocimiento. Despierta cuando lees de noche.",
      ImageSet: [
        "https://example.com/pets/owl/idle.png",
        "https://example.com/pets/owl/happy.png",
      ],
      totalPointsRequired: 250,
      isUnlocked: false,

      hungryCostPerHour: 0.7,
    },
    {
      name: "Zorro Lector",
      description:
        "Astuto y veloz. Aumenta su curiosidad con cada página leída.",
      ImageSet: [
        "https://example.com/pets/fox/idle.png",
        "https://example.com/pets/fox/happy.png",
      ],
      totalPointsRequired: 500,
      isUnlocked: false,

      hungryCostPerHour: 1.2,
    },
    {
      name: "Dragón de Papel",
      description:
        "Criatura mítica nacida de los libros antiguos. Ama las historias épicas.",
      ImageSet: [
        "https://example.com/pets/dragon/idle.png",
        "https://example.com/pets/dragon/happy.png",
      ],
      totalPointsRequired: 1000,
      isUnlocked: false,

      hungryCostPerHour: 2.5,
    },
    {
      name: "Robot Bibliotecario",
      description: "Mantiene el orden y recuerda tus lecturas pasadas.",
      ImageSet: [
        "https://example.com/pets/robot/idle.png",
        "https://example.com/pets/robot/happy.png",
      ],
      totalPointsRequired: 2000,
      isUnlocked: false,

      hungryCostPerHour: 0.2,
    },
    {
      name: "Fénix del Saber",
      description:
        "Renace con cada meta cumplida. Representa la constancia del lector.",
      ImageSet: [
        "https://example.com/pets/phoenix/idle.png",
        "https://example.com/pets/phoenix/happy.png",
      ],
      totalPointsRequired: 5000,
      isUnlocked: false,

      hungryCostPerHour: 3,
    },
  ];

  await Pet.insertMany(data);
  return { created: data.length };
}
